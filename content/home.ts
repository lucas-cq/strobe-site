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
    lede: "Every stage reuses what came before it, so nobody types the same thing twice.",
    steps: [
      {
        title: "Inspect, even with no signal.",
        who: "Tech",
        where: "Phone",
        body: "The site and last year's device list are already loaded. Pass or fail each device, and a fail becomes a deficiency with a photo, location and note. An impairment alerts the manager right away. Works offline in basements and parkades.",
      },
      {
        title: "Report and quote on site.",
        who: "Tech, then manager",
        body: "The tech signs and the S536 report is generated. That's day 0 for the City clock. The manager checks each deficiency and prices the lines from your price book.",
      },
      {
        title: "Owner approves by link.",
        who: "Owner",
        where: "Any device",
        body: "Building owners don't need another login. The report and quote open on any phone, with a photo next to every line. They approve some or all lines, e-sign and add a PO number.",
      },
      {
        title: "File with the City.",
        who: "Manager",
        body: "Strobe counts business days per system and flags anything still deficient. Calgary gets a pre-filled 311 packet, and Edmonton gets an upload-ready LIV package.",
        links: [
          { label: "Calgary filing", href: "/calgary" },
          { label: "Edmonton LIV", href: "/edmonton" },
        ],
      },
      {
        title: "Repair, close out, keep the record.",
        who: "Tech, then owner",
        body: "The work order carries the original photos. The owner signs off by link and gets the close-out package with the SR number on it. Next year's inspection starts from this one.",
      },
    ] satisfies Step[],
  },

  buttons: {
    eyebrow: "Two buttons",
    title: "The two buttons that matter after an inspection",
    cards: [
      {
        title: "Send quote.",
        kicker: "The money button.",
        body: "Quote lines come straight from the deficiencies, priced from your price book, plus labour and tax. It goes out the same day, before anyone else has quoted.",
        visualAlt: "The top of a sample owner quote, with deficiency lines, prices and checkboxes.",
      },
      {
        title: "Report to City.",
        kicker: "The compliance button.",
        subtitle: "The clock starts at the inspection, not when the owner says yes.",
        body: "Approving a quote doesn't pause Calgary's 10 business days. Only a fixed system does. The button turns urgent at day 8, or right away for an impairment, and one click builds the whole filing, timestamped.",
        visualAlt: "Sample City clock showing three systems counting business days, with the Report to City button turning urgent.",
      },
    ],
  },

  features: {
    eyebrow: "What's in early access",
    title: "Fire alarm first, done properly",
    lede: "Early-access shops get the full fire alarm workflow today. Your feedback sets the order of what comes next.",
    comingSoonLabel: "Coming soon",
    /** Shop-level promises, shown first in the same grid as the features. */
    shopPoints: [
      { title: "Flat price per shop, not per tech.", icon: "price" },
      { title: "Panel-agnostic: Notifier, Mircom, Edwards, Simplex, whatever you service.", icon: "panel" },
      { title: "Your data stays in Canada.", icon: "canada" },
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

  founder: {
    eyebrow: "A note from the founder",
    body: "I'm Lucas, a software engineer in Calgary. I'm building Strobe with local fire alarm techs because the reporting side of this work is still Word templates, spreadsheets and retyping. If you run a shop in Alberta, I'd like 20 minutes of your time to show you where it's at and hear what's missing.",
    signature: "Lucas, founder",
    /** Shown when public/founder.jpg is missing. */
    initials: "LC",
    photoAlt: "Lucas, founder of Strobe",
    /** Shown only when NEXT_PUBLIC_CAL_LINK is set. */
    bookLabel: "Book 20 minutes with Lucas",
    /** Shown when there's no booking link; the link then goes to the form. */
    bookFallback: "Talk to Lucas",
  },

  earlyAccess: {
    title: "Get early access",
    sub: "Tell us about your shop. You'll hear from me within one business day.",
  },
};
