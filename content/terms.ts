import type { LegalDocument } from "./legal-types";
import { site } from "./site";

// Draft, pending legal review. The legal name comes from site.legalEntityName.
export const terms: LegalDocument = {
  meta: {
    title: "Terms of use | Strobe fire inspection software",
    description: "The terms for using strobehq.com, the website for Strobe fire alarm inspection software for Canadian shops.",
  },
  title: "Terms of use",
  lastReviewed: "2026-11-09",
  intro: [
    `${site.legalEntityName} ("Strobe", "we" or "us") runs strobehq.com. By using this website, you agree to these terms. If you don't agree, please don't use the site.`,
  ],
  sections: [
    {
      heading: "Early access",
      body: [
        "Strobe is in early access. Features described on this site may change. Joining early access or booking a walkthrough doesn't create an agreement to provide the Strobe app, and doesn't start a trial or a paid plan. Plans, trials and refunds are covered in the next section. Any other terms for using the app will be in a separate agreement.",
      ],
    },
    {
      heading: "Plans, trials and refunds",
      body: [
        {
          list: [
            "**Free trial:** new accounts get a 30-day free trial. No credit card is needed. When the trial ends without a paid plan, the account becomes read-only. You can still view and export your data.",
            "**Monthly plans:** billed monthly. Cancel anytime. Access continues to the end of the paid month. No refunds for partial months.",
            "**Yearly plans:** billed yearly at a discount. You can get a full refund within 14 days of a yearly payment. After that, cancelling stops the renewal and access continues until the end of the paid year, with no refund for the unused part. If we shut down the service, or it is unavailable for an extended period because of a problem on our side, we refund the unused months.",
            "**Founding pricing:** the first 25 shops to start a paid plan get 3 months free after their trial, and keep their starting price for as long as their subscription stays active. If the subscription lapses, founding pricing ends.",
            "**Prices** are in Canadian dollars, plus applicable taxes.",
            "**Your data:** you can export your data at any time, including for 90 days after cancelling. After that it is deleted.",
          ],
        },
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
