import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";

export function Problem() {
  const { problem } = home;
  return (
    <Section tone="surface" labelledBy="problem-title">
      <SectionHeader id="problem-title" eyebrow={problem.eyebrow} title={problem.title} />
      <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {problem.cards.map((card, i) => (
          <li key={card.title} className="reveal rounded-card border border-line bg-white p-6">
            <p className="tabular font-display text-sm font-semibold text-muted" aria-hidden="true">
              0{i + 1}
            </p>
            <h3 className="mt-3 text-xl text-ink">{card.title}</h3>
            <p className="mt-2 text-ink-2">{card.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
