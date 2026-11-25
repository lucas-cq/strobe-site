import type { CityPageContent } from "./city-types";

// From the November 2026 SEO brief, S5. Facts only from the 51-city guide's Medicine Hat row and the
// letter it links. Strobe doesn't file for Medicine Hat: the notice at the top says so.
export const medicineHat: CityPageContent = {
  lastReviewed: "2026-11-24",
  meta: {
    title: "Medicine Hat fire alarm deficiency reporting rules | Strobe",
    description:
      "Medicine Hat wants fire alarm deficiencies reported by email when the repair isn't approved within 10 days. The rule and the steps, explained.",
  },
  eyebrow: "Medicine Hat",
  notice: "Strobe tracks the deadline. Filing for this city is done by you.",
  title: "Medicine Hat deficiencies, reported by day 10",
  intro:
    "Medicine Hat Fire Service asks contractors to report a deficiency when the repair hasn't been approved within 10 days of finding it. Here's the rule, from the City's own letter.",
  visualAlt: "Sample City clock for Medicine Hat, counting the days since each deficiency was found.",

  rules: {
    eyebrow: "What Medicine Hat expects",
    title: "The rule, in plain English",
    items: [
      "**No approval to start the repair within 10 days of finding a deficiency?** Notify the Fire Prevention Branch.",
      "**Send it by email** to fireprevention@medicinehat.ca.",
      "**If the owner won't or can't fix it,** tell the fire department and the owner in writing **right away**. You don't wait for day 10.",
      "Medicine Hat Fire Service confirmed by email on November 16, 2026 that this requirement hasn't changed.",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Inspection day.", body: "Finish the report and give the owner the list of deficiencies." },
      { title: "Owner won't or can't fix it?", body: "Tell the fire department and the owner in writing right away." },
      { title: "No approval to start the repair by day 10?", body: "Email fireprevention@medicinehat.ca." },
      { title: "Keep a copy", body: "of the email with the report." },
    ],
  },

  withStrobe: {
    title: "With Strobe",
    cards: [
      { title: "The 10 days, counted", body: "Strobe counts from the day each deficiency was found, per site, and warns you before day 10." },
      { title: "The paper trail, ready", body: "The report, the deficiency list and the owner's answer are in one place when you write to the Fire Prevention Branch." },
    ],
    note: "Strobe doesn't send anything to the City for you. Filing for Medicine Hat is done by you.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "Medicine Hat Fire Service: reporting deficiencies in fire protection systems (December 2018)",
        href: "https://www.medicinehat.ca/media/saqmho4a/fire-protection-reporting2.pdf",
      },
    ],
    notes: [
      { text: "Medicine Hat Fire Service confirmed by email on November 16, 2026 that this requirement hasn't changed." },
      { text: "Questions:", email: "fireprevention@medicinehat.ca" },
      { text: "Rules change. Always check with Medicine Hat Fire Service." },
    ],
  },
};
