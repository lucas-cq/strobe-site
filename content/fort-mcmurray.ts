import type { CityPageContent } from "./city-types";

// From the November 2026 SEO brief, S5. Facts only from the 51-city guide's "Wood Buffalo (Fort McMurray)"
// row and the permit package it links. Strobe doesn't file for Wood Buffalo: the notice at the top says so.
export const fortMcMurray: CityPageContent = {
  lastReviewed: "2026-11-24",
  meta: {
    title: "Fort McMurray (Wood Buffalo) fire alarm reporting rules | Strobe",
    description:
      "Wood Buffalo's rules for fire alarm service providers: a work permit, the customer's report within 15 business days, and written notice of unfixed defects.",
  },
  eyebrow: "Fort McMurray",
  notice: "Strobe tracks the deadline. Filing for this city is done by you.",
  title: "Fort McMurray and Wood Buffalo fire alarm rules",
  intro:
    "The Regional Municipality of Wood Buffalo's Fire Prevention Branch expects fire alarm service providers to hold a work permit, call fire dispatch around testing, get the report to the customer within 15 business days, and give written notice when an owner won't fix a defect.",
  visualAlt: "Sample email to the Fire Prevention Branch with the report attached, marked ready to send.",

  rules: {
    eyebrow: "What Wood Buffalo expects",
    title: "The rule, in plain English",
    items: [
      "**Service providers need a work permit** from the Fire Prevention Branch to work on fire alarm systems in the region. **Permits expire on December 31,** so you need a new one each year. The application package lists what to send with it.",
      "**Call fire dispatch at 780-743-7061** before you start work, when the system is restored, and after any accidental activation.",
      "**The customer gets the report within 15 business days** of the inspection.",
      "**If the owner won't or can't fix a defect,** notify the Fire Prevention Branch and the owner, **both in writing**. Send the Branch's copy to RESFire.PreventionBranch@rmwb.ca.",
      "The Fire Prevention Branch confirmed by email on November 13, 2026 that there's **no set deadline**. Send it as soon as you know the defect won't be fixed.",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Get the work permit", body: "before you work on fire alarm systems in the region, and renew it for each new year." },
      { title: "Before you start,", body: "call fire dispatch at 780-743-7061. Call again when the system is restored, and after any accidental activation." },
      { title: "Inspection day.", body: "Finish the report." },
      { title: "Within 15 business days,", body: "the customer has it." },
      { title: "Owner won't or can't fix a defect?", body: "Write to the Fire Prevention Branch at RESFire.PreventionBranch@rmwb.ca, and to the owner." },
    ],
  },

  withStrobe: {
    title: "With Strobe",
    cards: [
      { title: "The 15 days, counted", body: "Strobe counts the business days to the customer's report, per site." },
      { title: "The notice, ready", body: "The report and the defect list are ready to attach when you write to the Fire Prevention Branch." },
    ],
    note: "Strobe doesn't send anything to the Fire Prevention Branch for you. Filing for Wood Buffalo is done by you.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "Wood Buffalo Fire Prevention Branch: fire alarm systems work permit application package (October 2025)",
        href: "https://www.rmwb.ca/media/z0foymrb/2025_10_29-rmwb-fire-alarm-systems-work-permit-application-package.pdf",
      },
    ],
    notes: [
      { text: "The Fire Prevention Branch confirmed by email on November 13, 2026 that there's no set deadline for notices of unfixed defects." },
      { text: "Notices of unfixed defects:", email: "RESFire.PreventionBranch@rmwb.ca" },
      { text: "Questions: Wood Buffalo Fire Prevention Branch, 780-792-5519." },
      { text: "Rules change. Always check with the Fire Prevention Branch." },
    ],
  },
};
