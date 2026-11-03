import { CheckCircle, Chip, SampleLabel, type Tone } from "./parts";

type LivStatus = "Open" | "In Progress" | "Cleared" | "Resolved";

const statusTone: Record<LivStatus, Tone> = {
  Open: "fail",
  "In Progress": "warn",
  Cleared: "info",
  Resolved: "pass",
};

const deficiencies: { type: string; location: string; severity: string; status: LivStatus }[] = [
  { type: "Smoke detector", location: "3rd floor corridor", severity: "High", status: "Open" },
  { type: "Horn/strobe", location: "Stairwell B", severity: "Medium", status: "In Progress" },
  { type: "Annunciator", location: "Main lobby", severity: "Low", status: "Cleared" },
  { type: "End-of-line resistor", location: "Zone 2", severity: "Low", status: "Resolved" },
];

const checks = ["Report PDF", "Premises and system type", "Deficiencies by type, location and severity"];

/** The Edmonton LIV upload package. Decorative: pair it with a text alternative. */
export function LivChecklist({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[460px] rounded-card border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">LIV upload package</p>
          <p className="truncate text-[11px] text-ink-2">10250 Sample Ave NW · Fire alarm</p>
        </div>
        <SampleLabel className="mt-0.5 shrink-0" />
      </div>

      <ul className="divide-y divide-line">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium">
            <CheckCircle />
            {c}
          </li>
        ))}
      </ul>

      <div className="border-t border-line bg-surface/60 px-4 py-2">
        <div className="grid grid-cols-[1fr_auto] gap-x-3 py-1 text-[10px] font-medium text-ink-2">
          <span>Deficiency · location · severity</span>
          <span>Status</span>
        </div>
        <ul>
          {deficiencies.map((d) => (
            <li key={d.type} className="grid grid-cols-[1fr_auto] items-center gap-x-3 py-1.5">
              <p className="min-w-0 truncate text-[12px] leading-4">
                <span className="font-semibold">{d.type}</span>
                <span className="text-ink-2">
                  {" "}
                  · {d.location} · {d.severity}
                </span>
              </p>
              <Chip tone={statusTone[d.status]}>{d.status}</Chip>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <CheckCircle done={false} />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium">Proof of correction</p>
          <p className="tabular text-[11px] text-ink-2">1 of 4 ready to upload</p>
        </div>
        <Chip tone="neutral">Pending</Chip>
      </div>
    </div>
  );
}
