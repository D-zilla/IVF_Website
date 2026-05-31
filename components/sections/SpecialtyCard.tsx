import Image from "next/image";
import type { SpecialtyCardContent } from "@/lib/types";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

export interface SpecialtyCardProps {
  item: SpecialtyCardContent;
}

export function SpecialtyCard({ item }: SpecialtyCardProps) {
  return (
    <div className="flex h-full flex-col items-center rounded-card bg-white px-[18px] py-[30px] text-center shadow-card transition hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
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
        <FeatureIcon
          name={item.icon ?? "ivf"}
          className="mb-[18px] h-[52px] w-[52px] text-brand-orange"
        />
      )}
      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
      {item.description && (
        <p className="text-[13px] leading-[1.55] text-subtle">{item.description}</p>
      )}
    </div>
  );
}
