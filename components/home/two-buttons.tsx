import { home } from "@/content/home";
import { CityClock } from "../mockups/city-clock";
import { OwnerQuoteCard } from "../mockups/owner-quote-card";
import { Section, SectionHeader } from "../section";

const visuals = [
  <OwnerQuoteCard key="quote" className="mx-auto w-full max-w-[340px]" />,
  <CityClock key="clock" className="mx-auto max-w-[400px]" />,
];

export function TwoButtons() {
  const { buttons } = home;
  return (
    <Section labelledBy="buttons-title">
      <SectionHeader id="buttons-title" eyebrow={buttons.eyebrow} title={buttons.title} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {buttons.cards.map((card, i) => (
          <article
            key={card.title}
            className="reveal flex flex-col overflow-hidden rounded-card border border-line bg-white"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-2xl text-ink md:text-[1.75rem]">
                {card.title} <span className="text-muted">{card.kicker}</span>
              </h3>
              <p className="mt-3 text-ink-2">{card.body}</p>
            </div>
            <div className="flex flex-1 flex-col justify-center border-t border-line bg-surface p-6 md:p-8">
              <p className="sr-only">{card.visualAlt}</p>
              {visuals[i]}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
