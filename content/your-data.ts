import type { LegalDocument } from "./legal-types";
import { promises } from "./promises";
import { site } from "./site";

/** /your-data: what happens to the data shops keep in the Strobe app. Keep it under 300 words. */
export const yourData: LegalDocument = {
  meta: {
    title: "Your data | Strobe",
    description:
      "Your inspection data belongs to you. Export sites, devices, reports, photos and quotes any time as CSV and PDF, on every plan, even after you cancel.",
  },
  title: promises.data.title,
  updated: "November 6, 2026",
  intro: [
    "You own your data. Strobe stores and processes it to run the service, nothing else.",
  ],
  sections: [
    {
      heading: "How to export",
      body: [
        "Go to Settings → Export. You get a ZIP file with:",
        {
          list: [
            "CSV files of your sites, devices, inspections and results, deficiencies and quotes.",
            "Every report, quote and city filing as a PDF.",
            "Any photos, in their original quality.",
          ],
        },
        "No fee, no request, no waiting.",
      ],
    },
    {
      heading: "On every plan, even after you cancel",
      body: [
        "Export works on every plan, Solo included. If you cancel, your account stays read-only for 90 days and you can still export everything. After 90 days, your data is deleted.",
      ],
    },
    {
      heading: "Where it's stored",
      body: ["On Google Cloud in Toronto, Canada."],
    },
    {
      heading: "Questions",
      body: [`Email ${site.email}.`],
    },
  ],
};
