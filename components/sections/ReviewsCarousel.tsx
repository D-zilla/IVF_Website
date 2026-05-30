"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewsSectionContent } from "@/lib/types";
import { ReviewCard } from "./ReviewCard";
import { cn } from "@/lib/utils";

export interface ReviewsCarouselProps {
  content: ReviewsSectionContent;
}

export function ReviewsCarousel({ content }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const child = el.querySelector("li");
    const step = child ? (child as HTMLElement).offsetWidth + 16 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="reviews-heading" className="bg-white">
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="reviews-heading"
          className="text-center font-display text-2xl font-bold text-secondary sm:text-3xl"
        >
          {content.heading}
        </h2>

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous review"
            className={cn(
              "absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-divider text-secondary hover:bg-peach-50 sm:flex",
              !canPrev && "opacity-40",
            )}
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <ul
            ref={trackRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
          >
            {content.reviews.map((r, i) => (
              <li
                key={i}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[32%]"
              >
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next review"
            className={cn(
              "absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-divider text-secondary hover:bg-peach-50 sm:flex",
              !canNext && "opacity-40",
            )}
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
