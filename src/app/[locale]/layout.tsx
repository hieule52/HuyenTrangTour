import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileContactBar from '@/components/layout/MobileContactBar';
import '@/app/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E3A5F',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';
  return {
    metadataBase: new URL('https://huyentrangtour.com'),
    title: {
      default: isVi ? 'HUYỀN TRANG TOUR | Xe Đưa Đón Du Lịch Riêng Tư Huế' : 'HUYEN TRANG TOUR | Private Car Service in Central Vietnam',
      template: '%s | HUYỀN TRANG TOUR'
    },
    description: isVi
      ? 'Dịch vụ xe đưa đón du lịch riêng tư bằng VinFast Limo Green 7 chỗ tại Huế. Tuyến Huế - Đà Nẵng, Hội An, Phong Nha. Giá tốt, an toàn, thoải mái.'
      : 'Premium private car service in Hue, Vietnam. VinFast Limo Green 7-seater for transfers to Da Nang, Hoi An, Phong Nha. Comfortable, safe & reliable.',
    keywords: isVi
      ? ['xe đưa đón Huế', 'thuê xe 7 chỗ Huế', 'xe du lịch Huế', 'xe Huế Đà Nẵng', 'xe sân bay Phú Bài']
      : ['private car service Hue', 'Hue to Da Nang transfer', 'Hue city tour private car', 'VinFast Limo Green'],
    authors: [{ name: 'HUYỀN TRANG TOUR' }],
    creator: 'DH TECH',
    // ===== FAVICON via Metadata API (Next.js App Router) =====
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
      ],
      apple: [
        { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: [{ url: '/favicon.ico' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : locale === 'en' ? 'en_US' : locale,
      url: 'https://huyentrangtour.com',
      siteName: 'HUYỀN TRANG TOUR',
      title: isVi ? 'HUYỀN TRANG TOUR | Xe Đưa Đón Riêng Tư Huế' : 'HUYEN TRANG TOUR | Private Car Service Hue',
      description: isVi ? 'Dịch vụ xe đưa đón du lịch riêng tư VinFast Limo Green 7 chỗ tại Huế và miền Trung.' : 'Premium private car transfers in Central Vietnam.',
      images: [{ url: '/images/sefiWithKhach.jpg', width: 1200, height: 630, alt: 'HUYỀN TRANG TOUR' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HUYỀN TRANG TOUR | Private Car Service Hue',
      description: 'Premium VinFast Limo Green private car service in Central Vietnam.',
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://huyentrangtour.com/${locale}`,
      languages: {
        'vi': 'https://huyentrangtour.com/vi',
        'en': 'https://huyentrangtour.com/en',
        'fr': 'https://huyentrangtour.com/fr',
        'zh': 'https://huyentrangtour.com/zh',
        'ko': 'https://huyentrangtour.com/ko',
        'ja': 'https://huyentrangtour.com/ja',
      }
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Favicon & manifest được inject tự động bởi Next.js Metadata API (icons + manifest trong generateMetadata) */}
        {/* ===== FONTS ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://huyentrangtour.com",
              "name": "HUYỀN TRANG TOUR",
              "description": "Dịch vụ xe đưa đón du lịch riêng tư bằng VinFast Limo Green 7 chỗ tại Huế và miền Trung Việt Nam",
              "url": "https://huyentrangtour.com",
              "telephone": "+84364483597",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "147 Phùng Quán",
                "addressLocality": "Huế",
                "addressRegion": "Thừa Thiên Huế",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "16.4637",
                "longitude": "107.5909"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "servesCuisine": "Transportation",
              "image": "https://huyentrangtour.com/images/logoHT.png",
              "sameAs": ["https://www.facebook.com/quoc.tien.5811877"]
            })
          }}
        />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pb-24 md:pb-0">{children}</main>
          <Footer />
          <MobileContactBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
