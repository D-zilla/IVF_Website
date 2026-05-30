import type { DoctorsSectionContent } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { DoctorCard } from "./DoctorCard";

export interface DoctorsGridProps {
  content: DoctorsSectionContent;
}

export function DoctorsGrid({ content }: DoctorsGridProps) {
  return (
    <section aria-labelledby="doctors-heading" className="bg-white">
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="doctors-heading"
          className="text-center font-display text-2xl font-bold text-secondary sm:text-3xl"
        >
          {content.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
          {content.doctors.map((doctor) => (
            <li key={doctor.name}>
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>
        {content.viewAll && (
          <div className="mt-8 flex justify-center">
            <ButtonLink href={content.viewAll.href} variant="primary" size="md">
              {content.viewAll.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
