// Home page copy, from SITE_V2.md section 3 and STROBE_SITE_CANADA.md. Keep it plain: short sentences.
export const home = {
  hero: {
    /** Follows the Canadian flag in the eyebrow chip. */
    eyebrow: "Made in Canada · CAN/ULC-S536",
    title: "Inspect it. Quote it. File it. Same day.",
    sub: "Fire alarm inspection software for Canadian shops. Your techs inspect offline. Strobe builds the S536 report and the quote, then reads the site address and gets the deficiency filing ready in that city's format.",
    secondaryCta: "See how it works",
    visualAlt:
      "Sample screens: a tech's phone showing a fire alarm device list with one failed smoke detector, next to the repair quote the building owner receives.",
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
        title: "Typing it twice",
        body: "Notes from site get typed into a report back at the office. Then someone types them again for the quote.",
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
        role: "Tech · phone",
        title: "Inspect, even with no signal.",
        body: "Last year's devices are already loaded. Pass or fail each one. A fail becomes a deficiency with a photo, a location and a note. Works in basements and parkades and syncs when you're back online.",
        visualAlt: "Sample phone screen: the device list for Elm Street Plaza with pass and fail toggles, one failed pull station with a photo and note, and a pill saying 14 changes are saved offline.",
      },
      {
        role: "Tech · phone",
        title: "The report builds itself.",
        body: "Sign on the device and the CAN/ULC-S536 report is ready. No retyping into Word at night.",
        visualAlt: "Sample signature pad on the tech's phone, then a preview of the finished CAN/ULC-S536 report PDF.",
      },
      {
        role: "Office · web",
        title: "Quote it the same day.",
        body: "Every deficiency turns into a quote line. Price it from your price book and send it before anyone else quotes the job.",
        visualAlt: "Sample quote builder: three deficiency lines, each with a photo thumbnail and a price, and a button to send the quote.",
      },
      {
        role: "Owner · any device",
        title: "The owner approves by link.",
        body: "No login and no app. The owner sees each deficiency with its photo and price, approves what they want and signs.",
        visualAlt: "Sample owner view on a phone: each deficiency with approve and decline toggles, two approved and one declined, and a signature.",
      },
      {
        role: "Office · web",
        title: "Filed with the right city.",
        body: "Strobe reads the site address, picks the right fire department and gets the filing ready in their format, with the deadline counting down.",
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
    title: "Strobe knows where your report goes.",
    lede: "Calgary wants a 311 request. Edmonton wants LIV. Strathcona County has its own portal. Lethbridge wants an email. Strobe reads the site address and gets the right one ready.",
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
    lede: "Sprinkler and kitchen suppression are next. Early shops decide which comes first.",
    feature: {
      title: "Help shape what we build.",
      body: "Early-access shops get founding pricing, a direct line to me, and a real say in what gets built next.",
      button: "Get early access",
    },
    cards: [
      { title: "Office users free", body: "Pay for the techs in the field. The office doesn't cost extra." },
      { title: "Any panel", body: "Notifier, Mircom, Edwards, Simplex. If you inspect it, you can report on it in Strobe." },
      { title: "Stored in Canada", body: "Your customers' inspection data stays in Canada, on Google Cloud in Toronto." },
      { title: "Works across Canada", body: "Reports, quotes and owner approvals work anywhere. City filing grows as shops ask." },
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
    // TODO Lucas: add your LinkedIn profile URL. The link stays hidden while this is empty.
    linkedinUrl: "",
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
