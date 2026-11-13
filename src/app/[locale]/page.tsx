import HeroSection from "@/components/home/HeroSection";
import QuickBooking from "@/components/home/QuickBooking";
import IntroSection from "@/components/home/IntroSection";
import FeaturedRoutes from "@/components/home/FeaturedRoutes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import BookingSteps from "@/components/home/BookingSteps";
import CtaSection from "@/components/home/CtaSection";
import CustomerReviewsSection from "@/components/reviews/CustomerReviewsSection";
import { routes } from "@/data/routes";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const serviceOptions = routes.map((r) => ({
    id: r.id,
    slug: r.id,
    title: (r.nameI18n && r.nameI18n[locale]) || r.name,
  }));

  return (
    <>
      <HeroSection />
      <QuickBooking />
      <IntroSection />
      <FeaturedRoutes />
      <WhyChooseUs />
      <GalleryPreview />
      <CustomerReviewsSection locale={locale} services={serviceOptions} />
      <BookingSteps />
      <CtaSection />
    </>
  );
}
