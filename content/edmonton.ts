import type { CityPageContent } from "./city-types";

// Every regulatory statement here must match section 6 of STROBE_SITE_BRIEF.md.
// Strobe is NOT integrated with LIV and does not upload automatically. Keep the wording that way.
export const edmonton: CityPageContent = {
  meta: {
    title: "Edmonton LIV inspection report uploads for fire contractors | Strobe",
    description:
      "Strobe fire inspection software prepares your Edmonton LIV uploads: the inspection report PDF, a deficiency list sorted by type, location and severity, and proof of correction after repairs.",
  },
  eyebrow: "Edmonton",
  title: "Edmonton LIV uploads without the retyping",
  intro:
    "Since September 8, 2026, the City of Edmonton requires third-party fire system inspection, testing and maintenance (ITM) reports to be submitted electronically through LIV, the Life Safety Inspection Vault. It's required for non-compliant reports and recommended for all.",
  visualAlt:
    "Sample LIV upload package: report PDF, premises and system type, and deficiencies by type, location and severity all checked, four deficiencies each showing a status, and proof of correction pending.",

  rules: {
    eyebrow: "What LIV asks of contractors",
    title: "Your part of the LIV process",
    items: [
      "Register a company account. Your inspectors and technicians submit through it.",
      "Upload reports and link them to the premises and system type.",
      "Log deficiencies by type, location and severity.",
      "Track each deficiency through Open, In Progress, Cleared and Resolved.",
      "Submit proof of correction.",
    ],
    footnote: "Owners can request access to see reports and deficiency status, and can upload proof of correction too.",
  },

  systems: {
    title: "Systems covered by LIV",
    items: [
      "Fire alarm",
      "Fire pumps",
      "Range hood cleaning",
      "Emergency lights",
      "Standpipes",
      "Fire sprinklers",
      "Fixed fire suppression",
    ],
  },

  steps: {
    eyebrow: "What Strobe does",
    title: "The report and deficiency list, ready for LIV",
    items: [
      {
        title: "Build the upload package",
        body: "The report PDF plus a deficiency list already sorted by type, location and severity.",
      },
      {
        title: "Track what's uploaded",
        body: "See which reports are in LIV and which deficiencies are still open.",
      },
      {
        title: "Package proof of correction",
        body: "After the repair, Strobe packages proof of correction for you or the owner to upload.",
      },
      { title: "Remind you", body: "Reminders for anything not yet uploaded." },
    ],
    note: "Strobe isn't connected to LIV and doesn't upload for you. It prepares everything, so you upload to LIV without retyping.",
  },

  sources: {
    title: "Sources",
    links: [
      {
        label: "City of Edmonton: Fire Inspection Report Submission",
        href: "https://www.edmonton.ca/programs_services/fire_rescue/fire-inspection-report-submission",
      },
    ],
    notes: [
      { text: "Questions about LIV:", email: "fireprevention@edmonton.ca" },
      { text: "Rules change. Always check with the City of Edmonton." },
    ],
  },
};
