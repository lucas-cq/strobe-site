import { home } from "@/content/home";
import { ArrowLink, Section, SectionHeader } from "../section";

/** Four outcome cards: 4 across on desktop, 2 by 2 on tablets, stacked on phones. */
export function HowItWorks() {
  const { how } = home;
  return (
    <Section id="how" labelledBy="how-title">
      <SectionHeader id="how-title" eyebrow={how.eyebrow} title={how.title} lede={how.lede} />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {how.cards.map((card, i) => (
          <li key={card.title} className="reveal card-gradient hover-lift flex flex-col p-6">
            <span aria-hidden="true" className="gradient-numeral">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-xl text-ink">{card.title}</h3>
            <p className="mt-2 text-[15px] text-ink-2">{card.body}</p>
            {card.links && (
              <p className="mt-auto flex gap-5 pt-4 text-[15px]">
                {card.links.map((link) => (
                  <ArrowLink key={link.href} href={link.href}>
                    {link.label}
                  </ArrowLink>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
