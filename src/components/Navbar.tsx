import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} aria-label="Main navigation">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: '1.5rem', color: '#0066cc' }}>newsradar</Link>
        <div className="d-flex gap-3">
          <Link href="/" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>Home</Link>
          <Link href="/vienna-events" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>Events</Link>
          <Link href="/news" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>News</Link>
          <Link href="/about" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>About</Link>
        </div>
      </div>
    </nav>
  );
}
