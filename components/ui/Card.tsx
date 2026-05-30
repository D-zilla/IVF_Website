import { cn } from "@/lib/utils";

type Tone = "default" | "peach" | "navy" | "primary" | "outline";

const toneStyles: Record<Tone, string> = {
  default: "bg-white text-ink shadow-card",
  peach: "bg-peach-100 text-ink",
  navy: "bg-secondary text-white",
  primary: "bg-primary text-white",
  outline: "bg-white text-ink border border-divider",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  padding?: "sm" | "md" | "lg";
  radius?: "md" | "lg" | "xl" | "2xl";
  as?: keyof React.JSX.IntrinsicElements;
}

const paddingStyles = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

const radiusStyles = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export function Card({
  tone = "default",
  padding = "md",
  radius = "xl",
  as,
  className,
  children,
  ...rest
}: CardProps) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag
      className={cn(toneStyles[tone], paddingStyles[padding], radiusStyles[radius], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
