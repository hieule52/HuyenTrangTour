"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import SectionHeader from "@/components/ui/SectionHeader";

const GALLERY_IMAGES = [
  {
    src: "/images/XeDuaDonResort.jpg",
    title: "VinFast Limo Green",
    subtitle: "Resort Transfer",
  },
  {
    src: "/images/sefiWithKhach.jpg",
    title: "Happy Travelers",
    subtitle: "Hue Private Tour",
  },
  {
    src: "/images/XeDuaDonLangTam.jpg",
    title: "Imperial Tombs",
    subtitle: "Hue City Tour",
  },
  {
    src: "/images/xeDuaDonTaiKhachSan.jpg",
    title: "Hotel Pick-up",
    subtitle: "Punctual & Friendly",
  },
  {
    src: "/images/XeDuaDonTaiKhachSan2.jpg",
    title: "VinFast Limo 7-Seater",
    subtitle: "Comfortable Interior",
  },
];

export default function GalleryPreview() {
  const t = useTranslations('gallerySection');
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState(GALLERY_IMAGES);

  useEffect(() => {
    fetch('/api/gallery?limit=5')
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length >= 5) {
          setImages(
            data.images.slice(0, 5).map((img: any) => ({
              src: img.src,
              title: img.title,
              subtitle: img.subtitle || 'Huyền Trang Tour',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="section-container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setIndex(0)}
            className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-gray-100"
          >
            <Image
              src={images[0].src}
              alt={images[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                {images[0].subtitle}
              </span>
              <h4 className="text-lg md:text-xl font-bold font-heading mt-1">
                {images[0].title}
              </h4>
            </div>
            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-5 w-5" />
            </div>
          </motion.div>

          {/* 4 Smaller Images */}
          {images.slice(1).map((img, i) => (
            <motion.div
              key={i + 1}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
              onClick={() => setIndex(i + 1)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-gray-100"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="text-sm font-semibold font-heading line-clamp-1">
                  {img.title}
                </h4>
              </div>
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-brand-500 hover:border-gold-500 hover:text-gold-600 transition-colors shadow-sm"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={images.map((img) => ({
            src: img.src,
            title: img.title,
            description: img.subtitle,
          }))}
        />
      </div>
    </section>
  );
}
