import { linkify } from "./linkify";

/** Cards for a list of short rules. Items can use **bold** and links. */
export function RuleList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
      {items.map((item) => (
        <li key={item} className="reveal flex gap-3 rounded-card-lg bg-white p-5 shadow-soft">
          <span aria-hidden="true" className="bg-gradient-brand mt-2.5 h-0.5 w-4 shrink-0 rounded-full" />
          <p className="text-ink">{linkify(item)}</p>
        </li>
      ))}
    </ul>
  );
}
