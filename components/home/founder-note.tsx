import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { home } from "@/content/home";
import { Section } from "../section";
import { WalkthroughButton } from "../cal-booking";

// Checked at build time. Drop a photo at public/founder.jpg and redeploy to show it.
const hasPhoto = existsSync(path.join(process.cwd(), "public", "founder.jpg"));

export function FounderNote() {
  const { founder } = home;
  return (
    <Section labelledBy="founder-title">
      <figure className="reveal mx-auto max-w-3xl rounded-card border border-line bg-surface p-6 md:p-10">
        <h2 id="founder-title" className="font-sans text-sm font-medium tracking-wide text-indigo">
          {founder.eyebrow}
        </h2>
        {/* Body font at a smaller size on phones, so the note isn't a heavy block of 9+ lines */}
        <blockquote className="mt-4 font-sans text-lg leading-relaxed text-ink md:font-display md:text-2xl md:tracking-[-0.01em]">
          <p>{founder.body}</p>
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="flex items-center gap-3">
            {hasPhoto ? (
              <Image
                src="/founder.jpg"
                alt={founder.photoAlt}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full bg-indigo font-display text-base font-semibold text-white"
              >
                {founder.initials}
              </span>
            )}
            <span className="font-medium text-ink">{founder.signature}</span>
            {founder.linkedinUrl && (
              <a
                href={founder.linkedinUrl}
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
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </WalkthroughButton>
        </figcaption>
      </figure>
    </Section>
  );
}
