import type { NavLink } from "./site";

/** Shared shape for the /calgary and /edmonton pages (SITE_V2.md sections 4 and 5). */
export type CityPageContent = {
  /** The sitemap's lastmod for this page, as YYYY-MM-DD. */
  lastReviewed: string;
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  /** Read by screen readers in place of the decorative mockup. */
  visualAlt: string;
  /** What the city expects, in plain English. Facts only: see section 6 of the original brief. */
  rules: {
    eyebrow: string;
    title: string;
    items: string[];
    systems: { title: string; items: string[] };
  };
  /** What changes with Strobe: outcomes, not workflow steps. */
  withStrobe: {
    eyebrow: string;
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
