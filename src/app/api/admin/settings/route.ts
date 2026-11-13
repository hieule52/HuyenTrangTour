import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const settingSchema = z.object({
  brandName: z.string().min(1),
  hotline1: z.string().min(1),
  hotline2: z.string().optional().default(''),
  email: z.string().email(),
  address: z.string().min(1),
  zaloUrl: z.string().optional().default(''),
  messengerUrl: z.string().optional().default(''),
  whatsappUrl: z.string().optional().default(''),
});

export async function GET() {
  try {
    await requireAdmin();

    let setting = await prisma.systemSetting.findUnique({
      where: { id: 'default' },
    });

    if (!setting) {
      setting = await prisma.systemSetting.create({
        data: {
          id: 'default',
          brandName: 'HUYỀN TRANG TOUR',
          hotline1: '0364 483 597',
          hotline2: '0935 637 431',
          email: 'Lehuutienquoc97@gmail.com',
          address: '147 Phùng Quán, thành phố Huế',
          zaloUrl: 'https://zalo.me/0364483597',
          messengerUrl: 'https://m.me/huyentrangtour',
          whatsappUrl: 'https://wa.me/84364483597',
        },
      });
    }

    return NextResponse.json({ success: true, setting });
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
    const validated = settingSchema.parse(body);

    const updated = await prisma.systemSetting.upsert({
      where: { id: 'default' },
      update: validated,
      create: {
        id: 'default',
        ...validated,
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message?.includes('UNAUTHORIZED') ? 403 : 500 }
    );
  }
}
