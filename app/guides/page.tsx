import { GridPattern } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink } from "@/components/section";
import { Container } from "@/components/ui";
import { guidesHub } from "@/content/guides-hub";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...guidesHub.meta, path: guidesHub.path });

export default function GuidesPage() {
  return (
    <section aria-labelledby="guides-title" className="relative overflow-hidden bg-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: guidesHub.breadcrumb, path: guidesHub.path },
        ])}
      />
      <GridPattern />
      <Container className="relative py-12 md:py-20">
        <h1 id="guides-title" className="text-[2.25rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
          {guidesHub.title}
        </h1>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          {guidesHub.guides.map((guide) => (
            <li key={guide.path} className="card-gradient p-6">
              <h2 className="text-xl text-ink">{guide.title}</h2>
              <p className="mt-2 text-ink-2">{guide.summary}</p>
              <p className="mt-4">
                <ArrowLink href={guide.path}>{guidesHub.readLabel}</ArrowLink>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
