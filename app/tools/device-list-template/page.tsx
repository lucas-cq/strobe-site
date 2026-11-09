import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { NotifyForm } from "@/components/tools/notify-form";
import { Container, buttonClasses } from "@/components/ui";
import { deviceTemplate as tool } from "@/content/tool-device-template";
import { toolsIndex } from "@/content/tools";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...tool.meta, path: tool.path });

export default function DeviceTemplatePage() {
  return (
    <section aria-labelledby="tool-title" className="relative overflow-hidden bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: toolsIndex.breadcrumb, path: toolsIndex.path },
          { name: tool.breadcrumb, path: tool.path },
        ])}
      />
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
          <NotifyForm />
        </div>
      </Container>
    </section>
  );
}
