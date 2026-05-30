import Image from "next/image";
import type { ComplianceNoticeContent } from "@/lib/types";
import { CheckIcon } from "@/components/ui/icons";

export interface ComplianceNoticeProps {
  content: ComplianceNoticeContent;
}

export function ComplianceNotice({ content }: ComplianceNoticeProps) {
  return (
    <section aria-labelledby="compliance-heading" className="pb-16 pt-6">
      <div className="mx-auto max-w-site px-6">
        <div className="overflow-hidden rounded-panel bg-gradient-to-br from-brand-navy to-brand-blue px-7 py-12 text-white md:px-[52px]">
          <div className="mb-9 flex items-center justify-center gap-[18px]">
            <span className="h-[3px] w-[62px] rounded-sm bg-brand-orange" aria-hidden="true" />
            <h2 id="compliance-heading" className="text-[26px] font-bold text-brand-orange">
              {content.heading}
            </h2>
            <span className="h-[3px] w-[62px] rounded-sm bg-brand-orange" aria-hidden="true" />
          </div>
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <ul className="flex flex-col gap-[18px]">
              {content.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3.5 text-base font-medium">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange">
                    <CheckIcon className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            {content.image && (
              <div className="justify-self-center">
                <div className="relative flex h-[230px] w-[200px] items-center justify-center overflow-hidden rounded-full border-2 border-white/85">
                  <Image
                    src={content.image.src}
                    alt={content.image.alt}
                    width={300}
                    height={300}
                    className="absolute -bottom-3 -right-6 max-w-none opacity-40 brightness-0 invert"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
