import type { FaqContent } from "./faq";
import { promises } from "./promises";

/**
 * /pricing (STROBE_SITE_CANADA.md section 9). Prices stay null until Lucas sets them; the page
 * then shows "Pricing announced soon" and a "Get notified" button instead. Always CAD.
 */
export type Plan = {
  id: "solo" | "crew" | "shop";
  name: string;
  techRange: string;
  priceCadPerTechMonthly: number | null; // null until Lucas sets it
  priceCadPerTechAnnual: number | null; // monthly equivalent when billed yearly
  blurb: string;
  extras: string[];
};

export const plans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    techRange: "1 tech",
    priceCadPerTechMonthly: null,
    priceCadPerTechAnnual: null,
    blurb: "For the tech who runs the whole show. Everything Strobe does, at a price that makes sense for one person.",
    extras: ["Includes one free office login, for whoever does the books"],
  },
  {
    id: "crew",
    name: "Crew",
    techRange: "2 to 5 techs",
    priceCadPerTechMonthly: null,
    priceCadPerTechAnnual: null,
    blurb: "For small shops. Pay for techs, not for the office.",
    extras: ["Unlimited office users"],
  },
  {
    id: "shop",
    name: "Shop",
    techRange: "6+ techs",
    priceCadPerTechMonthly: null,
    priceCadPerTechAnnual: null,
    blurb: "For growing shops with a full office.",
    extras: ["Unlimited office users", "Priority support", "Onboarding for each office and crew"],
  },
];

export const pricing = {
  meta: {
    title: "Pricing in CAD | Strobe",
    description:
      "Simple per-tech pricing in Canadian dollars. Office users free. Plans for solo techs, crews of 2 to 5, and shops with 6 or more. No sales call.",
  },
  eyebrow: "Pricing",
  title: "Simple pricing for Canadian shops",
  lede: "Pick a plan by how many techs you have. Office users are free on Crew and Shop. No sales call, no setup fee.",
  currencyNote: "All prices in Canadian dollars (CAD).",
  pricePending: "Pricing announced soon",
  notify: "Get notified",
  start: "Get early access",
  /** Solo is billed per month; Crew and Shop per tech. */
  unit: { solo: "per month", perTech: "per tech, per month" },
  billing: { label: "Billing", monthly: "Monthly", yearly: "Yearly", yearlyNote: "billed yearly" },
  includes: {
    title: "Every plan includes:",
    items: [
      { text: "Offline inspections on iOS and Android" },
      { text: "CAN/ULC-S536 reports" },
      { text: "Deficiency photos, quotes and owner approval by link" },
      { text: "City filing for supported cities" },
      { lead: promises.onboarding.title, text: "we migrate your data and get you set up" },
      { lead: promises.data.title, text: "export everything any time, as CSV and PDF" },
      { text: "Month-to-month. Cancel anytime." },
      { text: "No sales call. No setup fee." },
    ] as { lead?: string; text: string }[],
  },
};

export const pricingFaq: FaqContent = {
  eyebrow: "Pricing FAQ",
  title: "Questions about pricing",
  items: [
    {
      question: "Why show prices at all?",
      answer: "Because you shouldn't have to sit through a demo to find out what software costs.",
    },
    {
      question: "Do office users cost extra?",
      answer: "No. On Crew and Shop you pay per tech. Office users are free.",
    },
    {
      question: "What if I hire my first tech?",
      answer: "Move from Solo to Crew in the app. No new contract.",
    },
    {
      question: "Is there a contract?",
      answer: "No. Month-to-month, cancel anytime.",
    },
    {
      question: "Is onboarding extra?",
      answer: "No. Every plan, Solo included, starts with a free onboarding session. We migrate your data and get you set up.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "It's yours. Export everything any time, including for 90 days after you cancel.",
    },
  ],
};
