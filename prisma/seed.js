require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL || 'file:./dev.db' } },
});

async function main() {
  const items = [
    { title: 'Vienna Marathon', content: 'Annual Vienna Marathon runs through the city.' },
    { title: 'Christkindl Market', content: 'Traditional Christmas markets open in December.' },
    { title: 'Music Festival', content: 'Open-air concerts across Austria this summer.' },
  ];

  for (const it of items) {
    await prisma.article.create({ data: it });
  }

  console.log('Seeded sample articles');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
