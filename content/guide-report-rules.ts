// The 51-city guide, from STROBE_SITE_SEO_BUILD.md part 3. The table comes from
// public/guides/fire-alarm-report-rules-canada.csv. If the CSV changes, recheck the counts in `found`.
export const reportRulesGuide = {
  /** The sitemap's lastmod and the Article's dateModified. */
  lastReviewed: "2026-11-10",
  datePublished: "2026-11-09",
  /** When the city rules themselves were checked. Shown in the byline. */
  researchChecked: "2026-11-06",
  meta: {
    title: "Fire alarm report rules in 51 Canadian cities (2026) | Strobe",
    description:
      "Who gets your fire alarm inspection report? We checked 51 Canadian cities: who must submit, how, deadlines and photo rules, with sources.",
  },
  title: "Who gets your fire alarm report? Rules in 51 Canadian cities",
  intro:
    "When a fire alarm inspection is done, the report goes to the building. But in some cities the fire department wants it too, and every city wants it differently. We checked the public rules in 51 cities across Canada so you don't have to. Every row links to the city's own document.",
  found: {
    title: "What we found",
    items: [
      "**3 of the 51 want reports from contractors as a routine:** Edmonton (LIV), Strathcona County (its contractor portal) and Lethbridge (email).",
      "**More hear from you only when something isn't fixed.** Calgary wants deficient systems reported within 10 business days. Medicine Hat, Grande Prairie and Wood Buffalo want notice when a repair isn't approved or the owner won't fix it.",
      "**Everywhere else we found rules for, owners keep the records** on site, usually for 2 years, and the fire department reviews them when it inspects.",
      "**Halifax has a 1996 bylaw** asking owners to file test records within 30 days. We couldn't confirm it's still enforced.",
      "**Saskatoon, Regina and Winnipeg license technicians** and want their numbers on tags or documents.",
      "**No city we checked requires photos.**",
      "**For 29 of the 51 we found no public rule at all.** That doesn't mean there isn't one. Ask your fire department.",
    ],
  },
  table: {
    title: "The table",
    searchLabel: "Search",
    searchPlaceholder: "City, method or rule",
    provinceLabel: "Province",
    allProvinces: "All provinces",
    download: "Download CSV",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total} cities`,
    empty: "No cities match that search.",
    noRule: "No public rule found. Ask your fire department.",
    sourceLink: "Source",
    columns: {
      province: "Province",
      city: "City",
      contractorSubmits: "Contractor submits routinely?",
      whenFireDepartmentHears: "When the fire department hears about it",
      method: "Method",
      deadline: "Deadline",
      photos: "Photos",
      source: "Source",
      notes: "Notes",
    },
    provinces: {
      AB: "Alberta",
      ON: "Ontario",
      QC: "Quebec",
      BC: "British Columbia",
      SK: "Saskatchewan",
      MB: "Manitoba",
      NS: "Nova Scotia",
      NB: "New Brunswick",
      NL: "Newfoundland and Labrador",
      PE: "Prince Edward Island",
    } as Record<string, string>,
  },
  edition: {
    title: "Which edition of S536?",
    body: "Alberta, Saskatchewan and Manitoba are on CAN/ULC-S536-2019 through their fire codes. Sources disagree on Ontario, which may be on 2019 or 2024, so check with the Office of the Fire Marshal. We didn't verify the other provinces.",
  },
  method: {
    title: "How we did this",
    body: "We searched each city's fire department pages, bylaws, bulletins and letters to contractors, in November 2026. We only list what we found in the city's own documents. If you know of a rule we missed, email hello@strobehq.com and we'll check it and update the table.",
  },
  dataset: {
    name: "Fire alarm report rules in 51 Canadian cities",
    description:
      "Who must submit fire alarm inspection reports to the fire department in 51 Canadian cities, how, by when, and whether photos are required, with a source link for each rule found.",
  },
};
