import { home } from "@/content/home";
import { ArrowLink, Section, SectionHeader } from "../section";

export function Cities() {
  const { cities } = home;
  return (
    <Section labelledBy="cities-title">
      <SectionHeader id="cities-title" eyebrow={cities.eyebrow} title={cities.title} />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cities.cards.map((card) => (
          <article key={card.city} className="reveal flex flex-col rounded-card border border-line bg-white p-6 md:p-8">
            <p className="text-sm font-medium text-muted">{card.city}</p>
            <h3 className="mt-2 text-2xl text-ink">{card.title}</h3>
            <p className="mt-3 text-ink-2">{card.body}</p>
            <p className="mt-6 pt-1 md:mt-auto md:pt-6">
              <ArrowLink href={card.link.href}>{card.link.label}</ArrowLink>
            </p>
          </article>
        ))}
      </div>
      <p className="reveal mt-6 max-w-2xl text-[15px] text-ink-2">{cities.elsewhere}</p>
    </Section>
  );
}
