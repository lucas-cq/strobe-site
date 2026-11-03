import { home } from "@/content/home";
import { CityClock } from "../mockups/city-clock";
import { ArrowLink, Section, SectionHeader } from "../section";

export function CityClockBand() {
  const { clock } = home;
  return (
    <Section tone="night" labelledBy="clock-title" className="relative overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader id="clock-title" eyebrow={clock.eyebrow} title={clock.title} dark />
          <p className="reveal mt-5 max-w-xl text-lg text-night-text">{clock.body}</p>
          <div className="reveal mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-8">
            {clock.links.map((link) => (
              <ArrowLink key={link.href} href={link.href} dark>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="sr-only">{clock.visualAlt}</p>
          <CityClock variant="dark" className="mx-auto max-w-[480px]" />
        </div>
      </div>
    </Section>
  );
}
