import Image from "next/image";
import type { ReviewContent } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export interface ReviewCardProps {
  review: ReviewContent;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));
  return (
    <Card tone="default" padding="md" radius="xl" className="flex h-full flex-col gap-3">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            aria-hidden="true"
          >
            {review.avatarLetter ?? review.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-secondary">{review.author}</p>
            {review.timeAgo && (
              <p className="text-xs text-ink-subtle">{review.timeAgo}</p>
            )}
          </div>
        </div>
        {review.sourceIconSrc ? (
          <Image
            src={review.sourceIconSrc}
            alt={review.sourceLabel ?? ""}
            width={20}
            height={20}
            sizes="20px"
          />
        ) : review.sourceLabel ? (
          <span className="text-xs font-medium text-ink-subtle">{review.sourceLabel}</span>
        ) : null}
      </header>
      <div
        role="img"
        className="flex items-center gap-0.5 text-amber-500"
        aria-label={`Rating: ${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4" filled={i < rating} />
        ))}
      </div>
      <p className="text-sm text-ink-muted">{review.body}</p>
    </Card>
  );
}

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinejoin="round"
        d="m12 3 2.6 5.6 6.1.6-4.6 4.2 1.4 6-5.5-3.2-5.5 3.2 1.4-6L3.3 9.2l6.1-.6L12 3Z"
      />
    </svg>
  );
}
