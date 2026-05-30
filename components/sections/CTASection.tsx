import type { CTASectionContent } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export interface CTASectionProps {
  content: CTASectionContent;
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="bg-secondary text-white">
      <div className="mx-auto flex max-w-container flex-col items-center px-4 py-12 text-center sm:py-16 lg:px-6 lg:py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
          <HeartIcon className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <h2 id="cta-heading" className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          {content.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          {content.description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={content.primaryCta.href} size="lg">
            {content.primaryCta.label}
          </ButtonLink>
          {content.secondaryCta && (
            <ButtonLink
              href={content.secondaryCta.href}
              variant="outlineInverse"
              size="lg"
              external={content.secondaryCta.href.startsWith("http")}
            >
              {content.secondaryCta.label}
            </ButtonLink>
          )}
        </div>
        {content.trustItems && content.trustItems.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70 sm:text-sm">
            {content.trustItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <DotIcon className="h-2 w-2 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Z" />
    </svg>
  );
}

function DotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 8" fill="currentColor" {...props}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
