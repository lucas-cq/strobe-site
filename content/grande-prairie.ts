import type { CityPageContent } from "./city-types";

// From the November 2026 SEO brief, S5. Facts only from the 51-city guide's Grande Prairie row and the
// owner guide it links. Strobe doesn't file for Grande Prairie: the notice at the top says so.
export const grandePrairie: CityPageContent = {
  lastReviewed: "2026-11-24",
  meta: {
    title: "Grande Prairie fire alarm deficiency reporting rules | Strobe",
    description:
      "In Grande Prairie, when an owner won't or can't fix a fire alarm defect, the contractor tells the fire department within 10 days. The rule, explained.",
  },
  eyebrow: "Grande Prairie",
  notice: "Strobe tracks the deadline. Filing for this city is done by you.",
  title: "Grande Prairie: unfixed defects, within 10 days",
  intro:
    "Grande Prairie's guide for building owners sets a 10-day limit. When an owner won't or can't fix a defect, the person who found it tells the fire department and the owner. Here's what it says.",
  visualAlt: "Sample City clock for Grande Prairie, counting the days toward the 10-day limit for each system.",

  rules: {
    eyebrow: "What Grande Prairie expects",
    title: "The rule, in plain English",
    items: [
      "**If the owner won't or can't fix a defect** you found, notify the fire department and the owner **within 10 days**.",
      "**The guide doesn't say how to send it.** Call Grande Prairie Fire Prevention at 780-538-0400 and ask how they want it.",
      "The owner guide is **undated** and refers to CAN/ULC-S536-13, an older edition. Alberta is on the 2019 edition now, so confirm the details with Fire Prevention.",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Inspection day.", body: "Finish the report and give the owner the list of defects." },
      { title: "Owner won't or can't fix it?", body: "Notify the fire department and the owner within 10 days." },
      { title: "First time?", body: "Call Fire Prevention at 780-538-0400 to ask how they want the notice." },
      { title: "Keep a copy", body: "of the notice with the report." },
    ],
  },

  withStrobe: {
    title: "With Strobe",
    cards: [
      { title: "The 10 days, counted", body: "Strobe counts down for every site, and warns you before the 10 days are up." },
      { title: "The paper trail, ready", body: "The report, the defect list and the owner's answer are in one place when you notify the fire department." },
    ],
    note: "Strobe doesn't send anything to the City for you. Filing for Grande Prairie is done by you.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "City of Grande Prairie: Building Owners' Fire Safety Maintenance Requirements",
        href: "https://www.cityofgp.com/sites/default/files/2023-04/Building%20Owners%20Fire%20Safety%20Maintenance%20Requirements.pdf",
      },
    ],
    notes: [
      { text: "Questions: Grande Prairie Fire Prevention, 780-538-0400." },
      { text: "Rules change. Always check with Grande Prairie Fire Prevention." },
    ],
  },
};
