import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  process.env.MAIL_HOST && process.env.MAIL_HOST !== 'smtp.gmail.com'
    ? {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '465', 10),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      }
    : {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER || 'Lehuutienquoc97@gmail.com',
          pass: process.env.MAIL_PASSWORD,
        },
      }
);

export interface BookingEmailData {
  customerName: string;
  phone: string;
  email: string;
  language: string;
  pickupPoint: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  route: string;
  notes?: string;
}

export async function sendBookingEmail(data: BookingEmailData): Promise<void> {
  const submittedAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1E3A5F, #0F2035); color: white; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.8; }
    .content { padding: 24px 32px; }
    .section-title { font-size: 15px; font-weight: 700; color: #1E3A5F; border-left: 4px solid #D4AF37; padding-left: 12px; margin: 20px 0 12px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-size: 13px; color: #666; min-width: 160px; }
    .info-value { font-size: 13px; color: #333; font-weight: 500; flex: 1; }
    .highlight { background: #FFF9E6; border: 1px solid #D4AF37; border-radius: 6px; padding: 12px 16px; margin: 16px 0; }
    .highlight .route { font-size: 16px; font-weight: 700; color: #1E3A5F; }
    .footer { background: #f9f9f9; padding: 16px 32px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
    .gold { color: #D4AF37; font-weight: 700; }
    .note-box { background: #f0f7ff; border-radius: 6px; padding: 12px; font-size: 13px; color: #333; margin: 8px 0; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>🚗 HUYỀN TRANG TOUR</h1>
    <p>Yêu cầu đặt xe mới từ website</p>
  </div>
  <div class="content">
    <div class="highlight">
      <div class="route">📍 Tuyến: ${data.route || `${data.pickupPoint} → ${data.destination}`}</div>
    </div>

    <div class="section-title">Thông tin khách hàng</div>
    <div class="info-row"><span class="info-label">Họ và tên</span><span class="info-value">${data.customerName}</span></div>
    <div class="info-row"><span class="info-label">Điện thoại / WhatsApp</span><span class="info-value"><strong class="gold">${data.phone}</strong></span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${data.email || 'Không có'}</span></div>
    <div class="info-row"><span class="info-label">Ngôn ngữ liên lạc</span><span class="info-value">${data.language}</span></div>

    <div class="section-title">Chi tiết hành trình</div>
    <div class="info-row"><span class="info-label">Điểm đón</span><span class="info-value">${data.pickupPoint}</span></div>
    <div class="info-row"><span class="info-label">Điểm đến</span><span class="info-value">${data.destination}</span></div>
    <div class="info-row"><span class="info-label">Ngày đón</span><span class="info-value"><strong>${data.date}</strong></span></div>
    <div class="info-row"><span class="info-label">Giờ đón</span><span class="info-value"><strong>${data.time}</strong></span></div>
    <div class="info-row"><span class="info-label">Số hành khách</span><span class="info-value">${data.passengers} người</span></div>

    ${data.notes ? `
    <div class="section-title">Ghi chú thêm</div>
    <div class="note-box">${data.notes}</div>
    ` : ''}

    <div class="section-title">Thông tin gửi yêu cầu</div>
    <div class="info-row"><span class="info-label">Thời gian gửi</span><span class="info-value">${submittedAt}</span></div>
  </div>
  <div class="footer">
    <p>⚠️ Đây là yêu cầu đặt xe, chưa phải xác nhận. Vui lòng liên hệ lại khách hàng để xác nhận.</p>
    <p>© 2026 HUYỀN TRANG TOUR | Hotline: <strong>0364 483 597</strong></p>
  </div>
</div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Website HUYỀN TRANG TOUR" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || 'Lehuutienquoc97@gmail.com',
    subject: `[HUYỀN TRANG TOUR] Yêu cầu đặt xe mới – ${data.customerName}`,
    html: htmlContent,
    replyTo: data.email || undefined,
  });
}
