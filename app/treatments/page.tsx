import type { Metadata } from "next";
import { StubPage } from "@/components/sections/StubPage";
import stubs from "@/content/stubs.json";
import { buildMetadata } from "@/lib/seo";
import type { StubsContent } from "@/lib/types";

const content = (stubs as StubsContent).treatments;

export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: content.description,
  canonical: "/treatments",
});

export default function TreatmentsPage() {
  return <StubPage content={content} />;
}
