import Image from "next/image";
import type { ReviewContent } from "@/lib/types";
import { StarIcon, GoogleIcon } from "@/components/ui/icons";

export interface ReviewCardProps {
  review: ReviewContent;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));
  const isGoogle = review.sourceLabel?.toLowerCase() === "google";
  return (
    <div className="h-full rounded-xl border border-[#eee] bg-white p-[22px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
      <div className="mb-3.5 flex items-center gap-3">
        <div
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-brand-orange text-lg font-bold text-white"
          aria-hidden="true"
        >
          {review.avatarLetter ?? review.author.charAt(0)}
        </div>
        <div>
          <div className="text-base font-bold">{review.author}</div>
          {review.timeAgo && (
            <div className="text-[13px] text-subtle">{review.timeAgo}</div>
          )}
        </div>
        {review.sourceIconSrc ? (
          <Image
            src={review.sourceIconSrc}
            alt={review.sourceLabel ?? ""}
            width={22}
            height={22}
            sizes="22px"
            className="ml-auto"
          />
        ) : isGoogle ? (
          <GoogleIcon className="ml-auto h-[22px] w-[22px]" aria-label="Google review" />
        ) : review.sourceLabel ? (
          <span className="ml-auto text-xs font-medium text-subtle">{review.sourceLabel}</span>
        ) : null}
      </div>
      <div
        role="img"
        className="mb-3 flex gap-[3px]"
        aria-label={`Rating: ${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i < rating ? "fill-[#FFB400]" : "fill-[#E0E0E0]"}`}
          />
        ))}
      </div>
      <p className="text-[15px] leading-[1.55] text-[#222]">{review.body}</p>
    </div>
  );
}
