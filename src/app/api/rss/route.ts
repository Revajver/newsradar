import { NextResponse } from 'next/server';
import { fetchFeeds } from '@/lib/rss';

export async function GET() {
  try {
    const items = await fetchFeeds();
    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error('RSS API error', err);
    return NextResponse.json({ success: false, error: 'failed' }, { status: 500 });
  }
}
