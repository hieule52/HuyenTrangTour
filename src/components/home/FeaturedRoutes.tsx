"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Star, Car, Users, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Sedan4Icon, Suv7Icon } from "@/components/ui/VehicleIcons";
import { getLocalizedRoutes } from "@/data/routes";
import { formatVND, formatUSD } from "@/lib/utils";

const FEATURED_IDS = [
  "hue-city-3",
  "hue-city-5",
  "hue-danang",
  "hue-hoian",
  "hue-phongnha",
  "hue-airport",
];

export default function FeaturedRoutes() {
  const t = useTranslations('featured');
  const locale = useLocale();
  const allRoutes = getLocalizedRoutes(locale);
  const featuredList = allRoutes.filter((r) => FEATURED_IDS.includes(r.id));

  return (
    <section className="section-padding bg-white" id="services">
      <div className="section-container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredList.map((route, idx) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card-hover group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={route.image}
                  alt={route.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-80" />

                {/* Popular Badge */}
                {route.popular && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-900 shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                    {t('popularBadge')}
                  </div>
                )}

                {/* Vehicle Pill */}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/65 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-white/10">
                  <Car className="h-3.5 w-3.5 text-gold-400" />
                  <span>4 – 7 chỗ riêng tư</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-heading text-lg md:text-xl font-bold text-brand-500 group-hover:text-gold-600 transition-colors line-clamp-1">
                  {route.name}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
                  {route.description}
                </p>

                {/* Professional Dual Pricing Block */}
                <div className="mt-4 pt-3.5 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50/80 p-2 border border-slate-100 shadow-inner">
                    {/* 4-Seater Price */}
                    <div className="flex flex-col justify-between rounded-xl bg-white p-2.5 shadow-xs border border-gray-100/80 transition-all hover:border-brand-200">
                      <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                        <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                          <Sedan4Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 tracking-tight">
                          Xe 4 chỗ
                        </span>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black text-brand-900 leading-tight">
                          {formatVND(route.price4SeatsVND)}
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 mt-0.5">
                          {formatUSD(route.price4SeatsUSD)}
                        </div>
                      </div>
                    </div>

                    {/* 7-Seater VinFast Limo Price */}
                    <div className="relative flex flex-col justify-between rounded-xl bg-gradient-to-br from-gold-50 to-amber-50/50 p-2.5 shadow-xs border border-gold-200/80 transition-all hover:border-gold-300">
                      <div className="flex items-center gap-1.5 text-gold-900 mb-1">
                        <div className="w-5 h-5 rounded-md bg-gold-400 text-brand-950 flex items-center justify-center flex-shrink-0 shadow-xs">
                          <Suv7Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-extrabold text-gold-900 tracking-tight">
                          7 chỗ Limo
                        </span>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black text-gold-700 leading-tight">
                          {formatVND(route.price7SeatsVND)}
                        </div>
                        <div className="text-[10px] font-bold text-gold-600/90 mt-0.5">
                          {formatUSD(route.price7SeatsUSD)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Action Row */}
                  <div className="mt-3.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Xe riêng trọn gói</span>
                    </div>

                    <Link
                      href={`/contact?route=${route.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2 text-xs font-bold text-brand-900 shadow-sm transition-all hover:from-gold-400 hover:to-gold-300 hover:shadow-md active:scale-95"
                    >
                      <span>{t('bookBtn')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 px-8 py-3.5 text-sm font-bold text-brand-500 transition-all hover:bg-brand-500 hover:text-white shadow-sm"
          >
            <span>{t('viewAllBtn')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
