import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/gallery - Lấy danh sách ảnh gallery
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const images = await prisma.galleryImage.findMany({
      where: category && category !== 'all' ? { category } : undefined,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/admin/gallery - Thêm ảnh mới
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { src, title, subtitle, category, sortOrder, isPublic, publicId } = body;

    if (!src || !title) {
      return NextResponse.json({ error: 'src và title là bắt buộc' }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        src,
        title,
        subtitle: subtitle || null,
        category: category || 'general',
        sortOrder: sortOrder ?? 0,
        isPublic: isPublic ?? true,
        publicId: publicId || null,
      },
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/admin/gallery - Cập nhật ảnh
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, src, title, subtitle, category, sortOrder, isPublic } = body;

    if (!id) {
      return NextResponse.json({ error: 'id là bắt buộc' }, { status: 400 });
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data: {
        ...(src !== undefined && { src }),
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(category !== undefined && { category }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isPublic !== undefined && { isPublic }),
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Gallery PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/admin/gallery - Xóa ảnh
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id là bắt buộc' }, { status: 400 });
    }

    await prisma.galleryImage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery DELETE error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

