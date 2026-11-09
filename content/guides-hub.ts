import { reportRulesGuide } from "./guide-report-rules";
import { reportRulesGuidePath } from "./site";

// /guides, from STROBE_SITE_SEO_BUILD.md section 5.1. Published guides only: a draft never goes here.
export const guidesHub = {
  lastReviewed: "2026-11-09",
  path: "/guides",
  meta: {
    title: "Fire alarm inspection guides | Strobe",
    description:
      "Practical guides for Canadian fire alarm contractors: inspections, reporting rules by city, quoting and paperwork. Written with working techs.",
  },
  title: "Guides for fire alarm contractors",
  breadcrumb: "Guides",
  readLabel: "Read the guide",
  guides: [
    {
      title: reportRulesGuide.title,
      summary: reportRulesGuide.meta.description,
      path: reportRulesGuidePath,
    },
  ],
};
