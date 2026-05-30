import type { SpecialtiesSectionContent } from "@/lib/types";
import { SpecialtyCard } from "./SpecialtyCard";

export interface SpecialtiesGridProps {
  content: SpecialtiesSectionContent;
}

export function SpecialtiesGrid({ content }: SpecialtiesGridProps) {
  return (
    <section aria-labelledby="specialties-heading" className="bg-white">
      <div className="mx-auto max-w-site px-6 py-16">
        <h2
          id="specialties-heading"
          className="mb-11 text-center text-3xl font-bold sm:text-4xl"
        >
          {content.heading}
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
