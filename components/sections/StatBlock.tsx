import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface StatBlockProps {
  stats: Stat[];
  align?: "start" | "center";
  tone?: "default" | "inverse";
  className?: string;
}

export function StatBlock({
  stats,
  align = "start",
  tone = "default",
  className,
}: StatBlockProps) {
  const valueColor = tone === "inverse" ? "text-white" : "text-secondary";
  const labelColor = tone === "inverse" ? "text-white/80" : "text-ink-muted";

  return (
    <dl
      className={cn(
        "grid grid-cols-3 gap-4 sm:gap-8",
        align === "center" && "text-center",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dd className={cn("text-2xl font-bold sm:text-3xl", valueColor)}>
            {stat.value}
          </dd>
          <dt className={cn("text-xs sm:text-sm", labelColor)}>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
