import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/gallery - Public endpoint cho thư viện khoảnh khắc
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

    const images = await prisma.galleryImage.findMany({
      where: {
        isPublic: true,
        ...(category && category !== 'all' ? { category } : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      ...(limit ? { take: limit } : {}),
      select: {
        id: true,
        src: true,
        title: true,
        subtitle: true,
        category: true,
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Public Gallery API error:', error);
    return NextResponse.json({ error: 'Server error', images: [] }, { status: 500 });
  }
}
