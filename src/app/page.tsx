import TimeCard from '@/components/TimeCard';
import EventTable from '@/components/EventTable';
import { fetchFeeds } from '@/lib/rss';
import { noImagePlaceholder } from '@/lib/placeholders';

export default async function Home() {
  const newsItems = await fetchFeeds(undefined, 10);

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
              {newsItems.map((it, idx) => (
                <div className="col-12" key={idx}>
                  <article className="card p-2" style={{ minHeight: 72 }}>
                    <div className="d-flex align-items-start">
                      <div style={{ width: 96, flex: '0 0 96px' }} className="me-2">
                        <img src={it.image || noImagePlaceholder} alt="thumbnail" className="img-fluid rounded" style={{ width: 96, height: 64, objectFit: 'cover' }} />
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="mb-1" style={{ fontSize: '0.95rem' }}>{it.title}</h6>
                          <span className="badge bg-primary text-white small ms-2">{it.source}</span>
                        </div>

                        <p className="mb-1 text-truncate" style={{ fontSize: '0.85rem' }}>{it.contentSnippet}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <a href={it.link} target="_blank" rel="noopener noreferrer" className="small" style={{ backgroundColor: '#333', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem' }}>Read original</a>
                          <small className="text-muted small">{it.isoDate ? new Date(it.isoDate).toLocaleString('de-AT', { timeZone: 'Europe/Vienna' }) : ''}</small>
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
