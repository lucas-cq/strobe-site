import { GridPattern } from "@/components/effects";
import { FounderAvatar } from "@/components/founder-avatar";
import { JsonLd } from "@/components/json-ld";
import { linkify } from "@/components/linkify";
import { Section, SectionHeader } from "@/components/section";
import { Container } from "@/components/ui";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { orgId } from "@/lib/schema";

const path = "/about";

export const metadata = pageMetadata({ ...about.meta, path });

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.founder.name,
  jobTitle: "Founder",
  url: new URL(path, site.url).toString(),
  worksFor: { "@id": orgId },
  ...(site.founder.linkedin ? { sameAs: [site.founder.linkedin] } : {}),
};

export default function AboutPage() {
  const { why, how, contact } = about;
  return (
    <>
      <JsonLd data={person} />
      <section aria-labelledby="about-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="max-w-3xl">
            <h1 id="about-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {about.title}
            </h1>
            <p className="mt-6 text-lg text-ink-2">{about.intro}</p>
          </div>
        </Container>
      </section>

      <Section tone="lavender" labelledBy="about-why">
        <SectionHeader id="about-why" title={why.title} />
        <div className="reveal mt-6 max-w-3xl space-y-4 text-lg text-ink-2">
          {why.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section labelledBy="about-how">
        <SectionHeader id="about-how" title={how.title} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          {how.items.map((item) => (
            <li key={item.title} className="reveal card-gradient p-6">
              <h3 className="text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-ink-2">{linkify(item.body)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender" labelledBy="about-contact">
        <SectionHeader id="about-contact" title={contact.title} />
        <p className="reveal mt-6 max-w-3xl text-lg text-ink-2">{linkify(contact.body)}</p>
        <div className="reveal mt-8 flex w-fit items-center gap-4 rounded-card-lg bg-white p-5 shadow-soft">
          <FounderAvatar />
          <div>
            <p className="font-semibold text-ink">{contact.founderLine}</p>
            {site.founder.linkedin && (
              <a
                href={site.founder.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-sm font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
