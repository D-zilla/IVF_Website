import Image from "next/image";
import type { TrustSectionContent } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface TrustSectionProps {
  content: TrustSectionContent;
}

export function TrustSection({ content }: TrustSectionProps) {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-secondary text-white"
    >
      <div className="mx-auto grid max-w-container gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:px-6 lg:py-20">
        <div className="flex flex-col gap-6">
          <h2 id="trust-heading" className="font-display text-2xl font-bold sm:text-3xl">
            {content.heading}
          </h2>
          <p className="text-sm text-white/80 sm:text-base">{content.description}</p>
          <ul className="flex flex-col gap-3">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckBadgeIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </ButtonLink>
            {content.secondaryCta && (
              <ButtonLink
                href={content.secondaryCta.href}
                variant="whatsapp"
                size="lg"
                external
              >
                {content.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {content.highlights.map((h) => (
            <li key={h.title}>
              <Card
                tone="primary"
                padding="md"
                radius="xl"
                className="flex h-full flex-col items-center justify-center text-center"
              >
                {h.iconSrc ? (
                  <Image src={h.iconSrc} alt="" width={32} height={32} sizes="32px" />
                ) : (
                  <PlusBadgeIcon className="h-8 w-8 text-white" aria-hidden="true" />
                )}
                <p className="mt-2 text-sm font-semibold sm:text-base">{h.title}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckBadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Zm-1 13L7 11l1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z" />
    </svg>
  );
}

function PlusBadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 9v6M9 12h6" strokeLinecap="round" />
    </svg>
  );
}
