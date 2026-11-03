import type { CityPageContent } from "./city-types";

// Every regulatory statement here must match section 6 of STROBE_SITE_BRIEF.md.
export const calgary: CityPageContent = {
  meta: {
    title: "Calgary 311 deficiency reporting for fire alarm contractors | Strobe",
    description:
      "Strobe fire inspection software tracks Calgary's 10-business-day deficiency reporting clock for every system and pre-fills your 311 fire safety system request, with the deficient reports attached.",
  },
  eyebrow: "Calgary",
  title: "Calgary deficiency reporting, ready before day 10",
  intro:
    "Calgary Fire Department expects deficient fire safety systems to be reported within 10 business days of the initial inspection. Strobe tracks that clock for every system and builds the 311 request for you.",
  visualAlt:
    "Sample Calgary 311 packet: the eight City form fields filled in with copy buttons, two attached PDF reports, and a saved SR number.",

  rules: {
    eyebrow: "The rule, plainly",
    title: "What Calgary Fire Department expects",
    items: [
      "The clock starts at the inspection. Getting more quotes doesn't pause it.",
      "Impairments that affect a system's operation or coverage get reported right away and may need emergency repairs or a fire watch.",
      "One 311 request per address, with up to 7 systems in it (one of each system type).",
      "Submitting gives you a service request (SR) number. CFD reviews requests with non-compliant systems within 30 calendar days.",
      "There's no second City submission after repairs. A Fire Safety Codes Officer contacts the building owner, and the owner proves the repairs with the inspection report and a letter from the repair company.",
    ],
  },

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

  steps: {
    eyebrow: "What Strobe does",
    title: "From the inspection to the SR number",
    items: [
      { title: "Count business days", body: "Every deficient system gets its own countdown from the inspection." },
      { title: "Remind at day 5 and day 8", body: "Reminders go to the manager, so the deadline isn't in someone's head." },
      { title: "Turn urgent at day 8", body: "Report to City turns urgent at day 8, or right away for an impairment." },
      { title: "Build the packet", body: "Every field of the 311 request is filled, with the deficient reports attached." },
      {
        title: "Submit with a checklist",
        body: "Open the City form next to a checklist with copy buttons, review it, and click submit yourself.",
      },
      { title: "Save the SR number", body: "Paste the SR number back, or forward the City's confirmation email." },
      { title: "Close out for the owner", body: "The owner gets a close-out package tagged with the SR number." },
    ],
    comingSoon: "calgary-extension",
  },

  fieldMap: {
    title: "Where every field comes from",
    lede: "Strobe fills the City form from records you already keep. Nothing is typed twice.",
    columns: ["City form field", "Filled from"],
    rows: [
      ["Service location", "Site record"],
      ["Number of systems (1 to 7)", "Deficient systems on the site"],
      ["System type + date of service, per system", "Each system's report"],
      ["Customer business name and address", "Customer record"],
      ["All deficient reports attached?", "Always “Yes”"],
      ["Business contact (name, address, email, phone)", "Customer contact"],
      ["Contact available on site", "Site contact"],
      ["Additional details, file upload", "Deficiency summary + report PDFs"],
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
