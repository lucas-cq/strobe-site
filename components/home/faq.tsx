import { type FaqContent, faq as homeFaq } from "@/content/faq";
import { linkify } from "../linkify";
import { Section, SectionHeader } from "../section";

/** Native <details> accordion: keyboard and screen-reader support with no client JavaScript. */
export function Faq({ faq = homeFaq, id = "faq" }: { faq?: FaqContent; id?: string }) {
  return (
    <Section id={id} tone="lavender" labelledBy={`${id}-title`}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader id={`${id}-title`} eyebrow={faq.eyebrow} title={faq.title} />
        <div className="reveal divide-y divide-line border-y border-line">
          {faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 size-3.5 shrink-0 text-indigo before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-full before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-full after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="pr-8 pb-6 text-ink-2">{linkify(item.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
