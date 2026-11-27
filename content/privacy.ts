import type { LegalDocument } from "./legal-types";
import { site } from "./site";

// One policy for the website, the app, owner pages and our emails (SITE_LEGAL M4).
// Every fact here comes from docs/legal/DATA_INVENTORY.md. Change both together.
// Not written by a lawyer: needs a lawyer read before major growth.

const mail = ` Mail: ${site.legalEntityName}, ${site.mailingAddress}.`;

export const privacy: LegalDocument = {
  meta: {
    title: "Privacy Policy | Strobe fire inspection software",
    description:
      "How Strobe Labs Inc. collects, uses, stores and protects personal information in the Strobe app, on strobehq.com and in our emails. Data is stored in Canada.",
  },
  title: "Privacy Policy",
  party: `${site.legalEntityName}, ${site.mailingAddress}`,
  lastReviewed: "2026-11-27",
  version: "1.0",
  intro: [
    `${site.legalEntityName} ("Strobe", "we" or "us") makes Strobe, fire alarm inspection software for Canadian shops. This policy explains what personal information we collect, why, where it's stored, how long we keep it, and the choices you have.`,
    "We follow Alberta's Personal Information Protection Act (PIPA), the federal Personal Information Protection and Electronic Documents Act (PIPEDA) where it applies, and Canada's Anti-Spam Legislation (CASL) for email.",
  ],
  sections: [
    {
      heading: "1. Who we are",
      body: [
        `${site.legalEntityName} is ${site.legalEntityKind} based in ${site.legalLocation}.${mail}`,
        `**Privacy Officer:** ${site.privacyOfficer}, ${site.privacyEmail}. Our Privacy Officer is responsible for how we handle personal information and answers every privacy question.`,
      ],
    },
    {
      heading: "2. What this policy covers",
      body: [
        {
          list: [
            "strobehq.com, including the early access form.",
            "The Strobe app, on the web and on phones.",
            "Owner pages: the links building owners and contacts open to view a report, approve a quote or sign a statement.",
            "The emails we send, and support.",
          ],
        },
      ],
    },
    {
      heading: "3. Our two roles",
      body: [
        "**Information about our own users and site visitors.** For people who visit our website, join early access, use the app or pay for it, we decide how the information is used. This policy applies to it in full.",
        "**Information our customers put into Strobe about their clients and buildings.** Shops enter building owners, property managers, site contacts and signatures so they can send reports and quotes. We process that information on the shop's behalf, to provide the service, and for no other purpose. The shop is responsible for having the right to collect it and share it with us.",
      ],
    },
    {
      heading: "4. What we collect",
      body: [
        "**Site visitors**",
        {
          list: [
            "Page-view statistics from Vercel Web Analytics. It sets no cookies and doesn't identify you.",
            "A one-way hash of your IP address when you submit a form, to stop spam. We don't store the IP address itself.",
            "How you found us: campaign tags in the link you followed (UTM), the referring site and the first page you landed on. These are kept in your browser for the visit and sent only if you submit the form.",
          ],
        },
        "**Early access**",
        {
          list: [
            "What you enter in the form: name, work email, company, phone if you give it, where you work, how many techs you have, how you report today, which software you use, what you inspect and any notes.",
            "Your consent record: whether you agreed to product updates, when, the exact wording you agreed to, and which form you used.",
          ],
        },
        "**Account users**",
        {
          list: [
            "Name, email, phone, role, and whether you're a panel tech or an office user.",
            "Tech number, certification and licence numbers, when your shop adds them to print on reports.",
            "Signature images you draw in the app.",
            "Sign-in records (time, IP address and device) and a record of key actions, such as role changes, sends, signatures and city filings.",
          ],
        },
        "**Billing contacts**",
        {
          list: [
            "Name, email and billing address. Stripe collects and holds card details. Strobe never sees full card numbers.",
          ],
        },
        "**Customer content**",
        {
          list: [
            "What shops enter or import: companies, buildings, systems, devices, inspections and results, reports, deficiencies, photos, quotes, repairs, attendance and notes.",
          ],
        },
        "**Building owners and contacts**",
        {
          list: [
            "Name, business name, email and phone, entered by the shop.",
            "What you do on an owner page: when you opened it, whether you approved or declined, your name, signature, PO number and the time, plus the IP address and browser of the device you used. We also keep a fingerprint (SHA-256) of the exact document you signed.",
          ],
        },
        "**Email engagement**",
        {
          list: [
            "We track whether our emails, and the report and quote emails our customers send through Strobe, are opened and whether links in them are clicked.",
          ],
        },
        "**Technical**",
        {
          list: [
            "Server logs: IP address, browser, the page requested and the time.",
            "Error reports, with personal information removed before they're sent.",
            "On your device: the app keeps a copy of your company's data so it works with no signal. See section 7.",
            "Push notification tokens for your phone, and the notifications we send.",
          ],
        },
        "**Communications**",
        {
          list: ["Emails, support messages and in-app feedback you send us."],
        },
        "Voice entry on the phone runs on the phone only. No audio is sent to us or anyone else.",
      ],
    },
    {
      heading: "5. Why we use it",
      body: [
        {
          list: [
            "To provide the service: run inspections, build and send reports and quotes, sync between devices, and show city deadlines.",
            "To bill for it.",
            "To keep it secure and prevent spam and abuse.",
            "To give support and onboarding.",
            "To send service emails, such as sign-in links, trial reminders, billing notices and deletion warnings.",
            "To send product updates, only if you agreed to them.",
            "To meet legal obligations, such as tax records.",
            "To improve the product, using aggregate information that doesn't identify anyone.",
          ],
        },
        "We don't sell personal information, and we don't use it for advertising.",
      ],
    },
    {
      heading: "6. Consent",
      body: [
        "We ask for **express consent** before sending product updates or other marketing email. The box on our forms is unticked by default, and we keep a record of what you agreed to and when.",
        "For running the service, consent is **implied** by signing up or using it: we use information only in ways a reasonable person would expect for that purpose.",
        `You can withdraw consent at any time. Use the unsubscribe link in any product update, or email ${site.privacyEmail}. Unsubscribes are honoured within 10 business days. If you withdraw consent to us holding your information at all, we'll tell you what that means for the service, and delete what we can as described in section 9.`,
      ],
    },
    {
      heading: "7. Cookies and on-device storage",
      body: [
        {
          list: [
            "**Sign-in:** the app sets one session cookie to keep you signed in, for up to 30 days. The phone app keeps its sign-in in the phone's secure storage.",
            "**Offline data:** the app keeps a copy of your company's data on the device, in the browser's storage or the phone's local database, so it works with no signal. A service worker keeps the app's files for offline use. Signing out removes the copy.",
            "**Preferences:** the web app remembers small display settings in your browser.",
            "**Website:** strobehq.com sets no cookies. Vercel Web Analytics is cookieless.",
          ],
        },
        "We don't use advertising or cross-site tracking cookies, so there's no cookie banner.",
      ],
    },
    {
      heading: "8. Service providers, and where data is stored",
      body: [
        "**The app's data is stored in Canada,** on Google Cloud in Toronto: the database, photos, signatures, PDFs, sync, backups and logs.",
        "We use these service providers. Each gets only what it needs, and may use it only to provide its service to us.",
        {
          table: {
            head: ["Provider", "What for", "What it handles", "Where"],
            rows: [
              ["Google Cloud", "Hosts the app: database, files, PDFs, offline sync (PowerSync, which we run ourselves), backups, logs", "Everything in the app", "Toronto, Canada"],
              ["Vercel", "Hosts strobehq.com, page-view statistics", "Request logs, cookieless page views", "United States"],
              ["Neon", "The early access database", "Early access form submissions", "United States"],
              ["Resend", "Sends website and app email", "Names, email addresses, email content", "United States"],
              ["Stripe", "Subscriptions, invoices, card payments", "Billing contact, billing address, card details", "United States and Canada"],
              ["Cloudflare", "Bot checks on our forms (Turnstile)", "IP address, browser signals", "Global, including the United States"],
              ["Sentry", "Error reports", "Error details, with personal information removed", "United States"],
              ["Expo", "Delivers push notifications, through Apple and Google", "Device push token, notification text", "United States"],
            ],
          },
        },
        `**Service providers outside Canada.** As the table shows, some of our service providers store or process personal information outside Canada, mainly in the United States, for the purposes listed. While it's there, it's subject to that country's laws, and courts, law enforcement and national security authorities there may be able to get access to it. For written information about how we use service providers outside Canada, or any question about it, contact our Privacy Officer, ${site.privacyOfficer}, at ${site.privacyEmail}.`,
      ],
    },
    {
      heading: "9. How long we keep it",
      body: [
        {
          table: {
            head: ["Information", "How long"],
            rows: [
              [
                "Account and customer data",
                "While the account is active. When an account goes read-only (a trial ends without a plan, or a subscription ends), 90 more days to export it. We email a final warning 14 days before, then delete it.",
              ],
              ["Backups", "Deleted data is removed from backups within 14 days."],
              ["Logs", "Up to 30 days."],
              ["Error reports", "Kept up to 90 days."],
              ["Invoices and payment records", "6 years, as the Canada Revenue Agency requires. Stripe holds them."],
              ["Early access submissions", "24 months after your last submission, unless you become a customer."],
              ["Spam-protection records", "30 days."],
              ["Support email", "While the account is active, plus 2 years."],
            ],
          },
        },
      ],
    },
    {
      heading: "10. Security",
      body: [
        {
          list: [
            "Information is encrypted in transit and at rest.",
            "Access is limited to the people who need it to run and support the service.",
            "Admin and provider accounts use multi-factor authentication.",
            "Each company's data is kept separate in the database, so one company can't see another's.",
            "IP addresses from website forms are stored only as one-way hashes.",
          ],
        },
        "No system is perfectly secure. If you think your account has been compromised, email us right away.",
      ],
    },
    {
      heading: "11. Breaches",
      body: [
        "If a breach of personal information creates a real risk of significant harm, we notify the people affected and the Office of the Information and Privacy Commissioner of Alberta, and the Office of the Privacy Commissioner of Canada where federal law applies. We keep a record of every breach, whatever its size.",
      ],
    },
    {
      heading: "12. Your rights",
      body: [
        `You can ask to see the personal information we hold about you, ask us to correct it, or withdraw your consent. Email ${site.privacyEmail}. We respond within 30 days.`,
        "**Building owners and contacts:** your information in Strobe was entered by the service company that inspects your building. You can contact them directly, or us, and we'll work with them to respond.",
        "If you're not satisfied with our answer, you can complain to:",
        {
          list: [
            "The Office of the Information and Privacy Commissioner of Alberta: [oipc.ab.ca](https://oipc.ab.ca)",
            "The Office of the Privacy Commissioner of Canada: [priv.gc.ca](https://www.priv.gc.ca)",
          ],
        },
      ],
    },
    {
      heading: "13. Children",
      body: ["Strobe is for businesses. It isn't directed at anyone under 18, and we don't knowingly collect their information."],
    },
    {
      heading: "14. Automated decisions",
      body: [
        "We don't make automated decisions about people. Deadlines and city clocks in the app are calculated for buildings and inspections, not for individuals.",
      ],
    },
    {
      heading: "15. Changes to this policy",
      body: [
        "When we change this policy, we update the date and version at the top. For a material change, we email account holders before it takes effect. If a change affects how we use information you've already given us, we'll ask for your consent first where the law requires it.",
      ],
    },
    {
      heading: "16. Contact",
      body: [`Privacy questions and requests: ${site.privacyOfficer}, Privacy Officer, ${site.privacyEmail}.${mail}`],
    },
  ],
  changelog: [
    {
      version: "1.0",
      date: "2026-11-27",
      summary: "First published version, from Strobe Labs Inc. One policy for the website, the app, owner pages and our emails.",
    },
  ],
};
