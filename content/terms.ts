import type { LegalDocument } from "./legal-types";

// Draft, pending legal review. Replace {{LEGAL_ENTITY_NAME}} before launch.
export const terms: LegalDocument = {
  meta: {
    title: "Terms of use | Strobe fire inspection software",
    description: "The terms for using strobehq.com, the website for Strobe fire inspection software for Alberta contractors.",
  },
  title: "Terms of use",
  updated: "November 2, 2026",
  intro: [
    "{{LEGAL_ENTITY_NAME}} (\"Strobe\", \"we\" or \"us\") runs strobehq.com. By using this website, you agree to these terms. If you don't agree, please don't use the site.",
  ],
  sections: [
    {
      heading: "Early access",
      body: [
        "Strobe is in early access. Features described on this site may change, and some are marked as coming soon. Joining early access or booking a walkthrough doesn't create an agreement to provide the Strobe app. Any use of the app will be covered by a separate agreement.",
      ],
    },
    {
      heading: "Information on this site",
      body: [
        "The information on this site is general and is provided for convenience. Where we describe City of Calgary or City of Edmonton requirements, we summarize public sources and link to them. Rules change, and this site isn't legal or professional advice. Always confirm requirements with the authority having jurisdiction.",
        "Strobe is independent software and is not affiliated with the City of Calgary, the City of Edmonton or their fire departments.",
        "Product screens on this site show sample data. They don't show real customers, sites or buildings.",
      ],
    },
    {
      heading: "Using the site",
      body: [
        "Please don't:",
        {
          list: [
            "Submit false information or someone else's details through our forms.",
            "Try to interfere with the site, its security or its spam protection.",
            "Scrape or copy the site in bulk, or use it to send spam.",
          ],
        },
      ],
    },
    {
      heading: "Our content",
      body: [
        "The Strobe name, logo, text, design and product screens on this site belong to us or our licensors. You may share links to the site, but you may not reuse our content or branding without our written permission.",
      ],
    },
    {
      heading: "Links to other sites",
      body: [
        "We link to other websites, including City of Calgary and City of Edmonton pages. We don't control those sites and aren't responsible for their content.",
      ],
    },
    {
      heading: "No warranty, and limits on liability",
      body: [
        "The site is provided as is. To the extent the law allows, we make no promises that it will be accurate, complete or always available, and we aren't liable for any loss that comes from using it or relying on it.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of Alberta and the federal laws of Canada that apply there. Any dispute goes to the courts of Alberta.",
      ],
    },
    {
      heading: "Changes and contact",
      body: [
        "We may update these terms. When we do, we'll change the date at the top of this page. Questions go to hello@strobehq.com.",
      ],
    },
  ],
};
