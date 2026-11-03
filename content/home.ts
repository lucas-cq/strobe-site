import type { NavLink } from "./site";

export type Step = {
  title: string;
  who: string;
  where?: string;
  body: string;
  links?: NavLink[];
};

export const home = {
  hero: {
    eyebrow: "Fire and life safety inspection software for Alberta",
    title: "Inspect it. Quote it. File it. Same day.",
    sub: "Strobe takes your techs from the panel to a finished CAN/ULC-S536 report on their phone, gets the repair quote to the owner before you leave the site, and has your Calgary or Edmonton filing ready before the deadline.",
    note: "Early access for Alberta shops. Flat price per shop, not per tech.",
    visualAlt:
      "Sample screens: a tech's phone showing a fire alarm device list with one failed smoke detector, next to the repair quote the building owner receives.",
  },

  problem: {
    eyebrow: "The problem",
    title: "One inspection. Three jobs. Done three times.",
    cards: [
      {
        title: "Retyping",
        body: "Notes on paper or in a Word template, retyped into a report back at the office, then retyped again into a quote.",
      },
      {
        title: "Late quotes",
        body: "The quote goes out days after the inspection. By then the owner has called someone else.",
      },
      {
        title: "The City clock",
        body: "Calgary wants deficient systems reported within 10 business days, and Edmonton wants reports in LIV. That deadline lives in someone's head or a spreadsheet.",
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "From the panel to the City filing, in one record",
    lede: "Every step reuses what came before it, so nobody types the same thing twice.",
    steps: [
      {
        title: "Set up the site once.",
        who: "Manager",
        where: "Web",
        body: "Customer, site, systems, devices and contacts are entered once. Every report, quote and City filing pulls from that record.",
      },
      {
        title: "Inspect, even with no signal.",
        who: "Tech",
        where: "Phone",
        body: "Last year's device list is already loaded. Pass or fail each device. A fail becomes a deficiency with a photo, location, clause reference and note. An impairment alerts the manager right away. Works offline in basements and parkades, and syncs when back online.",
      },
      {
        title: "Finish the report on site.",
        who: "Tech",
        where: "Phone",
        body: "Recommendations and the tech's signature, and the S536 report is generated. That's day 0 for the City clock.",
      },
      {
        title: "Review and price.",
        who: "Manager",
        body: "See every deficiency with its photos, fix the wording, and price the lines from your price book.",
      },
      {
        title: "Send report + quote.",
        who: "Manager",
        body: "One link to the owner. No login, works on a phone, and every quote line shows the deficiency photo next to the price. You see when they open it, and a reminder goes out if they don't open it within 2 days.",
      },
      {
        title: "Owner signs.",
        who: "Owner",
        where: "Any device",
        body: "They approve all or some lines, e-sign and add a PO number. Approval becomes a work order for your techs.",
      },
      {
        title: "File with the City.",
        who: "Manager",
        body: "Strobe tracks business days per system and flags anything still deficient. Calgary gets a pre-filled 311 packet, and Edmonton gets an upload-ready LIV package.",
        links: [
          { label: "Calgary filing", href: "/calgary" },
          { label: "Edmonton LIV", href: "/edmonton" },
        ],
      },
      {
        title: "Repair and close out.",
        who: "Tech, then owner",
        body: "The work order carries the original photos. The tech completes the repair side of section 20.2, the owner signs the compliance statement by link, and Strobe produces the repair completion letter.",
      },
      {
        title: "Records that keep.",
        who: "Automatic",
        body: "Every test, photo, signature, quote and filing is stored per site, and next year's inspection starts from this one.",
      },
    ] satisfies Step[],
  },

  features: {
    eyebrow: "What's in early access",
    title: "Fire alarm first, done properly",
    lede: "Early-access shops get the full fire alarm workflow today. Items marked coming soon are on the roadmap, and your feedback sets the order.",
  },

  buttons: {
    eyebrow: "Two buttons",
    title: "The two buttons that matter after an inspection",
    cards: [
      {
        title: "Send quote.",
        kicker: "The money button.",
        body: "Quote lines come straight from the deficiencies, priced from your price book, plus labour and tax. It goes out the same day, before anyone else has quoted.",
        visualAlt: "Sample owner quote with four deficiency lines, three selected, and an approve button.",
      },
      {
        title: "Report to City.",
        kicker: "The compliance button.",
        body: "It lights up when a site has a system with open deficiencies and turns urgent at day 8, or immediately for an impairment. One click builds the whole filing, and every filing is timestamped.",
        visualAlt: "Sample City clock showing three systems counting business days, with the Report to City button turning urgent.",
      },
    ],
  },

  clock: {
    eyebrow: "The City clock",
    title: "The clock starts at the inspection, not when the owner says yes.",
    body: "Approving a quote doesn't pause Calgary's 10 business days. Only a fixed system does. Strobe counts business days per system, reminds you at day 5 and day 8, and keeps a timestamped record that you reported on time.",
    visualAlt: "Sample City clock in dark mode with three systems at different business-day counts.",
    links: [
      { label: "How Calgary filing works", href: "/calgary" },
      { label: "How Edmonton LIV works", href: "/edmonton" },
    ],
  },

  cities: {
    eyebrow: "Calgary and Edmonton",
    title: "Fire alarm deficiency reporting for both cities",
    cards: [
      {
        city: "Calgary",
        title: "Calgary 311 deficiency reporting",
        body: "10 business days. One 311 request per address. Up to 7 systems per request. Strobe fills every field, attaches the deficient reports and saves your SR number.",
        link: { label: "How Calgary filing works", href: "/calgary" },
      },
      {
        city: "Edmonton",
        title: "Edmonton LIV report uploads",
        body: "Since September 8, 2026, third-party ITM reports go through LIV. Strobe gives you the report PDF and deficiency list laid out the way LIV asks for them, and tracks proof of correction.",
        link: { label: "How Edmonton LIV works", href: "/edmonton" },
      },
    ],
    elsewhere:
      "Elsewhere in Alberta? Strobe follows the Alberta Fire Code. Tell us your fire department and we'll map its process.",
  },

  owners: {
    eyebrow: "For owners",
    title: "Building owners don't need another login.",
    body: "Reports, quotes and close-outs open from a link on any phone. Photos sit next to every line, so owners see what they're paying for. When the fire officer asks for proof of repair, the owner has the whole package with the SR number on it.",
  },

  shops: {
    eyebrow: "Built for shops like yours",
    title: "Made for small and mid-size Alberta shops",
    points: [
      { title: "Flat price per shop, not per tech.", icon: "price" },
      { title: "Panel-agnostic: Notifier, Mircom, Edwards, Simplex, whatever you service.", icon: "panel" },
      { title: "Your data stays in Canada.", icon: "canada" },
    ],
  },

  founder: {
    eyebrow: "A note from the founder",
    body: "I'm Lucas, a software engineer in Calgary. I'm building Strobe with local fire alarm techs because the reporting side of this work is still Word templates, spreadsheets and retyping. If you run a shop in Alberta, I'd like 20 minutes of your time to show you where it's at and hear what's missing.",
    signature: "Lucas, founder",
    /** Shown when public/founder.jpg is missing. */
    initials: "LC",
    photoAlt: "Lucas, founder of Strobe",
    bookLabel: "Book 20 minutes with Lucas",
  },

  earlyAccess: {
    title: "Get early access",
    sub: "Tell us about your shop. You'll hear from me within one business day.",
  },
};
