import { home } from "@/content/home";
import { formAnchor } from "@/content/site";
import { BackgroundMark } from "../effects";
import { Section, SectionHeader } from "../section";
import { buttonClasses } from "../ui";

/**
 * One large indigo card plus four small white ones. Desktop: big card on the left over two rows,
 * small cards 2 by 2 on the right. Phones: big card first, then the small cards 2 by 2.
 */
export function EarlyAccessBento() {
  const { earlyAccess } = home;
  const { feature } = earlyAccess;
  return (
    <Section tone="lavender" labelledBy="bento-title">
      <SectionHeader id="bento-title" eyebrow={earlyAccess.eyebrow} title={earlyAccess.title} lede={earlyAccess.lede} />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        <div className="reveal bg-gradient-band relative col-span-2 flex flex-col overflow-hidden rounded-card-lg p-7 text-white sm:p-9 lg:row-span-2">
          <BackgroundMark onDark className="-right-20 -bottom-24 w-80 opacity-10" />
          <h3 className="relative text-3xl text-white md:text-4xl">{feature.title}</h3>
          <p className="relative mt-3 max-w-md text-lg text-white/90">{feature.body}</p>
          <p className="relative mt-auto pt-8">
            <a href={`#${formAnchor}`} className={buttonClasses("primary-on-dark", "lg")}>
              {feature.button}
            </a>
          </p>
        </div>
        {earlyAccess.cards.map((card) => (
          <div key={card.title} className="reveal hover-lift rounded-card-lg bg-white p-5 sm:p-6">
            <h3 className="font-sans text-base font-semibold tracking-normal text-ink sm:text-lg">{card.title}</h3>
            <p className="mt-1.5 text-sm text-ink-2 sm:text-[15px]">{card.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
