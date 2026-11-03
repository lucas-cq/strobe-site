/** Copy for the two emails the early-access form sends. */
export const emails = {
  confirmation: {
    subject: (firstName: string) => `Got it, ${firstName}. Here's what happens next.`,
    preview: "Thanks for signing up for Strobe early access.",
    greeting: (firstName: string) => `Hi ${firstName},`,
    body: "Thanks for signing up for Strobe early access. I'm Lucas, and I'm building Strobe in Calgary. I'll reach out within one business day to set up a short walkthrough.",
    book: { before: "If it's easier, book a time here: ", after: ". Or just reply to this email." },
    /** Used when no booking link is configured. */
    replyOnly: "Or just reply to this email.",
    signOff: "Lucas",
    footer: "Strobe, Calgary, Alberta",
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
