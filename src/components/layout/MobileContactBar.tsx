"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Phone, CalendarCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function MobileContactBar() {
  const t = useTranslations('mobileBar');

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(11, 23, 39, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.35)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="grid grid-cols-4 h-16 items-center px-1">
        {/* 1. NÚT GỌI ĐIỆN - Pulsing Green Wave + Phone Ring */}
        <a
          href="tel:0364483597"
          className="group relative flex flex-col items-center justify-center gap-1 py-1.5 text-white active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
          aria-label={t('call')}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Phone className="w-4 h-4 text-white animate-phone-ring" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 leading-none tracking-tight">
            {t('call')}
          </span>
        </a>

        {/* 2. NÚT ZALO - White bg + clean blue glow */}
        <a
          href="https://zalo.me/0364483597"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-1 py-1.5 active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
          aria-label="Zalo"
        >
          <div className="relative flex items-center justify-center">
            {/* Tỏa sáng xanh lam mượt mà (Smooth Blue Glow) */}
            <div className="absolute -inset-1 rounded-2xl bg-blue-500/30 blur-sm animate-pulse" />
            <div
              className="relative w-9 h-9 rounded-2xl bg-white p-1 flex items-center justify-center shadow-[0_0_14px_rgba(0,104,255,0.6)] transition-transform group-hover:scale-105 group-active:scale-95 border border-blue-400/40"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/icons/iconzalo.png"
                  alt="Zalo"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-300 leading-none mt-0.5">
            Zalo
          </span>
        </a>

        {/* 3. NÚT MESSENGER - White bg + neon blue-pink glow */}
        <a
          href="https://www.facebook.com/quoc.tien.5811877?locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-1 py-1.5 active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
          aria-label="Messenger"
        >
          <div className="relative flex items-center justify-center">
            {/* Tỏa sáng neon xanh - hồng (Neon Blue-Pink Glow) */}
            <div
              className="absolute -inset-1 rounded-full blur-sm animate-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(0,178,254,0.5), rgba(255,82,217,0.5))',
              }}
            />
            <div
              className="relative w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shadow-[0_0_14px_rgba(255,82,217,0.6),0_0_8px_rgba(0,178,254,0.6)] transition-transform group-hover:scale-105 group-active:scale-95 border border-pink-400/40"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/icons/icon_messenger.png"
                  alt="Messenger"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            </div>
          </div>
          <span
            className="text-[10px] font-bold leading-none mt-0.5"
            style={{
              background: 'linear-gradient(90deg, #00B2FE, #FF52D9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Messenger
          </span>
        </a>

        {/* 4. NÚT ĐẶT XE - Luxury Gold Shimmering Card */}
        <Link
          href="/contact"
          className="relative group overflow-hidden flex flex-col items-center justify-center gap-1 h-12 my-auto mx-1 rounded-xl font-bold text-brand-900 bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 shadow-md shadow-gold-500/30 active:scale-95 transition-all"
          style={{ touchAction: 'manipulation' }}
          aria-label={t('book')}
        >
          {/* Shimmer light beam animation */}
          <span
            className="absolute inset-0 w-[200%] -translate-x-full animate-[shimmer_2.4s_infinite] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)',
            }}
          />

          <div className="relative flex items-center gap-1 z-10">
            <CalendarCheck className="w-4 h-4 text-brand-900" />
            <Sparkles className="w-2.5 h-2.5 text-brand-700 animate-pulse" />
          </div>
          <span className="relative z-10 text-[10px] font-extrabold uppercase tracking-wider leading-none text-brand-900">
            {t('book')}
          </span>
        </Link>
      </div>
    </div>
  );
}
