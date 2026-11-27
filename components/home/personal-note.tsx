import { home } from "@/content/home";
import { formAnchor, site } from "@/content/site";
import { AuthorAvatar } from "../author-avatar";
import { Section } from "../section";

export function PersonalNote() {
  const { note } = home;
  return (
    <Section labelledBy="note-title">
      <figure className="reveal relative mx-auto max-w-3xl">
        {/* Big decorative quotation mark behind the text */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -left-4 font-display text-[200px] leading-none text-brand-100 select-none md:-top-20 md:-left-12 md:text-[260px]"
        >
          &ldquo;
        </span>
        <div className="relative">
          <h2 id="note-title" className="font-sans text-sm font-medium tracking-wide text-brand">
            {note.eyebrow}
          </h2>
          {/* Body font at a smaller size on phones, so the note isn't a heavy block of text */}
          <blockquote className="mt-4 font-sans text-lg leading-relaxed text-ink md:font-display md:text-2xl md:tracking-[-0.01em]">
            <p>&ldquo;{note.body}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="flex items-center gap-3">
              <AuthorAvatar />
              <span className="flex flex-col leading-tight">
                <span className="font-semibold text-ink">{note.name}</span>
                <span className="text-sm text-muted">{note.role}</span>
              </span>
              {site.author.linkedin && (
                <a
                  href={site.author.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-sm font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
                >
                  {note.linkedinLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </span>
            <a
              href={`#${formAnchor}`}
              className="group inline-flex items-center gap-1.5 font-medium text-brand underline-offset-4 hover:underline"
            >
              {note.talkLabel}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                →
              </span>
            </a>
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}
