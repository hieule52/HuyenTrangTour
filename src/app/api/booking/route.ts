import { NextResponse } from 'next/server';
import { sendBookingEmail, BookingEmailData } from '@/lib/email';
import { BookingFormSchema } from '@/lib/validation';

// Rate limiting: in-memory store
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5; // Tối đa 5 lần gửi / 10 phút / IP
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    // 1. Check IP rate limit
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const now = Date.now();
    const clientData = rateLimitMap.get(ip);

    if (clientData) {
      if (now < clientData.resetAt) {
        if (clientData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            {
              error:
                'Bạn đã gửi quá số lần yêu cầu cho phép. Vui lòng liên hệ trực tiếp hotline 0364 483 597.',
            },
            { status: 429 }
          );
        }
        clientData.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    }

    // 2. Parse & Validate Body
    const body = await request.json();

    // Chuyển passengers sang number nếu gửi dạng string
    if (typeof body.passengers === 'string') {
      body.passengers = parseInt(body.passengers, 10);
    }

    const parseResult = BookingFormSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || 'Dữ liệu không hợp lệ';
      return NextResponse.json(
        { error: firstError, details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 3. Send Email
    const emailData: BookingEmailData = {
      customerName: validData.customerName,
      phone: validData.phone,
      email: validData.email || '',
      language: validData.language,
      pickupPoint: validData.pickupPoint,
      destination: validData.destination,
      date: validData.date,
      time: validData.time,
      passengers: validData.passengers,
      route: validData.route || `${validData.pickupPoint} → ${validData.destination}`,
      notes: validData.notes,
    };

    // Gửi email nếu đã cung cấp Mật khẩu ứng dụng Gmail (App Password)
    const hasValidCredentials =
      Boolean(process.env.MAIL_PASSWORD) &&
      Boolean(process.env.MAIL_USER) &&
      !process.env.MAIL_PASSWORD?.includes('YOUR_');

    if (hasValidCredentials) {
      await sendBookingEmail(emailData);
    } else {
      console.log('⚠️ [DEV MODE] Email chưa gửi thực tế vì chưa điền MAIL_PASSWORD vào .env.local:');
      console.log(JSON.stringify(emailData, null, 2));
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Yêu cầu đặt xe của bạn đã được gửi thành công! Đội ngũ HUYỀN TRANG TOUR sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error handling booking request:', error);
    return NextResponse.json(
      {
        error:
          'Không thể gửi yêu cầu vào lúc này. Vui lòng liên hệ trực tiếp qua số điện thoại 0364 483 597 hoặc Zalo.',
      },
      { status: 500 }
    );
  }
}

