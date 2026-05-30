"use client";

import { useId, useState } from "react";
import type { FAQItem, FAQSectionContent } from "@/lib/types";
import { PlusIcon } from "@/components/ui/icons";

export interface FAQAccordionProps {
  content: FAQSectionContent;
}

export function FAQAccordion({ content }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <h2
          id="faq-heading"
          className="mb-11 text-center text-3xl font-bold sm:text-4xl"
        >
          {content.heading}
        </h2>
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-x-[22px] gap-y-[18px] md:grid-cols-2">
          {content.items.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  return (
    <div className="overflow-hidden rounded-card border border-[#eee] bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3.5 px-5 py-[18px] text-left text-base font-bold"
      >
        {item.question}
        <span
          className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-brand-orange text-brand-orange transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <PlusIcon className="h-3 w-3 fill-brand-orange" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
