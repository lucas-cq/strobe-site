import type { NavLink } from "./site";

/** Shared shape for the /calgary and /edmonton pages. */
export type CityPageContent = {
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  /** Read by screen readers in place of the decorative mockup. */
  visualAlt: string;
  rules: {
    eyebrow: string;
    title: string;
    items: string[];
    footnote?: string;
  };
  systems: {
    title: string;
    items: string[];
  };
  steps: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
    /** A plain-language limit on what Strobe does, shown under the steps. */
    note?: string;
    /** Feature id from content/features.ts, shown as a coming-soon item. */
    comingSoon?: string;
  };
  fieldMap?: {
    title: string;
    lede: string;
    columns: [string, string];
    rows: [string, string][];
  };
  sources: {
    title: string;
    links: NavLink[];
    notes: { text: string; email?: string }[];
  };
};
