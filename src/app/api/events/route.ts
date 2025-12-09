import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const items = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;
    if (!title || !content) return NextResponse.json({ error: 'title and content required' }, { status: 400 });

    const created = await prisma.article.create({ data: { title, content } });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'create failed' }, { status: 500 });
  }
}
