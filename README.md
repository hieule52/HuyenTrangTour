# HUYỀN TRANG TOUR – Premium Private Car Service

Website chính thức của thương hiệu **HUYỀN TRANG TOUR**, chuyên cung cấp dịch vụ xe đưa đón du lịch riêng tư cao cấp bằng xe điện 7 chỗ **VinFast Limo Green** tại Huế, Đà Nẵng, Hội An, Phong Nha, Quảng Trị và các tuyến du lịch trọng điểm miền Trung.

Designed & Developed by **DH TECH** – [https://dhtech.io.vn](https://dhtech.io.vn)

---

## 🌟 Tính Năng Nổi Bật

- **Giao diện đẳng cấp & hiện đại**: Tông màu Xanh Navy `#1E3A5F` chủ đạo, Vàng Champagne `#D4AF37` nhấn và Xanh Eco `#16A34A` biểu trưng cho xe điện.
- **Hero Section ấn tượng**: Hình ảnh thực tế xe VinFast Limo Green đón khách tại Resort, hiệu ứng chuyển động mượt mà, điểm nhấn dịch vụ rõ nét.
- **Bảng giá minh bạch 13 tuyến xe**: Hiển thị song ngữ tiền tệ (VNĐ và USD) theo danh mục:
  - Huế City Tour (3, 4, 5 điểm)
  - Đưa đón liên tỉnh (Huế – Đà Nẵng, Hội An, Phong Nha Kẻ Bàng)
  - Đưa đón sân bay Phú Bài
  - Tour lịch sử & đặc biệt (Quảng Trị, Khe Sanh)
- **Thư viện hình ảnh thực tế**: 100% hình ảnh xe VinFast và khách hàng thực tế kèm hiệu ứng Lightbox xem ảnh kích thước lớn.
- **Biểu mẫu đặt xe thông minh**: Tự động điền lộ trình từ các thẻ tuyến xe, xác thực dữ liệu chặt chẽ bằng Zod, giới hạn tần suất gửi chống spam.
- **Gửi Email tự động qua Gmail SMTP**: Tích hợp Nodemailer chuyển tiếp trực tiếp thông tin đặt xe về hòm thư `Lehuutienquoc97@gmail.com`.
- **Hỗ trợ 6 ngôn ngữ (next-intl)**:
  - 🇻🇳 Tiếng Việt (`vi`) – Mặc định
  - 🇬🇧 Tiếng Anh (`en`)
  - 🇫🇷 Tiếng Pháp (`fr`)
  - 🇨🇳 Tiếng Trung Giản Thể (`zh`)
  - 🇰🇷 Tiếng Hàn (`ko`)
  - 🇯🇵 Tiếng Nhật (`ja`)
- **Thanh liên hệ Mobile First**: Cố định phía dưới màn hình trên điện thoại với 4 nút thao tác nhanh: Gọi điện – Zalo – Messenger – Đặt xe.
- **Chuẩn SEO Quốc Tế**: Tích hợp Schema.org `LocalBusiness`, OpenGraph, Twitter Card, sitemap.xml, robots.txt, tối ưu Core Web Vitals.

---

## 🚀 Công Nghệ Sử Dụng

- **Framework**: Next.js 15+ (App Router, Server & Client Components)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS với Design Tokens tùy chỉnh
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Form & Validation**: React Hook Form + Zod
- **Email Service**: Nodemailer + Gmail SMTP
- **Đa ngôn ngữ**: next-intl
- **Lightbox**: yet-another-react-lightbox

---

## 📁 Cấu Trúc Thư Mục

```
c:\DuAn\HuyenTrangTour/
├── public/
│   ├── images/
│   │   ├── logoHT.png              # Logo thương hiệu
│   │   ├── favicon.png             # Favicon
│   │   ├── icons/                  # Icon liên hệ (Call, Zalo, WhatsApp, Map, Messenger)
│   │   ├── sefiWithKhach.jpg       # Ảnh chụp thực tế cùng du khách
│   │   ├── XeDuaDonResort.jpg      # Xe đón tại Resort
│   │   ├── XeDuaDonLangTam.jpg     # Xe tại Lăng Tẩm Huế
│   │   ├── xeDuaDonTaiKhachSan.jpg # Xe đón tại Khách sạn
│   │   └── [13 ảnh các tuyến đường]
├── src/
│   ├── app/
│   │   ├── [locale]/               # Các trang theo từng ngôn ngữ
│   │   │   ├── page.tsx            # Trang chủ
│   │   │   ├── about/page.tsx      # Trang Giới thiệu
│   │   │   ├── services/page.tsx   # Trang Dịch vụ
│   │   │   ├── pricing/page.tsx    # Trang Bảng giá (13 tuyến)
│   │   │   ├── gallery/page.tsx    # Trang Thư viện ảnh
│   │   │   ├── contact/page.tsx    # Trang Liên hệ & Form đặt xe
│   │   │   └── layout.tsx          # Layout đa ngôn ngữ + Metadata + Schema
│   │   ├── api/
│   │   │   └── booking/route.ts    # API xử lý form đặt xe & gửi email
│   │   ├── globals.css             # Design Tokens & Custom CSS
│   │   ├── sitemap.ts              # Sitemap tự động
│   │   └── robots.ts               # Robots.txt
│   ├── components/
│   │   ├── layout/                 # Header, Footer, MobileContactBar
│   │   ├── home/                   # HeroSection, QuickBooking, Intro, FeaturedRoutes, WhyChooseUs, GalleryPreview, BookingSteps, CtaSection
│   │   ├── booking/                # BookingForm
│   │   └── ui/                     # SectionHeader, Button...
│   ├── data/
│   │   ├── routes.ts               # Dữ liệu chính xác 13 tuyến xe
│   │   └── navigation.ts           # Cấu trúc menu điều hướng
│   ├── i18n/                       # Cấu hình routing & request của next-intl
│   ├── lib/
│   │   ├── email.ts                # Nodemailer logic & HTML email template
│   │   ├── validation.ts           # Zod schema biểu mẫu đặt xe
│   │   └── utils.ts                # Format VND, USD, tailwind merge
│   └── messages/                   # File dịch thuật 6 ngôn ngữ
│       ├── vi.json
│       ├── en.json
│       ├── fr.json
│       ├── zh.json
│       ├── ko.json
│       └── ja.json
```

---

## ⚙️ Cài Đặt & Phát Triển

### 1. Cài đặt các gói phụ thuộc
```bash
npm install --legacy-peer-deps
```

### 2. Cấu hình biến môi trường
Tạo file `.env.local` từ mẫu `.env.example`:
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=Lehuutienquoc97@gmail.com
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD_HERE
MAIL_TO=Lehuutienquoc97@gmail.com
NEXT_PUBLIC_SITE_URL=https://huyentrangtour.com
```

> **Cách lấy Mật khẩu ứng dụng Gmail (Gmail App Password):**
> 1. Truy cập tài khoản Google của bạn -> Bảo mật (Security).
> 2. Bật Xác minh 2 bước (2-Step Verification).
> 3. Tìm mục **Mật khẩu ứng dụng** (App passwords), tạo mật khẩu mới cho "Thư" (Mail) và dán 16 ký tự vào `MAIL_PASSWORD`.

### 3. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

### 4. Build sản phẩm (Production)
```bash
npm run build
npm run start
```

---

## 🚢 Triển Khai Lên Vercel

1. Đẩy mã nguồn lên kho lưu trữ GitHub / GitLab.
2. Đăng nhập vào [Vercel](https://vercel.com) và chọn **Add New Project**.
3. Import repository `HuyenTrangTour`.
4. Tại mục **Environment Variables**, thêm đầy đủ các biến từ `.env.example` (`MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_TO`).
5. Bấm **Deploy**. Vercel sẽ tự động tối ưu hóa và xuất bản trang web với tên miền SSL an toàn.

---

## 📞 Thông Tin Liên Hệ HUYỀN TRANG TOUR

- **Hotline 1**: 0364 483 597
- **Hotline 2**: 0935 637 431
- **Zalo**: 0364 483 597 (zalo.me/0364483597)
- **WhatsApp**: +84 364 483 597 (wa.me/84364483597)
- **Messenger**: [Quốc Tiến (Huyền Trang Tour)](https://www.facebook.com/quoc.tien.5811877?locale=vi_VN)
- **Địa chỉ**: 147 Phùng Quán, thành phố Huế, Việt Nam

