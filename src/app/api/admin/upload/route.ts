import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    // 1. Require Admin authentication
    await requireAdmin();

    const contentType = req.headers.get('content-type') || '';

    // A. Handle multipart/form-data (File uploaded directly from PC or phone)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: 'Không tìm thấy file tải lên.' },
          { status: 400 }
        );
      }

      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, message: 'Chỉ chấp nhận file hình ảnh (JPG, PNG, WEBP).' },
          { status: 400 }
        );
      }

      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: 'Dung lượng ảnh tối đa 10MB.' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Check if Cloudinary is configured
      if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ) {
        const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;
        const { url } = await uploadImageToCloudinary(base64Data, 'huyentrangtour/services');
        return NextResponse.json({ success: true, url });
      }

      // Fallback: Save to public/uploads/services/
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
      await fs.mkdir(uploadDir, { recursive: true });

      const ext = path.extname(file.name) || '.jpg';
      const cleanName = path
        .basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .substring(0, 30) || 'service';
      const filename = `${Date.now()}-${cleanName}${ext}`;
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/services/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl });
    }

    // B. Handle JSON base64
    if (contentType.includes('application/json')) {
      const { image } = await req.json();
      if (!image) {
        return NextResponse.json(
          { success: false, message: 'Dữ liệu ảnh không hợp lệ.' },
          { status: 400 }
        );
      }

      if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ) {
        const { url } = await uploadImageToCloudinary(image, 'huyentrangtour/services');
        return NextResponse.json({ success: true, url });
      }

      // If base64 data URL, save locally
      if (image.startsWith('data:image/')) {
        const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (matches) {
          const ext = `.${matches[1] === 'jpeg' ? 'jpg' : matches[1]}`;
          const buffer = Buffer.from(matches[2], 'base64');
          const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'services');
          await fs.mkdir(uploadDir, { recursive: true });

          const filename = `${Date.now()}-img${ext}`;
          await fs.writeFile(path.join(uploadDir, filename), buffer);

          return NextResponse.json({ success: true, url: `/uploads/services/${filename}` });
        }
      }

      return NextResponse.json({ success: true, url: image });
    }

    return NextResponse.json(
      { success: false, message: 'Định dạng yêu cầu không hỗ trợ.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in /api/admin/upload:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi khi tải ảnh lên.' },
      { status: 500 }
    );
  }
}

