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
  location: string;
  nonAffiliation: string;
  nav: NavLink[];
  legalLinks: NavLink[];
  cta: {
    primary: string;
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
  defaultTitle: "Strobe | Fire inspection software for Alberta contractors",
  defaultDescription:
    "Strobe is fire and life safety inspection software for Alberta contractors. CAN/ULC-S536 reports on the phone, same-day repair quotes, and Calgary 311 and Edmonton LIV filings ready to submit.",
  email: "hello@strobehq.com",
  founderEmail: "lucas@strobehq.com",
  privacyEmail: "privacy@strobehq.com",
  location: "Built in Calgary, Alberta",
  nonAffiliation:
    "Strobe is independent software and is not affiliated with the City of Calgary, the City of Edmonton or their fire departments.",
  nav: [
    { label: "How it works", href: "/#how" },
    { label: "Calgary", href: "/calgary" },
    { label: "Edmonton", href: "/edmonton" },
    { label: "FAQ", href: "/#faq" },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  cta: {
    primary: "Get early access",
    walkthrough: "Book a 20-minute walkthrough",
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
export const formRoutes = ["/", "/calgary", "/edmonton", "/early-access"];

export const formAnchor = "early-access";
