import { SampleLabel } from "./parts";

const LIMIT = 10; // Calgary: business days from the initial inspection
const WARN_FROM = 8;

type SystemRow = {
  system: string;
  site: string;
  day: number;
  impairment?: boolean;
};

const rows: SystemRow[] = [
  { system: "Fire Alarm", site: "88 Elm St SE", day: 1, impairment: true },
  { system: "Fire Alarm", site: "1200 Sample Ave SW", day: 9 },
  { system: "Fire Alarm", site: "455 Oak St NE", day: 6 },
];

type Urgency = "ok" | "warn" | "now";

function urgencyOf(row: SystemRow): Urgency {
  if (row.impairment) return "now";
  return row.day >= WARN_FROM ? "warn" : "ok";
}

const rank: Record<Urgency, number> = { ok: 0, warn: 1, now: 2 };

/** Business-day countdown per system. Decorative: pair it with a text alternative. */
export function CityClock({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const dark = variant === "dark";
  const mostUrgent = rows.map(urgencyOf).reduce((a, b) => (rank[b] > rank[a] ? b : a), "ok" as Urgency);

  const t = dark
    ? {
        card: "border-night-line bg-[#15132f] text-white",
        sub: "text-night-muted",
        track: "bg-white/10",
        divide: "divide-night-line border-night-line",
        ok: "bg-ice",
        warnText: "text-warn",
        nowText: "text-[#ff8a8d]",
      }
    : {
        card: "border-line bg-white text-ink shadow-soft",
        sub: "text-ink-2",
        track: "bg-surface",
        divide: "divide-line border-line",
        ok: "bg-indigo",
        warnText: "text-warn-ink",
        nowText: "text-fail-ink",
      };

  const button: Record<Urgency, string> = {
    ok: dark ? "bg-white/10 text-white" : "bg-indigo text-white",
    warn: "bg-warn text-night",
    now: "bg-fail-ink text-white",
  };

  return (
    <div aria-hidden="true" className={`w-full rounded-card border select-none ${t.card} ${className}`}>
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${t.divide}`}>
        <div>
          <p className="font-display text-[15px] font-semibold tracking-[-0.01em]">City clock</p>
          <p className={`text-[11px] ${t.sub}`}>Calgary · business days since inspection</p>
        </div>
        <SampleLabel dark={dark} className="text-[10px]" />
      </div>

      <ul className={`divide-y ${t.divide}`}>
        {rows.map((row) => {
          const u = urgencyOf(row);
          const pct = u === "now" ? 100 : (row.day / LIMIT) * 100;
          const bar = u === "now" ? "bg-fail" : u === "warn" ? "bg-warn" : t.ok;
          return (
            <li key={row.site} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 text-[12px] leading-4 font-semibold">
                  {row.system}
                  <span className={`block font-normal ${t.sub}`}>{row.site}</span>
                </p>
                <p
                  className={`tabular shrink-0 text-[11px] font-semibold ${
                    u === "now" ? t.nowText : u === "warn" ? t.warnText : t.sub
                  }`}
                >
                  {u === "now" ? "Impairment · report now" : `Day ${row.day} of ${LIMIT}`}
                </p>
              </div>
              <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${t.track}`}>
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={`border-t px-4 py-3 ${t.divide}`}>
        <div
          className={`flex h-9 items-center justify-center gap-2 rounded-button text-[13px] font-semibold ${button[mostUrgent]}`}
        >
          {mostUrgent === "now" && <span className="size-1.5 rounded-full bg-white" />}
          Report to fire department
        </div>
      </div>
    </div>
  );
}
