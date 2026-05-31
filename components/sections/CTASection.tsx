import type { CTASectionContent } from "@/lib/types";
import { MotherChildIcon } from "@/components/ui/MotherChildIcon";
import {
  CalendarIcon,
  PhoneIcon,
  ShieldIcon,
  UsersIcon,
  ClockIcon,
} from "@/components/ui/icons";

export interface CTASectionProps {
  content: CTASectionContent;
}

const trustIcons = [ShieldIcon, UsersIcon, ClockIcon];

export function CTASection({ content }: CTASectionProps) {
  const secondaryExternal = content.secondaryCta?.href.startsWith("http");
  return (
    <section aria-labelledby="cta-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <div className="rounded-[18px] bg-[radial-gradient(120%_140%_at_50%_0%,#1f3160_0%,#0e1c40_60%,#0b1733_100%)] px-7 py-14 text-center text-white md:px-10 md:pb-[60px] md:pt-14">
          <div className="mx-auto mb-6 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[rgba(120,160,255,0.3)] bg-[rgba(56,98,196,0.35)]">
            <MotherChildIcon className="h-9 w-9 text-[#7aa0ff]" aria-hidden="true" />
          </div>
          <h2
            id="cta-heading"
            className="mb-4 text-[32px] font-extrabold md:text-[38px]"
          >
            {content.heading}
          </h2>
          <p className="mx-auto mb-8 max-w-[660px] text-base leading-relaxed text-[#aeb8d4]">
            {content.description}
          </p>
          <div className="mb-9 flex flex-wrap justify-center gap-[18px]">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2.5 rounded-card bg-brand-orange px-[30px] py-[15px] text-base font-bold text-white shadow-[0_6px_16px_rgba(239,118,35,0.28)] transition hover:-translate-y-0.5 hover:bg-brand-orangeDark"
            >
              <CalendarIcon className="h-[18px] w-[18px] fill-white" aria-hidden="true" />
              {content.primaryCta.label}
            </a>
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.href}
                {...(secondaryExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2.5 rounded-card border-[1.5px] border-white/45 px-[30px] py-[14px] text-base font-bold text-white transition hover:bg-white/10"
              >
                <PhoneIcon className="h-[18px] w-[18px] fill-white" aria-hidden="true" />
                {content.secondaryCta.label}
              </a>
            )}
          </div>
          {content.trustItems && content.trustItems.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[15px] text-[#aeb8d4]">
              {content.trustItems.map((item, i) => {
                const Icon = trustIcons[i % trustIcons.length];
                return (
                  <li key={item} className="inline-flex items-center gap-2.5">
                    <Icon className="h-[18px] w-[18px] fill-[#7aa0ff]" aria-hidden="true" />
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
