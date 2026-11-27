import { plans } from "./pricing";

// /compare/spreadsheet, from the November 2026 SEO brief, S6. Same claims as the home page's problem
// and how-it-works sections. No named competitors: if pages like that are added, every fact needs a source.
// The pricing page's headline price: Solo and Crew. At 6 or more panel techs, every tech is on the Shop price.
const perTech = plans.find((plan) => plan.id === "crew")!.priceCadMonthly;
const shopPerTech = plans.find((plan) => plan.id === "shop")!.priceCadMonthly;

export const compareSpreadsheet = {
  lastReviewed: "2026-11-24",
  path: "/compare/spreadsheet",
  meta: {
    title: "Strobe vs a spreadsheet for fire alarm inspections | Strobe",
    description:
      "The same fire alarm inspection done two ways: a spreadsheet per building, and Strobe. Device lists, the report, quotes and city deadlines, side by side.",
  },
  eyebrow: "Compare",
  breadcrumb: "Strobe vs a spreadsheet",
  title: "Strobe vs a spreadsheet",
  intro:
    "Most shops run inspections on a spreadsheet for every building. It works, and it's free. Here's the same annual inspection done both ways, from last year's device list to the fire department's deadline.",
  columns: { stage: "Step", spreadsheet: "With a spreadsheet", strobe: "With Strobe" },
  rows: [
    {
      stage: "Before the visit",
      spreadsheet: "Find last year's file for the building, copy it, rename it, and hope it's the latest version.",
      strobe: "Last year's devices are already loaded in walk order, with last year's results.",
    },
    {
      stage: "On site",
      spreadsheet: "The walker calls devices on the radio. The panel tech scrolls a laptop, or writes on a printout to type up later.",
      strobe: "A pass is one tap on a phone and the next device comes up. It works with no signal and syncs later.",
    },
    {
      stage: "The report",
      spreadsheet: "Back at the office, retype the results, save the file as a PDF and email it, often at night.",
      strobe: "The crew signs on the phone and the CAN/ULC-S536 report is ready, then emailed to the building contact.",
    },
    {
      stage: "The quote",
      spreadsheet: "Someone rebuilds the deficiency list in a quote template. The owner gets it three days later, after they've called someone else.",
      strobe: "Anything you didn't fix on site turns into a quote line. Price it from your price book and send it the same day.",
    },
    {
      stage: "Owner approval",
      spreadsheet: "The owner replies by email, calls, or doesn't. Approvals live in someone's inbox.",
      strobe: "The owner approves by link, line by line, and signs. No login and no app.",
    },
    {
      stage: "The city's deadline",
      spreadsheet: "A deadline on a sticky note, or in someone's head. In Calgary, a deficiency still open on business day 10 has to be reported.",
      strobe: "The clock starts at the inspection. Strobe counts down for every site and warns you well before it's late.",
    },
    {
      stage: "Next year",
      spreadsheet: "Start again from this year's file, if you can find it.",
      strobe: "The devices, results and deficiencies carry over. So does the paper trail.",
    },
    {
      stage: "Cost",
      spreadsheet: "Free, apart from the hours.",
      strobe: `$${perTech} a month per panel tech, or $${shopPerTech} for every tech once you have 6 or more, after a 30-day free trial. Office logins are included.`,
    },
  ],
  fine: {
    title: "When a spreadsheet is fine",
    body: "A handful of buildings, one tech, and no city deadlines to track? A spreadsheet is fine, and you already know it. Strobe pays off when you have dozens of buildings, a crew on the radio, and city deadlines to keep.",
  },
  next: {
    title: "Moving off spreadsheets",
    links: [
      { label: "Free device list template", href: "/tools/device-list-template" },
      { label: "S536 annual inspection checklist", href: "/guides/s536-annual-inspection-checklist" },
      { label: "See pricing", href: "/pricing" },
    ],
  },
};
