import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CTASection } from "@/components/sections/CTASection";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { HeroImage } from "@/components/sections/HeroImage";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { TestimonialVideoGallery } from "@/components/sections/TestimonialVideoGallery";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import homeContent from "@/content/home.json";
import type { HomeContent } from "@/lib/types";

const content = homeContent as HomeContent;

export const metadata: Metadata = buildMetadata(content.meta);

const faqSchema = faqPageSchema(content.faq);

export default function HomePage() {
  return (
    <>
      <HeroImage content={content.hero} />
      <SpecialtiesGrid content={content.specialties} />
      <TrustSection content={content.trust} />
      <DoctorsGrid content={content.doctors} />
      <TestimonialVideoGallery content={content.testimonials} />
      <WhyChooseSection content={content.whyChoose} />
      <ReviewsCarousel content={content.reviews} />
      <FAQAccordion content={content.faq} />
      <CTASection content={content.cta} />
      <JsonLd data={faqSchema} id="ld-faq" />
    </>
  );
}
