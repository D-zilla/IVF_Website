import type { Metadata } from "next";
import type { PageMeta } from "./types";

export const SITE_URL = "https://example.com";
export const SITE_NAME = "Alchemy IVF";
export const DEFAULT_OG_IMAGE = {
  url: "/images/hero-family.svg",
  width: 800,
  height: 600,
  alt: "Alchemy IVF clinic preview",
};

export function buildMetadata(meta: PageMeta): Metadata {
  const og = meta.ogImage
    ? { url: meta.ogImage.src, width: meta.ogImage.width, height: meta.ogImage.height, alt: meta.ogImage.alt }
    : DEFAULT_OG_IMAGE;
  return {
    title: meta.title,
    description: meta.description,
    alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: meta.canonical ?? "/",
      images: [og],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [og.url],
    },
  };
}
