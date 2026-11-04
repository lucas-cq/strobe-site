import { home } from "@/content/home";
import { promises } from "@/content/promises";
import { WalkthroughButton } from "../cal-booking";
import { TopGradientLine } from "../effects";
import { Eyebrow } from "../section";
import { Container } from "../ui";

/** "Switching is on us": a compact lavender band with the two promises (STROBE_SITE_CANADA.md 7b). */
export function Switching() {
  const { switching } = home;
  const cards = [promises.onboarding, promises.data];
  return (
    <section id="switching" aria-labelledby="switching-title" className="bg-lavender">
      <Container className="grid gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-12">
        <div className="reveal">
          <Eyebrow>{switching.eyebrow}</Eyebrow>
          <h2 id="switching-title" className="mt-3 text-3xl text-ink md:text-4xl">
            {switching.title}
          </h2>
          <p className="mt-5 text-ink-2">
            {switching.question}{" "}
            <WalkthroughButton
              className="font-medium text-indigo underline underline-offset-4 hover:text-violet"
              label={switching.bookLabel}
              fallbackLabel={switching.bookFallback}
            />
            .
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.title} className="reveal relative overflow-hidden rounded-card-lg bg-white p-6 shadow-soft">
              <TopGradientLine />
              <h3 className="text-xl text-ink">{card.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{card.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
