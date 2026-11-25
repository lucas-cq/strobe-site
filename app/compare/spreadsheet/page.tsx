import { EarlyAccessSection } from "@/components/early-access-section";
import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink, Eyebrow, Section, SectionHeader } from "@/components/section";
import { Container, buttonClasses } from "@/components/ui";
import { compareSpreadsheet as page } from "@/content/compare-spreadsheet";
import { formAnchor, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...page.meta, path: page.path });

/** The same inspection done both ways. A real table on desktop, stacked cards with labels on phones. */
export default function CompareSpreadsheetPage() {
  const { columns } = page;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.breadcrumb, path: page.path },
        ])}
      />
      <section aria-labelledby="compare-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative pt-12 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-3xl">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 id="compare-title" className="mt-4 text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {page.title}
            </h1>
            <p className="mt-6 text-lg text-ink-2">{page.intro}</p>
            <a href={`#${formAnchor}`} className={`${buttonClasses("primary", "lg")} mt-8`}>
              {site.cta.primary}
            </a>
          </div>
        </Container>
      </section>

      <Section flushTop labelledBy="compare-title">
        <table className="w-full border-collapse text-left max-md:block">
          <caption className="sr-only">{page.title}</caption>
          <thead className="max-md:sr-only">
            <tr className="border-b border-line">
              <th scope="col" className="w-[18%] py-3 pr-6 text-[15px] font-semibold text-muted">
                {columns.stage}
              </th>
              <th scope="col" className="py-3 pr-6 text-[15px] font-semibold text-muted">
                {columns.spreadsheet}
              </th>
              <th scope="col" className="py-3 text-[15px] font-semibold text-brand">
                {columns.strobe}
              </th>
            </tr>
          </thead>
          <tbody className="max-md:block max-md:space-y-4">
            {page.rows.map((row) => (
              <tr
                key={row.stage}
                className="reveal max-md:block max-md:rounded-card-lg max-md:border max-md:border-line max-md:p-5 md:border-b md:border-line"
              >
                <th scope="row" className="py-5 pr-6 align-top text-lg font-semibold text-ink max-md:block max-md:py-0">
                  {row.stage}
                </th>
                <td className="py-5 pr-6 align-top text-ink-2 max-md:block max-md:pt-3 max-md:pb-0">
                  <span className="block text-[13px] font-semibold text-muted md:hidden">{columns.spreadsheet}</span>
                  {row.spreadsheet}
                </td>
                <td className="py-5 align-top text-ink max-md:mt-3 max-md:block max-md:rounded-card max-md:bg-tint max-md:p-3">
                  <span className="block text-[13px] font-semibold text-brand md:hidden">{columns.strobe}</span>
                  {row.strobe}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section tone="tint" labelledBy="fine-title">
        <SectionHeader id="fine-title" title={page.fine.title} lede={page.fine.body} />
        <h3 className="reveal mt-10 font-sans text-base font-semibold tracking-normal text-ink">{page.next.title}</h3>
        <ul className="reveal mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {page.next.links.map((link) => (
            <li key={link.href}>
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </li>
          ))}
        </ul>
      </Section>

      <EarlyAccessSection />
    </>
  );
}
