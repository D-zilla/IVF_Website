import Link from "next/link";
import type { FooterContent } from "@/lib/types";
import { Logo } from "./Logo";

export interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-surface-navy text-white">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 lg:py-16">
        <div>
          <Link href="/" aria-label={`${content.brand.name} home`} className="inline-flex">
            <Logo variant="inverse" className="h-12 w-auto" />
            <span className="sr-only">{content.brand.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            {content.description}
          </p>
        </div>

        <FooterColumn column={content.quickLinks} />
        <FooterColumn column={content.services} />

        <div>
          <h2 className="text-lg font-semibold text-white">{content.contact.title}</h2>
          <ul className="mt-4 space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <BuildingIcon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
              <span>
                <span className="sr-only">{content.contact.address.label}: </span>
                {content.contact.address.value}
              </span>
            </li>
            {content.contact.phones.map((phone) => (
              <li key={phone.value} className="flex items-start gap-3">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-white/60">
                    {phone.label}
                  </span>
                  {phone.href ? (
                    <a href={phone.href} className="font-semibold text-white hover:underline">
                      {phone.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-white">{phone.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-container px-4 py-5 text-center text-sm text-white/70 lg:px-6">
          {content.copyright}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ column }: { column: FooterContent["quickLinks"] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{column.title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/80 hover:text-white hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h12M4 21H2M16 21h4V11h-4" strokeLinejoin="round" />
      <path d="M8 7h2M8 11h2M8 15h2M12 7h0M12 11h0M12 15h0" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
