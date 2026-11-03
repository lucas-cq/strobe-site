export type FeatureStatus = "early-access" | "coming-soon";

export type Feature = {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
};

export const featureStatusLabel: Record<FeatureStatus, string> = {
  "early-access": "In early access",
  "coming-soon": "Coming soon",
};

export const features: Feature[] = [
  {
    id: "offline-inspections",
    title: "Offline mobile inspections",
    description: "Pass or fail every device with no signal. The device list carries over year to year.",
    status: "early-access",
  },
  {
    id: "s536-report",
    title: "S536 fire alarm report on site",
    description: "The CAN/ULC-S536 report is generated on the phone and signed by the tech.",
    status: "early-access",
  },
  {
    id: "quote-from-deficiencies",
    title: "Quotes built from deficiencies",
    description: "Every deficiency becomes a quote line, priced from your price book.",
    status: "early-access",
  },
  {
    id: "owner-esign",
    title: "Owner approval and e-signature",
    description: "Owners approve and sign from a link. No login.",
    status: "early-access",
  },
  {
    id: "city-clock",
    title: "City clock",
    description: "A business-day countdown for each system, with reminders.",
    status: "early-access",
  },
  {
    id: "calgary-311",
    title: "Calgary 311 packet",
    description: "Every field filled, a guided submit, and the SR number saved to the site.",
    status: "early-access",
  },
  {
    id: "edmonton-liv",
    title: "Edmonton LIV package",
    description: "The report and deficiency list, laid out ready for your LIV upload.",
    status: "early-access",
  },
  {
    id: "repair-closeout",
    title: "Repair work orders and close-out",
    description: "The repair side of section 20.2, plus owner sign-off by link.",
    status: "early-access",
  },
  {
    id: "quickbooks",
    title: "QuickBooks Online invoices",
    description: "Push approved work to QuickBooks Online as an invoice.",
    status: "coming-soon",
  },
  {
    id: "other-systems",
    title: "More report types",
    description: "Sprinkler, kitchen suppression and other system reports.",
    status: "coming-soon",
  },
  {
    id: "calgary-extension",
    title: "One-click Calgary form fill",
    description: "A browser extension that fills the City form for you.",
    status: "coming-soon",
  },
];
