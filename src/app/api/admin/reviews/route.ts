import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const ratingStr = searchParams.get('rating');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (ratingStr && ratingStr !== 'ALL') {
      const r = parseInt(ratingStr, 10);
      if (!isNaN(r)) where.rating = r;
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        service: { select: { id: true, title: true, slug: true } },
        images: { select: { id: true, imageUrl: true } },
      },
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Dữ liệu trạng thái không hợp lệ' }, { status: 400 });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID bắt buộc' }, { status: 400 });
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Đã xóa đánh giá thành công.' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}

