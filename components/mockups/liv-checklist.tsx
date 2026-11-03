import { CheckCircle, Chip, SampleLabel, type Tone } from "./parts";

type LivStatus = "Open" | "In Progress" | "Cleared" | "Resolved";

const statusTone: Record<LivStatus, Tone> = {
  Open: "fail",
  "In Progress": "warn",
  Cleared: "info",
  Resolved: "pass",
};

// Severity is shown as a coloured dot only: we don't claim to know LIV's own severity labels.
type Severity = 1 | 2 | 3;
const severityDot: Record<Severity, string> = { 1: "bg-fail", 2: "bg-warn", 3: "bg-muted/50" };

const deficiencies: { type: string; location: string; severity: Severity; status: LivStatus }[] = [
  { type: "Smoke detector", location: "3rd floor corridor", severity: 1, status: "Open" },
  { type: "Horn/strobe", location: "Stairwell B", severity: 2, status: "In Progress" },
  { type: "Annunciator", location: "Main lobby", severity: 3, status: "Cleared" },
  { type: "End-of-line resistor", location: "Zone 2", severity: 3, status: "Resolved" },
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
        <div className="grid grid-cols-[1fr_44px_84px] gap-x-2 py-1 text-[10px] font-medium text-ink-2">
          <span>Deficiency · location</span>
          <span className="text-center">Severity</span>
          <span className="text-right">Status</span>
        </div>
        <ul>
          {deficiencies.map((d) => (
            <li key={d.type} className="grid grid-cols-[1fr_44px_84px] items-center gap-x-2 py-1.5">
              <p className="min-w-0 truncate text-[12px] leading-4">
                <span className="font-semibold">{d.type}</span>
                <span className="text-ink-2"> · {d.location}</span>
              </p>
              <span className="flex justify-center">
                <span className={`size-2 rounded-full ${severityDot[d.severity]}`} />
              </span>
              <Chip tone={statusTone[d.status]} className="justify-self-end">
                {d.status}
              </Chip>
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
