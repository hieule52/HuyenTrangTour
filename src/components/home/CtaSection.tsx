"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CtaSection() {
  const t = useTranslations('cta');

  return (
    <section className="relative py-20 md:py-28 bg-brand-700 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 opacity-90" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gold-300 bg-white/10 border border-gold-400/30 mb-6">
            {t('badge')}
          </span>

          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {t('title')}
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="tel:0364483597"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-brand-900 shadow-lg shadow-gold-500/30 transition-all hover:bg-gold-400 hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>{t('callNow')}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-brand-900 hover:border-white"
            >
              <span>{t('sendRequest')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Direct Chat Channels */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/70">
            <a
              href="https://zalo.me/0364483597"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white">
                <Image src="/images/icons/iconzalo.png" alt="Zalo" fill className="object-contain" />
              </div>
              <span>Zalo: 0364 483 597</span>
            </a>

            <a
              href="https://wa.me/84364483597"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image src="/images/icons/icon_whatapps.png" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span>WhatsApp: +84 364 483 597</span>
            </a>

            <a
              href="https://www.facebook.com/quoc.tien.5811877?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image src="/images/icons/icon_messenger.png" alt="Messenger" fill className="object-contain" />
              </div>
              <span>Facebook Messenger</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
