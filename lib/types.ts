// Typed content module.
// All JSON files in /content must satisfy interfaces declared here.

export interface NavLink {
  label: string;
  href: string;
}

export interface PhoneNumber {
  label: string;
  display: string;
  tel: string;
}

export interface TopBarContent {
  location: string;
  phone: PhoneNumber;
}

export interface BrandContent {
  name: string;
  tagline: string;
  logoAlt: string;
}

export interface HeaderContent {
  brand: BrandContent;
  nav: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterContactItem {
  label: string;
  value: string;
  href?: string;
}

export interface FooterContent {
  brand: BrandContent;
  description: string;
  quickLinks: FooterColumn;
  services: FooterColumn;
  contact: {
    title: string;
    address: FooterContactItem;
    phones: FooterContactItem[];
  };
  copyright: string;
}

export interface WhatsAppContent {
  number: string;
  label: string;
  defaultMessage?: string;
}

export interface SiteContent {
  topBar: TopBarContent;
  header: HeaderContent;
  footer: FooterContent;
  whatsapp: WhatsAppContent;
}

// ---------- shared atoms ----------

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CTAAction {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

// ---------- home hero ----------

export interface HeroImageContent {
  eyebrow?: string;
  title: string;
  description: string;
  stats: Stat[];
  primaryCta: CTAAction;
  secondaryCta?: CTAAction;
  image: ImageAsset;
}

// ---------- contact hero ----------

export interface HeroFormTrust {
  badgeLabel: string;
  avatars: ImageAsset[];
  rating: string;
  ratingMax?: string;
  reviewsLabel: string;
  trustLine: string;
}

export interface HeroFormFeature {
  icon?: "calendar" | "users" | "heart" | "shield" | "check";
  title: string;
  subtitle: string;
}

export interface HeroFormContent {
  trust: HeroFormTrust;
  titleHighlight: string;
  title: string;
  description: string;
  features: HeroFormFeature[];
  form: ConsultationFormContent;
  whatsappCta: CTAAction;
}

// ---------- specialty card grid ----------

export interface SpecialtyCardContent {
  title: string;
  description?: string;
  ctaLabel: string;
  href: string;
  /** Registry name resolved by <FeatureIcon> (e.g. "ivf", "iui"). */
  icon?: string;
  iconSrc?: string;
}

export interface SpecialtiesSectionContent {
  heading: string;
  items: SpecialtyCardContent[];
}

// ---------- trust section (dark navy) ----------

export interface TrustHighlight {
  title: string;
  /** Registry name resolved by <FeatureIcon> (e.g. "care", "ovum"). */
  icon?: string;
  iconSrc?: string;
}

export interface TrustSectionContent {
  heading: string;
  description: string;
  points: string[];
  highlights: TrustHighlight[];
  primaryCta: CTAAction;
  secondaryCta?: CTAAction;
}

// ---------- doctors ----------

export interface DoctorCardContent {
  name: string;
  title: string;
  image: ImageAsset;
  href?: string;
}

export interface DoctorsSectionContent {
  heading: string;
  doctors: DoctorCardContent[];
  viewAll?: CTAAction;
}

// ---------- testimonial video gallery ----------

export interface TestimonialVideo {
  poster: ImageAsset;
  videoUrl?: string;
  caption?: string;
}

export interface TestimonialGalleryContent {
  heading: string;
  videos: TestimonialVideo[];
  viewAll?: CTAAction;
}

// ---------- why choose section ----------

export interface WhyChooseFeature {
  title: string;
  description?: string;
  /** Registry name resolved by <FeatureIcon> (e.g. "doctors", "labs"). */
  icon?: string;
  iconSrc?: string;
}

export interface WhyChooseSectionContent {
  heading: string;
  features: WhyChooseFeature[];
}

// ---------- reviews ----------

export interface ReviewContent {
  author: string;
  timeAgo?: string;
  rating: number;
  body: string;
  sourceIconSrc?: string;
  sourceLabel?: string;
  avatarLetter?: string;
}

export interface ReviewsSectionContent {
  heading: string;
  reviews: ReviewContent[];
}

// ---------- FAQ ----------

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionContent {
  heading: string;
  items: FAQItem[];
}

// ---------- CTA section ----------

export interface CTASectionContent {
  iconLabel?: string;
  heading: string;
  description: string;
  primaryCta: CTAAction;
  secondaryCta?: CTAAction;
  trustItems?: string[];
}

// ---------- consultation form ----------

export type FormFieldType = "text" | "tel" | "email" | "number";

export interface ConsultationFormField {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: FormFieldType;
  inputMode?: "text" | "tel" | "email" | "numeric";
  pattern?: string;
  maxLength?: number;
  /** Google Forms entry id (e.g. "entry.257426540") this field maps to. */
  entryId?: string;
}

export interface ConsultationFormContent {
  title: string;
  fields: ConsultationFormField[];
  submitLabel: string;
  sendingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  reassurance: string;
  disclaimer: string;
  action?: string;
}

// ---------- compliance notice ----------

export interface ComplianceNoticeContent {
  heading: string;
  bullets: string[];
  image?: ImageAsset;
}

// ---------- page-level shapes ----------

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: ImageAsset;
}

export interface HomeContent {
  meta: PageMeta;
  hero: HeroImageContent;
  specialties: SpecialtiesSectionContent;
  trust: TrustSectionContent;
  doctors: DoctorsSectionContent;
  testimonials: TestimonialGalleryContent;
  whyChoose: WhyChooseSectionContent;
  reviews: ReviewsSectionContent;
  faq: FAQSectionContent;
  cta: CTASectionContent;
}

export interface ContactContent {
  meta: PageMeta;
  hero: HeroFormContent;
  compliance: ComplianceNoticeContent;
}

export interface StubPageContent {
  title: string;
  description: string;
  heading: string;
  body: string;
}

export interface StubsContent {
  about: StubPageContent;
  treatments: StubPageContent;
  doctors: StubPageContent;
  blog: StubPageContent;
}
