import { CheckCircle, Chip, SampleLabel, SkeletonRow } from "./parts";

/** A Lethbridge report email, ready to send. Decorative: pair it with a text alternative. */
export function EmailCard({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[420px] rounded-card-lg border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">To: Fire Prevention Bureau</p>
        <Chip tone="pass">Ready to send</Chip>
      </div>

      <div className="divide-y divide-line">
        <div className="flex items-center gap-3 px-4 py-3 text-[12px] font-medium">
          <CheckCircle />
          Report attached
        </div>
        <SkeletonRow width="w-3/5" />
        <SkeletonRow width="w-2/5" />
      </div>

      <div className="flex justify-end border-t border-line bg-surface px-4 py-3">
        <SampleLabel />
      </div>
    </div>
  );
}
