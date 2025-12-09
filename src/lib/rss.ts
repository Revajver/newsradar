import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link?: string;
  isoDate?: string | null;
  contentSnippet?: string;
  source?: string;
  image?: string | null;
};

const parser = new Parser({ timeout: 10000 });

// Austrian RSS feeds - verified working sources
const DEFAULT_FEEDS = [
  { url: 'https://rss.orf.at/news.xml', source: 'ORF News' },
  { url: 'https://rss.orf.at/nachrichten.xml', source: 'ORF Nachrichten' },
  { url: 'https://www.derstandard.at/rss', source: 'Der Standard' },
  { url: 'https://www.diepresse.com/rss', source: 'Die Presse' },
  { url: 'https://www.vienna.at/rss.xml', source: 'Vienna Online' },
  { url: 'https://www.oe24.at/feed', source: 'Oe24' },
];

let cache: { items: FeedItem[]; expiresAt: number } | null = null;

export async function fetchFeeds(feeds = DEFAULT_FEEDS, maxItems = 50) {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.items.slice(0, maxItems);

  const results: FeedItem[] = [];

  function extractImage(it: any): string | undefined {
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

  await Promise.all(
    feeds.map(async (f: { url: string; source?: string }) => {
      try {
        const feed = await parser.parseURL(f.url);
        const items = (feed.items || []).map((it) => ({
          title: it.title || '',
          link: it.link,
          isoDate: it.isoDate || it.pubDate || null,
          contentSnippet: (it.contentSnippet || it.content || '').toString(),
          source: f.source || feed.title || f.url,
          image: extractImage(it) || null,
        } as FeedItem));
        results.push(...items);
      } catch (err) {
        // ignore a single feed failure
        // eslint-disable-next-line no-console
        console.warn('RSS fetch failed for', f.url, (err as any)?.message ?? err);
      }
    })
  );

  // sort by date desc
  results.sort((a, b) => {
    const da = a.isoDate ? Date.parse(a.isoDate) : 0;
    const db = b.isoDate ? Date.parse(b.isoDate) : 0;
    return db - da;
  });

  cache = { items: results, expiresAt: now + 1000 * 60 * 10 }; // cache 10 minutes
  return results.slice(0, maxItems);
}

export default { fetchFeeds };
