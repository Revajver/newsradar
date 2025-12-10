const { createClient } = require('@libsql/client');
const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}
const client = createClient({ url });
(async () => {
  const countRes = await client.execute('SELECT COUNT(*) as c FROM "Article"');
  const count = countRes.rows[0].c;
  const rows = await client.execute('SELECT id, title, source, publishedAt FROM "Article" ORDER BY publishedAt DESC LIMIT 5');
  console.log('Article count:', count);
  console.log('Recent articles:');
  for (const r of rows.rows) {
    console.log('-', r.title, '|', r.source, '|', r.publishedAt);
  }
  await client.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
