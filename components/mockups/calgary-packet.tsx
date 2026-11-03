import { CheckCircle, CheckIcon, Chip, SampleLabel, SkeletonRow } from "./parts";

// Deliberately thin: two real-looking rows, then placeholders. The page shows outcomes,
// not the City form field by field.
const rows = [
  { label: "Service location", value: "1200 Sample Ave SW, Calgary" },
  { label: "System type", value: "Fire Alarm" },
];

/** A Calgary 311 request, ready to file. Decorative: pair it with a text alternative. */
export function CalgaryPacket({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[420px] rounded-card-lg border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">Calgary 311 request</p>
        <Chip tone="pass">Ready to file</Chip>
      </div>

      <div className="divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 px-4 py-3">
            <CheckCircle />
            <div className="min-w-0">
              <p className="text-[10px] leading-4 font-medium text-ink-2">{r.label}</p>
              <p className="truncate text-[12px] leading-4 font-medium">{r.value}</p>
            </div>
          </div>
        ))}
        <SkeletonRow width="w-3/4" />
        <SkeletonRow width="w-1/2" />
        <SkeletonRow width="w-2/3" />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-pass-ink">
          <CheckIcon />
          Reports attached
        </p>
        <SampleLabel />
      </div>
    </div>
  );
}
