import { CheckIcon, PhotoBlock, SampleLabel, cad } from "./parts";

const lines = [
  { item: "Replace smoke detector", where: "2nd floor corridor", price: 185, approved: true },
  { item: "Repair horn/strobe circuit", where: "Parkade P1", price: 420, approved: true },
  { item: "Replace end-of-line resistor", where: "Zone 4", price: 95, approved: true },
  { item: "Replace panel batteries", where: "Main panel", price: 160, approved: false },
];

const GST_RATE = 0.05;

/** The quote a building owner opens from a link. Decorative: pair it with a text alternative. */
export function OwnerQuoteCard({ className = "" }: { className?: string }) {
  const approved = lines.filter((l) => l.approved);
  const subtotal = approved.reduce((sum, l) => sum + l.price, 0);
  const gst = subtotal * GST_RATE;

  return (
    <div
      aria-hidden="true"
      className={`rounded-card border border-line bg-white text-ink shadow-soft select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 pt-4 pb-3">
        <div>
          <p className="text-[11px] font-medium text-ink-2">Quote for</p>
          <p className="font-display text-[15px] leading-tight font-semibold tracking-[-0.01em]">1200 Sample Ave SW</p>
        </div>
        <SampleLabel className="mt-0.5" />
      </div>

      <ul className="divide-y divide-line">
        {lines.map((l) => (
          <li key={l.item} className="flex items-center gap-3 px-4 py-2.5">
            <PhotoBlock className="size-9 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] leading-4 font-semibold">{l.item}</p>
              <p className="truncate text-[11px] leading-4 text-ink-2">{l.where}</p>
            </div>
            <span className="tabular text-[12px] font-medium">{cad(l.price)}</span>
            <span
              className={`flex size-[18px] shrink-0 items-center justify-center rounded ${
                l.approved ? "bg-indigo text-white" : "border border-muted bg-white"
              }`}
            >
              {l.approved && <CheckIcon />}
            </span>
          </li>
        ))}
      </ul>

      <dl className="tabular space-y-1 border-t border-line px-4 py-3 text-[12px]">
        <div className="flex justify-between text-ink-2">
          <dt>Subtotal</dt>
          <dd>{cad(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-2">
          <dt>GST 5%</dt>
          <dd>{cad(gst)}</dd>
        </div>
        <div className="flex justify-between pt-1 text-[13px] font-semibold">
          <dt>Total</dt>
          <dd>{cad(subtotal + gst)}</dd>
        </div>
      </dl>

      <div className="space-y-3 border-t border-line px-4 pt-3 pb-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-medium text-ink-2">PO number</p>
            <p className="tabular mt-1 rounded-md border border-line px-2 py-1.5 text-[12px]">PO-20418</p>
          </div>
          <div className="flex-[1.4]">
            <p className="text-[10px] font-medium text-ink-2">Signature</p>
            <div className="mt-1 flex h-[30px] items-end border-b border-ink/40 px-1">
              <svg viewBox="0 0 120 28" className="h-6 w-auto text-ink" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 20c6-10 10-16 12-14s-6 16-2 16 8-12 12-12-2 10 2 10 6-8 10-8 0 7 4 7 8-9 14-9 2 9 8 9 10-6 16-8 10 2 16 0" />
              </svg>
            </div>
          </div>
        </div>
        <div className="tabular flex h-9 items-center justify-center rounded-button bg-indigo text-[13px] font-medium text-white">
          {`Approve ${approved.length} of ${lines.length} lines`}
        </div>
      </div>
    </div>
  );
}
