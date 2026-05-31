// JSON-LD builders. Each returns a plain object that <JsonLd> serialises.

import type { FAQSectionContent, SiteContent } from "./types";
import { SITE_NAME, SITE_URL } from "./seo";

export interface MedicalClinicArgs {
  site: SiteContent;
  imagePath?: string;
}

export function medicalClinicSchema({ site, imagePath = "/images/hero-hands.png" }: MedicalClinicArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${imagePath}`,
    description:
      "Alchemy IVF is a leading fertility and IVF clinic in Kathmandu, Nepal, offering IVF, IUI, ICSI, donor egg/sperm programs and fertility preservation with an internationally accredited embryology lab.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.topBar.location.split(",")[0]?.trim(),
      addressCountry: site.topBar.location.split(",")[1]?.trim() ?? undefined,
      streetAddress: site.footer.contact.address.value,
    },
    telephone: site.topBar.phone.tel,
    contactPoint: site.footer.contact.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.href?.replace("tel:", "") ?? p.value,
      contactType: "customer service",
      areaServed: p.label,
    })),
    medicalSpecialty: "Reproductive Endocrinology",
  };
}

export function faqPageSchema(faq: FAQSectionContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
