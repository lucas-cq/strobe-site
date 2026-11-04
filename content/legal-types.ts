/**
 * A paragraph, or a bulleted list. Email addresses and URLs in the text are linked automatically,
 * and [label](/path) links to another page on the site.
 */
export type LegalBlock = string | { list: string[] };

export type LegalDocument = {
  meta: { title: string; description: string };
  title: string;
  updated: string;
  intro: string[];
  sections: { heading: string; body: LegalBlock[] }[];
};
