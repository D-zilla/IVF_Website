import Image from "next/image";
import Link from "next/link";
import type { DoctorCardContent } from "@/lib/types";

export interface DoctorCardProps {
  doctor: DoctorCardContent;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const Wrapper: React.ElementType = doctor.href ? Link : "div";
  const wrapperProps = doctor.href ? { href: doctor.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-peach-100 sm:h-32 sm:w-32">
        <Image
          src={doctor.image.src}
          alt={doctor.image.alt}
          fill
          sizes="(min-width: 640px) 128px, 112px"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-secondary group-hover:text-primary sm:text-base">
        {doctor.name}
      </h3>
      <p className="text-xs text-ink-muted sm:text-sm">{doctor.title}</p>
    </Wrapper>
  );
}
