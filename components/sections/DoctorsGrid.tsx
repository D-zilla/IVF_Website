import Link from "next/link";
import type { DoctorsSectionContent } from "@/lib/types";
import { DoctorCard } from "./DoctorCard";

export interface DoctorsGridProps {
  content: DoctorsSectionContent;
}

export function DoctorsGrid({ content }: DoctorsGridProps) {
  return (
    <section aria-labelledby="doctors-heading" className="bg-white py-16">
      <div className="mx-auto max-w-site px-6">
        <h2
          id="doctors-heading"
          className="mb-11 text-center text-3xl font-bold sm:text-4xl"
        >
          {content.heading}
        </h2>
        <ul className="mb-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {content.doctors.map((doctor) => (
            <li key={doctor.name}>
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>
        {content.viewAll && (
          <div className="flex justify-center">
            <Link
              href={content.viewAll.href}
              className="inline-flex items-center justify-center rounded-card bg-brand-orange px-9 py-[13px] text-base font-bold text-white shadow-[0_6px_16px_rgba(239,118,35,0.28)] transition hover:-translate-y-0.5 hover:bg-brand-orangeDark"
            >
              {content.viewAll.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
