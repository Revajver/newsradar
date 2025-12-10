require('dotenv').config();
const Parser = require('rss-parser');
const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL environment variable is not set');
  return url;
};

const adapter = new PrismaLibSql({ url: getDatabaseUrl() });
const prisma = new PrismaClient({ adapter });

const parser = new Parser({ timeout: 10000 });
const FEEDS = [
  { url: 'https://rss.orf.at/news.xml', source: 'ORF News' },
  { url: 'https://www.derstandard.at/rss', source: 'Der Standard' },
  { url: 'https://www.diepresse.com/rss', source: 'Die Presse' },
];

function extractImage(it) {
  if (!it) return undefined;
  if (it.enclosure && it.enclosure.url) return it.enclosure.url;
  if (it['media:content'] && it['media:content'].url) return it['media:content'].url;
  if (it['media:thumbnail'] && it['media:thumbnail'].url) return it['media:thumbnail'].url;
  const content = (it.content || it['content:encoded'] || it.contentSnippet || '').toString();
  const m = content.match(/<img[^>]+src=\"([^\">]+)\"/i);
  if (m && m[1]) return m[1];
  const m2 = content.match(/https?:\/\/[^\s'\"]+\.(?:png|jpe?g|gif|webp)/i);
  if (m2 && m2[0]) return m2[0];
  return undefined;
}

async function fetchAll() {
  const results = [];
  for (const f of FEEDS) {
    try {
      const feed = await parser.parseURL(f.url);
      const items = (feed.items || []).map((it) => ({
        title: it.title || '',
        link: it.link,
        isoDate: it.isoDate || it.pubDate || null,
        contentSnippet: (it.contentSnippet || it.content || '').toString(),
        source: f.source || feed.title || f.url,
        image: extractImage(it) || null,
      }));
      results.push(...items);
    } catch (err) {
      console.warn('RSS fetch failed for', f.url, err.message || err);
    }
  }
  results.sort((a, b) => {
    const da = a.isoDate ? Date.parse(a.isoDate) : 0;
    const db = b.isoDate ? Date.parse(b.isoDate) : 0;
    return db - da;
  });
  return results;
}

async function save(items) {
  let inserted = 0;
  for (const item of items) {
    if (!item.link) continue;
    try {
      const existing = await prisma.article.findUnique({ where: { sourceUrl: item.link } });
      if (existing) continue;
      await prisma.article.create({
        data: {
          title: item.title,
          content: item.contentSnippet || '',
          sourceUrl: item.link,
          source: item.source || 'Unknown',
          link: item.link,
          imageUrl: item.image,
          publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
        },
      });
      inserted += 1;
    } catch (err) {
      console.warn('Failed to save article', item.link, err.message || err);
    }
  }
  return inserted;
}

(async () => {
  const items = await fetchAll();
  const inserted = await save(items);
  console.log(`Fetched ${items.length} items, inserted ${inserted} new`);
  await prisma.$disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
