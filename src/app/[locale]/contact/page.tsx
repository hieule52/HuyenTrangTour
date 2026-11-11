import { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, MapPin, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import BookingForm from "@/components/booking/BookingForm";

export async function generateMetadata() {
  return {
    title: "Liên Hệ & Đặt Xe | HUYỀN TRANG TOUR",
    description:
      "Liên hệ đặt xe riêng tư VinFast Limo Green 7 chỗ tại Huế. Hotline: 0364 483 597 - 0935 637 431. Địa chỉ 147 Phùng Quán, TP. Huế.",
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const contactChannels = [
    {
      name: t('hotline1Name'),
      value: "0364 483 597",
      href: "tel:0364483597",
      icon: "/images/icons/icon_call.png",
      desc: t('hotline1Desc'),
    },
    {
      name: t('hotline2Name'),
      value: "0935 637 431",
      href: "tel:0935637431",
      icon: "/images/icons/icon_call.png",
      desc: t('hotline2Desc'),
    },
    {
      name: t('zaloName'),
      value: "0364 483 597",
      href: "https://zalo.me/0364483597",
      icon: "/images/icons/iconzalo.png",
      desc: t('zaloDesc'),
      target: "_blank",
    },
    {
      name: t('whatsappName'),
      value: "+84 364 483 597",
      href: "https://wa.me/84364483597",
      icon: "/images/icons/icon_whatapps.png",
      desc: t('whatsappDesc'),
      target: "_blank",
    },
    {
      name: t('messengerName'),
      value: "Quốc Tiến (Huyền Trang Tour)",
      href: "https://www.facebook.com/quoc.tien.5811877?locale=vi_VN",
      icon: "/images/icons/icon_messenger.png",
      desc: t('messengerDesc'),
      target: "_blank",
    },
    {
      name: t('addressName'),
      value: t('addressValue'),
      href: "https://maps.google.com/?q=147+Phùng+Quán,+Thủy+Dương,+Hương+Thủy,+Thừa+Thiên+Huế",
      icon: "/images/icons/icon_map.png",
      desc: t('addressDesc'),
      target: "_blank",
    },
  ];

  return (
    <div className="bg-surface-warm min-h-screen py-12 md:py-16">
      <div className="section-container">
        {/* Page Header */}
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Channels & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-brand-500 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                {t('quickChannels')}
              </h3>

              <div className="space-y-4">
                {contactChannels.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.target}
                    rel={item.target ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 p-3.5 rounded-2xl border border-gray-100 bg-surface-warm hover:bg-gold-50/40 hover:border-gold-300 transition-all duration-200"
                  >
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1.5 shadow-sm border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Image src={item.icon} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {item.name}
                        </span>
                        {item.target && <ExternalLink className="w-3 h-3 text-gray-400" />}
                      </div>
                      <p className="text-sm font-bold text-brand-500 group-hover:text-gold-600 transition-colors truncate">
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-3xl bg-white overflow-hidden shadow-sm border border-gray-100 p-2">
              <div className="p-4 pb-2">
                <div className="flex items-center gap-2 text-brand-500 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span>{t('ourLocation')}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t('addressValue')}</p>
              </div>
              <div className="h-64 w-full rounded-2xl overflow-hidden">
                <iframe
                  title="Bản đồ 147 Phùng Quán Huế"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15312.306161109968!2d107.5921!3d16.4475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13e54b674df%3A0xb35a5cb9f2a97ef7!2zMTQ3IFBow7luZyBRdcOhbiwgVGjhu6d5IETGsMahbmcsIEjGsMahbmcgVGjhu6d5LCBUaOG7q2EgVGhpw6puIEh14bq_!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-center bg-white rounded-3xl">Loading form...</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
