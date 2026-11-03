import { home } from "@/content/home";
import { BackgroundMark } from "../effects";
import { CityClock } from "../mockups/city-clock";
import { ArrowLink, Section, SectionHeader } from "../section";

/** The dark band, with the logo mark slowly pulsing behind it like a strobe. */
export function CityDeadline() {
  const { deadline } = home;
  return (
    <Section tone="night" labelledBy="deadline-title" className="relative overflow-hidden">
      <BackgroundMark onDark pulse className="top-1/2 -left-48 w-[640px] -translate-y-1/2" />
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader id="deadline-title" eyebrow={deadline.eyebrow} title={deadline.title} dark />
          <p className="reveal mt-5 max-w-xl text-lg text-night-text">{deadline.body}</p>
          <div className="reveal mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-8">
            {deadline.links.map((link) => (
              <ArrowLink key={link.href} href={link.href} dark>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="sr-only">{deadline.visualAlt}</p>
          <CityClock variant="dark" className="mx-auto max-w-[460px]" />
        </div>
      </div>
    </Section>
  );
}
