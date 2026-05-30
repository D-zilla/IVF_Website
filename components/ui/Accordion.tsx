"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemContent {
  id?: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemContent[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(defaultOpen));

  function toggle(index: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? index}
          item={item}
          open={openSet.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: AccordionItemContent;
  open: boolean;
  onToggle: () => void;
}) {
  const headerId = useId();
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-xl border border-divider bg-white shadow-sm">
      <h3 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink hover:bg-peach-50 sm:text-base"
        >
          <span>{item.title}</span>
          <span
            className={cn(
              "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-transform",
              open && "rotate-180",
            )}
            aria-hidden="true"
          >
            <ChevronIcon className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!open}
        className="border-t border-divider px-5 py-4 text-sm text-ink-muted sm:text-base"
      >
        {item.content}
      </div>
    </div>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
