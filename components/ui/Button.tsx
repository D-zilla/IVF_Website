import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "outlineInverse" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-600 focus-visible:ring-primary/40",
  secondary:
    "bg-secondary text-white hover:bg-secondary-600 focus-visible:ring-secondary/40",
  outline:
    "border border-primary text-primary bg-white hover:bg-peach-50 focus-visible:ring-primary/40",
  outlineInverse:
    "border border-white text-white bg-transparent hover:bg-white/10 focus-visible:ring-white/40",
  whatsapp:
    "bg-accent text-white hover:bg-accent-600 focus-visible:ring-accent/40",
  ghost:
    "bg-transparent text-secondary hover:bg-peach-50 focus-visible:ring-secondary/30",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold shadow-sm transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

export type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonLinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth, iconLeft, iconRight, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        baseClass,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
});

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  iconLeft,
  iconRight,
  className,
  href,
  external,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    baseClass,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </Link>
  );
}
