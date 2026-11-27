import type { LegalBlock, LegalDocument } from "@/content/legal-types";
import { formatDate } from "@/lib/dates";
import { linkify } from "./linkify";
import { Container } from "./ui";

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{linkify(block)}</p>;
  if ("list" in block) {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-muted">
        {block.list.map((item) => (
          <li key={item}>{linkify(item)}</li>
        ))}
      </ul>
    );
  }
  // Below sm each row is a card, with the column name above each cell, so nothing scrolls sideways.
  const { head, rows } = block.table;
  return (
    <table className="w-full border-collapse text-[15px] max-sm:block">
      <thead className="text-left max-sm:sr-only">
        <tr>
          {head.map((label) => (
            <th key={label} scope="col" className="border-b border-line px-3 py-2 align-bottom font-semibold text-ink first:pl-0">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-sm:block">
        {rows.map((row) => (
          <tr key={row[0]} className="border-b border-line max-sm:block max-sm:py-3">
            {row.map((cell, i) => (
              <td
                key={i}
                data-label={head[i]}
                className={`px-3 py-2.5 align-top first:pl-0 max-sm:block max-sm:px-0 max-sm:py-0.5 max-sm:before:block max-sm:before:text-[13px] max-sm:before:text-muted max-sm:before:content-[attr(data-label)] ${i === 0 ? "font-medium text-ink" : ""}`}
              >
                {linkify(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-4xl text-ink md:text-5xl">{doc.title}</h1>
        {doc.party && <p className="mt-3 font-semibold text-ink">{doc.party}</p>}
        <p className="mt-2 text-sm text-muted">
          Last updated {formatDate(doc.lastReviewed)}
          {doc.version && <> · Version {doc.version}</>}
        </p>
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
        {doc.changelog && doc.changelog.length > 0 && (
          <section className="mt-16 border-t border-line pt-8">
            <h2 className="text-xl text-ink">Changes to this page</h2>
            <ul className="mt-4 space-y-2 text-[15px] text-ink-2">
              {doc.changelog.map((entry) => (
                <li key={entry.version}>
                  <span className="font-medium text-ink">
                    Version {entry.version}, {formatDate(entry.date)}:
                  </span>{" "}
                  {entry.summary}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Container>
  );
}
