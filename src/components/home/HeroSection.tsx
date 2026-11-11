"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, ChevronDown, Car } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

export default function HeroSection() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/images/background.png"
          alt="HUYỀN TRANG TOUR – VinFast Limo Green"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-800/70 via-brand-700/40 to-brand-900/80" />

      {/* Content */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        {/* Badge */}
        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-brand-800/50 px-4 py-1.5 backdrop-blur-sm"
        >
          <Car className="h-4 w-4 text-gold-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            {t('badge')}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-hero-xl font-bold leading-tight tracking-tight text-white"
        >
          {t('title')}
          <br />
          <span className="text-gold-400">{t('titleHighlight')}</span>
        </motion.h1>

        {/* H2 */}
        <motion.h2
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-2xl text-lg md:text-xl font-medium text-gold-200"
        >
          {t('titleVi')}
        </motion.h2>

        {/* Description */}
        <motion.p
          custom={0.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-xl text-base text-white/75 leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-brand-900 shadow-gold transition-all hover:bg-gold-400 hover:shadow-cta"
          >
            <Phone className="h-4 w-4" />
            {t('ctaBook')}
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
          >
            {t('ctaExplore')}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={1.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6 md:gap-10"
        >
          {[
            { value: '13+', label: t('statRoutes') },
            { value: t('statVehicleValue'), label: t('statVehicle') },
            { value: '6', label: t('statLanguages') },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 sm:gap-6 md:gap-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold-400">{stat.value}</div>
                <div className="mt-0.5 text-xs uppercase tracking-wider text-white/60">{stat.label}</div>
              </div>
              {i < 2 && <div className="h-8 w-px bg-white/20" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-20 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">{t('scrollDown')}</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
