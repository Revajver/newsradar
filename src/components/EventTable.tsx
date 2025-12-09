import Link from 'next/link';
import { fetchViennaEvents } from '@/lib/vienna-events';

export default async function EventTable() {
  const allEvents = await fetchViennaEvents(50);
  const displayedEvents = allEvents.slice(0, 5);
  const hasMore = allEvents.length > 5;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Upcoming Vienna Events</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <caption className="visually-hidden">List of upcoming Vienna events</caption>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {displayedEvents.map((e) => (
                <tr key={e.id}>
                  <td className="fw-500">{e.title}</td>
                  <td>{new Date(e.date).toLocaleDateString('de-AT', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                  <td>{e.location ? e.location.split(',')[0] : 'TBA'}</td>
                  <td><span className="badge bg-info text-dark">{e.category || 'Event'}</span></td>
                </tr>
              ))}
              {displayedEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {hasMore && (
          <div className="text-center pt-3">
            <Link href="/vienna-events" className="btn btn-primary btn-sm">
              Show More Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
