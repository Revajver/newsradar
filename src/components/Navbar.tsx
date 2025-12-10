'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} aria-label="Main navigation">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: '1.5rem', color: '#0066cc' }}>newsradar</Link>
        <div className="d-flex gap-3">
          <Link 
            href="/" 
            className="nav-link" 
            style={{ 
              color: isActive('/') ? '#fff' : '#333', 
              fontWeight: '500',
              backgroundColor: isActive('/') ? '#333' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            Home
          </Link>
          <Link 
            href="/vienna-events" 
            className="nav-link" 
            style={{ 
              color: isActive('/vienna-events') ? '#fff' : '#333', 
              fontWeight: '500',
              backgroundColor: isActive('/vienna-events') ? '#333' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            Events
          </Link>
          <Link 
            href="/news" 
            className="nav-link" 
            style={{ 
              color: isActive('/news') ? '#fff' : '#333', 
              fontWeight: '500',
              backgroundColor: isActive('/news') ? '#333' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            News
          </Link>
          <Link 
            href="/about" 
            className="nav-link" 
            style={{ 
              color: isActive('/about') ? '#fff' : '#333', 
              fontWeight: '500',
              backgroundColor: isActive('/about') ? '#333' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
