import { plans } from "./pricing";
import { reportRulesGuidePath } from "./site";

// Read from the plans, so a price change can't leave an old number in the FAQ.
const [solo, crew, shop] = plans.map((plan) => `$${plan.priceCadMonthly}`);

export type FaqItem = {
  question: string;
  /** Plain text. [label](/path) becomes a link to another page on the site. */
  answer: string;
};

export type FaqContent = { eyebrow?: string; title: string; items: FaqItem[] };

export const faq: FaqContent = {
  eyebrow: "FAQ",
  title: "Questions we get a lot",
  items: [
    {
      question: "Do I have to send reports to the fire department?",
      answer:
        `Usually not. You send the report to the building contact, and Strobe does that when you sign. Edmonton, Strathcona County and Lethbridge want reports from the contractor. And anywhere, if an owner won't fix a deficiency, you're required to tell the fire department. In those cases Strobe has it ready, and you send it. See [our 51-city guide](${reportRulesGuidePath}).`,
    },
    {
      question: "How does Strobe know each city's rules?",
      answer:
        "From the site address. When you set up a site, Strobe matches it to the fire department that covers it and uses that department's rules and format.",
    },
    {
      question: "Does Strobe work outside Alberta?",
      answer:
        "Yes. Inspections, S536 reports, quotes and owner approvals work anywhere in Canada. City filing is mapped for Calgary, Edmonton, Strathcona County and Lethbridge, and more get added as shops ask for them.",
    },
    {
      question: "My city isn't on the list. Now what?",
      answer:
        "You still get a clean S536 report and a deficiency summary to send. Tell us your city in the form and we'll map its rules.",
    },
    {
      question: "Does it work with no signal?",
      answer: "Yes. Inspections work fully offline and sync when you're back in range.",
    },
    {
      question: "Does it work on my phone?",
      answer: "Yes. It's built for the phone first, one-handed, with a radio in the other hand. It works on an iPad or a laptop too.",
    },
    {
      question: "Does my whole crew need the app?",
      answer: "No. Only whoever is running the panel. Everyone on the crew goes on the report.",
    },
    {
      question: "Do building owners need an account?",
      answer: "No. They open the report and quote from a link on their phone.",
    },
    {
      question: "What does it cost?",
      answer:
        `Solo is ${solo} a month for one tech. Crew is ${crew} per tech, per month for 2 to 5 techs. Shop is ${shop} per tech, per month for 6 or more. All prices are in CAD, and office users are free on Crew and Shop. Early-access shops lock in founding pricing. Every plan starts with a 30-day free trial, no card needed. See [Pricing](/pricing).`,
    },
    {
      question: "Do I have to talk to sales?",
      answer: "No. The prices are on the website, and you can start without a call. There's no contract, and you can cancel anytime.",
    },
    {
      question: "How hard is it to switch?",
      answer:
        "Not hard, because we do the heavy lifting. Every plan starts with a free onboarding session: we move your sites, devices and past reports over from spreadsheets or your current software, and get your team set up.",
    },
    {
      question: "Who owns the data?",
      answer:
        "You do. Export all of it any time, as CSV and PDF, on every plan, even after you cancel. See [Your data](/your-data).",
    },
    {
      question: "Which systems does it cover?",
      answer: "Fire alarm, including the sprinkler flow and tamper devices you test during the alarm inspection. Extinguishers are next.",
    },
    {
      question: "Where is our data stored?",
      answer: "In Canada, on Google Cloud in Toronto.",
    },
    {
      question: "Is Strobe connected to the City or the fire department?",
      answer:
        "No. Strobe is independent software. It isn't affiliated with any city, county or fire department.",
    },
  ],
};
