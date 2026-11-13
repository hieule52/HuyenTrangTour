import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const serviceSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2, 'Slug tối thiểu 2 ký tự'),
  title: z.string().min(2, 'Tiêu đề bắt buộc'),
  description: z.string().optional().default(''),
  departure: z.string().optional(),
  destination: z.string().optional(),
  priceVnd: z.number().int().nonnegative(),
  priceUsd: z.number().int().nonnegative(),
  price4SeatsVnd: z.number().int().nonnegative().optional().nullable(),
  price4SeatsUsd: z.number().int().nonnegative().optional().nullable(),
  price7SeatsVnd: z.number().int().nonnegative().optional().nullable(),
  price7SeatsUsd: z.number().int().nonnegative().optional().nullable(),
  image: z.string().min(1, 'Hình ảnh bắt buộc'),
  category: z.string().default('inter-city'),
  vehicle: z.string().default('Xe 4 chỗ & 7 chỗ'),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  titleI18n: z.any().optional(),
  descI18n: z.any().optional(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const validated = serviceSchema.parse(body);

    const existing = await prisma.service.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: `Slug '${validated.slug}' đã tồn tại.` },
        { status: 400 }
      );
    }

    const created = await prisma.service.create({
      data: validated,
    });

    return NextResponse.json({ success: true, service: created });
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
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID dịch vụ bắt buộc' }, { status: 400 });
    }

    const updated = await prisma.service.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, service: updated });
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

    // Safe delete: reviews referencing service have onDelete: SetNull in Prisma schema
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Đã xóa dịch vụ thành công.' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}
