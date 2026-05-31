import Image from "next/image";
import Link from "next/link";
import type { FooterContent } from "@/lib/types";
import { BuildingIcon, PhoneFooterIcon } from "@/components/ui/icons";

export interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-brand-footer pb-8 pt-16 text-white">
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <Link href="/" aria-label={`${content.brand.name} home`} className="inline-flex">
              <Image
                src="/images/logo.png"
                alt={content.brand.logoAlt}
                width={184}
                height={52}
                className="mb-5 h-[52px] w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-[260px] text-[15px] leading-relaxed text-[#c4cad8]">
              {content.description}
            </p>
          </div>

          <div>
            <h2 className="mb-[22px] text-[22px] font-bold">{content.contact.title}</h2>
            <div className="flex flex-col gap-[22px]">
              <div className="flex items-start gap-3.5">
                <BuildingIcon className="mt-0.5 h-[22px] w-[22px] shrink-0 fill-white" aria-hidden="true" />
                <div className="text-[15px] font-medium">
                  <span className="sr-only">{content.contact.address.label}: </span>
                  {content.contact.address.value}
                </div>
              </div>
              {content.contact.phones.map((phone) => (
                <div key={phone.value} className="flex items-start gap-3.5">
                  <PhoneFooterIcon className="mt-0.5 h-[22px] w-[22px] shrink-0 fill-white" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-[#c4cad8]">{phone.label}</div>
                    {phone.href ? (
                      <a href={phone.href} className="mt-0.5 block text-[17px] font-bold hover:text-brand-orange">
                        {phone.value}
                      </a>
                    ) : (
                      <div className="mt-0.5 text-[17px] font-bold">{phone.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-11 border-t border-white/15" />
        <div className="text-center text-sm text-[#c4cad8]">{content.copyright}</div>
      </div>
    </footer>
  );
}
