import type { CityPageContent } from "./city-types";

// Every regulatory statement here must match section 6 of STROBE_SITE_BRIEF.md.
// Copy from SITE_V2.md section 4: outcomes, not the workflow.
export const calgary: CityPageContent = {
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
      "The 10 business days start at the inspection. Waiting on a quote doesn't pause them.",
      "Impairments that affect how a system works or what it covers get reported right away. They may need emergency repairs or a fire watch.",
      "It's one 311 request per address, with up to 7 systems in it, one of each type.",
      "You get a service request (SR) number when you submit. CFD reviews requests with non-compliant systems within 30 calendar days.",
      "There's no second filing after repairs. A Fire Safety Codes Officer follows up with the owner, who shows the inspection report and a letter from the repair company.",
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
    ],
    notes: [{ text: "Rules change. Always check with Calgary Fire Department." }],
  },
};
