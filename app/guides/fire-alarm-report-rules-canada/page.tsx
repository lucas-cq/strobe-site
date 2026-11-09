import { Byline } from "@/components/byline";
import { GridPattern } from "@/components/effects";
import { RulesTable } from "@/components/guides/rules-table";
import { JsonLd } from "@/components/json-ld";
import { linkify } from "@/components/linkify";
import { RuleList } from "@/components/rule-list";
import { Section, SectionHeader } from "@/components/section";
import { Container } from "@/components/ui";
import { reportRulesGuide as guide } from "@/content/guide-report-rules";
import { reportRulesGuidePath as path, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { loadReportRules } from "@/lib/report-rules";
import { breadcrumbSchema, orgId } from "@/lib/schema";

export const metadata = pageMetadata({ ...guide.meta, path });

const url = new URL(path, site.url).toString();
const csvHref = `${path}.csv`;

const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guide.title,
  description: guide.meta.description,
  mainEntityOfPage: url,
  author: { "@type": "Person", name: site.founder.name, url: new URL("/about", site.url).toString() },
  publisher: { "@id": orgId },
  datePublished: guide.datePublished,
  dateModified: guide.lastReviewed,
};

const dataset = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: guide.dataset.name,
  description: guide.dataset.description,
  url,
  license: {
    "@type": "CreativeWork",
    name: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
  },
  creator: { "@id": orgId },
  temporalCoverage: "2026",
  distribution: {
    "@type": "DataDownload",
    encodingFormat: "text/csv",
    contentUrl: new URL(csvHref, site.url).toString(),
  },
};

export default function ReportRulesGuidePage() {
  const { found, table, edition, method } = guide;
  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={dataset} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: guide.title, path },
        ])}
      />

      <section aria-labelledby="guide-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="max-w-3xl">
            <h1 id="guide-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {guide.title}
            </h1>
            <Byline lastReviewed={guide.researchChecked} dateLabel="Research checked" className="mt-4" />
            <p className="mt-6 text-lg text-ink-2">{guide.intro}</p>
          </div>
        </Container>
      </section>

      <Section tone="lavender" labelledBy="found-title">
        <SectionHeader id="found-title" title={found.title} />
        <RuleList items={found.items} />
      </Section>

      <Section labelledBy="table-title">
        <SectionHeader id="table-title" title={table.title} />
        <RulesTable rows={loadReportRules()} csvHref={csvHref} />
      </Section>

      <Section tone="lavender" labelledBy="edition-title">
        <SectionHeader id="edition-title" title={edition.title} />
        <p className="reveal mt-6 max-w-3xl text-lg text-ink-2">{edition.body}</p>
      </Section>

      <Section labelledBy="method-title">
        <SectionHeader id="method-title" title={method.title} />
        <p className="reveal mt-6 max-w-3xl text-lg text-ink-2">{linkify(method.body)}</p>
      </Section>
    </>
  );
}
