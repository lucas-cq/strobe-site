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

/** A grey placeholder row: shows there's more without showing what it is. */
export function SkeletonRow({ width = "w-2/3" }: { width?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="size-5 shrink-0 rounded-full bg-surface ring-1 ring-line" />
      <span className="flex-1 space-y-1.5">
        <span className="block h-2 w-16 rounded-full bg-line" />
        <span className={`block h-2.5 rounded-full bg-surface ring-1 ring-line ${width}`} />
      </span>
    </div>
  );
}

export const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

/** A phone with a status bar, for mockups. Decorative: the mockup sets aria-hidden. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[256px] ${className}`}>
      <div className="rounded-[40px] bg-night p-[7px] shadow-[0_24px_60px_-20px_rgb(20_17_46/0.45)]">
        <div className="flex h-[520px] flex-col overflow-hidden rounded-[33px] bg-white text-ink">
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold">
            <span className="tabular">9:41</span>
            <span className="h-[18px] w-20 rounded-full bg-night" />
            <span className="w-7" />
          </div>
          {children}
          <div className="mt-auto flex justify-center pt-2 pb-2">
            <span className="h-1 w-24 rounded-full bg-ink/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A drawn signature, for sign-off mockups. */
export function SignatureLine({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 28" className={`text-ink ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 20c6-10 10-16 12-14s-6 16-2 16 8-12 12-12-2 10 2 10 6-8 10-8 0 7 4 7 8-9 14-9 2 9 8 9 10-6 16-8 10 2 16 0" />
    </svg>
  );
}
