import type { Guide } from "../guide-types";

// DRAFT, from STROBE_SITE_SEO_BUILD.md section 5.3.
export const excelVsAppGuide: Guide = {
  published: false,
  slug: "excel-vs-inspection-app",
  lastReviewed: "2026-11-09",
  meta: {
    title: "Excel vs an inspection app for fire alarm reports | Strobe",
    description:
      "An honest comparison of Excel and inspection apps for CAN/ULC-S536 fire alarm reports, including when Excel is the right answer.",
  },
  title: "Excel vs an inspection app for fire alarm reports",
  intro:
    "Plenty of good shops run every report in Excel. Here's an honest look at when that works, when it doesn't, and what to check before you switch.",
  sections: [
    {
      title: "Where Excel wins",
      blocks: [
        {
          kind: "list",
          items: [
            "**It's fast once you know it.** Keyboard, copy, paste, fill down.",
            "**No subscription.**",
            "**It works with no signal.**",
            "**You control the file.**",
          ],
        },
      ],
    },
    {
      title: "Where Excel costs you",
      blocks: [
        {
          kind: "list",
          items: [
            "**One file per building, per year.** Finding last year's and copying the device list over is manual.",
            "**Turning it into a PDF and emailing it** is extra work after every inspection.",
            "**Nothing tracks deficiencies** after the report goes out: which got quoted, approved, fixed, or still need reporting.",
            "**Files drift.** Two techs, two versions of the same building.",
          ],
        },
      ],
    },
    {
      title: "Where apps win",
      blocks: [
        {
          kind: "list",
          items: [
            "**Last year's devices** are already loaded.",
            "**The report goes out when you sign.**",
            "**Deficiencies roll into quotes,** and open ones stay visible.",
            "**One place for every building's history.**",
          ],
        },
      ],
    },
    {
      title: "Where apps cost you",
      blocks: [
        {
          kind: "list",
          items: [
            "**A monthly fee,** often per user, and sometimes with a minimum number of techs or an annual contract.",
            "**Entry can be slower** than a spreadsheet you've mastered.",
            "**Some make it hard to leave.** Check how you'd get your data out before you sign.",
          ],
        },
      ],
    },
    {
      title: "When Excel is the right answer",
      blocks: [
        {
          kind: "paragraph",
          text: "One crew, a short list of buildings, and a tidy folder system. If that's you and the paperwork isn't eating your evenings, stay with Excel.",
        },
      ],
    },
    {
      title: "What to check before switching",
      blocks: [
        {
          kind: "numbered",
          items: [
            "Is data entry at the panel **at least as fast** as your spreadsheet? Test it on a real building.",
            "**Does it work offline?**",
            "**Can you export everything** (devices, results, reports) whenever you want?",
            "**Is the price on the website,** and is it month to month?",
            "**Will they move your existing files over** for you?",
          ],
        },
        {
          kind: "paragraph",
          text: "Strobe is built to pass that checklist. If you want to try it against your spreadsheet, [get early access](/early-access).",
        },
      ],
    },
  ],
};
