import type { LegalDocument } from "./legal-types";
import { plans } from "./pricing";
import { site } from "./site";

// One agreement for the website, the app and the subscription (SITE_LEGAL M4).
// Plans and billing must match the app's docs/launch/BILLING.md and /pricing. Prices come from content/pricing.ts.
// Not written by a lawyer: needs a lawyer read before major growth.

const [solo, crew, shop] = plans;
const mail = ` Mail: ${site.legalEntityName}, ${site.mailingAddress}.`;

export const terms: LegalDocument = {
  meta: {
    title: "Terms of Service | Strobe fire inspection software",
    description:
      "The Terms of Service for Strobe, from Strobe Labs Inc.: the website, the app, plans, the free trial, billing, refunds, cancelling and your data.",
  },
  title: "Terms of Service",
  party: `${site.legalEntityName}, ${site.mailingAddress}`,
  lastReviewed: "2026-11-27",
  version: "1.0",
  intro: [
    `These Terms are an agreement between ${site.legalEntityName} ("Strobe", "we" or "us") and the business that uses Strobe ("you"). They cover strobehq.com, the Strobe app on the web and on phones, owner pages and your subscription. Our [Privacy Policy](/privacy) explains how we handle personal information.`,
    "By creating an account, starting a subscription or using Strobe, you agree to these Terms. If you don't agree, don't use Strobe.",
  ],
  sections: [
    {
      heading: "1. Who the agreement is between",
      body: [
        `${site.legalEntityName} is ${site.legalEntityKind}. Strobe is for businesses only, not for personal or household use.`,
        "If you accept these Terms for a business, you confirm you have the authority to bind it. \"You\" then means that business.",
      ],
    },
    {
      heading: "2. The service",
      body: [
        "Strobe is the website at strobehq.com, the web app, the phone app and the owner pages that building owners and contacts open from a link. App screens shown on our website use sample data, not real customers or buildings.",
      ],
    },
    {
      heading: "3. Accounts and users",
      body: [
        "You're responsible for the people you add to your account, the roles you give them, keeping sign-ins secure, and the devices that hold offline copies of your data. Tell us right away if you think an account has been compromised.",
      ],
    },
    {
      heading: "4. Plans and billing",
      body: [
        {
          list: [
            "**You pay per panel tech:** whoever runs the panel and fills in the report. Walkers never need a login.",
            `**${solo.name}:** 1 panel tech and 1 office login, $${solo.priceCadMonthly} a month or $${solo.priceCadYearly} a year. ${solo.name} can't add a second office user. Adding a second panel tech moves you to ${crew.name}.`,
            `**${crew.name}:** 2 to 5 panel techs, $${crew.priceCadMonthly} per panel tech a month or $${crew.priceCadYearly} per panel tech a year. Office users are free.`,
            `**${shop.name}:** 6 or more panel techs, $${shop.priceCadMonthly} per panel tech a month or $${shop.priceCadYearly} per panel tech a year. Once you have 6 or more, every panel tech is on this price. Office users are free.`,
            "**Your plan follows your panel tech count.** Moving between plans needs no new contract.",
            "**Prices are in Canadian dollars.** Taxes are added where they apply.",
            "**Subscriptions renew automatically,** monthly or yearly, until you cancel.",
            "**Adding a panel tech** is charged right away for the rest of the month or year (prorated). **Removing one** takes effect at your next renewal, with no partial refund.",
            "**Price changes:** we email you at least 30 days before. A new price applies from your next renewal after that notice.",
          ],
        },
      ],
    },
    {
      heading: "5. Free trial",
      body: [
        {
          list: [
            "New companies get a 30-day free trial with every feature. No card is needed.",
            "If the trial ends without a plan, your account becomes read-only. You can still view and export everything.",
            "An inspection already under way when the account goes read-only can still be finished and signed for 48 hours, including offline on the phone.",
          ],
        },
      ],
    },
    {
      heading: "6. Cancelling and refunds",
      body: [
        {
          list: [
            "You can cancel any time. It takes effect at the end of the month or year you've paid for, and you keep access until then.",
            "No refunds for partial months.",
            "**Yearly plans:** a full refund if you ask within 14 days of a yearly payment. After that, cancelling stops the renewal, with no refund for the unused part of the year.",
            "If we shut Strobe down, or it's unavailable for an extended period because of a problem on our side, we refund the unused time you've paid for.",
          ],
        },
      ],
    },
    {
      heading: "7. Failed payments",
      body: [
        "If a payment fails, you keep full access for 7 days while you update your card. After that, the account is read-only until the payment goes through.",
      ],
    },
    {
      heading: "8. Your data",
      body: [
        {
          list: [
            "**You own your data.** You give us a limited right to host, process, copy and display it, only to provide Strobe to you.",
            "**Export any time,** as CSV and PDF, on every plan, and for 90 days after your account goes read-only. See [Your data](/your-data).",
            "**Deletion:** 90 days after an account goes read-only, we delete its data. We email a final warning 14 days before. Deleted data and files are removed from backups and recovery storage within 7 days. We keep invoices and payment records as tax law requires.",
            "We may use aggregate, de-identified information to improve Strobe. It never identifies you, your clients or a building.",
          ],
        },
      ],
    },
    {
      heading: "9. Information about your clients",
      body: [
        "You confirm you're allowed to put building owner and contact details into Strobe, and to send them reports, quotes and statements through it. We process that information on your behalf, to provide the service, as our [Privacy Policy](/privacy) describes.",
      ],
    },
    {
      heading: "10. Your professional responsibility",
      body: [
        "Strobe is a tool. You and your qualified technicians remain responsible for:",
        {
          list: [
            "Inspections, testing and test results.",
            "Deciding what is a deficiency, and how serious it is.",
            "What goes in a report, and who signs it.",
            "Repairs.",
            "Reporting to the authority having jurisdiction, on time.",
          ],
        },
        "City rules, deadlines and clocks in Strobe and on our website are guidance taken from public sources. They can change, and they can be wrong. Always confirm requirements with the authority having jurisdiction.",
        "Strobe doesn't file anything with a city or fire department for you, and doesn't guarantee that a report will be accepted.",
        "Strobe is independent software and isn't affiliated with any city, county or fire department.",
      ],
    },
    {
      heading: "11. Electronic signatures",
      body: [
        "Strobe records signatures entered in the app and on owner pages, with the signer's name, the time and a fingerprint of the signed document. You're responsible for making sure electronic signatures suit how you use them.",
      ],
    },
    {
      heading: "12. Acceptable use",
      body: [
        "Don't:",
        {
          list: [
            "Use Strobe for anything unlawful.",
            "Try to break or test its security, or get into another company's data.",
            "Resell Strobe or give access to people outside your business.",
            "Scrape or copy the website or the app in bulk.",
            "Overload the service, or use it to send spam.",
            "Submit false information, or someone else's details, through our forms.",
          ],
        },
      ],
    },
    {
      heading: "13. Availability and support",
      body: [
        "We work to keep Strobe available but don't guarantee it will always be. Work done offline stays on the device until it syncs, so sync before you clear a device or sign out.",
        `Support is by email at ${site.email}. Every plan includes onboarding.`,
      ],
    },
    {
      heading: "14. Third-party services",
      body: [
        "Strobe relies on other services, such as Stripe for payments and email delivery providers. Where you use one directly, such as Stripe Checkout, its own terms apply too. We link to other websites, including city pages, and aren't responsible for their content.",
      ],
    },
    {
      heading: "15. Intellectual property",
      body: [
        `${site.legalEntityName} owns the Strobe software, website and brand. These Terms don't give you any rights to them beyond using Strobe. If you send us feedback or ideas, we can use them without owing you anything.`,
      ],
    },
    {
      heading: "16. Confidentiality",
      body: [
        "Each of us will protect the other's non-public information, use it only for this agreement, and not share it except with people who need it and are bound to protect it, or where the law requires.",
      ],
    },
    {
      heading: "17. Disclaimers",
      body: [
        "Strobe is provided as is and as available. To the extent the law allows, we make no other promises, including that it will be error-free or fit a particular purpose.",
      ],
    },
    {
      heading: "18. Limitation of liability",
      body: [
        "To the extent the law allows:",
        {
          list: [
            "Neither of us is liable for indirect, special or consequential damages, or for lost profits, revenue or data.",
            "Our total liability for any claim is capped at the fees you paid us in the 12 months before the claim.",
          ],
        },
      ],
    },
    {
      heading: "19. Indemnity",
      body: [
        "You'll cover us for claims by others that arise from your inspections, your reports, your data, or your use of Strobe against these Terms.",
      ],
    },
    {
      heading: "20. Suspension and termination",
      body: [
        "We may suspend or end an account for non-payment or misuse, with notice where it's reasonable. Section 8 covers what happens to your data afterwards.",
      ],
    },
    {
      heading: "21. Changes to these Terms",
      body: [
        "We email account holders at least 30 days before a material change takes effect. Continuing to use Strobe after that means you accept the new Terms. The date and version at the top of this page show which version is current.",
      ],
    },
    {
      heading: "22. Governing law",
      body: [
        "These Terms are governed by the laws of Alberta and the federal laws of Canada that apply there. Any dispute goes to the courts of Alberta, sitting in Calgary.",
      ],
    },
    {
      heading: "23. Quebec",
      body: ["Strobe is not offered to businesses based in Quebec at this time."],
    },
    {
      heading: "24. Contact",
      body: [`Questions about these Terms: ${site.email}.${mail}`],
    },
  ],
  changelog: [
    {
      version: "1.0",
      date: "2026-11-27",
      summary: "First published version, from Strobe Labs Inc. One agreement for the website, the app and subscriptions.",
    },
  ],
};
