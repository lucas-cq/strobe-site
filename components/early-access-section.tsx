import { home } from "@/content/home";
import { formAnchor } from "@/content/site";
import { EarlyAccessForm } from "./early-access-form";
import { GridPattern } from "./effects";
import { Container } from "./ui";

/**
 * The indigo form band used at the bottom of Home, Calgary and Edmonton, and as the whole
 * of /early-access (where the title becomes the page H1 and the band fills the page).
 * The band uses the darker indigo gradient so white text stays above AA contrast.
 */
export function EarlyAccessSection({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const { title, sub } = home.earlyAccessForm;
  const Heading = asPageTitle ? "h1" : "h2";
  return (
    <section
      id={formAnchor}
      aria-labelledby="early-access-title"
      className={`bg-gradient-band relative overflow-hidden ${asPageTitle ? "min-h-[calc(100dvh-4rem)]" : ""}`}
    >
      <GridPattern light />
      <Container className="relative py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Heading
              id="early-access-title"
              className={`text-white ${asPageTitle ? "text-4xl md:text-6xl" : "text-3xl md:text-[2.75rem]"}`}
            >
              {title}
            </Heading>
            <p className="mt-4 text-lg text-white/85">{sub}</p>
          </div>
          <div className="mt-10 rounded-card-lg bg-white p-5 shadow-[0_24px_60px_-24px_rgb(11_10_31/0.5)] sm:p-8">
            <EarlyAccessForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
