import Image from "next/image";
import type { HeroFormContent, HeroFormFeature } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConsultationForm } from "./ConsultationForm";

export interface HeroFormProps {
  content: HeroFormContent;
}

export function HeroForm({ content }: HeroFormProps) {
  return (
    <section aria-labelledby="hero-form-title" className="bg-white">
      <div className="mx-auto grid max-w-container gap-8 px-4 py-10 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-6 lg:py-16">
        <Card tone="default" padding="lg" radius="2xl" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-pill bg-peach-100 px-3 py-1 text-xs font-semibold text-primary-800">
              <HeartPulseIcon className="h-4 w-4" aria-hidden="true" />
              {content.trust.badgeLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ul className="flex -space-x-2" aria-label="Patient avatars">
              {content.trust.avatars.map((avatar, i) => (
                <li key={i} className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <span className="text-xl font-bold text-primary-700">{content.trust.rating}</span>
            <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
              <CommentIcon className="h-4 w-4" aria-hidden="true" />
              {content.trust.reviewsLabel}
            </span>
          </div>
          <p className="text-sm font-semibold text-ink">{content.trust.trustLine}</p>

          <div>
            <p className="font-display text-2xl font-bold text-primary-700 sm:text-3xl">
              {content.titleHighlight}
            </p>
            <h1
              id="hero-form-title"
              className="mt-3 border-l-4 border-secondary pl-3 font-display text-2xl font-bold text-secondary sm:text-3xl"
            >
              {content.title}
            </h1>
            <p className="mt-4 text-sm text-ink-muted sm:text-base">{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.features.map((feature) => (
              <FeatureTile key={feature.title} feature={feature} />
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-4">
          <ConsultationForm content={content.form} />
          <ButtonLink
            href={content.whatsappCta.href}
            variant="whatsapp"
            size="lg"
            external
            iconLeft={<PhoneIcon className="h-5 w-5" />}
          >
            {content.whatsappCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ feature }: { feature: HeroFormFeature }) {
  return (
    <li className="rounded-xl bg-peach-100 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary">
        <FeatureIcon name={feature.icon} className="h-5 w-5" />
      </div>
      <p className="mt-3 text-lg font-bold text-primary-800">{feature.title}</p>
      <p className="text-xs font-medium text-ink-muted">{feature.subtitle}</p>
    </li>
  );
}

function FeatureIcon({
  name,
  className,
}: {
  name?: HeroFormFeature["icon"];
  className?: string;
}) {
  switch (name) {
    case "users":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3 0-7 1.5-7 4.5V21h14v-2.5C15 15.5 11 14 8 14Zm10-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-1 0-2 .2-2.8.5a6.7 6.7 0 0 1 2.3 4V21h5v-2.5c0-2.5-3-4-4.5-4Z" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
          <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calendar":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
      );
  }
}

function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Zm-3.5-9h2l1-2 2 4 1-2H17" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="m12 3 2.6 5.6 6.1.6-4.6 4.2 1.4 6-5.5-3.2-5.5 3.2 1.4-6L3.3 9.2l6.1-.6L12 3Z" />
    </svg>
  );
}

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
