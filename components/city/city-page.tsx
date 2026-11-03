import type { ReactNode } from "react";
import type { CityPageContent } from "@/content/city-types";
import { features, featureStatusLabel } from "@/content/features";
import { formAnchor, site } from "@/content/site";
import { EarlyAccessSection } from "../early-access-section";
import { StatusPill } from "../home/feature-list";
import { Eyebrow, Section, SectionHeader } from "../section";
import { Container, buttonClasses } from "../ui";
import { WalkthroughButton } from "../cal-booking";

/** Layout shared by /calgary and /edmonton. All copy comes from content/. */
export function CityPage({ content, visual }: { content: CityPageContent; visual: ReactNode }) {
  const soon = content.steps.comingSoon ? features.find((f) => f.id === content.steps.comingSoon) : undefined;

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="city-title" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-brand-gradient pointer-events-none absolute top-24 -right-40 size-[520px] rounded-full opacity-[0.12] blur-3xl"
        />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
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
              <WalkthroughButton className={buttonClasses("secondary", "lg")}>{site.cta.walkthrough}</WalkthroughButton>
            </div>
          </div>
          <div className="hero-enter min-w-0">
            <p className="sr-only">{content.visualAlt}</p>
            {visual}
          </div>
        </Container>
      </section>

      {/* The rule */}
      <Section tone="surface" labelledBy="rules-title">
        <SectionHeader id="rules-title" eyebrow={content.rules.eyebrow} title={content.rules.title} />
        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {content.rules.items.map((item) => (
            <li key={item} className="reveal flex gap-3 rounded-card border border-line bg-white p-5">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-indigo" />
              <p className="text-ink">{item}</p>
            </li>
          ))}
        </ul>
        {content.rules.footnote && <p className="reveal mt-5 max-w-2xl text-ink-2">{content.rules.footnote}</p>}

        <h3 className="reveal mt-12 font-sans text-base font-semibold tracking-normal text-ink">
          {content.systems.title}
        </h3>
        <ul className="reveal mt-4 flex flex-wrap gap-2">
          {content.systems.items.map((s) => (
            <li key={s} className="rounded-full bg-white px-3.5 py-1.5 text-[15px] font-medium text-ink-2 ring-1 ring-line">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* What Strobe does */}
      <Section labelledBy="steps-title">
        <SectionHeader id="steps-title" eyebrow={content.steps.eyebrow} title={content.steps.title} />
        <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.items.map((step, i) => (
            <li key={step.title} className="reveal border-t border-line pt-5">
              <span aria-hidden="true" className="tabular font-display text-sm font-semibold text-indigo">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-[15px] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>

        {(content.steps.note || soon) && (
          <div className="reveal mt-12 grid gap-4 md:grid-cols-2">
            {content.steps.note && (
              <p className="rounded-card border border-line bg-surface p-5 text-ink">{content.steps.note}</p>
            )}
            {soon && (
              <div className="rounded-card border border-dashed border-line p-5">
                <p className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  {soon.title} <StatusPill>{featureStatusLabel[soon.status]}</StatusPill>
                </p>
                <p className="mt-1 text-[15px] text-ink-2">{soon.description}</p>
              </div>
            )}
          </div>
        )}
      </Section>

      {/* Field map (Calgary) */}
      {content.fieldMap && (
        <Section tone="surface" labelledBy="fieldmap-title">
          <SectionHeader id="fieldmap-title" title={content.fieldMap.title} lede={content.fieldMap.lede} />
          <div className="reveal mt-10 overflow-hidden rounded-card border border-line bg-white">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-surface text-sm text-ink-2">
                <tr>
                  {content.fieldMap.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-medium md:px-6">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {content.fieldMap.rows.map(([field, source]) => (
                  <tr key={field}>
                    <th scope="row" className="w-1/2 px-4 py-3 align-top font-medium text-ink md:px-6">
                      {field}
                    </th>
                    <td className="px-4 py-3 align-top text-ink-2 md:px-6">{source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Sources */}
      <Section labelledBy="sources-title" className="border-b border-line">
        <aside className="reveal rounded-card border border-line p-6 md:p-8">
          <h2 id="sources-title" className="font-sans text-base font-semibold tracking-normal text-ink">
            {content.sources.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {content.sources.links.map((link) => (
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
            {content.sources.notes.map((note) => (
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
