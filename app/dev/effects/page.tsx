import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackgroundMark, GridPattern, TopGradientLine } from "@/components/effects";
import { CityClock } from "@/components/mockups/city-clock";
import { ProofStrip } from "@/components/proof-strip";
import { ArrowLink } from "@/components/section";
import { Container, buttonClasses } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Effects preview | Strobe fire inspection software" },
  robots: { index: false, follow: false },
};

/**
 * Development-only gallery of the SITE_V2.md effects, so they can be reviewed before the
 * pages use them. Returns 404 in production builds.
 */
export default function EffectsPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      {/* Hero treatment: grid, glow, faded mark, live dot, buttons */}
      <section className="relative overflow-hidden bg-white">
        <GridPattern />
        <div aria-hidden="true" className="bg-gradient-brand absolute top-10 right-0 size-[520px] rounded-full opacity-15 blur-3xl" />
        <BackgroundMark className="-right-24 top-1/2 w-[640px] -translate-y-1/2 opacity-5" />
        <Container className="relative py-20">
          <p className="flex items-center gap-2 text-sm font-medium text-indigo">
            Fire alarm inspection software for Canadian shops
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl text-ink">Effects preview</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-2">Grid pattern, glow, faded mark, live dot and the polished buttons. Hover the primary button and the arrow link.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#" className={buttonClasses("primary", "lg")}>Get early access</a>
            <a href="#" className={buttonClasses("secondary", "lg")}>Talk to Lucas</a>
            <ArrowLink href="#">Arrow link</ArrowLink>
          </div>
        </Container>
      </section>

      <ProofStrip
        label="What Strobe covers"
        items={[
          "CAN/ULC-S536 reports",
          "Works with no signal",
          "Calgary 311 reporting",
          "Edmonton LIV uploads",
          "Any panel brand",
          "Owners sign from their phone",
          "Data stored in Canada",
        ]}
      />

      {/* Lavender band: white cards with a 2px gradient top line */}
      <section className="bg-lavender">
        <Container className="grid gap-4 py-20 md:grid-cols-3">
          {["Typing it twice", "Quotes that show up late", "A deadline on a sticky note"].map((t) => (
            <div key={t} className="reveal relative overflow-hidden rounded-card-lg bg-white p-6 shadow-soft">
              <TopGradientLine />
              <h3 className="text-xl text-ink">{t}</h3>
              <p className="mt-2 text-ink-2">Lavender band, white card, gradient line along the top edge.</p>
              <p className="mt-2 text-sm text-muted">Muted text on white.</p>
            </div>
          ))}
        </Container>
      </section>

      {/* White: gradient-border cards with numerals and hover lift */}
      <section className="bg-white">
        <Container className="grid gap-5 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {["01", "02", "03", "04"].map((n) => (
            <div key={n} className="reveal card-gradient hover-lift p-6">
              <span aria-hidden="true" className="gradient-numeral">
                {n}
              </span>
              <h3 className="mt-4 text-lg text-ink">Gradient border card</h3>
              <p className="mt-2 text-[15px] text-ink-2">Thin gradient border, big gradient numeral, lifts on hover. Staggers in on scroll.</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Night band with the strobe pulse */}
      <section className="on-dark relative overflow-hidden bg-night">
        <BackgroundMark onDark pulse className="-left-40 top-1/2 w-[640px] -translate-y-1/2" />
        <Container className="relative grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-ice">The City deadline</p>
            <h2 className="mt-3 text-4xl text-white">Strobe pulse behind the dark band</h2>
            <p className="mt-4 text-lg text-night-text">The mark fades from 6% to 12% and back every 5 seconds.</p>
          </div>
          <CityClock variant="dark" className="mx-auto max-w-[440px]" />
        </Container>
      </section>

      {/* Lavender: bento big card plus small cards */}
      <section className="bg-lavender">
        <Container className="grid gap-4 py-20 lg:grid-cols-4 lg:grid-rows-2">
          <div className="bg-gradient-band relative overflow-hidden rounded-card-lg p-8 text-white lg:col-span-2 lg:row-span-2">
            <BackgroundMark onDark className="-right-16 -bottom-16 w-72 opacity-10" />
            <h3 className="relative text-3xl text-white">Help shape what we build.</h3>
            <p className="relative mt-3 max-w-md text-white/90">Indigo band gradient with white text. Body text at 90% white.</p>
            <a href="#" className={`${buttonClasses("primary-on-dark", "lg")} relative mt-8`}>Get early access</a>
          </div>
          {["One price per shop", "Any panel", "Stored in Canada", "We'll move you over"].map((t) => (
            <div key={t} className="reveal hover-lift rounded-card-lg bg-white p-6">
              <h3 className="font-sans text-base font-semibold tracking-normal text-ink">{t}</h3>
              <p className="mt-1 text-[15px] text-ink-2">Small white card, no icon.</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Form band: band gradient with the light grid */}
      <section className="bg-gradient-band relative overflow-hidden">
        <GridPattern light />
        <Container className="relative py-20 text-center">
          <h2 className="text-4xl text-white">Get early access</h2>
          <p className="mt-3 text-lg text-white/85">White at 85% on the band gradient.</p>
          <div className="mx-auto mt-8 max-w-xl rounded-card-lg bg-white p-8 text-left text-ink-2 shadow-soft">The form card sits here.</div>
        </Container>
      </section>
    </>
  );
}
