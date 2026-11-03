import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundMark, GridPattern } from "@/components/effects";
import { Container, buttonClasses } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Strobe fire inspection software" },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white">
      <GridPattern />
      <BackgroundMark className="top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 opacity-5 md:size-[680px]" />
      <Container className="relative py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG, referenced by path */}
          <img src="/brand/strobe-mark.svg" alt="" width={64} height={64} className="mx-auto size-16" />
          <p className="tabular mt-8 font-display text-sm font-semibold text-indigo">404</p>
          <h1 className="mt-3 text-4xl text-ink md:text-5xl">{site.notFound.title}</h1>
          <p className="mt-4 text-lg text-ink-2">{site.notFound.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className={buttonClasses("primary", "lg")}>
              {site.notFound.home}
            </Link>
            <Link href="/early-access" className={buttonClasses("secondary", "lg")}>
              {site.cta.primary}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
