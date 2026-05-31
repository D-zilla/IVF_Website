import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const content = site as SiteContent;
const clinicSchema = medicalClinicSchema({ site: content });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Trusted IVF & Fertility Consultancy in Kathmandu, Nepal`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Alchemy IVF is a trusted fertility service provider in Kathmandu, Nepal, offering expert fertility consultation, reproductive wellness guidance, gyno support and treatment facilitation for couples on their journey to parenthood.",
  keywords: [
    "IVF consultancy Kathmandu",
    "fertility consultant Nepal",
    "IVF guidance Kathmandu",
    "IUI Nepal",
    "ICSI advice",
    "infertility consultation Nepal",
    "best fertility consultant Kathmandu",
    "fertility advisor Nepal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Trusted IVF & Fertility Consultancy in Kathmandu, Nepal`,
    description:
      "Trusted fertility consultancy in Kathmandu guiding couples through IVF, IUI, ICSI, donor programs and fertility preservation with expert, personalised advice.",
    url: "/",
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Trusted IVF & Fertility Consultancy in Kathmandu, Nepal`,
    description:
      "Trusted fertility consultancy in Kathmandu guiding couples through IVF, IUI, ICSI, donor programs and fertility preservation.",
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-surface font-sans text-ink antialiased">
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
