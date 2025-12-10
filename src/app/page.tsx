import TimeCard from '@/components/TimeCard';
import EventTable from '@/components/EventTable';
import { noImagePlaceholder } from '@/lib/placeholders';
import prisma from '@/lib/prisma';
import { Article } from '@prisma/client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Load latest articles from database
  let newsItems: Article[] = [];
  try {
    newsItems = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 10,
    });
  } catch (err) {
    // If database is not available during build, just show empty list
    console.warn('Could not fetch articles from database:', (err as any)?.message ?? err);
  }

  return (
    <div>
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <TimeCard />
        </div>
        <div className="col-12 col-lg-8">
          {/* EventTable is a server component that queries Prisma */}
          <EventTable />
        </div>
      </div>

      {/* News section */}
      <div className="row g-4 mt-4">
        <div className="col-12">
          <h2 className="mb-3">Latest News</h2>
          <div className="news-card">
            {newsItems.length === 0 && <p className="text-muted">No news items yet.</p>}
            <div className="row gx-2 gy-2">
              {newsItems.map((it) => (
                <div className="col-12" key={it.id}>
                  <article className="card p-2" style={{ minHeight: 72 }}>
                    <div className="d-flex align-items-start">
                      <div style={{ width: 96, flex: '0 0 96px' }} className="me-2">
                        <img src={it.imageUrl || noImagePlaceholder} alt="thumbnail" className="img-fluid rounded" style={{ width: 96, height: 64, objectFit: 'cover' }} />
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="mb-1" style={{ fontSize: '0.95rem' }}>{it.title}</h6>
                          <span className="badge bg-primary text-white small ms-2">{it.source}</span>
                        </div>

                        <p className="mb-1 text-truncate" style={{ fontSize: '0.85rem' }}>{it.content}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <a href={it.link} target="_blank" rel="noopener noreferrer" className="small" style={{ backgroundColor: '#333', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem' }}>Read original</a>
                          <small className="text-muted small">{it.publishedAt ? new Date(it.publishedAt).toLocaleString('de-AT', { timeZone: 'Europe/Vienna' }) : ''}</small>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
