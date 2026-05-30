import Image from "next/image";
import Link from "next/link";
import type { SpecialtyCardContent } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export interface SpecialtyCardProps {
  item: SpecialtyCardContent;
}

export function SpecialtyCard({ item }: SpecialtyCardProps) {
  return (
    <Card tone="outline" padding="md" radius="xl" className="flex h-full flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-peach-100">
        {item.iconSrc ? (
          <Image
            src={item.iconSrc}
            alt=""
            width={32}
            height={32}
            sizes="32px"
          />
        ) : (
          <DropIcon className="h-8 w-8 text-primary" aria-hidden="true" />
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-secondary sm:text-lg">
        {item.title}
      </h3>
      {item.description && (
        <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
      )}
      <Link
        href={item.href}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
      >
        {item.ctaLabel} {item.title}
        <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}

function DropIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5c4.5 5.2 7 9 7 12.5a7 7 0 1 1-14 0c0-3.5 2.5-7.3 7-12.5Z" />
    </svg>
  );
}
