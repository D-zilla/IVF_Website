import Image from "next/image";
import Link from "next/link";
import type { HeroImageContent } from "@/lib/types";
import { CalendarIcon, WhatsAppIcon } from "@/components/ui/icons";

export interface HeroImageProps {
  content: HeroImageContent;
}

export function HeroImage({ content }: HeroImageProps) {
  const secondaryExternal = content.secondaryCta?.href.startsWith("http");
  return (
    <section id="about" aria-labelledby="hero-title" className="pt-9">
      <div className="mx-auto w-full max-w-site px-6">
        <div className="grid items-center gap-6 overflow-hidden rounded-panel bg-brand-orangeBg px-7 py-10 md:grid-cols-[1.02fr_0.98fr] md:py-0 md:pl-[52px] md:pr-0">
          <div className="max-w-[540px] py-2 md:py-[52px]">
            {content.eyebrow && (
              <span className="mb-4 inline-flex w-fit rounded-pill bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-orange">
                {content.eyebrow}
              </span>
            )}
            <h1
              id="hero-title"
              className="mb-[18px] text-[34px] font-extrabold leading-[1.16] tracking-[-0.5px] text-[#111] md:text-5xl"
            >
              {content.title}
            </h1>
            <p className="mb-7 max-w-[430px] text-[15.5px] leading-[1.7] text-muted">
              {content.description}
            </p>
            <dl className="mb-7 flex gap-6 sm:gap-10">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-[36px] font-extrabold leading-none text-[#111]">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-[13px] text-subtle">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href={content.primaryCta.href}
                className="inline-flex items-center gap-2.5 rounded-card bg-white px-[26px] py-[13px] text-base font-bold text-brand-orange shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
              >
                <CalendarIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                {content.primaryCta.label}
              </Link>
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.href}
                  {...(secondaryExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2.5 rounded-card bg-white px-[26px] py-[13px] text-base font-bold text-brand-green shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                  {content.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
          <div className="relative min-h-[340px] self-stretch md:min-h-[520px]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain object-bottom md:object-right-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
