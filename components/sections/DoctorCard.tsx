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
    <Wrapper {...wrapperProps} className="group block text-center">
      <div className="relative mx-auto mb-4 h-[175px] w-[175px] overflow-hidden rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
        <Image
          src={doctor.image.src}
          alt={doctor.image.alt}
          fill
          sizes="175px"
          className="object-cover"
        />
      </div>
      <div className="text-base font-bold group-hover:text-brand-orange">
        {doctor.name}
      </div>
      <div className="mt-0.5 text-[15px] text-muted">{doctor.title}</div>
    </Wrapper>
  );
}
