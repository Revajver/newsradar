import EventTable from '@/components/EventTable';

export const metadata = {
  title: 'Events - newsradar',
};

export default function EventsPage() {
  return (
    <div>
      <h1 className="mb-4">Events</h1>
      <EventTable />
    </div>
  );
}
