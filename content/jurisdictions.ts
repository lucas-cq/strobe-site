/**
 * Where each city wants the deficiency filing, for the home page city selector.
 * The app will reuse this shape, so keep it plain data: no JSX, no styling.
 *
 * Rules from STROBE_SITE_CANADA.md section 7, checked November 2026.
 * Copy rule: Strobe picks the destination and gets the filing ready. A person submits.
 * Never say it "submits automatically" or "files for you".
 */
export type JurisdictionId = "calgary" | "edmonton" | "strathcona" | "lethbridge" | "elsewhere";

export type Jurisdiction = {
  id: JurisdictionId;
  name: string;
  /** Lowercase words that pick this city when they appear in a typed address. */
  matchTerms: string[];
  sampleAddress: string;
  goesTo: string;
  method: string;
  trigger: string;
  deadline: string;
  strobePrepares: string;
  href?: string;
  /** Where the rule comes from. Not shown on the page. */
  sourceUrl?: string;
  /** Month the rule was last checked, e.g. "2026-11". */
  checkedOn?: string;
};

export const jurisdictions: Jurisdiction[] = [
  {
    id: "calgary",
    name: "Calgary",
    matchTerms: ["calgary"],
    sampleAddress: "88 Elm St SE, Calgary",
    goesTo: "Calgary Fire Department",
    method: "311 online request, one per address",
    trigger: "A system still deficient at day 10",
    deadline: "10 business days from the inspection. Impairments right away.",
    strobePrepares:
      "The full 311 packet, every field filled, reports attached. You review and click submit, then the SR number is saved to the site.",
    href: "/calgary",
    sourceUrl: "https://www.calgary.ca/for-business/operations/fire-safety-systems.html",
    checkedOn: "2026-11",
  },
  {
    id: "edmonton",
    name: "Edmonton",
    matchTerms: ["edmonton"],
    sampleAddress: "10220 104 Ave NW, Edmonton",
    goesTo: "Edmonton Fire Rescue Services",
    method: "LIV online platform",
    trigger: "Every third-party inspection report, required since Sept 8, 2026",
    deadline: "Submit after each inspection",
    strobePrepares: "An upload-ready LIV package: the report PDF plus the deficiency list.",
    href: "/edmonton",
    sourceUrl: "https://www.edmonton.ca/programs_services/fire_rescue/fire-inspection-report-submission",
    checkedOn: "2026-11",
  },
  {
    id: "strathcona",
    name: "Strathcona County",
    matchTerms: ["sherwood park", "strathcona", "ardrossan"],
    sampleAddress: "401 Festival Lane, Sherwood Park",
    goesTo: "Strathcona County Emergency Services",
    method: "SCES Contractor Portal",
    trigger: "Every inspection report",
    deadline: "Upload within 14 days of the inspection",
    strobePrepares: "An upload-ready report for the portal, with a reminder before day 14.",
    sourceUrl: "https://www.strathcona.ca/business-and-development/business/fire-inspections/",
    checkedOn: "2026-11",
  },
  {
    id: "lethbridge",
    name: "Lethbridge",
    matchTerms: ["lethbridge"],
    sampleAddress: "910 4 Ave S, Lethbridge",
    goesTo: "Lethbridge Fire and Emergency Services",
    method: "Email to the Fire Prevention Bureau",
    trigger: "A deficiency with no repair arranged within 10 business days",
    deadline: "Day 10 after the owner gets the report. Clean reports within 30 days.",
    strobePrepares:
      "The email to deficientreports@lethbridge.ca drafted with the report attached, ready on day 10.",
    sourceUrl: "https://www.lethbridge.ca/media/1hrlio4n/2026-letter-to-fire-alarm-testing-companies.pdf",
    checkedOn: "2026-11",
  },
  {
    id: "elsewhere",
    name: "Somewhere else",
    matchTerms: [],
    sampleAddress: "Your site, anywhere in Canada",
    goesTo: "Your local fire department",
    method: "Varies by city",
    trigger: "Check your fire department's rules",
    deadline: "n/a",
    strobePrepares: "A CAN/ULC-S536 report and a deficiency summary, ready to send.",
  },
];

export const defaultJurisdiction: JurisdictionId = "calgary";

/** Fewer typed characters than this never fall back to "Somewhere else". */
const MIN_FALLBACK_LENGTH = 3;

/** The city a typed address points to, or null to keep the current choice. */
export function matchJurisdiction(text: string): JurisdictionId | null {
  const t = text.trim().toLowerCase();
  const hit = jurisdictions.find((j) => j.matchTerms.some((term) => t.includes(term)));
  if (hit) return hit.id;
  return t.length >= MIN_FALLBACK_LENGTH ? "elsewhere" : null;
}

export function jurisdictionById(id: JurisdictionId): Jurisdiction {
  return jurisdictions.find((j) => j.id === id) ?? jurisdictions[0];
}
