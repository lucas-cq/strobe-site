import { home } from "@/content/home";
import { ArrowLink, Section, SectionHeader } from "../section";

export function Cities() {
  const { cities } = home;
  return (
    <Section labelledBy="cities-title">
      <SectionHeader id="cities-title" eyebrow={cities.eyebrow} title={cities.title} />
      <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {cities.cards.map((card) => (
          <article key={card.city} className="reveal card-gradient hover-lift flex flex-col overflow-hidden">
            <div aria-hidden="true" className="h-2" style={{ backgroundImage: card.strip }} />
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <p className="text-sm font-medium text-ink-2">{card.label}</p>
              <h3 className="mt-1 text-2xl text-ink">{card.city}</h3>
              <p className="mt-3 text-ink-2">{card.body}</p>
              <p className="mt-auto pt-6">
                <ArrowLink href={card.link.href}>{card.link.label}</ArrowLink>
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="reveal mt-6 max-w-2xl text-[15px] text-ink-2">{cities.elsewhere}</p>
    </Section>
  );
}
