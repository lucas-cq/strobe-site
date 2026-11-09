import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { DeadlineCalculator } from "@/components/tools/deadline-calculator";
import { Container } from "@/components/ui";
import { deadlineTool as tool } from "@/content/tool-deadline";
import { toolsIndex } from "@/content/tools";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...tool.meta, path: tool.path });

export default function DeadlineToolPage() {
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
        <Container className="relative pt-12 pb-12 md:pt-20 md:pb-14">
          <div className="max-w-3xl">
            <h1 id="tool-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              {tool.title}
            </h1>
            <p className="mt-6 text-lg text-ink-2">{tool.intro}</p>
          </div>
        </Container>
      </section>

      <Section tone="lavender" labelledBy="tool-title">
        <DeadlineCalculator />
        <h2 className="mt-12 font-sans text-base font-semibold tracking-normal text-ink">{tool.sources.title}</h2>
        <ul className="mt-3 space-y-2">
          {tool.sources.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo underline underline-offset-4 hover:text-violet"
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
