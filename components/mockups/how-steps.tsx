import { Chip, PhoneFrame, PhotoBlock, SampleLabel, SignatureLine, cad } from "./parts";

/*
 * The mockups for the five How it works steps. All sample data, all decorative: the section
 * gives each one a text alternative. One site throughout: Elm Street Plaza, 88 Elm St SE.
 */

const SITE = { name: "Elm Street Plaza", address: "88 Elm St SE" };

const deficiencies = [
  { item: "Replace pull station", where: "Pull station, Level 2 east stair", price: 240, approved: true },
  { item: "Replace smoke detector", where: "Smoke detector, Level 3 corridor", price: 185, approved: true },
  { item: "Replace panel batteries", where: "Main panel, Electrical room", price: 160, approved: false },
];

const GST_RATE = 0.05;

/** Two-option toggle with one side on. */
function Toggle({ left, right, on, tones }: { left: string; right: string; on: "left" | "right"; tones: [string, string] }) {
  const base = "rounded-[5px] px-2 py-1";
  return (
    <span className="flex shrink-0 rounded-md bg-surface p-0.5 text-[10px] leading-3 font-semibold text-ink-2 ring-1 ring-line">
      <span className={`${base} ${on === "left" ? tones[0] : ""}`}>{left}</span>
      <span className={`${base} ${on === "right" ? tones[1] : ""}`}>{right}</span>
    </span>
  );
}

const passFail: [string, string] = ["bg-pass text-white", "bg-fail-ink text-white"];
const approveDecline: [string, string] = ["bg-indigo text-white", "bg-ink-2 text-white"];

/** Step 1: the tech's device list, offline. */
export function StepInspect() {
  const devices = [
    { name: "Smoke detector", where: "Level 2 corridor", fail: false },
    { name: "Pull station", where: "Level 2 east stair", fail: true },
    { name: "Heat detector", where: "Parkade P1", fail: false },
    { name: "Horn/strobe", where: "Level 3 lobby", fail: false },
  ];
  return (
    <div aria-hidden="true" className="select-none">
      <PhoneFrame>
        <div className="border-b border-line px-4 pt-2 pb-3">
          <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">{SITE.name}</p>
          <p className="mt-0.5 text-[11px] text-ink-2">{SITE.address} · Fire Alarm · Annual</p>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
              <div className="h-full w-[74%] rounded-full bg-indigo" />
            </div>
            <span className="tabular text-[10px] font-medium text-ink-2">31 of 42</span>
          </div>
        </div>
        <ul className="divide-y divide-line">
          {devices.map((d) => (
            <li key={d.name} className={d.fail ? "bg-fail/[0.04]" : ""}>
              <div className="flex items-center gap-2 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] leading-4 font-semibold">{d.name}</p>
                  <p className="truncate text-[11px] leading-4 text-ink-2">{d.where}</p>
                </div>
                <Toggle left="Pass" right="Fail" on={d.fail ? "right" : "left"} tones={passFail} />
              </div>
              {d.fail && (
                <div className="mx-3 mb-3 flex gap-2.5 rounded-lg border border-line bg-white p-2.5">
                  <PhotoBlock label="Photo" className="h-[64px] w-[72px] shrink-0" />
                  <div className="min-w-0 text-[11px] leading-4">
                    <p className="font-semibold text-fail-ink">Deficiency</p>
                    <p className="mt-0.5 text-ink-2">Level 2 east stair</p>
                    <p className="mt-1">Handle won&apos;t latch. Replace station.</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex justify-center px-4 pt-3">
          <span className="flex items-center gap-1.5 rounded-full bg-warn/15 px-3 py-1 text-[11px] font-semibold text-warn-ink">
            <span className="size-1.5 rounded-full bg-warn" />
            Offline, <span className="tabular">14</span> changes saved
          </span>
        </div>
      </PhoneFrame>
      <SampleLabel className="mt-2 block text-center" />
    </div>
  );
}

/** Step 2: sign on the phone, and the S536 report is ready. */
export function StepReport() {
  return (
    <div aria-hidden="true" className="relative w-[420px] select-none">
      <PhoneFrame>
        <div className="border-b border-line px-4 pt-2 pb-3">
          <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">Sign off</p>
          <p className="mt-0.5 text-[11px] text-ink-2">{SITE.name} · Fire Alarm · Annual</p>
        </div>
        <dl className="tabular grid grid-cols-3 gap-2 px-4 py-3 text-center">
          {[
            ["42", "Devices"],
            ["41", "Pass"],
            ["1", "Fail"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-lg bg-surface py-2">
              <dd className="font-display text-lg font-semibold">{n}</dd>
              <dt className="text-[10px] font-medium text-ink-2">{label}</dt>
            </div>
          ))}
        </dl>
        <div className="px-4">
          <p className="text-[10px] font-medium text-ink-2">Technician signature</p>
          <div className="mt-1 flex h-[88px] items-end rounded-lg border border-dashed border-field px-3 pb-3">
            <SignatureLine className="h-8 w-auto" />
          </div>
        </div>
        <div className="mt-auto px-4">
          <div className="flex h-9 items-center justify-center rounded-button bg-indigo text-[13px] font-medium text-white">
            Finish report
          </div>
        </div>
      </PhoneFrame>

      {/* The finished report, overlapping the phone */}
      <div className="absolute top-[150px] left-[196px] w-[224px] rounded-card border border-line bg-white p-4 text-ink shadow-soft">
        <div className="flex items-center justify-between">
          <Chip tone="fail">PDF</Chip>
          <Chip tone="pass">Ready</Chip>
        </div>
        <p className="mt-3 font-display text-[14px] leading-tight font-semibold tracking-[-0.01em]">Fire Alarm Inspection Report</p>
        <p className="mt-0.5 text-[11px] text-ink-2">CAN/ULC-S536 · Annual</p>
        <div className="mt-3 space-y-1 border-t border-line pt-3 text-[11px]">
          <p className="font-semibold">{SITE.name}</p>
          <p className="text-ink-2">{SITE.address}</p>
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-surface ring-1 ring-line" />
          <span className="block h-2 w-5/6 rounded-full bg-surface ring-1 ring-line" />
          <span className="block h-2 w-2/3 rounded-full bg-surface ring-1 ring-line" />
        </div>
        <div className="mt-3 flex items-end justify-between border-t border-line pt-2">
          <SignatureLine className="h-4 w-auto" />
          <span className="text-[10px] font-medium text-ink-2">Signed on site</span>
        </div>
      </div>
      <SampleLabel className="mt-2 block w-[256px] text-center" />
    </div>
  );
}

/** Step 3: the office prices each deficiency and sends the quote. */
export function StepQuote() {
  const subtotal = deficiencies.reduce((sum, d) => sum + d.price, 0);
  return (
    <div aria-hidden="true" className="w-full max-w-[440px] rounded-card-lg border border-line bg-white text-ink shadow-soft select-none">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 pt-4 pb-3">
        <div>
          <p className="text-[11px] font-medium text-ink-2">New quote</p>
          <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">
            {SITE.name} · {SITE.address}
          </p>
        </div>
        <SampleLabel className="mt-0.5" />
      </div>
      <p className="flex items-center gap-2 border-b border-line bg-surface px-5 py-2 text-[11px] font-medium text-ink-2">
        <Chip tone="info">3 deficiencies</Chip>
        Priced from your price book
      </p>
      <ul className="divide-y divide-line">
        {deficiencies.map((d) => (
          <li key={d.item} className="flex items-center gap-3 px-5 py-3">
            <PhotoBlock className="size-10 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] leading-4 font-semibold">{d.item}</p>
              <p className="truncate text-[11px] leading-4 text-ink-2">{d.where}</p>
            </div>
            <span className="tabular rounded-md border border-line px-2 py-1 text-[12px] font-medium">{cad(d.price)}</span>
          </li>
        ))}
      </ul>
      <dl className="tabular space-y-1 border-t border-line px-5 py-3 text-[12px]">
        <div className="flex justify-between text-ink-2">
          <dt>Subtotal</dt>
          <dd>{cad(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-2">
          <dt>GST 5%</dt>
          <dd>{cad(subtotal * GST_RATE)}</dd>
        </div>
        <div className="flex justify-between pt-1 text-[13px] font-semibold">
          <dt>Total</dt>
          <dd>{cad(subtotal * (1 + GST_RATE))}</dd>
        </div>
      </dl>
      <div className="border-t border-line px-5 py-3">
        <div className="flex h-9 items-center justify-center rounded-button bg-indigo text-[13px] font-medium text-white">
          Send quote to owner
        </div>
      </div>
    </div>
  );
}

/** Step 4: the owner approves line by line from a link, and signs. */
export function StepApprove() {
  const approved = deficiencies.filter((d) => d.approved);
  return (
    <div aria-hidden="true" className="select-none">
      <PhoneFrame>
        <div className="border-b border-line px-4 pt-2 pb-3">
          <p className="text-[11px] font-medium text-ink-2">Quote for</p>
          <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">{SITE.name}</p>
        </div>
        <ul className="divide-y divide-line">
          {deficiencies.map((d) => (
            <li key={d.item} className="px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                <PhotoBlock className="size-9 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] leading-4 font-semibold">{d.item}</p>
                  <p className="tabular text-[11px] leading-4 text-ink-2">{cad(d.price)}</p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Toggle left="Approve" right="Decline" on={d.approved ? "left" : "right"} tones={approveDecline} />
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 pt-3">
          <p className="text-[10px] font-medium text-ink-2">Signature</p>
          <div className="mt-1 flex h-[44px] items-end border-b border-ink/40 px-1 pb-1">
            <SignatureLine />
          </div>
        </div>
        <div className="mt-auto px-4">
          <div className="tabular flex h-9 items-center justify-center rounded-button bg-indigo text-[13px] font-medium text-white">
            {`Approve ${approved.length} of ${deficiencies.length} and sign`}
          </div>
        </div>
      </PhoneFrame>
      <SampleLabel className="mt-2 block text-center" />
    </div>
  );
}
