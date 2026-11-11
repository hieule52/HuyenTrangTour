"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Zap, Armchair, Shield, Clock, Headphones, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function WhyChooseUs() {
  const t = useTranslations('whyUs');

  const features = [
    {
      icon: Zap,
      title: t('f1Title'),
      desc: t('f1Desc'),
      color: "bg-ev-50 text-ev-600 border-ev-100",
    },
    {
      icon: Armchair,
      title: t('f2Title'),
      desc: t('f2Desc'),
      color: "bg-gold-50 text-gold-600 border-gold-100",
    },
    {
      icon: Shield,
      title: t('f3Title'),
      desc: t('f3Desc'),
      color: "bg-blue-50 text-brand-500 border-blue-100",
    },
    {
      icon: Clock,
      title: t('f4Title'),
      desc: t('f4Desc'),
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: Headphones,
      title: t('f5Title'),
      desc: t('f5Desc'),
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      icon: CheckCircle2,
      title: t('f6Title'),
      desc: t('f6Desc'),
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  return (
    <section className="section-padding bg-surface-subtle" id="why-us">
      <div className="section-container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative flex flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold-200"
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border ${item.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-heading text-lg md:text-xl font-bold text-brand-500 mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
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
