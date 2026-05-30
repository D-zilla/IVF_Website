"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeaderContent } from "@/lib/types";

export interface HeaderProps {
  content: HeaderContent;
}

export function Header({ content }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C2C2C2] bg-white">
      <div className="mx-auto flex h-[68px] max-w-site items-center justify-between gap-6 px-6 sm:h-[86px]">
        <Link href="/" aria-label={`${content.brand.name} home`}>
          <Image
            src="/images/logo.png"
            alt={content.brand.logoAlt}
            width={184}
            height={50}
            className="h-10 w-auto sm:h-[50px]"
            priority
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex lg:items-center lg:gap-8"
        >
          {content.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={content.ctaHref}
            className="inline-flex items-center justify-center rounded-card bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(239,118,35,0.28)] transition hover:-translate-y-0.5 hover:bg-brand-orangeDark sm:px-[30px] sm:py-[13px] sm:text-base"
          >
            {content.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-navy hover:bg-brand-orangeBg lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-divider bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-site px-6 py-4">
          <ul className="flex flex-col gap-1">
            {content.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-brand-orangeBg hover:text-brand-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
