import type { Guide } from "../guide-types";

// DRAFT, from STROBE_SITE_SEO_BUILD.md section 5.4. A working tech must confirm the method and
// replace the example numbers with realistic ones before publishing.
export const quotingGuide: Guide = {
  published: false,
  slug: "how-to-quote-fire-alarm-inspection",
  lastReviewed: "2026-11-09",
  meta: {
    title: "How to quote a fire alarm inspection | Strobe",
    description:
      "How fire alarm shops price an annual inspection: device count, time per device, crew size and truck charge, with a worked example.",
  },
  title: "How to quote a fire alarm inspection",
  intro:
    "Most shops price an annual inspection the same basic way: count the devices, estimate the time per device, and add a truck charge. The details are where shops differ.",
  sections: [
    {
      title: "The basic formula",
      blocks: [{ kind: "formula", text: "(number of devices × minutes per device ÷ 60) × number of techs × hourly rate + truck charge" }],
    },
    {
      title: "A worked example",
      blocks: [
        { kind: "paragraph", text: "These are made-up numbers to show the math. Use your own rates." },
        {
          kind: "list",
          items: [
            "120 devices × 3 minutes = 360 minutes = **6 hours** on site",
            "2 techs × 6 hours × $X per hour = **labour**",
            "**plus** a truck charge of $Y",
            "**= the quote**",
          ],
        },
        { kind: "quoteCalculator" },
      ],
    },
    {
      title: "What changes the time per device",
      blocks: [
        {
          kind: "list",
          items: [
            "**Device type:** a pull station is quick, a duct detector takes longer.",
            "**Access:** ceiling height, lifts, locked suites.",
            "**Sprinkler flow and tamper devices,** tested with the fitter.",
            "**Panel tests and batteries.**",
            "**Report time.** Count it, or it comes out of your margin.",
          ],
        },
      ],
    },
    {
      title: "Put these in the contract",
      blocks: [
        {
          kind: "list",
          items: [
            "**A pre-approved repair limit,** so small fixes happen on the spot.",
            "**What's included,** and what gets quoted separately.",
            "**When the report goes out,** and to whom.",
          ],
        },
      ],
    },
  ],
};
