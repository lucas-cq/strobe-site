import type { CityPageContent } from "./city-types";

// Facts from STROBE_SITE_SEO_BUILD.md section 2.5. Strobe drafts the email. A person sends it.
export const lethbridge: CityPageContent = {
  lastReviewed: "2026-11-09",
  meta: {
    title: "Lethbridge fire alarm report submission rules | Strobe",
    description:
      "Lethbridge wants every fire alarm report, clean or deficient, plus a contractor registry. The deadlines and where to send them, explained.",
  },
  eyebrow: "Lethbridge",
  title: "Lethbridge reports, clean or deficient",
  intro:
    "Lethbridge Fire and Emergency Services wants a copy of every fire alarm inspection report, and every testing company has to be on its registry. Here's how the deadlines work.",
  visualAlt: "Sample email to the Fire Prevention Bureau with the report attached, marked ready to send.",

  rules: {
    eyebrow: "What Lethbridge expects",
    title: "The rule, in plain English",
    items: [
      "**Every testing company must be on the City's contractor registry.** Contact fireprevention@lethbridge.ca.",
      "**The customer gets the report within 15 business days** of the inspection.",
      "**Clean reports,** with no deficiencies, go to the Fire Prevention Bureau **within 30 days**.",
      "**Deficient reports:** if the owner hasn't fixed it or arranged a repair **within 10 business days of getting the report**, send the report to **deficientreports@lethbridge.ca**.",
      "Fire alarm work follows CAN/ULC-S536-19. Water-based systems have their own letter and rules (NFPA 25).",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Get on the registry", body: "before you test in Lethbridge." },
      { title: "Inspection day.", body: "Finish the report." },
      { title: "Within 15 business days,", body: "the customer has it." },
      { title: "Clean report?", body: "Send it to the Fire Prevention Bureau within 30 days." },
      {
        title: "Deficient, and no repair arranged 10 business days after the owner got the report?",
        body: "Email it to deficientreports@lethbridge.ca.",
      },
    ],
  },

  withStrobe: {
    title: "With Strobe",
    cards: [
      { title: "The right email, ready", body: "Clean or deficient, Strobe drafts it with the report attached." },
      { title: "Every clock tracked", body: "15 business days, 10 business days and 30 days, per site." },
    ],
    note: "Strobe doesn't send anything to the City for you. You review and send.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "2026 letter to fire alarm testing companies",
        href: "https://www.lethbridge.ca/media/1hrlio4n/2026-letter-to-fire-alarm-testing-companies.pdf",
      },
      {
        label: "2026 letter to water-based testing companies",
        href: "https://www.lethbridge.ca/media/htcl1apj/2026-letter-to-water-based-fire-protection-testing-companies.pdf",
      },
    ],
    notes: [{ text: "Rules change. Always check with Lethbridge Fire and Emergency Services." }],
  },
};
