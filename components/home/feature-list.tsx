import { features, featureStatusLabel } from "@/content/features";
import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-surface px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink-2 ring-1 ring-line">
      {children}
    </span>
  );
}

export function FeatureList() {
  const copy = home.features;
  return (
    <Section tone="surface" labelledBy="features-title">
      <SectionHeader id="features-title" eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const soon = feature.status === "coming-soon";
          return (
            <li key={feature.id} className="reveal flex gap-3">
              <span
                aria-hidden="true"
                className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full ${
                  soon ? "bg-white ring-1 ring-line" : "bg-indigo text-white"
                }`}
              >
                {!soon && (
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.25">
                    <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <div>
                <h3 className="flex flex-wrap items-center gap-2 font-sans text-base font-semibold tracking-normal text-ink">
                  {feature.title}{" "}
                  {soon && <StatusPill>{featureStatusLabel[feature.status]}</StatusPill>}
                </h3>
                <p className="mt-1 text-[15px] text-ink-2">{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
