import type { ReactNode } from "react";
import { features, featureStatusLabel } from "@/content/features";
import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";

type IconName = (typeof home.features.shopPoints)[number]["icon"];

const icons: Record<IconName, ReactNode> = {
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

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-surface px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink-2 ring-1 ring-line">
      {children}
    </span>
  );
}

/** Shop promises and early-access features in one grid, with coming-soon items in their own row. */
export function FeatureList() {
  const copy = home.features;
  const available = features.filter((f) => f.status === "early-access");
  const soon = features.filter((f) => f.status === "coming-soon");

  return (
    <Section tone="surface" labelledBy="features-title">
      <SectionHeader id="features-title" eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

      <ul className="mt-8 grid gap-x-8 gap-y-4 sm:mt-10 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-3">
        {copy.shopPoints.map((point) => (
          <li key={point.icon} className="reveal flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-button bg-white text-indigo ring-1 ring-line"
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {icons[point.icon]}
              </svg>
            </span>
            <p className="pt-1 font-semibold text-ink">{point.title}</p>
          </li>
        ))}
        {available.map((feature) => (
          <li key={feature.id} className="reveal flex gap-3">
            <span aria-hidden="true" className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-white">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.25">
                <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3 className="font-sans text-base font-semibold tracking-normal text-ink">{feature.title}</h3>
              {/* Titles carry the meaning on phones; descriptions show from 640px up to keep the page short */}
              <p className="mt-0.5 hidden text-[15px] text-ink-2 sm:block">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="reveal mt-10 border-t border-line pt-6">
        <h3 className="font-sans text-sm font-medium tracking-normal text-ink-2">{copy.comingSoonLabel}</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-3">
          {soon.map((feature) => (
            <li key={feature.id} className="rounded-card border border-dashed border-line bg-white/60 px-4 py-3">
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-ink">
                {feature.title} <StatusPill>{featureStatusLabel[feature.status]}</StatusPill>
              </p>
              <p className="mt-0.5 hidden text-sm text-ink-2 sm:block">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
