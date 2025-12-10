const { createClient } = require('@libsql/client');
const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}
const client = createClient({ url });
(async () => {
  await client.execute(
    'CREATE TABLE IF NOT EXISTS "Article" ("id" TEXT PRIMARY KEY NOT NULL, "title" TEXT NOT NULL, "content" TEXT NOT NULL, "sourceUrl" TEXT NOT NULL UNIQUE, "source" TEXT NOT NULL, "imageUrl" TEXT, "link" TEXT NOT NULL, "publishedAt" DATETIME NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);'
  );
  console.log('Ensured Article table exists');
  await client.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
