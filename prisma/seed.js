require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return url;
};

const adapter = new PrismaLibSql({
  url: getDatabaseUrl(),
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const items = [
    {
      title: 'Vienna Marathon',
      content: 'Annual Vienna Marathon runs through the city.',
      sourceUrl: 'https://vienna-marathon.com/1',
      source: 'Vienna Events',
      link: 'https://vienna-marathon.com/1',
      publishedAt: new Date(),
    },
    {
      title: 'Christkindl Market',
      content: 'Traditional Christmas markets open in December.',
      sourceUrl: 'https://christkindl-market.at/1',
      source: 'Vienna Events',
      link: 'https://christkindl-market.at/1',
      publishedAt: new Date(),
    },
    {
      title: 'Music Festival',
      content: 'Open-air concerts across Austria this summer.',
      sourceUrl: 'https://music-festival.at/1',
      source: 'Vienna Events',
      link: 'https://music-festival.at/1',
      publishedAt: new Date(),
    },
  ];

  for (const it of items) {
    await prisma.article.create({ data: it });
  }

  console.log('Seeded sample articles');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
