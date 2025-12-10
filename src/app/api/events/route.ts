import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const items = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, sourceUrl, source, link, imageUrl, publishedAt } = body;
    if (!title || !content || !sourceUrl || !source || !link) {
      return NextResponse.json({ error: 'title, content, sourceUrl, source, and link are required' }, { status: 400 });
    }

    const created = await prisma.article.create({ 
      data: { 
        title, 
        content, 
        sourceUrl,
        source,
        link,
        imageUrl,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date()
      } 
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'create failed' }, { status: 500 });
  }
}
