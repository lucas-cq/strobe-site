import { CheckCircle, Chip, SampleLabel, SkeletonRow } from "./parts";

// Deliberately thin: no severity labels or status table. We don't claim to know LIV's own values.
const checks = ["Report PDF", "Deficiency list"];

/** An Edmonton LIV upload, ready to go. Decorative: pair it with a text alternative. */
export function LivChecklist({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[420px] rounded-card-lg border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">LIV upload</p>
        <Chip tone="pass">Ready to upload</Chip>
      </div>

      <div className="divide-y divide-line">
        {checks.map((c) => (
          <div key={c} className="flex items-center gap-3 px-4 py-3 text-[12px] font-medium">
            <CheckCircle />
            {c}
          </div>
        ))}
        <SkeletonRow width="w-3/5" />
        <SkeletonRow width="w-2/5" />
      </div>

      <div className="flex justify-end border-t border-line bg-surface px-4 py-3">
        <SampleLabel />
      </div>
    </div>
  );
}
