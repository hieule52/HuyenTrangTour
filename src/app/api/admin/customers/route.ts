import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await requireAdmin();

    const customers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        _count: {
          select: { reviews: true },
        },
        reviews: {
          select: { rating: true },
        },
      },
    });

    const formatted = customers.map((c) => {
      const totalReviews = c._count.reviews;
      const sumRatings = c.reviews.reduce((acc, r) => acc + r.rating, 0);
      const avgRating = totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : '-';

      return {
        id: c.id,
        name: c.name || 'Khách vãng lai',
        email: c.email,
        image: c.image,
        role: c.role,
        createdAt: c.createdAt,
        totalReviews,
        avgRating,
      };
    });

    return NextResponse.json({ success: true, customers: formatted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}

