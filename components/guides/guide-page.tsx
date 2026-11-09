import type { GuideBlock, Guide } from "@/content/guide-types";
import { guidesHub } from "@/content/guides-hub";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Byline } from "../byline";
import { GridPattern } from "../effects";
import { JsonLd } from "../json-ld";
import { linkify } from "../linkify";
import { Section } from "../section";
import { Container } from "../ui";
import { QuoteCalculator } from "./quote-calculator";

const pathOf = (guide: Guide) => `/guides/${guide.slug}`;

export function guideMetadata(guide: Guide) {
  return pageMetadata({ ...guide.meta, path: pathOf(guide), noindex: !guide.published });
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className="mt-4 text-lg text-ink-2">{linkify(block.text)}</p>;
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-ink-2 marker:text-indigo">
          {block.items.map((item) => (
            <li key={item}>{linkify(item)}</li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg text-ink-2 marker:font-semibold marker:text-indigo">
          {block.items.map((item) => (
            <li key={item}>{linkify(item)}</li>
          ))}
        </ol>
      );
    case "formula":
      return <p className="mt-4 rounded-card bg-lavender p-5 font-medium text-ink">{block.text}</p>;
    case "quoteCalculator":
      return <QuoteCalculator />;
  }
}

/** Layout for guides written as content. The 51-city guide has its own page, for the table. */
export function GuidePage({ guide }: { guide: Guide }) {
  const path = pathOf(guide);
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: guide.title,
          description: guide.meta.description,
          path,
          datePublished: guide.lastReviewed,
          dateModified: guide.lastReviewed,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: guidesHub.breadcrumb, path: guidesHub.path },
          { name: guide.title, path },
        ])}
      />

      <section aria-labelledby="guide-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative pt-12 pb-10 md:pt-20 md:pb-12">
          <div className="max-w-3xl">
            <h1 id="guide-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {guide.title}
            </h1>
            <Byline lastReviewed={guide.lastReviewed} reviewer={guide.reviewer} className="mt-4" />
            <p className="mt-6 text-lg text-ink-2">{guide.intro}</p>
          </div>
        </Container>
      </section>

      <Section flushTop labelledBy="guide-title">
        <article className="max-w-3xl space-y-12">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl text-ink md:text-3xl">{section.title}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </article>
      </Section>
    </>
  );
}
