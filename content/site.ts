export type NavLink = {
  label: string;
  href: string;
};

/** A tech who reviewed a page. Only with their written OK. */
export type Reviewer = { name: string; role: string };

/** A top-level nav entry: a link, or a menu of links. */
export type NavItem = NavLink | { label: string; children: NavLink[] };

export type SiteContent = {
  name: string;
  /** The legal name: on /privacy, /terms, the footer, the Organization schema and every email. */
  legalEntityName: string;
  /** How the Terms describe it. */
  legalEntityKind: string;
  /** "Calgary, Alberta": the footer line and emails. */
  legalLocation: string;
  /**
   * The mailing address CASL requires in every commercial email, and the Terms and Privacy contact
   * sections. Empty until Lucas decides on it (SITE_LEGAL M3): pages and emails leave it out while empty.
   */
  mailingAddress: string;
  /** The Privacy Officer named on /privacy (PIPA and PIPEDA want a named person). */
  privacyOfficer: string;
  url: string;
  defaultTitle: string;
  defaultDescription: string;
  email: string;
  founderEmail: string;
  privacyEmail: string;
  /** Footer line, after the flag. `lead` is bold. */
  location: { lead: string; rest: string };
  nonAffiliation: string;
  founder: {
    name: string;
    /** LinkedIn profile URL. The link stays hidden while this is empty. */
    linkedin: string;
  };
  org: {
    /** Profile URLs for the company (LinkedIn company page, etc.), for the Organization schema. */
    sameAs: string[];
  };
  nav: NavItem[];
  /** Footer only, between the nav and the legal links. */
  footerLinks: NavLink[];
  legalLinks: NavLink[];
  cta: {
    primary: string;
    /** The compact version in the mobile header. */
    primaryShort: string;
    /** The secondary button. It goes to the form, so it mustn't say "book". */
    talk: string;
  };
  skipLink: string;
  menu: {
    open: string;
    close: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
  otherCities: {
    title: string;
    guide: string;
    pricing: string;
    /** The S536 checklist guide, linked from every city page. */
    checklist: NavLink;
  };
};

export const reportRulesGuidePath = "/guides/fire-alarm-report-rules-canada";

/** The cities with their own page. The nav menu and the "Other cities" row both read this. */
export const cityLinks: NavLink[] = [
  { label: "Calgary", href: "/calgary" },
  { label: "Edmonton", href: "/edmonton" },
  { label: "Strathcona County", href: "/strathcona-county" },
  { label: "Lethbridge", href: "/lethbridge" },
  { label: "Medicine Hat", href: "/medicine-hat" },
  { label: "Grande Prairie", href: "/grande-prairie" },
  { label: "Fort McMurray", href: "/fort-mcmurray" },
];

export const site: SiteContent = {
  name: "Strobe",
  legalEntityName: "Strobe Labs Inc.",
  legalEntityKind: "an Alberta corporation",
  legalLocation: "Calgary, Alberta",
  // Shown in email footers, the About contact section, Terms and Privacy.
  mailingAddress: "514-1528 16 Ave NW, Calgary, AB T2M 5A3",
  privacyOfficer: "Lucas Cummings",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://strobehq.com",
  defaultTitle: "Fire alarm inspection software for Canada | Strobe",
  defaultDescription:
    "Fire alarm inspection software for Canadian shops. Run the panel from your phone, even offline. S536 reports, same-day quotes, each city's rules built in.",
  email: "hello@strobehq.com",
  founderEmail: "lucas@strobehq.com",
  privacyEmail: "privacy@strobehq.com",
  location: { lead: "Built in Alberta, for Alberta.", rest: "Ready for shops across Canada." },
  nonAffiliation:
    "Strobe is independent software and is not affiliated with any city, county or fire department, including the City of Calgary, the City of Edmonton, Strathcona County and the City of Lethbridge.",
  founder: {
    name: "Lucas Cummings",
    linkedin: "https://www.linkedin.com/in/lucas-cummings/",
  },
  org: {
    sameAs: [],
  },
  nav: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Cities", children: cityLinks },
    { label: "Pricing", href: "/pricing" },
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "/#faq" },
  ],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "51-city report rules", href: reportRulesGuidePath },
    { label: "Tools", href: "/tools" },
    { label: "Strobe vs a spreadsheet", href: "/compare/spreadsheet" },
    { label: "Your data", href: "/your-data" },
  ],
  /** The footer's bottom line, after the copyright. */
  legalLinks: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "mailto:hello@strobehq.com" },
  ],
  cta: {
    primary: "Get early access",
    primaryShort: "Get access",
    talk: "Talk to Lucas",
  },
  skipLink: "Skip to content",
  menu: {
    open: "Open menu",
    close: "Close menu",
  },
  notFound: {
    title: "This page isn't on the panel.",
    body: "The link may be old, or the address may have a typo. Everything about Strobe is a click away from the home page.",
    home: "Back to the home page",
  },
  otherCities: {
    title: "Other cities",
    guide: "Rules in 51 cities",
    pricing: "See pricing",
    checklist: { label: "S536 annual inspection checklist", href: "/guides/s536-annual-inspection-checklist" },
  },
};

/** Routes that embed the early-access form, so the CTA can scroll instead of navigate. */
export const formRoutes = [
  "/",
  "/calgary",
  "/edmonton",
  "/strathcona-county",
  "/lethbridge",
  "/medicine-hat",
  "/grande-prairie",
  "/fort-mcmurray",
  "/compare/spreadsheet",
  "/pricing",
  "/early-access",
];

export const formAnchor = "early-access";
