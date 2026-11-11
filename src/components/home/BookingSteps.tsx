"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, FileText, CheckCircle, Car } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function BookingSteps() {
  const t = useTranslations('steps');

  const steps = [
    {
      step: "01",
      icon: MapPin,
      title: t('s1Title'),
      desc: t('s1Desc'),
    },
    {
      step: "02",
      icon: FileText,
      title: t('s2Title'),
      desc: t('s2Desc'),
    },
    {
      step: "03",
      icon: CheckCircle,
      title: t('s3Title'),
      desc: t('s3Desc'),
    },
    {
      step: "04",
      icon: Car,
      title: t('s4Title'),
      desc: t('s4Desc'),
    },
  ];

  return (
    <section className="section-padding bg-brand-600 text-white relative overflow-hidden" id="booking-steps">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 left-6 text-xs font-black tracking-widest text-gold-400 bg-brand-800 px-3 py-1 rounded-full border border-gold-500/30">
                  STEP {item.step}
                </div>

                {/* Icon */}
                <div className="mt-2 mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-brand-900 shadow-lg shadow-gold-500/20">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
