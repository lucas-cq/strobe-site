import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { linkify } from "@/components/linkify";
import { RuleList } from "@/components/rule-list";
import { ArrowLink, Section, SectionHeader } from "@/components/section";
import { NotifyForm } from "@/components/tools/notify-form";
import { Container, buttonClasses } from "@/components/ui";
import { reportTemplate as tool } from "@/content/tool-report-template";
import { toolsIndex } from "@/content/tools";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...tool.meta, path: tool.path });

export default function ReportTemplatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: toolsIndex.breadcrumb, path: toolsIndex.path },
          { name: tool.breadcrumb, path: tool.path },
        ])}
      />
      <section aria-labelledby="tool-title" className="relative overflow-hidden bg-white">
        <GridPattern />
        <Container className="relative grid items-start gap-10 py-12 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <h1 id="tool-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {tool.title}
            </h1>
            <p className="mt-6 text-lg text-ink-2">{tool.intro}</p>
            <a href={tool.fileHref} download className={`${buttonClasses("primary", "lg")} mt-8`}>
              {tool.download}
            </a>
          </div>
          <div className="relative rounded-card-lg border border-line bg-white p-6 shadow-soft md:p-8">
            <NotifyForm source={tool.leadSource} />
          </div>
        </Container>
      </section>

      <Section tone="tint" labelledBy="includes-title">
        <SectionHeader id="includes-title" title={tool.includes.title} />
        <RuleList items={tool.includes.items} />
        <p className="reveal mt-8 max-w-3xl text-lg text-ink-2">{linkify(tool.caveat)}</p>
      </Section>

      <Section labelledBy="strobe-title">
        <SectionHeader id="strobe-title" title={tool.strobe.title} lede={tool.strobe.body} />
        <ul className="reveal mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {[...tool.strobe.links, ...tool.related].map((link) => (
            <li key={link.href}>
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
