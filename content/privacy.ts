import type { LegalDocument } from "./legal-types";
import { site } from "./site";

// Draft, pending legal review.
// Written to fit PIPEDA and Alberta's PIPA. The legal name comes from site.legalEntityName.
// Check the retention periods match what the code and your providers actually do.
export const privacy: LegalDocument = {
  meta: {
    title: "Privacy policy | Strobe fire inspection software",
    description:
      "How Strobe, fire alarm inspection software for Canadian shops, collects, uses and protects the information you share on strobehq.com.",
  },
  title: "Privacy policy",
  lastReviewed: "2026-11-04",
  intro: [
    `${site.legalEntityName} ("Strobe", "we" or "us") runs strobehq.com. This policy explains what we collect through this website and the early-access form, why we collect it, and the choices you have. It covers the website only. The Strobe app has its own terms.`,
    "Questions about privacy go to our privacy contact at privacy@strobehq.com.",
    "For the data you keep in the Strobe app, and how to export it, see [Your data](/your-data).",
  ],
  sections: [
    {
      heading: "What we collect",
      body: [
        "When you fill in the early-access form, we collect:",
        {
          list: [
            "Your name, work email, company and, if you give it, your phone number.",
            "Where you work, how many techs you have, how you do reports today, which software you use, what you inspect, and anything else you choose to tell us.",
            "Whether you agreed to receive product updates, the time you agreed, and the exact wording you agreed to.",
          ],
        },
        "We also collect some information automatically:",
        {
          list: [
            "A one-way hash of your IP address, used to stop the form being flooded with spam. We don't store your IP address itself.",
            "How you found us: campaign tags in the link you followed (UTM parameters), the site that referred you, and the first page you landed on.",
            "Anonymous page-view statistics from Vercel Web Analytics. It doesn't use cookies and doesn't identify you.",
          ],
        },
        "If you book a walkthrough, Cal.com collects the details you enter in the booking form. If you email us, we keep the emails.",
      ],
    },
    {
      heading: "Why we use it",
      body: [
        {
          list: [
            "To reply to you and talk with you about Strobe.",
            "To decide which shops join early access, and when.",
            "To send occasional product updates, only if you ticked the box for them.",
            "To protect the form from spam and abuse.",
            "To understand which pages and campaigns bring people to the site.",
          ],
        },
        "We don't sell your information, and we don't use it for anything unrelated to Strobe.",
      ],
    },
    {
      heading: "Consent",
      body: [
        "By submitting the form, you agree to us using your information for the purposes above. The product-updates box is unchecked by default, and we only send updates if you tick it.",
        "You can withdraw your consent at any time, using the unsubscribe link in any update or by emailing privacy@strobehq.com. If you withdraw consent to us holding your information at all, we'll delete it as described below.",
      ],
    },
    {
      heading: "Who processes it, and where",
      body: [
        "We use these service providers to run the site and the form:",
        {
          list: [
            "Vercel: hosting and anonymous analytics.",
            "Neon: the database that stores form submissions.",
            "Resend: sending the confirmation and notification emails.",
            "Cloudflare: Turnstile, which checks that a person, not a bot, is filling in the form.",
            "Cal.com: booking walkthroughs.",
          ],
        },
        "Some of these providers may store or process information outside Canada, including in the United States. Information held in another country is subject to that country's laws and may be accessed by its courts, law enforcement and national security authorities. We only share what each provider needs to do its job, and they may only use it to provide their service to us.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We delete early-access submissions 24 months after your last submission, unless you become a Strobe customer. Spam-protection records, which hold only a hashed IP address and a time, are deleted after 30 days.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask to see the information we hold about you, to correct it, or to delete it. Email privacy@strobehq.com and we'll respond within 30 days.",
        "If you're not satisfied with our response, you can contact the Office of the Information and Privacy Commissioner of Alberta or the Office of the Privacy Commissioner of Canada.",
      ],
    },
    {
      heading: "How we protect it",
      body: [
        "Information is encrypted in transit, access is limited to the people who need it to talk with you about Strobe, and IP addresses are stored only as one-way hashes.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If we change this policy, we'll update the date at the top of this page. If a change affects how we use information you've already given us, we'll ask for your consent first.",
      ],
    },
  ],
};
