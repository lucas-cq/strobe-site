// /tools/s536-report-template, from the November 2026 SEO brief, S3. The file is made by
// scripts/generate-report-template.ts. It's our own worksheet, not the standard's report forms: say so.
export const reportTemplate = {
  lastReviewed: "2026-11-24",
  path: "/tools/s536-report-template",
  fileHref: "/downloads/strobe-annual-inspection-report-template.xlsx",
  /** Saved on the lead, so we know where the signup came from. */
  leadSource: "report-template",
  meta: {
    title: "Free S536 annual inspection report template (Excel) | Strobe",
    description:
      "A free, printable Excel template for a CAN/ULC-S536 annual fire alarm inspection: control unit, power and batteries, devices, annunciators, fault tests and deficiencies.",
  },
  title: "Free S536 annual inspection report template",
  breadcrumb: "S536 report template",
  intro:
    "A blank, printable Excel worksheet in the order crews work an annual inspection: site and system, control unit, power and batteries, annunciators, fault tests, a device record and a deficiency list. Print it for the walk-through, or fill it in on a laptop. No signup needed.",
  summary: "A free, printable Excel worksheet for the annual inspection.",
  download: "Download the template (.xlsx)",
  includes: {
    title: "What's in it",
    items: [
      "**Report:** site details, then each part of the inspection with a result and notes.",
      "**Device record:** a row per device, with the header repeated on every printed page.",
      "**Deficiencies:** what's wrong, what it needs, and when the owner was told.",
    ],
  },
  caveat:
    "It's our own layout, not the report forms in CAN/ULC-S536. Many fire departments want the standard's own forms, filled in completely: [Edmonton won't accept partial or reworded reports](/guides/edmonton-liv-upload). Use this sheet to collect everything on site, then complete the forms your fire department accepts.",
  strobe: {
    title: "Or let Strobe fill it in",
    body: "Strobe builds the report from your device list as you test, on a phone, even with no signal. The deficiencies turn into a quote the same day, and the owner approves by link.",
    links: [
      { label: "See how it works", href: "/#how-it-works" },
      { label: "See pricing", href: "/pricing" },
    ],
  },
  related: [
    { label: "S536 annual inspection checklist", href: "/guides/s536-annual-inspection-checklist" },
    { label: "Free device list template", href: "/tools/device-list-template" },
  ],
};
