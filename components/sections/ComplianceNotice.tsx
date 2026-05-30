import Image from "next/image";
import type { ComplianceNoticeContent } from "@/lib/types";

export interface ComplianceNoticeProps {
  content: ComplianceNoticeContent;
}

export function ComplianceNotice({ content }: ComplianceNoticeProps) {
  return (
    <section
      aria-labelledby="compliance-heading"
      className="bg-secondary text-white"
    >
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-primary" aria-hidden="true" />
          <h2 id="compliance-heading" className="font-display text-xl font-bold text-primary-500 sm:text-2xl">
            {content.heading}
          </h2>
          <span className="h-px w-10 bg-primary" aria-hidden="true" />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-center">
          <ul className="flex flex-col gap-3">
            {content.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-white/90">{b}</span>
              </li>
            ))}
          </ul>
          {content.image && (
            <div className="relative mx-auto aspect-square w-48 sm:w-56 lg:w-full lg:max-w-xs">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 320px, 240px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
