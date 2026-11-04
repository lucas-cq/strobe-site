export type NavLink = {
  label: string;
  href: string;
};

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
  nav: NavLink[];
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
};

export const site: SiteContent = {
  name: "Strobe",
  // TODO Lucas: confirm, and update once Strobe is incorporated.
  legalEntityName: "Lucas Cummings, operating as Strobe",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://strobehq.com",
  defaultTitle: "Strobe | Fire alarm inspection software for Canadian shops",
  defaultDescription:
    "Fire alarm inspection software for Canadian contractors. CAN/ULC-S536 reports, same-day quotes, and city filings routed by site address. Works offline.",
  email: "hello@strobehq.com",
  founderEmail: "lucas@strobehq.com",
  privacyEmail: "privacy@strobehq.com",
  location: { lead: "Built in Alberta, for Alberta.", rest: "Ready for shops across Canada." },
  nonAffiliation:
    "Strobe is independent software and is not affiliated with any city, county or fire department, including the City of Calgary, the City of Edmonton, Strathcona County and the City of Lethbridge.",
  nav: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Calgary", href: "/calgary" },
    { label: "Edmonton", href: "/edmonton" },
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
};

/** Routes that embed the early-access form, so the CTA can scroll instead of navigate. */
export const formRoutes = ["/", "/calgary", "/edmonton", "/pricing", "/early-access"];

export const formAnchor = "early-access";
