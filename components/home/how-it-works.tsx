import { home } from "@/content/home";
import { ArrowLink, Section, SectionHeader } from "../section";

export function HowItWorks() {
  const { how } = home;
  return (
    <Section id="how" labelledBy="how-title">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="how-title" eyebrow={how.eyebrow} title={how.title} lede={how.lede} />
        </div>

        <ol className="relative">
          {how.steps.map((step, i) => {
            const last = i === how.steps.length - 1;
            return (
              <li key={step.title} className="reveal relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-10 last:pb-0">
                {!last && (
                  <span aria-hidden="true" className="absolute top-11 bottom-1 left-5 w-px -translate-x-1/2 bg-line" />
                )}
                <span
                  aria-hidden="true"
                  className="tabular flex size-10 items-center justify-center rounded-full border border-line bg-white font-display text-[15px] font-semibold text-indigo"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-xl text-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 flex flex-wrap gap-1.5 text-[13px] font-medium text-ink-2">
                    <span className="rounded-full bg-surface px-2.5 py-0.5 ring-1 ring-line">{step.who}</span>
                    {step.where && (
                      <span className="rounded-full bg-surface px-2.5 py-0.5 ring-1 ring-line">{step.where}</span>
                    )}
                  </p>
                  <p className="mt-3 text-ink-2">{step.body}</p>
                  {step.links && (
                    <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
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
      </div>
    </Section>
  );
}
