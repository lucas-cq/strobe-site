export type NavLink = {
  label: string;
  href: string;
};

/** A top-level nav entry: a link, or a menu of links. */
export type NavItem = NavLink | { label: string; children: NavLink[] };

export type SiteContent = {
  name: string;
  /** The legal party named on /privacy and /terms. */
  legalEntityName: string;
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
  legalLinks: NavLink[];
  cta: {
    primary: string;
    /** The compact version in the mobile header. */
    primaryShort: string;
    /** Shown only when NEXT_PUBLIC_CAL_LINK is set and the button opens a real booking. */
    walkthrough: string;
    /** Shown when there's no booking link. The button then goes to the form, so it mustn't say "book". */
    walkthroughFallback: string;
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
    pricing: string;
  };
};

/** The cities with their own page. The nav menu and the "Other cities" row both read this. */
export const cityLinks: NavLink[] = [
  { label: "Calgary", href: "/calgary" },
  { label: "Edmonton", href: "/edmonton" },
];

export const site: SiteContent = {
  name: "Strobe",
  // TODO Lucas: confirm, and update once Strobe is incorporated.
  legalEntityName: "Lucas Cummings, operating as Strobe",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://strobehq.com",
  defaultTitle: "Strobe | Fire alarm inspection software for Canadian shops",
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
    { label: "FAQ", href: "/#faq" },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Your data", href: "/your-data" },
  ],
  cta: {
    primary: "Get early access",
    primaryShort: "Get access",
    walkthrough: "Book a 20-minute call",
    walkthroughFallback: "Talk to Lucas",
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
    pricing: "See pricing",
  },
};

/** Routes that embed the early-access form, so the CTA can scroll instead of navigate. */
export const formRoutes = ["/", "/calgary", "/edmonton", "/pricing", "/early-access"];

export const formAnchor = "early-access";
