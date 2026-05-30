import Image from "next/image";
import Link from "next/link";
import type { SpecialtyCardContent } from "@/lib/types";
import { DropletIcon } from "@/components/ui/icons";

export interface SpecialtyCardProps {
  item: SpecialtyCardContent;
}

export function SpecialtyCard({ item }: SpecialtyCardProps) {
  return (
    <Link
      href={item.href}
      aria-label={`${item.title} — ${item.ctaLabel}`}
      className="group flex h-full flex-col items-center rounded-card bg-white px-[18px] py-[30px] text-center shadow-card transition hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
    >
      {item.iconSrc ? (
        <Image
          src={item.iconSrc}
          alt=""
          width={52}
          height={60}
          sizes="52px"
          className="mb-[18px] h-[60px] w-[52px]"
        />
      ) : (
        <DropletIcon className="mb-[18px] h-[60px] w-[52px] text-brand-orange" aria-hidden="true" />
      )}
      <h3 className="mb-2 text-xl font-bold group-hover:text-brand-orange">{item.title}</h3>
      {item.description && (
        <p className="text-[13px] leading-[1.55] text-subtle">{item.description}</p>
      )}
    </Link>
  );
}
