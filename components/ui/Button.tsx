import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none select-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "text-bg-base accent-gradient shadow-glow hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]",
  secondary:
    "text-ink-primary border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25 active:scale-[0.98]",
  ghost: "text-ink-secondary hover:text-ink-primary",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ariaLabel,
  onClick,
}: CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        className={classes(variant, size, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes(variant, size, className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
