"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Star, Car, CarFront, ArrowRight, Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { getLocalizedRoutes } from "@/data/routes";
import { formatVND, formatUSD } from "@/lib/utils";

export default function PricingPage() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const routes = getLocalizedRoutes(locale);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: t('all') },
    { id: "city-tour", label: t('cityTour') },
    { id: "inter-city", label: t('interCity') },
    { id: "airport", label: t('airport') },
    { id: "special-tour", label: t('specialTour') },
  ];

  const filteredRoutes =
    activeCategory === "all"
      ? routes
      : routes.filter((r) => r.category === activeCategory);

  return (
    <div className="bg-surface-warm min-h-screen py-12 md:py-16">
      <div className="section-container">
        {/* Header */}
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gold-400 hover:text-gold-600 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              id={route.category}
              className="card-hover group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm"
            >
              {/* Image */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <Image
                  src={route.image}
                  alt={route.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-75" />

                {/* Popular Badge */}
                {route.popular && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-900 shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                    Popular Route
                  </div>
                )}

                {/* Vehicle Pill */}
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/65 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10">
                  <Car className="h-3.5 w-3.5 text-gold-400" />
                  <span>{t('vehiclePill')}</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-bold text-brand-500 group-hover:text-gold-600 transition-colors">
                  {route.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {route.description}
                </p>

                {/* Inclusions note */}
                <div className="mt-4 pt-3 border-t border-gray-100/80 flex items-center gap-2 text-xs text-gray-500">
                  <Check className="h-3.5 w-3.5 text-ev-600 flex-shrink-0" />
                  <span>{t('included')}</span>
                </div>

                {/* Professional Dual Pricing Comparison Block */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 space-y-2">
                  {/* Xe 4 chỗ */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:border-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-white border border-gray-200 text-slate-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {t('car4Seats')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-brand-900">
                        {formatVND(route.price4SeatsVND)}
                      </span>
                      <span className="text-xs font-medium text-gray-400 ml-1.5">
                        ({formatUSD(route.price4SeatsUSD)})
                      </span>
                    </div>
                  </div>

                  {/* Xe 7 chỗ */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-gold-50/80 to-amber-50/50 border border-gold-200/80 transition-all hover:border-gold-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gold-400 text-brand-950 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <CarFront className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-gold-950">
                        {t('car7Seats')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-gold-700">
                        {formatVND(route.price7SeatsVND)}
                      </span>
                      <span className="text-xs font-bold text-gold-600/90 ml-1.5">
                        ({formatUSD(route.price7SeatsUSD)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{t('allInclusive')}</span>
                  </div>

                  <Link
                    href={`/contact?route=${route.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-xs font-extrabold text-brand-900 shadow-sm transition-all hover:from-gold-400 hover:to-gold-300 hover:shadow-md active:scale-95"
                  >
                    <span>{t('bookNow')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Notes */}
        <div className="mt-14 rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-sm max-w-4xl mx-auto">
          <h4 className="font-heading text-lg font-bold text-brand-500 mb-3">
            {t('noteTitle')}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 list-disc list-inside leading-relaxed">
            <li>{t('note1')}</li>
            <li>{t('note2')}</li>
            <li>{t('note3')}</li>
            <li>{t('note4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
