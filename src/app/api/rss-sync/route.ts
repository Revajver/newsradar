import { NextResponse } from 'next/server';
import { fetchFeeds } from '@/lib/rss';

export async function GET() {
  try {
    // Fetch new articles from RSS feeds and save to database
    const items = await fetchFeeds(undefined, 50);
    
    return NextResponse.json({ 
      success: true, 
      message: `Synced ${items.length} articles from RSS feeds` 
    });
  } catch (err) {
    console.error('RSS sync failed:', err);
    return NextResponse.json(
      { error: 'Failed to sync RSS feeds', details: (err as any)?.message ?? err },
      { status: 500 }
    );
  }
}
