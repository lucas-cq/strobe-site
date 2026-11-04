import type { ReactNode } from "react";
import type { CityPageContent } from "@/content/city-types";
import { formAnchor, site } from "@/content/site";
import { WalkthroughButton } from "../cal-booking";
import { EarlyAccessSection } from "../early-access-section";
import { JsonLd } from "../json-ld";
import { GridPattern } from "../effects";
import { Eyebrow, Section, SectionHeader } from "../section";
import { Container, buttonClasses } from "../ui";

/**
 * Layout shared by /calgary and /edmonton. All copy comes from content/.
 * Rhythm: hero (white, grid) → the rule (lavender) → with Strobe (white) → sources (lavender) → form band.
 */
export function CityPage({ content, path, visual }: { content: CityPageContent; path: string; visual: ReactNode }) {
  const { rules, withStrobe, sources } = content;
  const url = new URL(path, site.url).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.meta.title,
    url,
    description: content.meta.description,
    about: {
      "@type": "Service",
      name: content.meta.title.replace(/ \| Strobe$/, ""),
      provider: { "@type": "Organization", name: "Strobe", url: site.url },
      areaServed: { "@type": "City", name: content.eyebrow },
    },
  };

  return (
    <>
      <JsonLd data={structuredData} />
      {/* Hero */}
      <section aria-labelledby="city-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <div
          aria-hidden="true"
          className="bg-gradient-brand pointer-events-none absolute top-24 -right-40 size-[560px] rounded-full opacity-[0.14] blur-3xl"
        />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 id="city-title" className="mt-4 text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-2">{content.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`#${formAnchor}`} className={buttonClasses("primary", "lg")}>
                {site.cta.primary}
              </a>
              <WalkthroughButton
                className={buttonClasses("secondary", "lg")}
                label={site.cta.walkthrough}
                fallbackLabel={site.cta.walkthroughFallback}
              />
            </div>
          </div>
          <div className="hero-enter min-w-0">
            <p className="sr-only">{content.visualAlt}</p>
            {visual}
          </div>
        </Container>
      </section>

      {/* The rule */}
      <Section tone="lavender" labelledBy="rules-title">
        <SectionHeader id="rules-title" eyebrow={rules.eyebrow} title={rules.title} />
        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {rules.items.map((item) => (
            <li key={item} className="reveal flex gap-3 rounded-card-lg bg-white p-5 shadow-soft">
              <span aria-hidden="true" className="bg-gradient-brand mt-2.5 h-0.5 w-4 shrink-0 rounded-full" />
              <p className="text-ink">{item}</p>
            </li>
          ))}
        </ul>
        <h3 className="reveal mt-10 font-sans text-base font-semibold tracking-normal text-ink">{rules.systems.title}</h3>
        <ul className="reveal mt-4 flex flex-wrap gap-2">
          {rules.systems.items.map((s) => (
            <li key={s} className="rounded-full bg-white px-3.5 py-1.5 text-[15px] font-medium text-ink-2 ring-1 ring-indigo-100">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* With Strobe */}
      <Section labelledBy="with-strobe-title">
        <SectionHeader id="with-strobe-title" eyebrow={withStrobe.eyebrow} title={withStrobe.title} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {withStrobe.cards.map((card) => (
            <li key={card.title} className="reveal card-gradient hover-lift p-6">
              <h3 className="text-xl text-ink">{card.title}</h3>
              <p className="mt-2 text-ink-2">{card.body}</p>
            </li>
          ))}
        </ul>
        {withStrobe.note && <p className="reveal mt-6 max-w-2xl text-ink-2">{withStrobe.note}</p>}
      </Section>

      {/* Sources */}
      <Section tone="lavender" labelledBy="sources-title">
        <aside className="reveal rounded-card-lg bg-white p-6 shadow-soft md:p-8">
          <h2 id="sources-title" className="font-sans text-base font-semibold tracking-normal text-ink">
            {sources.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {sources.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo underline underline-offset-4 hover:text-violet"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1 text-[15px] text-ink-2">
            {sources.notes.map((note) => (
              <p key={note.text}>
                {note.text}
                {note.email && (
                  <>
                    {" "}
                    <a href={`mailto:${note.email}`} className="font-medium text-indigo underline underline-offset-4">
                      {note.email}
                    </a>
                  </>
                )}
              </p>
            ))}
          </div>
        </aside>
      </Section>

      <EarlyAccessSection />
    </>
  );
}
