import { home } from "@/content/home";
import { TopGradientLine } from "../effects";
import { Section, SectionHeader } from "../section";

export function Problem() {
  const { problem } = home;
  return (
    <Section tone="lavender" labelledBy="problem-title">
      <SectionHeader id="problem-title" eyebrow={problem.eyebrow} title={problem.title} />
      <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {problem.cards.map((card) => (
          <li key={card.title} className="reveal relative overflow-hidden rounded-card-lg bg-white p-6 shadow-soft">
            <TopGradientLine />
            <h3 className="text-xl text-ink">{card.title}</h3>
            <p className="mt-2 text-ink-2">{card.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
