import type { TopBarContent } from "@/lib/types";

export interface TopBarProps {
  content: TopBarContent;
}

export function TopBar({ content }: TopBarProps) {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex max-w-container flex-col items-center justify-center gap-1 px-4 py-2 text-sm sm:flex-row sm:gap-10">
        <span className="inline-flex items-center gap-2">
          <LocationIcon className="h-4 w-4" aria-hidden="true" />
          <span>{content.location}</span>
        </span>
        <a
          href={`tel:${content.phone.tel}`}
          className="inline-flex items-center gap-2 hover:underline"
          aria-label={`${content.phone.label} ${content.phone.display}`}
        >
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          <span>{content.phone.display}</span>
        </a>
      </div>
    </div>
  );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
