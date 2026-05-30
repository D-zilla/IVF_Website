"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeaderContent } from "@/lib/types";
import { Logo } from "./Logo";

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
    <header className="sticky top-0 z-40 border-b border-divider bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-container items-center justify-between gap-6 px-4 py-3 lg:px-6">
        <Link
          href="/"
          aria-label={`${content.brand.name} home`}
          className="flex items-center gap-2"
        >
          <Logo className="h-10 w-auto" />
          <span className="sr-only">{content.brand.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex lg:items-center lg:gap-8"
        >
          {content.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={content.ctaHref}
            className="hidden rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 lg:inline-flex"
          >
            {content.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-secondary hover:bg-peach-100 lg:hidden"
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
        <nav aria-label="Mobile" className="mx-auto max-w-container px-4 py-4">
          <ul className="flex flex-col gap-1">
            {content.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-peach-50 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={content.ctaHref}
                onClick={() => setOpen(false)}
                className="block rounded-pill bg-primary px-5 py-3 text-center text-base font-semibold text-white hover:bg-primary-600"
              >
                {content.ctaLabel}
              </Link>
            </li>
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
