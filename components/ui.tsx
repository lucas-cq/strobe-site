import type { ReactNode } from "react";

type ButtonVariant = "primary" | "primary-on-dark" | "secondary" | "secondary-on-dark";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-medium whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  // Inner top highlight; on hover the brand gradient fades in over 0.8s (see btn-gradient-fade)
  primary: "btn-gradient-fade bg-indigo text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]",
  /** White button for the indigo band and the bento card */
  "primary-on-dark": "bg-white text-indigo shadow-[inset_0_-1px_0_rgb(20_17_46/0.08)] hover:bg-indigo-50",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
  "secondary-on-dark": "border border-white/70 text-white hover:bg-white hover:text-night",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-5 text-base",
};

/** Shared button styling for <Link>, <a> and <button>. */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
