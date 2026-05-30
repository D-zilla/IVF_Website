import Image from "next/image";
import type { HeroImageContent } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { StatBlock } from "./StatBlock";

export interface HeroImageProps {
  content: HeroImageContent;
}

export function HeroImage({ content }: HeroImageProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-peach-100"
    >
      <div className="mx-auto grid max-w-container gap-8 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6 lg:py-20">
        <div className="flex flex-col gap-6">
          {content.eyebrow && (
            <span className="inline-flex w-fit rounded-pill bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {content.eyebrow}
            </span>
          )}
          <h1
            id="hero-title"
            className="font-display text-3xl font-bold leading-tight text-secondary sm:text-4xl lg:text-5xl"
          >
            {content.title}
          </h1>
          <p className="max-w-xl text-base text-ink-muted sm:text-lg">
            {content.description}
          </p>
          <StatBlock stats={content.stats} />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <ButtonLink href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </ButtonLink>
            {content.secondaryCta && (
              <ButtonLink
                href={content.secondaryCta.href}
                variant="whatsapp"
                size="lg"
                external={content.secondaryCta.href.startsWith("http")}
                iconLeft={<PhoneIcon className="h-5 w-5" />}
              >
                {content.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-peach-200 lg:aspect-[5/4]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
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
