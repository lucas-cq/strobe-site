import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { WalkthroughButton } from "../cal-booking";
import { Section } from "../section";

// Checked at build time. Drop a photo at public/founder.jpg and redeploy to show it.
const hasPhoto = existsSync(path.join(process.cwd(), "public", "founder.jpg"));

export function FounderNote() {
  const { founder } = home;
  return (
    <Section labelledBy="founder-title">
      <figure className="reveal relative mx-auto max-w-3xl">
        {/* Big decorative quotation mark behind the text */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -left-4 font-display text-[200px] leading-none text-indigo-100 select-none md:-top-20 md:-left-12 md:text-[260px]"
        >
          &ldquo;
        </span>
        <div className="relative">
          <h2 id="founder-title" className="font-sans text-sm font-medium tracking-wide text-indigo">
            {founder.eyebrow}
          </h2>
          {/* Body font at a smaller size on phones, so the note isn't a heavy block of text */}
          <blockquote className="mt-4 font-sans text-lg leading-relaxed text-ink md:font-display md:text-2xl md:tracking-[-0.01em]">
            <p>&ldquo;{founder.body}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="flex items-center gap-3">
              {hasPhoto ? (
                <Image src="/founder.jpg" alt={founder.photoAlt} width={56} height={56} className="size-14 rounded-full object-cover" />
              ) : (
                <span
                  aria-hidden="true"
                  className="bg-gradient-band flex size-14 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
                >
                  {founder.initials}
                </span>
              )}
              <span className="flex flex-col leading-tight">
                <span className="font-semibold text-ink">{founder.name}</span>
                <span className="text-sm text-muted">{founder.role}</span>
              </span>
              {site.founder.linkedin && (
                <a
                  href={site.founder.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
                >
                  {founder.linkedinLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </span>
            <WalkthroughButton
              className="group inline-flex items-center gap-1.5 font-medium text-indigo underline-offset-4 hover:underline"
              label={founder.bookLabel}
              fallbackLabel={founder.bookFallback}
            >
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                →
              </span>
            </WalkthroughButton>
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}
