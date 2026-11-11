"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Star, Car } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
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
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white">
                  <Car className="h-3.5 w-3.5 text-gold-400" />
                  <span>{t('vehiclePill')}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-heading text-lg md:text-xl font-bold text-brand-500 group-hover:text-gold-600 transition-colors line-clamp-1">
                  {route.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
                  {route.description}
                </p>

                {/* Price block */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      {t('from')}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg md:text-xl font-extrabold text-brand-500">
                        {formatVND(route.priceVND)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gold-600">
                      ({formatUSD(route.priceUSD)})
                    </span>
                  </div>

                  {/* Booking CTA */}
                  <Link
                    href={`/contact?route=${route.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-gold-500 hover:text-brand-900 hover:shadow-md"
                  >
                    <span>{t('bookBtn')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
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
