"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Eye, Car, ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import SectionHeader from "@/components/ui/SectionHeader";

const REAL_IMAGES = [
  {
    src: "/images/XeDuaDonResort.jpg",
    title: "VinFast Limo Green",
    categoryId: "vehicles",
    categoryLabelKey: "catVehicles",
    desc: "VinFast Limo Green Resort Transfer",
  },
  {
    src: "/images/sefiWithKhach.jpg",
    title: "Happy Travelers",
    categoryId: "customers",
    categoryLabelKey: "catCustomers",
    desc: "Hue Private Tour with friendly travelers",
  },
  {
    src: "/images/XeDuaDonLangTam.jpg",
    title: "Imperial Tombs of Hue",
    categoryId: "cityTour",
    categoryLabelKey: "catCityTour",
    desc: "Hue Royal Heritage Tour",
  },
  {
    src: "/images/xeDuaDonTaiKhachSan.jpg",
    title: "Hotel Pick-up Service",
    categoryId: "vehicles",
    categoryLabelKey: "catVehicles",
    desc: "Punctual & attentive hospitality",
  },
  {
    src: "/images/XeDuaDonTaiKhachSan2.jpg",
    title: "VinFast Limo Green 7-Seater",
    categoryId: "vehicles",
    categoryLabelKey: "catVehicles",
    desc: "Modern, spacious and ultra-quiet cabin",
  },
  {
    src: "/images/hue3diem.jpg",
    title: "Hue Imperial Citadel",
    categoryId: "destinations",
    categoryLabelKey: "catDestinations",
    desc: "Nguyen Dynasty Royal Palace",
  },
  {
    src: "/images/hue-danang.jpg",
    title: "Hai Van Pass Coastline",
    categoryId: "interCity",
    categoryLabelKey: "catInterCity",
    desc: "Scenic coastal route between Hue & Da Nang",
  },
  {
    src: "/images/hue-hoian.jpg",
    title: "Hoi An Ancient Lantern Town",
    categoryId: "interCity",
    categoryLabelKey: "catInterCity",
    desc: "UNESCO World Heritage site",
  },
  {
    src: "/images/hue-phongnha.jpg",
    title: "Phong Nha - Ke Bang National Park",
    categoryId: "destinations",
    categoryLabelKey: "catDestinations",
    desc: "World wonder karst caves exploration",
  },
];

const CATEGORIES = [
  { id: "all", key: "catAll" },
  { id: "vehicles", key: "catVehicles" },
  { id: "customers", key: "catCustomers" },
  { id: "cityTour", key: "catCityTour" },
  { id: "interCity", key: "catInterCity" },
  { id: "destinations", key: "catDestinations" },
];

export default function GalleryPage() {
  const t = useTranslations('gallerySection');
  const tCta = useTranslations('cta');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [filter, setFilter] = useState("all");

  const filteredImages =
    filter === "all"
      ? REAL_IMAGES
      : REAL_IMAGES.filter((img) => img.categoryId === filter);

  return (
    <div className="bg-surface-warm min-h-screen py-12 md:py-16">
      <div className="section-container">
        {/* Header */}
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                filter === cat.id
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gold-400"
              }`}
            >
              {t(cat.key as any)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                const originalIndex = REAL_IMAGES.findIndex((img) => img.src === item.src);
                setLightboxIndex(originalIndex);
              }}
              className="card-hover group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 cursor-pointer"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {t(item.categoryLabelKey as any)}
                </div>

                {/* View zoom icon */}
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4" />
                </div>

                {/* Caption bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading text-lg font-bold line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking CTA */}
        <div className="mt-16 text-center rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-gray-100 max-w-3xl mx-auto">
          <Car className="h-10 w-10 text-gold-500 mx-auto mb-3" />
          <h3 className="font-heading text-2xl font-bold text-brand-500">
            VinFast Limo Green 7 Chỗ
          </h3>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
            HUYỀN TRANG TOUR – "Your Journey, Our Passion"
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold text-xs sm:text-sm">
              {tCta('sendRequest')}
            </Link>
            <a href="tel:0364483597" className="btn-navy text-xs sm:text-sm">
              {tCta('callNow')}
            </a>
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={REAL_IMAGES.map((img) => ({
            src: img.src,
            title: img.title,
            description: img.desc,
          }))}
        />
      </div>
    </div>
  );
}
