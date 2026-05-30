import Image from "next/image";
import type { TestimonialGalleryContent, TestimonialVideo } from "@/lib/types";
import { PlayIcon, ArrowRightIcon } from "@/components/ui/icons";

export interface TestimonialVideoGalleryProps {
  content: TestimonialGalleryContent;
}

// Desktop bento collage (12-col). Mobile falls back to a 2-col grid so every
// tile stays reachable and the layout matches the design's mosaic feel.
const cellClasses = [
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-2 row-span-2 md:col-span-4 md:row-span-4",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-2 row-span-1 md:col-span-2 md:row-span-2 md:row-start-2",
];

export function TestimonialVideoGallery({ content }: TestimonialVideoGalleryProps) {
  return (
    <section
      aria-labelledby="testimonial-gallery-heading"
      className="bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-site px-6">
        <h2
          id="testimonial-gallery-heading"
          className="mb-9 text-center text-2xl font-bold sm:text-3xl md:mb-11 md:text-4xl"
        >
          {content.heading}
        </h2>

        <ul className="mx-auto mb-8 grid max-w-[940px] auto-rows-[110px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[100px] md:grid-cols-12">
          {content.videos.slice(0, 6).map((v, i) => (
            <li
              key={i}
              className={`group relative overflow-hidden rounded-[10px] shadow-[0_6px_16px_rgba(0,0,0,0.1)] ${cellClasses[i] ?? "col-span-1 row-span-1 md:col-span-3 md:row-span-2"}`}
            >
              <VideoTile video={v} />
            </li>
          ))}
        </ul>

        {content.viewAll && (
          <div className="flex justify-center">
            <a
              href={content.viewAll.href}
              className="group inline-flex items-center gap-3 text-base font-bold"
            >
              {content.viewAll.label}
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-brand-orange transition group-hover:translate-x-1">
                <ArrowRightIcon className="h-3 w-[9px] fill-white" aria-hidden="true" />
              </span>
            </a>
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
      className="block h-full w-full"
      aria-label={video.caption}
    >
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-110">
        <PlayIcon className="ml-0.5 h-4 w-4 fill-brand-orange" aria-hidden="true" />
      </span>
      {video.caption && <span className="sr-only">{video.caption}</span>}
    </Wrapper>
  );
}
