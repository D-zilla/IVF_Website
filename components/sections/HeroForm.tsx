import Image from "next/image";
import type { HeroFormContent, HeroFormFeature } from "@/lib/types";
import { ConsultationForm } from "./ConsultationForm";
import {
  HeartPulseIcon,
  StarIcon,
  MessageIcon,
  CalendarIcon,
  UsersDuoIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export interface HeroFormProps {
  content: HeroFormContent;
}

export function HeroForm({ content }: HeroFormProps) {
  return (
    <section aria-labelledby="hero-form-title" className="py-12">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-start gap-9 md:grid-cols-2">
          <LandingCard content={content} />
          <div className="flex flex-col gap-[18px]">
            <ConsultationForm content={content.form} />
            <a
              href={content.whatsappCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-card bg-brand-green px-[30px] py-[15px] text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3a9019]"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] fill-white" aria-hidden="true" />
              {content.whatsappCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingCard({ content }: { content: HeroFormContent }) {
  const rating = Math.round(parseFloat(content.trust.rating)) || 5;
  return (
    <div className="rounded-panel border border-[#eee] bg-white p-8 shadow-panel">
      <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-orangeBg px-3.5 py-[7px] text-sm font-semibold text-brand-orange">
        <HeartPulseIcon className="h-4 w-4 fill-brand-orange" aria-hidden="true" />
        {content.trust.badgeLabel}
      </span>

      <div className="mb-3.5 flex items-center" aria-label="Patient avatars">
        {content.trust.avatars.map((avatar, i) => (
          <div
            key={i}
            className="relative -ml-2.5 h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] first:ml-0"
          >
            <Image src={avatar.src} alt={avatar.alt} fill sizes="40px" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mb-[18px] flex items-center gap-2.5">
        <div
          className="flex gap-[3px]"
          role="img"
          aria-label={`Rating: ${content.trust.rating} out of ${content.trust.ratingMax ?? "5"}`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${i < rating ? "fill-[#FFB400]" : "fill-[#E0E0E0]"}`}
            />
          ))}
        </div>
        <span className="text-[26px] font-extrabold text-brand-orange">{content.trust.rating}</span>
        <span className="flex items-center gap-1.5 text-[15px] text-muted">
          <MessageIcon className="h-[18px] w-[18px] fill-muted" aria-hidden="true" />
          {content.trust.reviewsLabel}
        </span>
      </div>

      <p className="mb-3.5 text-[15px] font-bold">{content.trust.trustLine}</p>

      <h1
        id="hero-form-title"
        className="mb-[18px] text-[26px] font-extrabold leading-[1.18] text-brand-orange md:text-[30px]"
      >
        {content.titleHighlight}
      </h1>

      <div className="mb-[18px] flex gap-3.5">
        <div className="w-1 shrink-0 rounded-[3px] bg-brand-orange" />
        <h2 className="text-[26px] font-extrabold leading-tight text-[#111]">{content.title}</h2>
      </div>

      <p className="mb-[26px] text-[15px] leading-[1.7] text-muted">{content.description}</p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {content.features.map((feature, i) => {
          const full = i === content.features.length - 1 && content.features.length % 2 === 1;
          return <FeatureTile key={feature.title} feature={feature} full={full} accent={full} />;
        })}
      </ul>
    </div>
  );
}

function FeatureTile({
  feature,
  full,
  accent,
}: {
  feature: HeroFormFeature;
  full: boolean;
  accent: boolean;
}) {
  return (
    <li
      className={`rounded-card border border-[#FDE3D1] bg-brand-orangeBg p-5 ${full ? "sm:col-span-2" : ""}`}
    >
      <div className="mb-[30px] h-[26px] w-[26px] text-brand-orange">
        <FeatureIcon name={feature.icon} />
      </div>
      <div className={`text-[22px] font-extrabold ${accent ? "text-brand-orange" : "text-[#111]"}`}>
        {feature.title}
      </div>
      <div className="mt-1 text-sm text-brand-orange">{feature.subtitle}</div>
    </li>
  );
}

function FeatureIcon({ name }: { name?: HeroFormFeature["icon"] }) {
  switch (name) {
    case "users":
      return <UsersDuoIcon className="h-full w-full fill-brand-orange" aria-hidden="true" />;
    case "heart":
      return <HeartPulseIcon className="h-full w-full fill-brand-orange" aria-hidden="true" />;
    case "calendar":
    default:
      return <CalendarIcon className="h-full w-full fill-brand-orange" aria-hidden="true" />;
  }
}
