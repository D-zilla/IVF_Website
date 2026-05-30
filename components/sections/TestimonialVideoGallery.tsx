import Image from "next/image";
import type { TestimonialGalleryContent, TestimonialVideo } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export interface TestimonialVideoGalleryProps {
  content: TestimonialGalleryContent;
}

// Desktop collage uses a 6-cell layout; falls back to a swipeable
// horizontal carousel (scroll-snap) on mobile so all videos remain reachable.
const cellClasses = [
  "col-span-2 row-span-2 aspect-square",
  "col-span-2 row-span-1 aspect-[2/1]",
  "col-span-2 row-span-2 aspect-square",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-1 aspect-square",
  "col-span-2 row-span-1 aspect-[2/1]",
];

export function TestimonialVideoGallery({ content }: TestimonialVideoGalleryProps) {
  return (
    <section
      aria-labelledby="testimonial-gallery-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="testimonial-gallery-heading"
          className="text-center font-display text-2xl font-bold text-secondary sm:text-3xl"
        >
          {content.heading}
        </h2>

        {/* Mobile: swipeable carousel */}
        <div className="mt-8 lg:hidden">
          <ul
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
            aria-label="Patient story carousel"
          >
            {content.videos.map((v, i) => (
              <li
                key={i}
                className="relative aspect-square w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl bg-secondary/10 sm:w-[45%]"
              >
                <VideoTile video={v} />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: collage */}
        <ul className="mt-12 hidden grid-cols-6 grid-rows-2 gap-4 lg:grid">
          {content.videos.slice(0, 6).map((v, i) => (
            <li
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-secondary/10 ${cellClasses[i] ?? "col-span-2 row-span-1 aspect-[2/1]"}`}
            >
              <VideoTile video={v} />
            </li>
          ))}
        </ul>

        {content.viewAll && (
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href={content.viewAll.href}
              variant="primary"
              size="md"
              iconRight={<ArrowIcon className="h-4 w-4" />}
            >
              {content.viewAll.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}

function VideoTile({ video }: { video: TestimonialVideo }) {
  const Wrapper: React.ElementType = video.videoUrl ? "a" : "div";
  const wrapperProps = video.videoUrl
    ? { href: video.videoUrl, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="group block h-full w-full"
      aria-label={video.caption}
    >
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 70vw"
        className="object-cover transition group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/25">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-primary shadow-md sm:h-14 sm:w-14">
          <PlayIcon className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </span>
      {video.caption && (
        <span className="sr-only">{video.caption}</span>
      )}
    </Wrapper>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
