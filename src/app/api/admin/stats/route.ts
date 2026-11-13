import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await requireAdmin();

    const [
      totalServices,
      activeServices,
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
      totalCustomers,
      recentReviews,
      allApprovedRatings,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.review.count(),
      prisma.review.count({ where: { status: 'PENDING' } }),
      prisma.review.count({ where: { status: 'APPROVED' } }),
      prisma.review.count({ where: { status: 'REJECTED' } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true, image: true } },
          service: { select: { title: true } },
        },
      }),
      prisma.review.findMany({
        where: { status: 'APPROVED' },
        select: { rating: true },
      }),
    ]);

    const sumRating = allApprovedRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating =
      allApprovedRatings.length > 0 ? Number((sumRating / allApprovedRatings.length).toFixed(1)) : 5.0;

    const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allApprovedRatings.forEach((r) => {
      starCounts[r.rating] = (starCounts[r.rating] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalServices,
        activeServices,
        totalReviews,
        pendingReviews,
        approvedReviews,
        rejectedReviews,
        averageRating,
        totalCustomers,
        starCounts,
        recentReviews,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Unauthorized or server error' },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}
