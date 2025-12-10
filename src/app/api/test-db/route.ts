import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Count articles
    const count = await prisma.article.count();
    
    // Get recent articles
    const recentArticles = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        source: true,
        publishedAt: true,
        sourceUrl: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      articlesCount: count,
      recentArticles: recentArticles,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: (error as any)?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
