import { Chip, PhotoBlock, SampleLabel } from "./parts";

type Device = {
  name: string;
  location: string;
  result: "pass" | "fail";
  impairment?: boolean;
  deficiency?: { clause: string; note: string };
};

const devices: Device[] = [
  { name: "Manual pull station", location: "Main entrance", result: "pass" },
  {
    name: "Smoke detector",
    location: "2nd floor corridor",
    result: "fail",
    deficiency: { clause: "S536", note: "No alarm with test smoke. Replace detector." },
  },
  { name: "Heat detector", location: "Mechanical room", result: "pass" },
  { name: "Horn/strobe", location: "Parkade P1", result: "fail", impairment: true },
  { name: "Duct detector", location: "Rooftop unit 2", result: "pass" },
];

/** A tech's phone mid-inspection. Decorative: pair it with a text alternative. */
export function InspectPhone({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`w-[256px] select-none ${className}`}>
      <div className="rounded-[40px] bg-night p-[7px] shadow-[0_24px_60px_-20px_rgb(20_17_46/0.45)]">
        <div className="flex h-[548px] flex-col overflow-hidden rounded-[33px] bg-white text-ink">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold">
            <span className="tabular">9:41</span>
            <span className="h-[18px] w-20 rounded-full bg-night" />
            <span className="flex items-center gap-1 text-muted">
              <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="0.35" />
                <rect x="4.3" y="5.5" width="3" height="6.5" rx="0.5" opacity="0.35" />
                <rect x="8.6" y="3" width="3" height="9" rx="0.5" opacity="0.35" />
                <rect x="13" y="0" width="3" height="12" rx="0.5" opacity="0.35" />
              </svg>
            </span>
          </div>

          {/* Header */}
          <div className="border-b border-line px-4 pt-2 pb-3">
            <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">
              1200 Sample Ave SW
            </p>
            <p className="mt-0.5 text-[11px] text-ink-2">Fire Alarm · Annual</p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[63%] rounded-full bg-indigo" />
              </div>
              <span className="tabular text-[10px] font-medium text-ink-2">24 of 38</span>
            </div>
          </div>

          {/* Device list */}
          <ul className="flex-1 divide-y divide-line overflow-hidden">
            {devices.map((d) => (
              <li key={d.name} className={d.deficiency ? "bg-fail/[0.04]" : ""}>
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] leading-4 font-semibold">{d.name}</p>
                    <p className="truncate text-[11px] leading-4 text-ink-2">{d.location}</p>
                  </div>
                  {d.impairment && <Chip tone="alert">Impairment</Chip>}
                  <Chip tone={d.result}>{d.result === "pass" ? "Pass" : "Fail"}</Chip>
                </div>
                {d.deficiency && (
                  <div className="mx-3 mb-3 rounded-lg border border-line bg-white p-2.5">
                    <div className="flex gap-2.5">
                      <PhotoBlock label="Photo" className="h-[68px] w-[76px] shrink-0" />
                      <div className="min-w-0 text-[11px] leading-4">
                        <p className="font-semibold text-fail-ink">Deficiency</p>
                        <p className="mt-0.5 text-ink-2">{d.deficiency.clause}</p>
                        <p className="mt-1 text-ink">{d.deficiency.note}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Offline bar */}
          <div className="flex items-center gap-2 border-t border-line bg-surface px-4 py-2.5 text-[11px] font-medium text-ink-2">
            <span className="size-2 rounded-full bg-warn" />
            Offline · <span className="tabular">14</span> changes queued
          </div>
          <div className="flex justify-center bg-surface pb-2">
            <span className="h-1 w-24 rounded-full bg-ink/80" />
          </div>
        </div>
      </div>
      <SampleLabel className="mt-2 block text-center" />
    </div>
  );
}
