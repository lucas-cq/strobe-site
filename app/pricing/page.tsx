import { CanadaFlag } from "@/components/canada-flag";
import { EarlyAccessSection } from "@/components/early-access-section";
import { GridPattern } from "@/components/effects";
import { Faq } from "@/components/home/faq";
import { CheckIcon } from "@/components/mockups/parts";
import { Plans } from "@/components/pricing/plans";
import { Eyebrow } from "@/components/section";
import { Container } from "@/components/ui";
import { pricing, pricingFaq } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...pricing.meta, path: "/pricing" });

export default function PricingPage() {
  const { includes } = pricing;
  return (
    <>
      <section aria-labelledby="pricing-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative pt-12 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{pricing.eyebrow}</Eyebrow>
            <h1 id="pricing-title" className="mt-4 text-[2.25rem] leading-[1.08] text-ink sm:text-5xl">
              {pricing.title}
            </h1>
            <p className="mt-5 text-lg text-ink-2">{pricing.lede}</p>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] font-semibold text-ink">
            <li className="inline-flex items-center gap-2">
              <CanadaFlag decorative className="h-2.5 w-5" />
              {pricing.currencyNote}
            </li>
            {pricing.terms.map((term) => (
              <li key={term} className="inline-flex items-center gap-1.5">
                <CheckIcon className="size-4 shrink-0 text-indigo" />
                {term}
              </li>
            ))}
          </ul>

          <Plans />

          <div className="reveal mt-10 rounded-card-lg bg-lavender p-6 md:p-8">
            <h2 className="font-sans text-lg font-semibold tracking-normal text-ink">{includes.title}</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-[15px] text-ink sm:grid-cols-2">
              {includes.items.map((item) => (
                <li key={item.text} className="flex gap-2.5">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-indigo" />
                  <span>
                    {item.lead && <strong className="font-semibold">{item.lead}:</strong>} {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Faq faq={pricingFaq} id="pricing-faq" />
      <EarlyAccessSection />
    </>
  );
}
