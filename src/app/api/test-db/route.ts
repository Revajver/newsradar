import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // simple test: count articles
    const count = await prisma.article.count();

    return NextResponse.json({
      success: true,
      message: 'Prisma/SQLite connection successful',
      articlesCount: count,
    });
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    );
  }
}
