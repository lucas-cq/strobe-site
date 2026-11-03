/**
 * Short proof points sliding sideways in an indigo-50 band. The list is rendered twice so
 * the loop is seamless; the copy is hidden from screen readers. Pauses on hover, and turns
 * into a static wrapped row for reduced motion.
 */
export function ProofStrip({ items, label }: { items: string[]; label: string }) {
  const list = (duplicate: boolean) => (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 gap-3 pr-3 ${duplicate ? "marquee-duplicate" : ""}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-ink-2 ring-1 ring-indigo-100"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="marquee overflow-hidden bg-indigo-50 py-5">
      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track gap-y-3">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
