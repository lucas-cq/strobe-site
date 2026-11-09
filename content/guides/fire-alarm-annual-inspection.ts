import type { Guide } from "../guide-types";

// DRAFT, from STROBE_SITE_SEO_BUILD.md section 5.2. Needs a working tech's review before publishing,
// because it describes field practice.
export const annualInspectionGuide: Guide = {
  published: false,
  slug: "fire-alarm-annual-inspection",
  lastReviewed: "2026-11-09",
  meta: {
    title: "How a fire alarm annual inspection actually runs | Strobe",
    description:
      "Who does what on a fire alarm annual inspection in Canada: the walker, the panel tech, sprinkler devices, the report, and what happens after.",
  },
  title: "How a fire alarm annual inspection actually runs",
  intro:
    "An annual fire alarm inspection in Canada follows CAN/ULC-S536. On paper it's a list of tests. On site it's a small crew working together, usually over a radio.",
  sections: [
    {
      title: "The crew",
      blocks: [
        {
          kind: "list",
          items: [
            "**The walker** goes floor by floor and sets off each device: smoke detectors, heat detectors, pull stations, horn/strobes and the rest.",
            "**The panel tech** sits at the fire alarm panel and confirms each signal comes in. They mark each device pass or fail in the report as they go.",
            "They talk by **radio**. The walker calls the device and the panel tech confirms it.",
            "**When the building has sprinklers,** a sprinkler fitter often joins. The water flow and valve tamper switches tie into the fire alarm, so they're tested in the same pass.",
          ],
        },
      ],
    },
    {
      title: "The report",
      blocks: [
        {
          kind: "paragraph",
          text: "The standard includes the report form you fill in. You complete it as written, with nothing added and nothing taken out. Shops fill it in different ways:",
        },
        {
          kind: "list",
          items: [
            "**By hand on a printout.** It's valid, and it's slow.",
            "**A fillable PDF** on a laptop or iPad. Better, but tedious with hundreds of devices.",
            "**An Excel version of the form.** Many small shops use this and get very fast at it. The cost is file management: one file per building, every year.",
            "**An inspection app.** Common in bigger companies. Reports are stored in one place and sent automatically, but some techs find data entry slower than their spreadsheet.",
          ],
        },
      ],
    },
    {
      title: "Extinguishers are a different report",
      blocks: [
        {
          kind: "paragraph",
          text: "Portable extinguishers are sometimes checked on the same visit, but they follow NFPA 10 and have their own report. Keep them separate from the S536 report.",
        },
      ],
    },
    {
      title: "Small repairs on the spot",
      blocks: [
        {
          kind: "paragraph",
          text: "Many contracts let the tech fix small deficiencies during the inspection, up to an amount the owner pre-approved, often a few hundred dollars. Anything over that gets quoted separately.",
        },
      ],
    },
    {
      title: "After the inspection",
      blocks: [
        {
          kind: "list",
          items: [
            "The report goes to the **building contact**, usually whoever pays.",
            "The **owner keeps a copy on site** for the fire department, and sends it to anyone else who needs it, like their insurer.",
            "**Deficiencies get quoted and repaired.**",
            "If an owner **won't fix a deficiency**, the contractor has to tell the fire department. Some cities want more than that. See [our 51-city guide](/guides/fire-alarm-report-rules-canada).",
          ],
        },
      ],
    },
  ],
};
