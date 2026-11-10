import type { FaqContent } from "./faq";
import { promises } from "./promises";

/** /pricing. Always CAD. Everything else on the plan cards is calculated from the two stored prices. */
export type Plan = {
  id: "solo" | "crew" | "shop";
  name: string;
  techRange: string;
  /** Per month: for the whole plan on Solo, per panel tech on Crew and Shop. */
  priceCadMonthly: number;
  /** Per year when billed yearly: for the whole plan on Solo, per panel tech on Crew and Shop. */
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
    techRange: "1 panel tech, plus one office login.",
    priceCadMonthly: 99,
    priceCadYearly: 990,
    exampleTechCounts: [],
    blurb: "For the tech who runs the whole show. Everything Strobe does, for one person.",
    extras: ["Everything in Strobe"],
  },
  {
    id: "crew",
    name: "Crew",
    techRange: "2 to 5 panel techs. Unlimited office users.",
    priceCadMonthly: 99,
    priceCadYearly: 990,
    exampleTechCounts: [2, 3, 5],
    blurb: "For small shops. Pay for panel techs, not for the office.",
    extras: ["Everything in Strobe"],
  },
  {
    id: "shop",
    name: "Shop",
    techRange: "6+ panel techs. Unlimited office users.",
    priceCadMonthly: 89,
    priceCadYearly: 890,
    exampleTechCounts: [6],
    blurb: "For growing shops with a full office.",
    extras: ["Everything in Strobe", "Priority support", "Onboarding for each office and crew"],
  },
];

/** The headline price: what one panel tech costs a month before the Shop discount. */
const crewPlan = plans.find((plan) => plan.id === "crew")!;

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
  lastReviewed: "2026-11-10",
  meta: {
    title: "Fire alarm inspection software pricing (CAD) | Strobe",
    description:
      `Simple pricing in Canadian dollars: $${crewPlan.priceCadMonthly} per panel tech a month, less from your 6th. Office staff are free. No contracts, cancel anytime, no sales call.`,
  },
  eyebrow: "Pricing",
  title: "Simple pricing for Canadian shops",
  lede: "Pick a plan by how many panel techs you have. Office users are free on Crew and Shop. Pay yearly and get 2 months free.",
  /** Above the plan cards. */
  headline: `$${crewPlan.priceCadMonthly} per panel tech. Less from your 6th.`,
  /** Under the plan cards: who counts as a panel tech. */
  whoPays:
    "You pay for whoever runs the panel and fills in the report. Walkers never need a login, and office staff are free.",
  currencyNote: "All prices in CAD",
  /** Shown above the plans, so they're read before the prices. */
  terms: ["30-day free trial", "No contracts", "Cancel anytime", "No sales call", "No setup fee"],
  /** Under each plan's button. */
  reassurance: "30-day free trial. No card needed. Cancel anytime.",
  start: "Get early access",
  example: (techs: number, total: string, period: string) => `${techs} panel techs: ${total} ${period}`,
  /** Solo is one price; Crew and Shop are per panel tech. */
  unit: {
    solo: "per month",
    perTech: "per panel tech, per month",
    soloYearly: "a month, billed yearly",
    perTechYearly: "per panel tech, a month, billed yearly",
  },
  billing: {
    label: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    badge: (percent: number) => `Save ${percent}%`,
    period: { monthly: "a month", yearly: "a year" },
    yearlyTotal: (total: string, saving: string, perTech: boolean) =>
      perTech ? `${total} per panel tech a year, save ${saving} each` : `${total} a year, save ${saving}`,
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
      answer: "No. On Crew and Shop you pay per panel tech. Office users are free.",
    },
    {
      question: "Who counts as a panel tech?",
      answer:
        "Whoever runs the panel and fills in the report. Walkers don't need a login, and office staff are free. A shop with 6 techs running 3 crews pays for 3.",
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
