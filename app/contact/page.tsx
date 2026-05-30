import type { Metadata } from "next";
import { ComplianceNotice } from "@/components/sections/ComplianceNotice";
import { HeroForm } from "@/components/sections/HeroForm";
import contactContent from "@/content/contact.json";
import { buildMetadata } from "@/lib/seo";
import type { ContactContent } from "@/lib/types";

const content = contactContent as ContactContent;

export const metadata: Metadata = buildMetadata(content.meta);

export default function ContactPage() {
  return (
    <>
      <HeroForm content={content.hero} />
      <ComplianceNotice content={content.compliance} />
    </>
  );
}
