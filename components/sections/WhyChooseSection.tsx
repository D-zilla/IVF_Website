import Image from "next/image";
import type { WhyChooseSectionContent } from "@/lib/types";
import { DropletIcon } from "@/components/ui/icons";

export interface WhyChooseSectionProps {
  content: WhyChooseSectionContent;
}

export function WhyChooseSection({ content }: WhyChooseSectionProps) {
  return (
    <section aria-labelledby="why-choose-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <div className="rounded-panel bg-gradient-to-br from-[#13245b] to-brand-blue px-7 py-12 text-white md:px-10 md:py-[50px]">
          <h2
            id="why-choose-heading"
            className="mb-10 text-center text-[32px] font-bold"
          >
            {content.heading}
          </h2>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((f) => (
              <li key={f.title} className="text-center">
                {f.iconSrc ? (
                  <Image
                    src={f.iconSrc}
                    alt=""
                    width={46}
                    height={54}
                    sizes="46px"
                    className="mx-auto mb-4 h-[54px] w-[46px]"
                  />
                ) : (
                  <DropletIcon className="mx-auto mb-4 h-[54px] w-[46px] text-white" aria-hidden="true" />
                )}
                <h3 className="mb-2 text-[17px] font-bold">{f.title}</h3>
                {f.description && (
                  <p className="text-sm leading-snug text-[#cfd7ee]">{f.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
