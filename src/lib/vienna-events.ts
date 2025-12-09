// Vienna Events Aggregator
// Fetches events from various Vienna-based sources

export interface ViennaEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  category?: string;
  url?: string;
  image?: string;
  source: string;
}

// Sample Vienna events data - in production, this would come from real APIs
const SAMPLE_VIENNA_EVENTS: ViennaEvent[] = [
  {
    id: 'wien-1',
    title: 'Christkindlmarkt at Schönbrunn',
    description: 'Vienna\'s most beautiful Christmas market at the imperial palace',
    date: '2025-12-09',
    time: '10:00 - 22:00',
    location: 'Schönbrunn Palace, Vienna',
    category: 'Markets',
    url: 'https://www.christkindlmarkt.at/',
    source: 'Vienna Tourist Board',
  },
  {
    id: 'wien-2',
    title: 'Vienna State Opera: La Traviata',
    description: 'Verdi\'s masterpiece performed by the Vienna State Opera',
    date: '2025-12-10',
    time: '19:00',
    location: 'Vienna State Opera House, Opernring 2',
    category: 'Opera',
    url: 'https://www.wiener-staatsoper.at/',
    source: 'Vienna State Opera',
  },
  {
    id: 'wien-3',
    title: 'Musikverein New Year\'s Concert',
    description: 'The famous New Year\'s Concert at Vienna\'s Golden Hall',
    date: '2026-01-01',
    time: '11:00',
    location: 'Musikverein, Karlsplatz 6',
    category: 'Concert',
    url: 'https://www.musikverein.at/',
    source: 'Musikverein',
  },
  {
    id: 'wien-4',
    title: 'Kunsthistorisches Museum Exhibition',
    description: 'Ancient Egypt: Treasures & Mysteries - Special Exhibition',
    date: '2025-12-09',
    time: '10:00 - 18:00',
    location: 'Kunsthistorisches Museum, Maria-Theresien-Platz',
    category: 'Exhibition',
    url: 'https://www.khm.at/',
    source: 'KHM',
  },
  {
    id: 'wien-5',
    title: 'Stephansdom Christmas Concert',
    description: 'Traditional Christmas music in St. Stephen\'s Cathedral',
    date: '2025-12-15',
    time: '18:00',
    location: 'St. Stephen\'s Cathedral, Stephansplatz',
    category: 'Concert',
    url: 'https://www.stephanskirche.at/',
    source: 'Stephansdom',
  },
  {
    id: 'wien-6',
    title: 'Belvedere Palace Winter Exhibition',
    description: 'Egon Schiele and Contemporaries - Winter Collection',
    date: '2025-12-09',
    time: '10:00 - 18:00',
    location: 'Belvedere Palace, Prinz-Eugen-Straße 27',
    category: 'Exhibition',
    url: 'https://www.belvedere.at/',
    source: 'Belvedere',
  },
  {
    id: 'wien-7',
    title: 'Vienna Christmas Market at City Hall',
    description: 'Traditional Christmas market with food, crafts, and entertainment',
    date: '2025-12-09',
    time: '11:00 - 22:00',
    location: 'Vienna City Hall Square, Ringstrasse',
    category: 'Markets',
    url: 'https://www.rathaus.wien.gv.at/',
    source: 'City of Vienna',
  },
  {
    id: 'wien-8',
    title: 'Hofburg New Year\'s Ball',
    description: 'Elegant New Year\'s Ball at the Imperial Palace',
    date: '2025-12-31',
    time: '21:00',
    location: 'Hofburg Palace, Michaelerplatz',
    category: 'Ball',
    url: 'https://www.hofburg.at/',
    source: 'Hofburg',
  },
  {
    id: 'wien-9',
    title: 'Vienna Philharmonic Winter Concert',
    description: 'Symphony No. 9 by Beethoven - Vienna Philharmonic',
    date: '2025-12-20',
    time: '19:30',
    location: 'Musikverein, Karlsplatz 6',
    category: 'Concert',
    url: 'https://www.wienerphilharmoniker.at/',
    source: 'Vienna Philharmonic',
  },
  {
    id: 'wien-10',
    title: 'Leopold Museum Contemporary Art',
    description: 'Modern & Contemporary Austrian Art Collection',
    date: '2025-12-09',
    time: '10:00 - 19:00',
    location: 'Leopold Museum, MuseumsQuartier',
    category: 'Exhibition',
    url: 'https://www.leopoldmuseum.at/',
    source: 'Leopold Museum',
  },
  {
    id: 'wien-11',
    title: 'Naschmarkt Holiday Shopping',
    description: 'Vienna\'s most famous market - holiday special food and gifts',
    date: '2025-12-09',
    time: '08:00 - 22:00',
    location: 'Naschmarkt, Wienzeile',
    category: 'Markets',
    url: 'https://www.naschmarkt.at/',
    source: 'Naschmarkt',
  },
  {
    id: 'wien-12',
    title: 'Burgtheater Performance: Hamlet',
    description: 'Shakespeare\'s Hamlet by the Burgtheater',
    date: '2025-12-18',
    time: '19:00',
    location: 'Burgtheater, Universitätsring 2',
    category: 'Theater',
    url: 'https://www.burgtheater.at/',
    source: 'Burgtheater',
  },
];

let eventCache: { events: ViennaEvent[]; expiresAt: number } | null = null;

export async function fetchViennaEvents(maxItems = 50): Promise<ViennaEvent[]> {
  const now = Date.now();
  
  // Cache for 30 minutes
  if (eventCache && eventCache.expiresAt > now) {
    return eventCache.events.slice(0, maxItems);
  }

  // In production, fetch from real APIs:
  // - TicketMaster API
  // - Songkick API
  // - Vienna.at API
  // - EventBrite API
  // For now, return sample data
  
  const events = SAMPLE_VIENNA_EVENTS;
  
  eventCache = {
    events,
    expiresAt: now + 1000 * 60 * 30, // Cache for 30 minutes
  };

  return events.slice(0, maxItems);
}

export default { fetchViennaEvents };
