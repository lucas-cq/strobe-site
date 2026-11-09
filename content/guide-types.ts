import type { Reviewer } from "./site";

/** Text can use **bold** and [label](/path) links. */
export type GuideBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "numbered"; items: string[] }
  | { kind: "formula"; text: string }
  | { kind: "quoteCalculator" };

/**
 * A guide written as content. To publish a draft, once a working tech has reviewed it:
 * 1. Rename app/guides/<slug>/page.draft.tsx to page.tsx.
 * 2. Set `published: true` and update `lastReviewed`.
 * 3. Add it to content/guides-hub.ts and app/sitemap.ts.
 * The build fails if these disagree.
 */
export type Guide = {
  published: boolean;
  slug: string;
  /** YYYY-MM-DD. */
  lastReviewed: string;
  /** Only with the reviewer's written OK. */
  reviewer?: Reviewer;
  meta: { title: string; description: string };
  title: string;
  intro: string;
  sections: { title: string; blocks: GuideBlock[] }[];
};
