import type { CityPageContent } from "./city-types";

// Rules, steps and questions from STROBE_SITE_SEO_BUILD.md section 2.3. Every fact has a source below.
// Strobe is NOT integrated with LIV and does not upload automatically. Keep the wording that way.
export const edmonton: CityPageContent = {
  lastReviewed: "2026-11-24",
  meta: {
    title: "Edmonton LIV fire inspection report submission | Strobe",
    description:
      "Since Sept 8, 2026, Edmonton wants unrepaired fire system deficiencies in LIV after 14 days, and urgent defects in 24 hours. Strobe gets the upload ready.",
  },
  eyebrow: "Edmonton",
  title: "Edmonton LIV uploads without the retyping",
  intro:
    "Since September 8, 2026, the City of Edmonton takes third-party fire system inspection, testing and maintenance reports through LIV, the Life Safety Inspection Vault. Unrepaired deficiencies are required after 14 days, urgent defects within 24 hours, and every other report is recommended.",
  visualAlt: "Sample LIV upload marked ready to upload, with the report PDF and deficiency list ticked.",

  rules: {
    title: "What the City requires",
    items: [
      "Since **September 8, 2026**, third-party fire system inspection, testing and maintenance reports go through **LIV, the Life Safety Inspection Vault**.",
      "**Required: unrepaired deficiencies.** If a defect isn't fixed, and the owner hasn't said they'll fix it, **within 14 days of the initial inspection**, upload the report to LIV.",
      "**Urgent: within 24 hours.** A defect that affects how a system works or what it covers has to be reported right away. It may need emergency repairs or a fire watch.",
      "**Recommended: every other report.** The City recommends uploading all fire protection system reports.",
      "**Systems covered:** fire alarm, fire pumps, range hood cleaning, emergency lights, standpipes, fire sprinklers and fixed fire suppression. The FAQ also mentions kitchen suppression and generators.",
    ],
  },

  process: {
    eyebrow: "What LIV asks of contractors",
    title: "Your part of the LIV process",
    items: [
      "Register a company account. Your inspectors and techs submit through it.",
      "Upload reports and link them to the premises and system type.",
      "Log deficiencies and track each one until it's resolved.",
      "Submit proof of correction after the repair.",
      "Building owners can request access too. They can see reports and upload proof of correction.",
    ],
  },

  steps: {
    title: "Step by step",
    items: [
      { title: "Register your company in LIV", body: "and add your inspectors and techs." },
      { title: "Urgent defect?", body: "Report it within 24 hours." },
      {
        title: "Still not fixed, and no plan to fix it, 14 days after the inspection?",
        body: "Upload the report as a PDF or a digital report, linked to the premises and system type.",
      },
      { title: "Every other report:", body: "upload it too. The City recommends it." },
      { title: "Log each deficiency", body: "and keep it open until it's fixed." },
      {
        title: "After the repair,",
        body: "upload proof of correction. LIV lets a fire department require a note or an image at this step, so keep both handy.",
      },
    ],
  },

  questions: {
    title: "Questions",
    items: [
      {
        question: "Does LIV cost contractors anything?",
        answer:
          "The City's page doesn't mention fees. LIV charges contractors per report in some other cities, so ask the City before you assume it's free: fireprevention@edmonton.ca.",
      },
      {
        question: "Do I need photos?",
        answer:
          "The City's page doesn't ask for them. If the City turns on LIV's note-or-image setting for closing deficiencies, you'll need one there.",
      },
      {
        question: "Does Strobe upload to LIV for me?",
        answer: "No. Strobe isn't connected to LIV. It gets the report and deficiency list ready so the upload is quick.",
      },
    ],
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
      {
        label: "Fire Marshal Bulletin: Fire Alarm Reporting and Inspection Form Requirements (revised October 2026)",
        href: "https://www.edmonton.ca/sites/default/files/public-files/documents/firemarshalbulletin-firealarmreporting-inspection-formrequirements.pdf",
      },
    ],
    notes: [
      { text: "Questions about LIV:", email: "fireprevention@edmonton.ca" },
      { text: "Rules change. Always check with the City of Edmonton." },
    ],
  },

  relatedGuides: [{ label: "LIV upload, step by step", href: "/guides/edmonton-liv-upload" }],
};
