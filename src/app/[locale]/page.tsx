import HeroSection from "@/components/home/HeroSection";
import QuickBooking from "@/components/home/QuickBooking";
import IntroSection from "@/components/home/IntroSection";
import FeaturedRoutes from "@/components/home/FeaturedRoutes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import BookingSteps from "@/components/home/BookingSteps";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickBooking />
      <IntroSection />
      <FeaturedRoutes />
      <WhyChooseUs />
      <GalleryPreview />
      <BookingSteps />
      <CtaSection />
    </>
  );
}

