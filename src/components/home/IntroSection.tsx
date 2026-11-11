"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function IntroSection() {
  const t = useTranslations('intro');

  const highlights = [
    t('h1'),
    t('h2'),
    t('h3'),
    t('h4'),
  ];

  return (
    <section className="section-padding bg-surface-warm" id="about-intro">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow={t('eyebrow')}
              title={t('title')}
              align="left"
              className="mb-6"
            />

            <p className="text-gray-700 leading-relaxed mb-4">
              {t('p1')}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {t('p2')}
            </p>

            {/* Feature checklist */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-gold-600 font-bold" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/services" className="btn-navy text-xs md:text-sm">
                {t('exploreServices')}
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-brand-500 hover:text-gold-600 transition flex items-center gap-1.5 underline underline-offset-4"
              >
                {t('learnMore')} →
              </Link>
            </div>
          </motion.div>

          {/* Right: Real Images with Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/XeDuaDonTaiKhachSan2.jpg"
                alt="HUYỀN TRANG TOUR xe VinFast Limo Green đón khách tại khách sạn"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
            </div>

            {/* Floating Badge 1 - VinFast Green */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 max-w-[260px]">
              <div className="w-12 h-12 rounded-xl bg-ev-100 flex items-center justify-center text-ev-600 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">{t('badge1Subtitle')}</p>
                <p className="text-sm font-bold text-brand-500">VinFast Limo Green</p>
                <p className="text-xs text-gray-500">{t('badge1Desc')}</p>
              </div>
            </div>

            {/* Floating Badge 2 - Rating/Service */}
            <div className="absolute -top-4 -right-4 sm:right-6 bg-brand-500 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-brand-900 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gold-300 font-medium uppercase tracking-wider">{t('badge2Subtitle')}</p>
                <p className="text-sm font-bold">{t('badge2Title')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
