import type { TopBarContent } from "@/lib/types";
import { LocationIcon, PhoneIcon } from "@/components/ui/icons";

export interface TopBarProps {
  content: TopBarContent;
}

export function TopBar({ content }: TopBarProps) {
  return (
    <div className="bg-brand-orange text-white">
      <div className="mx-auto flex h-12 max-w-site items-center justify-center gap-6 px-6 text-sm font-medium sm:gap-16 sm:text-base">
        <span className="flex items-center gap-2">
          <LocationIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          {content.location}
        </span>
        <a
          href={`tel:${content.phone.tel}`}
          className="flex items-center gap-2 hover:underline"
          aria-label={`${content.phone.label} ${content.phone.display}`}
        >
          <PhoneIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          {content.phone.display}
        </a>
      </div>
    </div>
  );
}
