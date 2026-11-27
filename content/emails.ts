import { site } from "./site";

/** Who sent it, as CASL requires: the legal name and the mailing address. Every marketing email uses it. */
export const emailSender = `${site.legalEntityName} · ${site.mailingAddress}`;

/** Copy for the two emails the early-access form sends. */
export const emails = {
  confirmation: {
    subject: (firstName: string) => `Got it, ${firstName}. Here's what happens next.`,
    preview: "Thanks for signing up for Strobe early access.",
    greeting: (firstName: string) => `Hi ${firstName},`,
    body: "Thanks for signing up for Strobe early access. I'm Lucas, and I'm building Strobe in Calgary. I'll reach out within one business day to set up a short walkthrough.",
    reply: "Or just reply to this email.",
    signOff: "Lucas",
    footer: emailSender,
    privacy: "Privacy",
  },
  notification: {
    subject: (company: string, cities: string, techCount: string) =>
      `New early access: ${company} (${cities}, ${techCount})`,
    heading: "New early-access request",
  },
  details: {
    subject: (company: string) => `Call prep details: ${company}`,
    heading: "Details added for your call",
  },
};
