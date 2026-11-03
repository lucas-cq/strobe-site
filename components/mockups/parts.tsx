import type { ReactNode } from "react";

/** Every mockup carries this so nobody mistakes it for a real customer. */
export function SampleLabel({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`text-[11px] font-medium whitespace-nowrap ${dark ? "text-night-muted" : "text-muted"} ${className}`}>
      Sample data
    </span>
  );
}

export type Tone = "pass" | "fail" | "warn" | "info" | "neutral" | "alert";

const chipTones: Record<Tone, string> = {
  pass: "bg-pass/10 text-pass-ink",
  fail: "bg-fail/10 text-fail-ink",
  warn: "bg-warn/15 text-warn-ink",
  info: "bg-indigo/10 text-indigo",
  neutral: "bg-surface text-ink-2 ring-1 ring-line",
  alert: "bg-fail-ink text-white",
};

export function Chip({ tone, children, className = "" }: { tone: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] leading-4 font-semibold whitespace-nowrap ${chipTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Abstract stand-in for a deficiency photo. Never a real image. */
export function PhotoBlock({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-[linear-gradient(135deg,#d9d7ea_0%,#b9b6d3_45%,#9c98bd_100%)] ${className}`}
    >
      <div className="absolute -right-3 -bottom-4 size-10 rounded-full bg-white/30" />
      <div className="absolute top-2 left-3 h-1.5 w-8 rounded-full bg-white/40" />
      {label && (
        <span className="absolute bottom-1.5 left-1.5 rounded bg-night/75 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {label}
        </span>
      )}
    </div>
  );
}

export function CheckIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2.25">
      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckCircle({ done = true }: { done?: boolean }) {
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
        done ? "bg-pass text-white" : "border border-dashed border-muted bg-white"
      }`}
    >
      {done && <CheckIcon />}
    </span>
  );
}

export function CopyButton() {
  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded-md border border-line bg-white px-2 text-[11px] font-medium text-ink-2">
      Copy
    </span>
  );
}

export const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
