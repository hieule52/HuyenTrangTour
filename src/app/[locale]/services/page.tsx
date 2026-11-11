import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { routes } from "@/data/routes";

const SERVICES_DATA = [
  {
    id: "city-tour",
    titleKey: "cityTour",
    image: "/images/hue3diem.jpg",
    priceRange: "800.000 VNĐ (31 USD)",
    routeIds: ["hue-city-3", "hue-city-4", "hue-city-5"],
  },
  {
    id: "inter-city",
    titleKey: "interCity",
    image: "/images/hue-danang.jpg",
    priceRange: "1.600.000 VNĐ (62 USD)",
    routeIds: [
      "hue-danang",
      "danang-hue",
      "hue-hoian",
      "hoian-hue",
      "hue-phongnha",
      "danang-phongnha",
      "hoian-phongnha",
    ],
  },
  {
    id: "airport",
    titleKey: "airport",
    image: "/images/hue-sanbay.jpg",
    priceRange: "250.000 VNĐ (10 USD)",
    routeIds: ["hue-airport"],
  },
  {
    id: "special-tour",
    titleKey: "specialTour",
    image: "/images/hue-quangtri.jpg",
    priceRange: "1.950.000 VNĐ (75 USD)",
    routeIds: ["hue-quangtri", "hue-khesanh"],
  },
];

export async function generateMetadata() {
  return {
    title: "Dịch Vụ Xe Đưa Đón | HUYỀN TRANG TOUR",
    description:
      "Dịch vụ xe đưa đón du lịch riêng tư của HUYỀN TRANG TOUR: Tham quan Huế City Tour, đưa đón liên tỉnh Đà Nẵng, Hội An, Phong Nha, sân bay Phú Bài.",
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('services');

  return (
    <div className="bg-surface-warm min-h-screen py-12 md:py-16">
      <div className="section-container">
        {/* Page Header */}
        <SectionHeader
          eyebrow={t('title')}
          title={t('pageTitle')}
          subtitle={t('subtitle')}
        />

        {/* Services List */}
        <div className="space-y-16">
          {SERVICES_DATA.map((service, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-sm border border-gray-100"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={service.image}
                        alt={t(service.titleKey)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute top-4 left-4 bg-brand-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {t('priceRef')}: {service.priceRange}
                      </div>
                    </div>
                  </div>

                  {/* Content Column (7 cols) */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                      {t('premiumBadge')}
                    </span>

                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-500 mt-3 mb-4">
                      {t(service.titleKey)}
                    </h2>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {[1, 2, 3, 4].map((i) => {
                        const hKey = `${service.titleKey}H${i}`;
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 font-medium">
                              {t(hKey as any)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Route Cards inside Service */}
                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                          {t('priceRef')}
                        </span>
                        <p className="text-lg font-bold text-brand-500">{service.priceRange}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/pricing`}
                          className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-brand-500 hover:border-gold-400 hover:text-gold-600 transition"
                        >
                          {t('viewRoutes')}
                        </Link>
                        <Link
                          href={`/contact?pickup=${encodeURIComponent(t(service.titleKey))}`}
                          className="btn-gold text-xs px-5 py-2.5"
                        >
                          {t('bookNow')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
