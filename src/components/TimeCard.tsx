"use client";
import { useEffect, useState } from 'react';

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-AT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Vienna',
  }).format(date);
}

export default function TimeCard() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatted = formatTime(now);

  return (
    <div className="card shadow-sm" role="region" aria-label="Current time">
      <div className="card-body">
        <h5 className="card-title">Current Austria Time</h5>
        <p className="display-6" aria-live="polite">{formatted}</p>
        <p className="text-muted">Timezone: Europe/Vienna</p>
      </div>
    </div>
  );
}
