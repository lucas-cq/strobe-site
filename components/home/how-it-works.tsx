import { home } from "@/content/home";
import { ArrowLink, Section, SectionHeader } from "../section";

/** Vertical timeline on phones and tablets; a single row of stages from 1024px up. */
export function HowItWorks() {
  const { how } = home;
  return (
    <Section id="how" labelledBy="how-title">
      <SectionHeader id="how-title" eyebrow={how.eyebrow} title={how.title} lede={how.lede} />

      <ol className="mt-12 lg:grid lg:grid-cols-5 lg:gap-6">
        {how.steps.map((step, i) => {
          const last = i === how.steps.length - 1;
          return (
            <li
              key={step.title}
              className="reveal relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 last:pb-0 lg:block lg:pb-0"
            >
              {!last && (
                <>
                  {/* Connector: down the left on small screens, across to the next stage on large ones */}
                  <span aria-hidden="true" className="absolute top-11 bottom-1 left-5 w-px -translate-x-1/2 bg-line lg:hidden" />
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-[-1.5rem] left-12 hidden h-px bg-line lg:block"
                  />
                </>
              )}
              <span
                aria-hidden="true"
                className="tabular relative flex size-10 items-center justify-center rounded-full border border-line bg-white font-display text-[15px] font-semibold text-indigo"
              >
                {i + 1}
              </span>
              <div className="pt-1.5 lg:pt-5">
                <h3 className="text-xl text-ink lg:text-lg">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 flex flex-wrap gap-1.5 text-[13px] font-medium text-ink-2">
                  <span className="rounded-full bg-surface px-2.5 py-0.5 ring-1 ring-line">{step.who}</span>
                  {step.where && <span className="rounded-full bg-surface px-2.5 py-0.5 ring-1 ring-line">{step.where}</span>}
                </p>
                <p className="mt-3 text-[15px] text-ink-2">{step.body}</p>
                {step.links && (
                  <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-y-1.5">
                    {step.links.map((link) => (
                      <ArrowLink key={link.href} href={link.href}>
                        {link.label}
                      </ArrowLink>
                    ))}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
