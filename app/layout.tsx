import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import site from "@/content/site.json";
import { medicalClinicSchema } from "@/lib/schema";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { SiteContent } from "@/lib/types";
import "./globals.css";

const content = site as SiteContent;
const clinicSchema = medicalClinicSchema({ site: content });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Advanced Fertility & IVF Care`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Alchemy IVF — advanced fertility, IVF, IUI, ICSI, donor program and fertility preservation in Kathmandu.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Advanced Fertility & IVF Care`,
    description:
      "Advanced fertility & IVF care from experienced specialists in Kathmandu.",
    url: "/",
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Advanced Fertility & IVF Care`,
    description:
      "Advanced fertility & IVF care from experienced specialists in Kathmandu.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <TopBar content={content.topBar} />
        <Header content={content.header} />
        <main id="main">{children}</main>
        <Footer content={content.footer} />
        <WhatsAppFloat content={content.whatsapp} />
        <JsonLd data={clinicSchema} id="ld-medical-clinic" />
      </body>
    </html>
  );
}
