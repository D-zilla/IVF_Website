// JSON-LD builders. Each returns a plain object that <JsonLd> serialises.

import type { FAQSectionContent, SiteContent } from "./types";
import { SITE_NAME, SITE_URL } from "./seo";

export interface MedicalClinicArgs {
  site: SiteContent;
  imagePath?: string;
}

// Sitewide organisation schema. Alchemy IVF is an advisory/consultancy
// business, so it is modelled as a ProfessionalService (not a MedicalClinic).
export function medicalClinicSchema({ site, imagePath = "/images/hero-hands.png" }: MedicalClinicArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${imagePath}`,
    description:
      "Alchemy IVF is a trusted fertility service provider in Kathmandu, Nepal, offering expert fertility consultation, reproductive wellness guidance, gyno support and treatment facilitation for couples on their journey to parenthood.",
    areaServed: "Nepal",
    knowsAbout: [
      "IVF",
      "IUI",
      "ICSI",
      "Fertility preservation",
      "Donor programs",
      "Infertility",
    ],
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
