import type { FAQSectionContent } from "@/lib/types";
import { Accordion } from "@/components/ui/Accordion";

export interface FAQAccordionProps {
  content: FAQSectionContent;
}

export function FAQAccordion({ content }: FAQAccordionProps) {
  const half = Math.ceil(content.items.length / 2);
  const left = content.items.slice(0, half);
  const right = content.items.slice(half);

  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="faq-heading"
          className="text-center font-display text-2xl font-bold text-secondary sm:text-3xl"
        >
          {content.heading}
        </h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-2 lg:gap-4">
          <Accordion
            items={left.map((i) => ({ title: i.question, content: i.answer }))}
            allowMultiple
          />
          <Accordion
            items={right.map((i) => ({ title: i.question, content: i.answer }))}
            allowMultiple
          />
        </div>
      </div>
    </section>
  );
}
