import type { CityPageContent } from "./city-types";

// Rules, steps and questions from STROBE_SITE_SEO_BUILD.md section 2.3. Every fact has a source below.
// Strobe is NOT integrated with LIV and does not upload automatically. Keep the wording that way.
export const edmonton: CityPageContent = {
  lastReviewed: "2026-11-09",
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
    title: "What the City requires",
    items: [
      "Since **September 8, 2026**, third-party fire system inspection, testing and maintenance reports go through **LIV, the Life Safety Inspection Vault**.",
      "**The City's page says two things.** One section says non-compliant reports are required and recommends uploading all of them. The FAQ says both compliant and non-compliant reports. **Until the City clears that up, upload every report.**",
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
      {
        title: "After each inspection,",
        body: "upload the report as a PDF or a digital report, linked to the premises and system type.",
      },
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
    ],
    notes: [
      { text: "Questions about LIV:", email: "fireprevention@edmonton.ca" },
      { text: "Rules change. Always check with the City of Edmonton." },
    ],
  },
};
