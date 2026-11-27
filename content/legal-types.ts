/**
 * A paragraph, a bulleted list, or a table. Email addresses and URLs in the text are linked
 * automatically, and [label](/path) links to another page on the site.
 */
export type LegalBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };

export type LegalDocument = {
  meta: { title: string; description: string };
  title: string;
  /** YYYY-MM-DD. Shown as "Last updated" and used as the sitemap's lastmod. */
  lastReviewed: string;
  /** Shown beside the date on /terms and /privacy. The app stores the version a user agreed to. */
  version?: string;
  /** The legal party, shown under the title. */
  party?: string;
  intro: string[];
  sections: { heading: string; body: LegalBlock[] }[];
  /** Newest first, shown at the bottom. */
  changelog?: { version: string; date: string; summary: string }[];
};
