"use client";

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

const SERVICES_LINKS = [
  { key: 'cityTour', href: '/services#city-tour', label: 'Huế City Tour' },
  { key: 'interCity', href: '/services#inter-city', label: 'Đưa đón liên tỉnh' },
  { key: 'airport', href: '/services#airport', label: 'Sân bay Phú Bài' },
  { key: 'specialTour', href: '/services#special-tour', label: 'Tour đặc biệt' },
];

const NAV_LINKS = [
  { href: '/', key: 'home', defaultLabel: 'Trang chủ' },
  { href: '/about', key: 'about', defaultLabel: 'Giới thiệu' },
  { href: '/services', key: 'services', defaultLabel: 'Dịch vụ' },
  { href: '/pricing', key: 'pricing', defaultLabel: 'Bảng giá' },
  { href: '/gallery', key: 'gallery', defaultLabel: 'Hình ảnh' },
  { href: '/contact', key: 'contact', defaultLabel: 'Liên hệ' },
];

export default function Footer() {
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const tAbout = useTranslations('about');
  const tContact = useTranslations('contact');

  return (
    <footer style={{ backgroundColor: '#0F2035' }} className="text-white pb-28 md:pb-0">
      {/* Main Footer */}
      <div className="section-container py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center bg-white rounded-2xl px-3.5 py-2 shadow-md mb-4 hover:opacity-95 transition-all border border-gold-400/20"
            >
              <Image
                src="/images/logoHT.png"
                alt="HUYỀN TRANG TOUR"
                width={140}
                height={56}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-white/75 text-sm leading-relaxed mb-3 max-w-sm">
              {tFooter('description')}
            </p>
            <p className="text-sm font-semibold italic text-gold-400">
              &ldquo;{tAbout('slogan')}&rdquo;
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5 text-gold-400">
              {tFooter('services')}
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={14} className="text-white/40 group-hover:text-gold-400 transition-colors" />
                    <span>{tServices(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5 text-gold-400">
              {tFooter('contact')}
            </h3>
            <ul className="space-y-3.5 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:0364483597" className="hover:text-white block font-medium">0364 483 597</a>
                  <a href="tel:0935637431" className="hover:text-white block font-medium">0935 637 431</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{tContact('addressValue')}</span>
              </li>
              <li className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://zalo.me/0364483597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-brand-900 text-xs font-semibold transition"
                >
                  Zalo
                </a>
                <a
                  href="https://wa.me/84364483597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-brand-900 text-xs font-semibold transition"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.facebook.com/quoc.tien.5811877?locale=vi_VN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-brand-900 text-xs font-semibold transition"
                >
                  Messenger
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5 text-gold-400">
              {tFooter('info')}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={14} className="text-white/40 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                    <span>{tNav(item.key) || item.defaultLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70 text-center sm:text-left">
            <p>© 2026 HUYỀN TRANG TOUR. All Rights Reserved.</p>
            <p>
              Website được thiết kế và phát triển bởi{' '}
              <a
                href="https://dhtech.io.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 transition-colors font-bold underline underline-offset-4"
              >
                DH TECH
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
