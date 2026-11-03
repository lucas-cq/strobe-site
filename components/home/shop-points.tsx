import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";

type IconName = (typeof home.shops.points)[number]["icon"];

const icons: Record<IconName, React.ReactNode> = {
  // Price tag
  price: <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8a1 1 0 0 1 0 1.4l-7.6 7.6a1 1 0 0 1-1.4 0l-8-8ZM8 8h.01" />,
  // Fire alarm panel
  panel: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M8 8h8M8 12h3M8 16h3M15 12h1M15 16h1" />
    </>
  ),
  // Database with a lock
  canada: (
    <>
      <ellipse cx="11" cy="6" rx="7" ry="2.5" />
      <path d="M4 6v12c0 1.4 3.1 2.5 7 2.5M18 6v4M4 12c0 1.4 3.1 2.5 7 2.5" />
      <rect x="14" y="15" width="7" height="5.5" rx="1" />
      <path d="M15.5 15v-1.5a2 2 0 0 1 4 0V15" />
    </>
  ),
};

export function ShopPoints() {
  const { shops } = home;
  return (
    <Section labelledBy="shops-title">
      <SectionHeader id="shops-title" eyebrow={shops.eyebrow} title={shops.title} />
      <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {shops.points.map((point) => (
          <li key={point.icon} className="reveal flex gap-4 rounded-card border border-line p-6 md:flex-col">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-button bg-surface text-indigo ring-1 ring-line"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[point.icon]}
              </svg>
            </span>
            <p className="font-medium text-ink md:text-lg">{point.title}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
