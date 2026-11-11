import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ShieldCheck, Heart, Sparkles, Award, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export async function generateMetadata() {
  return {
    title: "Giới Thiệu Về Chúng Tôi | HUYỀN TRANG TOUR",
    description:
      "Tìm hiểu về HUYỀN TRANG TOUR – dịch vụ xe đưa đón du lịch riêng tư cao cấp bằng VinFast Limo Green 7 chỗ tại Huế và miền Trung.",
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const values = [
    {
      icon: ShieldCheck,
      title: t('v1Title'),
      desc: t('v1Desc'),
    },
    {
      icon: Heart,
      title: t('v2Title'),
      desc: t('v2Desc'),
    },
    {
      icon: Sparkles,
      title: t('v3Title'),
      desc: t('v3Desc'),
    },
    {
      icon: Award,
      title: t('v4Title'),
      desc: t('v4Desc'),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 bg-brand-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/background.png"
            alt="HUYỀN TRANG TOUR Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gold-300 bg-white/10 border border-gold-400/30 mb-4">
            {t('badge')}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            {t('slogan')}
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding bg-surface-warm">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow={t('storyEyebrow')}
                title={t('storyTitle')}
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>{t('story1')}</p>
                <p>{t('story2')}</p>
                <p>{t('story3')}</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/contact" className="btn-gold text-xs md:text-sm">
                  {t('btnBook')}
                </Link>
                <Link href="/services" className="btn-navy text-xs md:text-sm">
                  {t('btnServices')}
                </Link>
              </div>
            </div>

            <div className="relative h-[440px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/XeDuaDonLangTam.jpg"
                alt="Xe đưa đón tại lăng tẩm Huế"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Spotlight: VinFast Limo Green 7 Chỗ */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-80 sm:h-96 md:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/images/xeDuaDonTaiKhachSan.jpg"
                  alt="VinFast Limo Green đón khách tại khách sạn"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-ev-600 bg-ev-50 border border-ev-200 mb-4">
                <Zap className="w-3.5 h-3.5" />
                {t('evBadge')}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-500 mb-6">
                {t('evTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('evDesc')}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-warm border border-gray-100">
                  <span className="text-2xl font-bold text-brand-500">{t('feature1Title')}</span>
                  <p className="text-xs text-gray-600 mt-1">{t('feature1Desc')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-warm border border-gray-100">
                  <span className="text-2xl font-bold text-ev-600">{t('feature2Title')}</span>
                  <p className="text-xs text-gray-600 mt-1">{t('feature2Desc')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-warm border border-gray-100">
                  <span className="text-2xl font-bold text-gold-500">{t('feature3Title')}</span>
                  <p className="text-xs text-gray-600 mt-1">{t('feature3Desc')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-warm border border-gray-100">
                  <span className="text-2xl font-bold text-brand-500">{t('feature4Title')}</span>
                  <p className="text-xs text-gray-600 mt-1">{t('feature4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-surface-subtle">
        <div className="section-container">
          <SectionHeader
            eyebrow={t('valuesEyebrow')}
            title={t('valuesTitle')}
            subtitle={t('valuesSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
