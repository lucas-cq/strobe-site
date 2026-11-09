import type { FaqItem } from "./faq";
import type { NavLink, Reviewer } from "./site";

type List = { eyebrow?: string; title: string; items: string[] };

/**
 * Shared shape for the city pages. Sections render in this order, and optional ones drop out.
 * Text in `items` and answers can use **bold**, email addresses and [label](/path) links.
 */
export type CityPageContent = {
  /** YYYY-MM-DD. Shown in the byline and sources, and used as the sitemap's lastmod. */
  lastReviewed: string;
  /** Only with the reviewer's written OK. */
  reviewer?: Reviewer;
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  /** Read by screen readers in place of the decorative mockup. */
  visualAlt: string;
  /** What the city expects, in plain English. Facts only, each one covered by `sources`. */
  rules: List & {
    systems?: { title: string; items: string[] };
  };
  /** A second list in the same section, e.g. your part of the LIV process. */
  process?: List;
  steps: {
    title: string;
    items: { title: string; body: string }[];
  };
  mistakes?: List;
  questions?: {
    title: string;
    items: FaqItem[];
  };
  /** What changes with Strobe: outcomes, not workflow steps. */
  withStrobe: {
    eyebrow?: string;
    title: string;
    cards: { title: string; body: string }[];
    /** A plain-language limit on what Strobe does, shown under the cards. */
    note?: string;
  };
  sources: {
    title: string;
    links: NavLink[];
    notes: { text: string; email?: string }[];
  };
};
