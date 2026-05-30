import type { Metadata } from "next";
import { StubPage } from "@/components/sections/StubPage";
import stubs from "@/content/stubs.json";
import { buildMetadata } from "@/lib/seo";
import type { StubsContent } from "@/lib/types";

const content = (stubs as StubsContent).blog;

export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: content.description,
  canonical: "/blog",
});

export default function BlogPage() {
  return <StubPage content={content} />;
}
