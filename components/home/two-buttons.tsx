import { home } from "@/content/home";
import { CityClock } from "../mockups/city-clock";
import { OwnerQuoteCard } from "../mockups/owner-quote-card";
import { Section, SectionHeader } from "../section";

export function TwoButtons() {
  const { buttons } = home;
  const [quote, city] = buttons.cards;

  return (
    <Section tone="surface" labelledBy="buttons-title">
      <SectionHeader id="buttons-title" eyebrow={buttons.eyebrow} title={buttons.title} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="reveal flex flex-col overflow-hidden rounded-card border border-line bg-white">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl text-ink md:text-[1.75rem]">
              {quote.title} <span className="text-muted">{quote.kicker}</span>
            </h3>
            <p className="mt-3 text-ink-2">{quote.body}</p>
          </div>
          {/* A crop of the hero's quote that fills the card, so the full quote isn't shown twice on the page */}
          <div className="relative min-h-64 flex-1 overflow-hidden border-t border-line bg-surface">
            <p className="sr-only">{quote.visualAlt}</p>
            <div className="absolute inset-x-6 top-6 bottom-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)] md:inset-x-8 md:top-8">
              <OwnerQuoteCard className="mx-auto w-full max-w-[340px]" />
            </div>
          </div>
        </article>

        <article className="reveal flex flex-col overflow-hidden rounded-card border border-line bg-white">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl text-ink md:text-[1.75rem]">
              {city.title} <span className="text-muted">{city.kicker}</span>
            </h3>
            <p className="mt-3 font-display text-lg font-semibold tracking-[-0.01em] text-ink">{city.subtitle}</p>
            <p className="mt-2 text-ink-2">{city.body}</p>
          </div>
          <div className="on-dark mt-auto bg-night p-6 md:p-8">
            <p className="sr-only">{city.visualAlt}</p>
            <CityClock variant="dark" className="mx-auto max-w-[420px]" />
          </div>
        </article>
      </div>
    </Section>
  );
}
