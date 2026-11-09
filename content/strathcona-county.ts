import type { CityPageContent } from "./city-types";

// Facts from STROBE_SITE_SEO_BUILD.md section 2.4. Strobe isn't connected to the portal.
export const strathconaCounty: CityPageContent = {
  lastReviewed: "2026-11-09",
  meta: {
    title: "Strathcona County fire inspection report submission | Strobe",
    description:
      "Strathcona County wants every fire inspection report in its contractor portal within 14 days. Here's how it works for fire alarm contractors.",
  },
  eyebrow: "Strathcona County",
  title: "Strathcona County reports, uploaded on time",
  intro:
    "Strathcona County Emergency Services wants every fire protection inspection report uploaded to its contractor portal. Not just the deficient ones. Here's what that means for your shop.",
  visualAlt: "Sample SCES Contractor Portal upload marked ready to upload, with the report PDF and deficiency list ticked.",

  rules: {
    eyebrow: "What the County expects",
    title: "The rule, in plain English",
    items: [
      "**Every report goes in**, clean or deficient, through the **SCES Contractor Portal**. This has been required since January 1, 2021.",
      "**Upload within 14 days** of the inspection.",
      "**The occupant gets the report within 7 days.**",
      "**Each technician is registered** on the portal with their credentials.",
      "**If repair approval doesn't come within 14 days** of finding a deficiency, notify the County through the portal.",
      "**Critical deficiencies** get reported right away.",
      "**Reports need** the standard and its year, the technician's name, signature and certification number, and the deficiencies.",
      "The County **doesn't act on recommendations or comments**, only on deficiencies.",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Inspection day.", body: "Finish the report. Report anything critical right away." },
      { title: "Within 7 days,", body: "the occupant has the report." },
      { title: "Within 14 days,", body: "the report is uploaded to the portal." },
      { title: "Day 14, no repair approval?", body: "Notify the County through the portal." },
    ],
  },

  withStrobe: {
    title: "With Strobe",
    cards: [
      { title: "Ready to upload", body: "The report and deficiency list come out ready for the portal." },
      { title: "Both deadlines tracked", body: "7 days for the occupant and 14 for the portal, for every site." },
      { title: "Tech details filled in", body: "Names and certification numbers are saved once and added to every report." },
    ],
    note: "Strobe isn't connected to the portal and doesn't upload for you.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "Strathcona County: Fire inspections",
        href: "https://www.strathcona.ca/business-and-development/business/fire-inspections/",
      },
      {
        label: "SCES Contractor Portal introduction letter",
        href: "https://www.strathcona.ca/files/files/sces-contractor_portal_introduction_letter1.pdf",
      },
    ],
    notes: [{ text: "Rules change. Always check with Strathcona County Emergency Services." }],
  },
};
