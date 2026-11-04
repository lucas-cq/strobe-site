import type { ReactNode } from "react";
import type { Jurisdiction } from "@/content/jurisdictions";
import { CheckIcon } from "./mockups/parts";

/**
 * Where one city wants the filing, and what Strobe gets ready for it. The live result in the
 * city selector, and (decorative, in its Calgary state) the last How it works step.
 */
export function JurisdictionCard({
  jurisdiction: j,
  footer,
  decorative = false,
  className = "",
}: {
  jurisdiction: Jurisdiction;
  /** A link row under the card, e.g. "Calgary details →". */
  footer?: ReactNode;
  /** Hide from screen readers when it's a picture of the UI with its own text alternative. */
  decorative?: boolean;
  className?: string;
}) {
  const rows: [string, string][] = [
    ["Goes to", j.goesTo],
    ["How it's filed", j.method],
    ["What triggers it", j.trigger],
    ["Deadline", j.deadline],
  ];

  return (
    <div
      aria-hidden={decorative || undefined}
      className={`overflow-hidden rounded-card-lg border border-line bg-white text-ink shadow-soft ${decorative ? "select-none" : ""} ${className}`}
    >
      <div className="border-b border-line px-5 py-4">
        <p className="text-[13px] font-medium text-muted">Sample address</p>
        <p className="mt-0.5 font-display text-lg leading-snug font-semibold tracking-[-0.01em]">{j.sampleAddress}</p>
      </div>

      <dl className="divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-0.5 px-5 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="text-[15px]">{value}</dd>
          </div>
        ))}
        <div className="grid gap-1 bg-lavender px-5 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
          <dt className="flex items-center gap-1.5 text-sm font-semibold text-indigo">
            <CheckIcon className="size-3.5 shrink-0" />
            Strobe gets ready
          </dt>
          <dd className="text-[15px]">{j.strobePrepares}</dd>
        </div>
      </dl>

      {footer && <div className="border-t border-line px-5 py-3.5">{footer}</div>}
    </div>
  );
}
