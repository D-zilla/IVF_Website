import Image from "next/image";
import Link from "next/link";
import type { TrustSectionContent } from "@/lib/types";
import { CheckIcon, PersonalCareIcon } from "@/components/ui/icons";

export interface TrustSectionProps {
  content: TrustSectionContent;
}

export function TrustSection({ content }: TrustSectionProps) {
  const secondaryExternal = content.secondaryCta?.href.startsWith("http");
  return (
    <section aria-labelledby="trust-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <div className="rounded-panel bg-gradient-to-br from-[#13245b] to-brand-blue px-7 py-12 text-white md:px-[52px] md:py-[54px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 id="trust-heading" className="mb-[18px] text-[32px] font-bold">
                {content.heading}
              </h2>
              <p className="mb-6 max-w-[430px] text-[15px] leading-[1.7] text-[#d7ddf0]">
                {content.description}
              </p>
              <ul className="mb-7 flex flex-col gap-4">
                {content.points.map((point) => (
                  <li key={point} className="flex items-center gap-3.5 text-base font-medium">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange">
                      <CheckIcon className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  href={content.primaryCta.href}
                  className="inline-flex items-center rounded-card bg-white px-[26px] py-[13px] text-base font-bold text-brand-orange transition hover:-translate-y-0.5"
                >
                  {content.primaryCta.label}
                </Link>
                {content.secondaryCta && (
                  <a
                    href={content.secondaryCta.href}
                    {...(secondaryExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center rounded-card bg-white px-[26px] py-[13px] text-base font-bold text-brand-green transition hover:-translate-y-0.5"
                  >
                    {content.secondaryCta.label}
                  </a>
                )}
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-[18px]">
              {content.highlights.map((h) => (
                <li
                  key={h.title}
                  className="flex h-[120px] flex-col items-center justify-center gap-3 rounded-card bg-brand-orange transition hover:-translate-y-1"
                >
                  {h.iconSrc ? (
                    <Image src={h.iconSrc} alt="" width={42} height={42} sizes="42px" />
                  ) : (
                    <PersonalCareIcon className="h-[42px] w-[42px] fill-white" aria-hidden="true" />
                  )}
                  <span className="text-base font-bold">{h.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
