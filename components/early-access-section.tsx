import { home } from "@/content/home";
import { formAnchor } from "@/content/site";
import { EarlyAccessForm } from "./early-access-form";
import { Section } from "./section";

/**
 * The form block used at the bottom of Home, Calgary and Edmonton, and as the
 * whole of /early-access (where the title becomes the page H1).
 */
export function EarlyAccessSection({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const { title, sub } = home.earlyAccess;
  const Heading = asPageTitle ? "h1" : "h2";
  return (
    <Section id={formAnchor} labelledBy="early-access-title">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div aria-hidden="true" className="bg-brand-gradient mx-auto mb-6 h-1 w-16 rounded-full" />
          <Heading
            id="early-access-title"
            className={`text-ink ${asPageTitle ? "text-4xl md:text-6xl" : "text-3xl md:text-[2.75rem]"}`}
          >
            {title}
          </Heading>
          <p className="mt-4 text-lg text-ink-2">{sub}</p>
        </div>
        <div className="mt-10 rounded-card border border-line bg-white p-5 shadow-soft sm:p-8">
          <EarlyAccessForm />
        </div>
      </div>
    </Section>
  );
}
