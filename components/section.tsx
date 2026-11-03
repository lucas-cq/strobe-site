import type { ReactNode } from "react";
import { Container } from "./ui";

type Tone = "white" | "surface" | "lavender" | "night";

const tones: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  lavender: "bg-lavender",
  night: "on-dark bg-night text-white",
};

export function Section({
  id,
  tone = "white",
  labelledBy,
  className = "",
  flushTop = false,
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  /** Drop the top padding when the section continues the one above it. */
  flushTop?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${className}`}>
      <Container className={`py-14 md:py-20 ${flushTop ? "pt-0 md:pt-0" : ""}`}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`text-sm font-medium tracking-wide ${dark ? "text-ice" : "text-indigo"}`}>{children}</p>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  dark = false,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`mt-3 text-3xl md:text-[2.75rem] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lede && <p className={`mt-4 text-lg ${dark ? "text-night-text" : "text-ink-2"}`}>{lede}</p>}
    </div>
  );
}

/** Arrow link used for "How Calgary filing works →" style links. */
export function ArrowLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1.5 font-medium whitespace-nowrap underline-offset-4 hover:underline ${
        dark ? "text-ice" : "text-indigo"
      }`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
        →
      </span>
    </a>
  );
}
