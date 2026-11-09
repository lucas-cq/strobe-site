import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink } from "@/components/section";
import { Container } from "@/components/ui";
import { toolsIndex } from "@/content/tools";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...toolsIndex.meta, path: toolsIndex.path });

export default function ToolsPage() {
  return (
    <section aria-labelledby="tools-title" className="relative overflow-hidden bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: toolsIndex.breadcrumb, path: toolsIndex.path },
        ])}
      />
      <GridPattern />
      <Container className="relative py-12 md:py-20">
        <h1 id="tools-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
          {toolsIndex.title}
        </h1>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          {toolsIndex.tools.map((tool) => (
            <li key={tool.path} className="card-gradient p-6">
              <h2 className="text-xl text-ink">{tool.title}</h2>
              <p className="mt-2 text-ink-2">{tool.summary}</p>
              <p className="mt-4">
                <ArrowLink href={tool.path}>{tool.breadcrumb}</ArrowLink>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
