'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinkStyle = (path: string) => ({
    color: isActive(path) ? '#fff' : '#333', 
    fontWeight: '500' as const,
    backgroundColor: isActive(path) ? '#333' : 'transparent',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    display: 'block'
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} aria-label="Main navigation">
      <div className="container-fluid px-3">
        <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: '1.5rem', color: '#0066cc' }}>newsradar</Link>
        
        <button 
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav ms-auto gap-2">
            <Link 
              href="/" 
              className="nav-link" 
              style={navLinkStyle('/')}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/vienna-events" 
              className="nav-link" 
              style={navLinkStyle('/vienna-events')}
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/news" 
              className="nav-link" 
              style={navLinkStyle('/news')}
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link 
              href="/about" 
              className="nav-link" 
              style={navLinkStyle('/about')}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
