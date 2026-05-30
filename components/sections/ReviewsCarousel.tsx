"use client";

import { useState } from "react";
import type { ReviewsSectionContent } from "@/lib/types";
import { ReviewCard } from "./ReviewCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

export interface ReviewsCarouselProps {
  content: ReviewsSectionContent;
}

export function ReviewsCarousel({ content }: ReviewsCarouselProps) {
  const reviews = content.reviews;
  const [start, setStart] = useState(0);
  const count = reviews.length;
  const visible = [0, 1, 2].map((i) => reviews[(start + i) % count]);

  return (
    <section aria-labelledby="reviews-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <h2
          id="reviews-heading"
          className="mb-11 text-center text-3xl font-bold sm:text-4xl"
        >
          {content.heading}
        </h2>
        <div className="flex items-center justify-center gap-[18px]">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => setStart((s) => (s - 1 + count) % count)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-orange bg-white text-brand-orange transition hover:bg-brand-orange hover:text-white"
          >
            <ChevronLeftIcon className="h-3 w-3 fill-current" aria-hidden="true" />
          </button>
          <div className="grid flex-1 grid-cols-1 gap-[22px] md:grid-cols-3">
            {visible.map((r, i) => (
              <div key={i} className={i === 0 ? "" : "hidden md:block"}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => setStart((s) => (s + 1) % count)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-orange bg-white text-brand-orange transition hover:bg-brand-orange hover:text-white"
          >
            <ChevronRightIcon className="h-3 w-3 fill-current" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
