import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(10, 'Nội dung đánh giá tối thiểu 10 ký tự').max(2000, 'Tối đa 2.000 ký tự'),
  serviceId: z.string().optional().nullable(),
  locale: z.string().default('vi'),
  images: z.array(z.string()).max(5, 'Tối đa 5 hình ảnh').optional().default([]),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get('serviceId');
    const ratingStr = searchParams.get('rating');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'APPROVED',
    };

    if (serviceId && serviceId !== 'all') {
      where.serviceId = serviceId;
    }

    if (ratingStr && ratingStr !== 'all') {
      const rating = parseInt(ratingStr, 10);
      if (!isNaN(rating)) {
        where.rating = rating;
      }
    }

    // Run queries in parallel
    const [reviews, totalCount, allApproved] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          service: {
            select: {
              id: true,
              slug: true,
              title: true,
              titleI18n: true,
            },
          },
          images: {
            select: {
              id: true,
              imageUrl: true,
            },
          },
        },
      }),
      prisma.review.count({ where }),
      prisma.review.findMany({
        where: serviceId && serviceId !== 'all' ? { status: 'APPROVED', serviceId } : { status: 'APPROVED' },
        select: { rating: true },
      }),
    ]);

    // Calculate rating distribution & average
    const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sumRating = 0;
    allApproved.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        starCounts[r.rating] = (starCounts[r.rating] || 0) + 1;
        sumRating += r.rating;
      }
    });

    const averageRating = allApproved.length > 0 ? Number((sumRating / allApproved.length).toFixed(1)) : 5.0;

    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      stats: {
        totalApproved: allApproved.length,
        averageRating,
        starCounts,
      },
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tải danh sách đánh giá', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập bằng Google để gửi đánh giá.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = reviewSchema.parse(body);

    // Find or ensure User in DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản người dùng không tồn tại trong hệ thống.' },
        { status: 404 }
      );
    }

    // Anti-spam check: Maximum 5 reviews per hour per user
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentReviewsCount = await prisma.review.count({
      where: {
        userId: user.id,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (recentReviewsCount >= 5) {
      return NextResponse.json(
        { success: false, message: 'Bạn đã gửi nhiều đánh giá gần đây. Vui lòng thử lại sau 1 giờ.' },
        { status: 429 }
      );
    }

    // Validate serviceId if provided
    let verifiedServiceId: string | null = null;
    if (validated.serviceId && validated.serviceId !== 'general') {
      const service = await prisma.service.findFirst({
        where: {
          OR: [{ id: validated.serviceId }, { slug: validated.serviceId }],
        },
      });
      if (service) {
        verifiedServiceId = service.id;
      }
    }

    // Create review with PENDING status
    const newReview = await prisma.review.create({
      data: {
        userId: user.id,
        serviceId: verifiedServiceId,
        rating: validated.rating,
        content: validated.content,
        locale: validated.locale,
        status: 'PENDING',
      },
    });

    // Upload and link images if any
    if (validated.images && validated.images.length > 0) {
      const uploadPromises = validated.images.slice(0, 5).map(async (base64Img) => {
        try {
          const { url, publicId } = await uploadImageToCloudinary(base64Img);
          return prisma.reviewImage.create({
            data: {
              reviewId: newReview.id,
              imageUrl: url,
              publicId,
            },
          });
        } catch (imgError) {
          console.error('Failed to upload image:', imgError);
          return null;
        }
      });

      await Promise.all(uploadPromises);
    }

    return NextResponse.json({
      success: true,
      message: 'Đánh giá của bạn đã được gửi thành công và đang chờ ban quản trị kiểm duyệt.',
      reviewId: newReview.id,
    });
  } catch (error: any) {
    console.error('Error creating review:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message || 'Dữ liệu không hợp lệ.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
