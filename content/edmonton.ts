import type { CityPageContent } from "./city-types";

// Every regulatory statement here must match section 6 of STROBE_SITE_BRIEF.md.
// Strobe is NOT integrated with LIV and does not upload automatically. Keep the wording that way.
// Copy from SITE_V2.md section 5.
export const edmonton: CityPageContent = {
  meta: {
    title: "Edmonton LIV fire inspection report submission | Strobe",
    description:
      "Edmonton requires third-party fire system reports in LIV since Sept 8, 2026. Strobe prepares an upload-ready LIV package from every inspection.",
  },
  eyebrow: "Edmonton",
  title: "Edmonton LIV uploads without the retyping",
  intro:
    "Since September 8, 2026, the City of Edmonton requires third-party fire system inspection, testing and maintenance reports to go through LIV, the Life Safety Inspection Vault. It's required for non-compliant reports and recommended for all of them.",
  visualAlt: "Sample LIV upload marked ready to upload, with the report PDF and deficiency list ticked.",

  rules: {
    eyebrow: "What LIV asks of contractors",
    title: "Your part of the LIV process",
    items: [
      "Register a company account. Your inspectors and techs submit through it.",
      "Upload reports and link them to the premises and system type.",
      "Log deficiencies and track each one until it's resolved.",
      "Submit proof of correction after the repair.",
      "Building owners can request access to see reports and upload proof of correction too.",
    ],
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
  },

  withStrobe: {
    eyebrow: "With Strobe",
    title: "What LIV looks like with Strobe",
    cards: [
      { title: "Ready to upload", body: "Your report and deficiency list come out the way LIV asks for them." },
      { title: "See what's still open", body: "Know which reports are in and which deficiencies still need proof of correction." },
      {
        title: "Proof of correction, sorted",
        body: "After the repair, everything you or the owner needs to upload is in one place. If the City asks for a note or a photo when you close a deficiency, it's there.",
      },
    ],
    note: "Strobe isn't connected to LIV and doesn't upload for you. It gets everything ready so the upload is quick.",
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
