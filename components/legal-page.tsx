import type { LegalBlock, LegalDocument } from "@/content/legal-types";
import { linkify } from "./linkify";
import { Container } from "./ui";

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{linkify(block)}</p>;
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-muted">
      {block.list.map((item) => (
        <li key={item}>{linkify(item)}</li>
      ))}
    </ul>
  );
}

const longDate = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" });

/** "2026-11-06" to "November 6, 2026". */
const formatDate = (iso: string) => longDate.format(new Date(iso));

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-4xl text-ink md:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {formatDate(doc.lastReviewed)}</p>
        <div className="mt-8 space-y-4 text-lg text-ink-2">
          {doc.intro.map((p) => (
            <p key={p}>{linkify(p)}</p>
          ))}
        </div>
        {doc.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-2xl text-ink">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-ink-2">
              {section.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </article>
    </Container>
  );
}
