import { fetchViennaEvents } from '@/lib/vienna-events';

export const metadata = {
  title: 'Vienna Events - newsradar',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ViennaEventsPage() {
  const events = await fetchViennaEvents();

  return (
    <div className="container my-5">
      <h1 className="mb-4">Vienna Events</h1>
      <p className="text-muted mb-4">Discover what's happening in Vienna</p>

      {events.length === 0 && (
        <p className="text-muted">No events found.</p>
      )}

      <div className="row g-4">
        {events.map((event) => (
          <div key={event.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              {event.image && (
                <img src={event.image} className="card-img-top" alt={event.title} style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body d-flex flex-column">
                <span className="badge bg-info text-dark mb-2" style={{ width: 'fit-content' }}>{event.category || 'Event'}</span>
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted small">{event.description}</p>

                <div className="mt-auto">
                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString('de-AT', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </small>
                  </div>
                  {event.time && (
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>⏰ Time:</strong> {event.time}
                      </small>
                    </div>
                  )}
                  {event.location && (
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>📍 Location:</strong> {event.location}
                      </small>
                    </div>
                  )}
                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Source:</strong> {event.source}
                    </small>
                  </div>

                  {event.url && (
                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                      More Info
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
