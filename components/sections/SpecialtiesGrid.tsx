import type { SpecialtiesSectionContent } from "@/lib/types";
import { SpecialtyCard } from "./SpecialtyCard";

export interface SpecialtiesGridProps {
  content: SpecialtiesSectionContent;
}

export function SpecialtiesGrid({ content }: SpecialtiesGridProps) {
  return (
    <section aria-labelledby="specialties-heading" className="bg-white">
      <div className="mx-auto max-w-container px-4 py-12 sm:py-16 lg:px-6 lg:py-20">
        <h2
          id="specialties-heading"
          className="text-center font-display text-2xl font-bold text-secondary sm:text-3xl"
        >
          {content.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:grid-cols-5">
          {content.items.map((item) => (
            <li key={item.title}>
              <SpecialtyCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
