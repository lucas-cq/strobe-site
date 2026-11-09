import type { CityPageContent } from "./city-types";

// Rules, steps and questions from STROBE_SITE_SEO_BUILD.md section 2.2. Every fact has a source below.
export const calgary: CityPageContent = {
  lastReviewed: "2026-11-09",
  meta: {
    title: "Calgary fire alarm deficiency reporting | Strobe",
    description:
      "Report deficient fire safety systems to the City of Calgary before day 10. Strobe builds the 311 packet from your inspection. You review and submit.",
  },
  eyebrow: "Calgary",
  title: "Calgary deficiency reporting, ready before day 10",
  intro:
    "Calgary Fire Department expects deficient fire safety systems to be reported within 10 business days of the inspection. Strobe keeps count for every site and has the 311 request ready when it's time.",
  visualAlt: "Sample Calgary 311 request marked ready to file, with the service location and system type filled in and the reports attached.",

  rules: {
    eyebrow: "What CFD expects",
    title: "The rule, in plain English",
    items: [
      "Calgary Fire Department expects deficient fire safety systems to be reported within **10 business days of the inspection**. Waiting on a quote doesn't pause the clock.",
      "**Impairments**, meaning problems that affect how a system works or what it covers, get reported **right away**. They may need emergency repairs or a fire watch.",
      "If an owner **won't or can't fix** a deficiency, the Alberta Fire Code says the person doing the maintenance notifies the fire department and the owner **in writing, right away**.",
      "Reports go in **through the City's 311 direct access reporting page**. Service companies get the link by emailing **FireLegal@calgary.ca**. Questions go to **FPBSupport1@calgary.ca**.",
      "**Full reports only.** CFD's bulletin says partial reports won't be accepted.",
      "**One 311 request per address**, with up to 7 systems, one of each type.",
      "You get a **service request (SR) number** when you submit. CFD reviews requests with non-compliant systems within 30 calendar days.",
      "**There's no second filing after repairs.** A Fire Safety Codes Officer follows up with the owner, who shows the inspection report and supporting documents from the company that made the repairs.",
      "Owners keep inspection records for **2 years**.",
    ],
    systems: {
      title: "The 7 system types on the City form",
      items: [
        "Fire Alarm",
        "Sprinkler System",
        "Special Suppression System",
        "Fire Hydrant",
        "Kitchen Canopy Cleaning",
        "Kitchen Suppression System",
        "Emergency Generator",
      ],
    },
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Inspection day.", body: "Finish the full report. Report any impairment right away." },
      { title: "Send the report and the quote", body: "to the building contact the same day if you can." },
      {
        title: "Business days 1 to 10.",
        body: "The owner approves, and repairs get done, or don't. Count business days, not calendar days. [Use the deadline calculator](/tools/calgary-10-day-deadline)",
      },
      { title: "Day 10, still deficient.", body: "Submit the 311 request with the full report attached. Save the SR number." },
      { title: "Owner refuses at any point.", body: "Notify CFD and the owner in writing right away. Don't wait for day 10." },
      { title: "After repairs.", body: "Give the owner a letter confirming what was repaired. That's what the officer will ask them for." },
    ],
  },

  mistakes: {
    title: "Easy ways to get it wrong",
    items: [
      "Counting **calendar days** instead of business days.",
      "**Waiting for the quote** to be approved before the clock starts. It started at the inspection.",
      "Sending a **partial report**. CFD won't accept it.",
      "Filing **one request per system** instead of one per address.",
      "Not saving the **SR number** with the site's records.",
    ],
  },

  questions: {
    title: "Questions",
    items: [
      { question: "Does a signed quote pause the 10 days?", answer: "No. Only a repaired system ends it." },
      {
        question: "What if everything's fixed before day 10?",
        answer:
          "The bulletin says to report deficient systems within 10 business days. It doesn't say plainly whether a system fully repaired inside that window still needs a 311 request. If you're unsure, ask CFD at FPBSupport1@calgary.ca.",
      },
      {
        question: "Does this cover sprinklers too?",
        answer: "The 311 form lists 7 system types, including sprinklers. Check the bulletin for the systems it applies to.",
      },
    ],
  },

  withStrobe: {
    eyebrow: "With Strobe",
    title: "What reporting looks like with Strobe",
    cards: [
      { title: "Every site at a glance", body: "See which systems are still deficient and how many business days are left." },
      { title: "Filing in minutes", body: "The request is ready with the reports attached. You check it and submit." },
      { title: "Ready when the officer calls", body: "The owner already has what the officer is going to ask for." },
    ],
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "CFD Fire Marshal Bulletin 2025-001",
        href: "https://www-prd.calgary.ca/content/dam/www/csps/fire/documents/fire-marshal-bulletins/industry-fire-alarm-reporting.pdf",
      },
      {
        label: "City of Calgary: Fire safety systems",
        href: "https://www.calgary.ca/for-business/operations/fire-safety-systems.html",
      },
      {
        label: "Calgary Fire Marshal letter on enforcement of reporting, which quotes Alberta Fire Code Division C, 2.2.7.2.(4)",
        href: "https://www.calgary.ca/content/dam/www/csps/fire/documents/fa-current-fire-marshal-letter-enforcement-of-reporting-nfc.pdf",
      },
    ],
    notes: [{ text: "Rules change. Always check with Calgary Fire Department." }],
  },
};
