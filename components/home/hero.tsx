import { home } from "@/content/home";
import { formAnchor, site } from "@/content/site";
import { InspectPhone } from "../mockups/inspect-phone";
import { OwnerQuoteCard } from "../mockups/owner-quote-card";
import { Eyebrow } from "../section";
import { Container, buttonClasses } from "../ui";
import { WalkthroughButton } from "../cal-booking";

export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-14 pt-12 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-4 text-[2.375rem] leading-[1.06] text-ink sm:text-5xl lg:text-[3.75rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">{hero.sub}</p>
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
          <p className="mt-4 text-sm text-muted">{hero.note}</p>
        </div>

        <div className="relative">
          <p className="sr-only">{hero.visualAlt}</p>
          {/*
            Fixed-width composition, zoomed down on narrow phones so the mockups keep their proportions.
            The quote card stays in normal flow, so its height (plus the padding below) sets the
            composition's height and nothing overhangs the section.
          */}
          <div className="hero-enter relative mx-auto w-[520px] pt-[140px] pb-10 max-[400px]:[zoom:0.62] min-[400px]:max-sm:[zoom:0.7]">
            <div
              aria-hidden="true"
              className="bg-brand-gradient absolute top-1/2 left-1/2 size-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG, referenced by path */}
            <img
              src="/brand/strobe-mark.svg"
              alt=""
              width={512}
              height={512}
              className="absolute top-1/2 left-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
            />
            <InspectPhone className="absolute top-0 left-0" />
            <OwnerQuoteCard className="relative ml-[232px] w-[288px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
