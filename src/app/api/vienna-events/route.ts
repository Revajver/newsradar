import { NextResponse } from 'next/server';
import { fetchViennaEvents } from '@/lib/vienna-events';

export async function GET() {
  try {
    const events = await fetchViennaEvents(50);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch Vienna events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
