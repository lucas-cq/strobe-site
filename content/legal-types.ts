/**
 * A paragraph, or a bulleted list. Email addresses and URLs in the text are linked automatically,
 * and [label](/path) links to another page on the site.
 */
export type LegalBlock = string | { list: string[] };

export type LegalDocument = {
  meta: { title: string; description: string };
  title: string;
  /** YYYY-MM-DD. Shown as "Last updated" and used as the sitemap's lastmod. */
  lastReviewed: string;
  intro: string[];
  sections: { heading: string; body: LegalBlock[] }[];
};
