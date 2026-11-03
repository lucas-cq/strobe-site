import { CheckCircle, CheckIcon, Chip, CopyButton, SampleLabel } from "./parts";

// The 8 fields of the City 311 request, filled from the site record.
const fields = [
  { label: "Service location", value: "1200 Sample Ave SW, Calgary" },
  { label: "Number of systems", value: "1" },
  { label: "System type + date of service", value: "Fire Alarm · Oct 27, 2026" },
  { label: "Customer business name and address", value: "Sample Properties Inc., 300 Example St SW" },
  { label: "All deficient reports attached?", value: "Yes" },
  { label: "Business contact", value: "Jordan Sample · 403-555-0142 · jordan@example.com" },
  { label: "Contact available on site", value: "Sam Placeholder · 403-555-0199" },
  { label: "Additional details, file upload", value: "4 deficiencies · 2 PDFs attached" },
];

const attachments = ["S536-report-1200-Sample-Ave.pdf", "Deficiency-summary.pdf"];

// The page's "Where every field comes from" table lists all 8 fields, so the mockup shows a few.
const SHOWN = 4;

/** The pre-filled Calgary 311 packet. Decorative: pair it with a text alternative. */
export function CalgaryPacket({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-[460px] rounded-card border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">Calgary 311 packet</p>
          <p className="truncate text-[11px] text-ink-2">1200 Sample Ave SW · Fire Alarm</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Chip tone="pass">Ready to submit</Chip>
          <SampleLabel />
        </div>
      </div>

      <ol className="divide-y divide-line">
        {fields.slice(0, SHOWN).map((f) => (
          <li key={f.label} className="flex items-center gap-3 px-4 py-2">
            <CheckCircle />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] leading-4 font-medium text-ink-2">{f.label}</p>
              <p className="truncate text-[12px] leading-4 font-medium">{f.value}</p>
            </div>
            <CopyButton />
          </li>
        ))}
        <li className="flex items-center gap-3 px-4 py-2 text-[11px] font-medium text-ink-2">
          <CheckCircle />
          <span className="tabular">+ {fields.length - SHOWN} more fields</span>
        </li>
      </ol>

      <div className="border-t border-line px-4 py-3">
        <p className="text-[10px] font-medium text-ink-2">Attached</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {attachments.map((a) => (
            <span
              key={a}
              className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 ring-1 ring-line"
            >
              <span className="rounded-sm bg-fail-ink px-1 text-[9px] font-semibold text-white">PDF</span>
              <span className="truncate">{a}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-x-3 gap-y-2 border-t border-line bg-surface px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium text-ink-2">SR number</p>
          <p className="tabular mt-1 rounded-md border border-line bg-white px-2 py-1.5 text-[12px] font-medium">
            1234567
          </p>
        </div>
        <p className="flex items-center gap-1.5 pb-1.5 text-[11px] font-semibold text-pass-ink">
          <CheckIcon />
          Saved · timestamped
        </p>
      </div>
    </div>
  );
}
