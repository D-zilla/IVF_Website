import Image from "next/image";
import Link from "next/link";
import type { SpecialtyCardContent } from "@/lib/types";
import { DropletIcon } from "@/components/ui/icons";

export interface SpecialtyCardProps {
  item: SpecialtyCardContent;
}

export function SpecialtyCard({ item }: SpecialtyCardProps) {
  return (
    <div className="h-full rounded-card bg-white px-[18px] py-[30px] text-center shadow-card transition hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
      {item.iconSrc ? (
        <Image
          src={item.iconSrc}
          alt=""
          width={52}
          height={60}
          sizes="52px"
          className="mx-auto mb-[18px] h-[60px] w-[52px]"
        />
      ) : (
        <DropletIcon className="mx-auto mb-[18px] h-[60px] w-[52px] text-brand-orange" aria-hidden="true" />
      )}
      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
      <Link
        href={item.href}
        className="text-[13px] font-semibold text-subtle hover:text-brand-orange"
      >
        {item.ctaLabel}
      </Link>
    </div>
  );
}
