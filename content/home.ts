// Home page copy, from SITE_V2.md section 3 and STROBE_SITE_CANADA.md. Keep it plain: short sentences.
export const home = {
  /** The sitemap's lastmod for this page. Update it when the facts or copy change. */
  lastReviewed: "2026-11-06",

  hero: {
    /** Follows the Canadian flag in the eyebrow chip. */
    eyebrow: "Made in Canada · CAN/ULC-S536",
    title: "Inspect it. Quote it. File it. Same day.",
    sub: "Fire alarm inspection software for Canadian shops. Run the panel from your phone, even with no signal. Strobe builds the S536 report, sends it to the building, quotes what's left to fix, and knows each city's rules for when the fire department needs it.",
    secondaryCta: "See how it works",
    visualAlt:
      "Sample screens: a tech's phone showing a fire alarm device list with one failed smoke detector and its deficiency note, next to the repair quote the building owner receives.",
  },

  proof: {
    label: "What Strobe covers",
    items: [
      "CAN/ULC-S536 reports",
      "Works with no signal",
      "Calgary 311 reporting",
      "Edmonton LIV uploads",
      "Any panel brand",
      "Owners sign from their phone",
      "Data stored in Canada",
    ],
  },

  problem: {
    eyebrow: "Sound familiar?",
    title: "The inspection takes a day. The paperwork takes all week.",
    cards: [
      {
        title: "A spreadsheet for every building",
        body: "Every building is its own Excel file. Find last year's, copy the devices over, fill it in, save it as a PDF, email it. Then do it again next year.",
      },
      {
        title: "Quotes that show up late",
        body: "The owner gets your quote three days later. By then they've already called someone else.",
      },
      {
        title: "A deadline on a sticky note",
        body: "Calgary wants deficient systems reported within 10 business days, and Edmonton wants reports in LIV. Right now that's tracked in someone's head.",
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "One inspection, entered once.",
    lede: "Everything after the inspection is built from it. Nobody retypes a thing.",
    steps: [
      {
        role: "Panel tech · phone",
        title: "Run the panel from your phone.",
        body: "Your walker calls devices on the radio. Last year's devices are already loaded in walk order, so a pass is one tap and the next device comes up. Jump to any device by number. Works in basements and parkades and syncs when you're back online.",
        visualAlt: "Sample phone screen in panel mode at Elm Street Plaza: device 31 of 42, pull station L2-14 in the Level 2 east stair, which passed in 2025, with a smoke detector up next, a large Pass button, a smaller Fail button, a Jump button with a number pad, and a pill saying 14 changes are saved offline.",
      },
      {
        role: "Panel tech · phone",
        title: "The report builds itself.",
        body: "The crew signs on the phone and the CAN/ULC-S536 report is ready, then emailed to the building contact. No more Excel to PDF to email at night.",
        visualAlt: "Sample signature pad on the tech's phone, then a preview of the finished CAN/ULC-S536 report PDF.",
      },
      {
        role: "Office · web",
        title: "Quote it the same day.",
        body: "Anything you didn't fix on site turns into a quote line. Price it from your price book and send it before anyone else quotes the job.",
        visualAlt: "Sample quote builder: three deficiency lines, each with its location and a price, and a button to send the quote.",
      },
      {
        role: "Owner · any device",
        title: "The owner approves by link.",
        body: "No login and no app. The owner sees each deficiency with its location and price, approves what they want and signs.",
        visualAlt: "Sample owner view on a phone: each deficiency with approve and decline toggles, two approved and one declined, and a signature.",
      },
      {
        role: "Office · web",
        title: "Ready when the fire department needs it.",
        body: "Strobe reads the site address and knows that city's rules. Where every report has to go in, like Edmonton or Lethbridge, it's ready to send. Anywhere else, if an owner won't fix a deficiency, you have to tell the fire department, and Strobe has the report and the paper trail ready.",
        visualAlt: "Sample filing card for 88 Elm St SE, Calgary: it goes to Calgary Fire Department as a 311 online request, with the packet ready to review.",
      },
    ],
  },

  switching: {
    eyebrow: "Switching",
    title: "We set you up. You keep your data.",
    // The two cards come from content/promises.ts.
    question: "Questions about switching?",
    /** Shown only when NEXT_PUBLIC_CAL_LINK is set. */
    bookLabel: "Book 20 minutes",
    bookFallback: "Talk to Lucas",
  },

  deadline: {
    eyebrow: "The City deadline",
    title: "The clock starts at the inspection. Not when the owner says yes.",
    body: "A signed quote doesn't pause Calgary's 10 business days. Only a fixed system does. Strobe keeps count for every site, warns you well before it's a problem, and keeps a timestamped record that you reported on time.",
    visualAlt: "Sample City clock in dark mode with three systems at different business-day counts.",
    links: [
      { label: "How Calgary reporting works", href: "/calgary" },
      { label: "How Edmonton LIV works", href: "/edmonton" },
    ],
  },

  cities: {
    eyebrow: "Every city files differently",
    title: "Strobe knows each city's rules.",
    lede: "Your report goes to the building. When the fire department needs it too, every city wants it differently. Calgary uses a 311 request when a deficiency isn't fixed in time. Edmonton wants reports in LIV. Strathcona County has its own portal. Lethbridge wants every report by email.",
    inputLabel: "Site address",
    inputPlaceholder: 'Try "Sherwood Park" or "Lethbridge"',
    chipsLabel: "City",
    /** Link text per city, shown under the result card. */
    links: {
      calgary: "Calgary details",
      edmonton: "Edmonton details",
      elsewhere: "Request my city",
    } as Partial<Record<string, string>>,
    footnote:
      "Demo only: the app uses the full site address. Rules checked November 2026, so always confirm with your fire department. More cities are added as shops ask for them.",
  },

  earlyAccess: {
    eyebrow: "Early access",
    title: "Starting with fire alarm",
    lede: "Extinguishers and sprinkler are next. Early shops decide which comes first.",
    feature: {
      title: "Help shape what we build.",
      body: "Early-access shops get founding pricing, a direct line to me, and a real say in what gets built next.",
      button: "Get early access",
    },
    cards: [
      { title: "Office users free", body: "Pay for the techs in the field. The office doesn't cost extra." },
      { title: "Any panel", body: "Notifier, Mircom, Edwards, Simplex. If you inspect it, you can report on it in Strobe." },
      { title: "Stored in Canada", body: "Your customers' inspection data stays in Canada, on Google Cloud in Toronto." },
      { title: "Works across Canada", body: "Reports, quotes and owner approvals work anywhere. City rules are mapped for Calgary, Edmonton, Strathcona County and Lethbridge, with more added as shops ask." },
    ],
  },

  founder: {
    eyebrow: "From the founder",
    body: "I'm Lucas, a software engineer in Calgary. I'm building Strobe with local fire alarm techs. Most shops I talk to still run inspections through Word templates and spreadsheets. If that's you, give me 20 minutes. I'll show you what we've built, and you tell me what's missing.",
    name: "Lucas Cummings",
    role: "Founder, Strobe",
    /** Shown when public/founder.jpg is missing. */
    initials: "LC",
    photoAlt: "Lucas Cummings, founder of Strobe",
    linkedinLabel: "LinkedIn",
    /** Shown only when NEXT_PUBLIC_CAL_LINK is set. */
    bookLabel: "Book 20 minutes",
    /** Shown when there's no booking link; the link then goes to the form. */
    bookFallback: "Talk to Lucas",
  },

  earlyAccessForm: {
    title: "Get early access",
    sub: "Tell us a bit about your shop. I'll get back to you within one business day.",
  },
};
