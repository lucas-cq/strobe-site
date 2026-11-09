import type { FaqContent } from "./faq";
import { promises } from "./promises";

/** /pricing. Always CAD. Everything else on the plan cards is calculated from the two stored prices. */
export type Plan = {
  id: "solo" | "crew" | "shop";
  name: string;
  techRange: string;
  /** Per month: for the whole plan on Solo, per tech on Crew and Shop. */
  priceCadMonthly: number;
  /** Per year when billed yearly: for the whole plan on Solo, per tech on Crew and Shop. */
  priceCadYearly: number;
  /** Crew sizes to show a worked total for. */
  exampleTechCounts: number[];
  blurb: string;
  extras: string[];
};

export const plans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    techRange: "1 tech",
    priceCadMonthly: 49,
    priceCadYearly: 490,
    exampleTechCounts: [],
    blurb: "For the tech who runs the whole show. Everything Strobe does, at a price that makes sense for one person.",
    extras: ["Everything in Strobe", "One free office login, for whoever does the books"],
  },
  {
    id: "crew",
    name: "Crew",
    techRange: "2 to 5 techs",
    priceCadMonthly: 109,
    priceCadYearly: 1090,
    exampleTechCounts: [3, 5],
    blurb: "For small shops. Pay for techs, not for the office.",
    extras: ["Everything in Strobe", "Unlimited office users"],
  },
  {
    id: "shop",
    name: "Shop",
    techRange: "6+ techs",
    priceCadMonthly: 95,
    priceCadYearly: 950,
    exampleTechCounts: [6, 10],
    blurb: "For growing shops with a full office.",
    extras: ["Everything in Strobe", "Unlimited office users", "Priority support", "Onboarding for each office and crew"],
  },
];

/** What a month costs when billed yearly. */
export const monthlyEquivalent = (plan: Plan) => plan.priceCadYearly / 12;

/** What a year of monthly billing would cost, less the yearly price. */
export const yearlySaving = (plan: Plan) => plan.priceCadMonthly * 12 - plan.priceCadYearly;

/** Rounded, and the lowest across the plans, so the toggle never promises more than a plan gives. */
export const yearlySavingPercent = Math.min(
  ...plans.map((plan) => Math.round((yearlySaving(plan) / (plan.priceCadMonthly * 12)) * 100)),
);

export const pricing = {
  /** The sitemap's lastmod for this page. */
  lastReviewed: "2026-11-09",
  meta: {
    title: "Fire alarm inspection software pricing (CAD) | Strobe",
    description:
      "Simple pricing in Canadian dollars, from $49 a month. Office users free on Crew and Shop. No contracts, cancel anytime, no sales call.",
  },
  eyebrow: "Pricing",
  title: "Simple pricing for Canadian shops",
  lede: "Pick a plan by how many techs you have. Office users are free on Crew and Shop. Pay yearly and get 2 months free.",
  currencyNote: "All prices in CAD",
  /** Shown above the plans, so they're read before the prices. */
  terms: ["30-day free trial", "No contracts", "Cancel anytime", "No sales call", "No setup fee"],
  /** Under each plan's button. */
  reassurance: "30-day free trial. No card needed. Cancel anytime.",
  start: "Get early access",
  example: (techs: number, total: string, period: string) => `${techs} techs: ${total} ${period}`,
  /** Solo is one price; Crew and Shop are per tech. */
  unit: {
    solo: "per month",
    perTech: "per tech, per month",
    soloYearly: "a month, billed yearly",
    perTechYearly: "per tech, a month, billed yearly",
  },
  billing: {
    label: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    badge: (percent: number) => `Save ${percent}%`,
    period: { monthly: "a month", yearly: "a year" },
    yearlyTotal: (total: string, saving: string, perTech: boolean) =>
      perTech ? `${total} per tech a year, save ${saving} per tech` : `${total} a year, save ${saving}`,
  },
  includes: {
    title: "Every plan includes:",
    items: [
      { text: "30-day free trial, no credit card" },
      { text: "Offline inspections on iOS and Android" },
      { text: "CAN/ULC-S536 reports" },
      { text: "Quotes and owner approval by link" },
      { text: "Optional deficiency photos" },
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
      question: "Is there a free trial?",
      answer: "Yes. 30 days, no credit card. When it ends, your account goes read-only and you can still export everything.",
    },
    {
      question: "Can I get a refund on a yearly plan?",
      answer:
        "Yes, a full refund within 14 days of paying. After that, cancelling stops the renewal and you keep access until your year is up.",
    },
    {
      question: "What's founding pricing?",
      answer: "The first 25 shops get 3 months free after their trial, and their launch price is locked for as long as they stay.",
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
