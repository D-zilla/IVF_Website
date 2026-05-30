import Image from "next/image";
import type { WhyChooseSectionContent } from "@/lib/types";

export interface WhyChooseSectionProps {
  content: WhyChooseSectionContent;
}

export function WhyChooseSection({ content }: WhyChooseSectionProps) {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-secondary text-white"
    >
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="why-choose-heading"
          className="text-center font-display text-2xl font-bold sm:text-3xl"
        >
          {content.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {content.features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                {f.iconSrc ? (
                  <Image src={f.iconSrc} alt="" width={32} height={32} sizes="32px" />
                ) : (
                  <DropIcon className="h-8 w-8 text-primary" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-3 text-sm font-semibold sm:text-base">{f.title}</h3>
              {f.description && (
                <p className="mt-1 text-xs text-white/70 sm:text-sm">{f.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DropIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5c4.5 5.2 7 9 7 12.5a7 7 0 1 1-14 0c0-3.5 2.5-7.3 7-12.5Z" />
    </svg>
  );
}
