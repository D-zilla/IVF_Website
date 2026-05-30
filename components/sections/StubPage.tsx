import type { StubPageContent } from "@/lib/types";

export interface StubPageProps {
  content: StubPageContent;
}

export function StubPage({ content }: StubPageProps) {
  return (
    <section
      aria-labelledby="stub-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-container px-4 py-20 sm:py-24 lg:px-6 lg:py-32">
        <h1
          id="stub-heading"
          className="font-display text-3xl font-bold text-secondary sm:text-4xl"
        >
          {content.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
          {content.body}
        </p>
      </div>
    </section>
  );
}
