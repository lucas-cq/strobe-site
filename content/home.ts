// Home page copy, from SITE_V2.md section 3. Keep it plain: short sentences, outcomes not workflow.
export const home = {
  hero: {
    eyebrow: "Inspection software for Alberta fire alarm contractors",
    /** Phones only, so the eyebrow stays on one line at 375px. */
    eyebrowShort: "Fire alarm inspection software · Alberta",
    title: "Inspect it. Quote it. File it. Same day.",
    sub: "Your techs finish the S536 report on their phone. The owner gets the repair quote before you're out of the parking lot. And the City paperwork is ready before the deadline, in Calgary or Edmonton.",
    note: "Open to Alberta shops now. One flat price per shop, not per tech.",
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
    title: "Less office work after every inspection",
    lede: "Your techs already do the hard part on site. Strobe takes care of what comes after.",
    cards: [
      {
        title: "Works in the parkade",
        body: "Last year's devices are already loaded. Pass, fail, snap a photo, move on. No signal needed. It syncs when you're back upstairs.",
      },
      {
        title: "Report done on site",
        body: "The S536 report is finished and signed before the tech leaves. Nobody types it up later.",
      },
      {
        title: "Quote out the same day",
        body: "Failed devices turn into a quote the owner can approve and sign on their phone. No login, no chasing PDFs over email.",
      },
      {
        title: "City filing, handled",
        body: "Strobe keeps an eye on the deadline for every deficient system and has your filing ready when it's time.",
        links: [
          { label: "Calgary", href: "/calgary" },
          { label: "Edmonton", href: "/edmonton" },
        ],
      },
    ],
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
    eyebrow: "Calgary and Edmonton",
    title: "Set up for how each city actually does it",
    cards: [
      {
        city: "Calgary",
        label: "311 deficiency reporting",
        body: "Deficient systems get reported within 10 business days, one request per address. Strobe has the request ready, so filing takes minutes instead of an afternoon.",
        link: { label: "Calgary reporting", href: "/calgary" },
        strip: "linear-gradient(90deg, #4b3be6, #2e8bff)",
      },
      {
        city: "Edmonton",
        label: "LIV report uploads",
        body: "Since September 8, 2026, third-party inspection reports go through LIV. Strobe has your report and deficiency list ready to upload.",
        link: { label: "Edmonton LIV", href: "/edmonton" },
        strip: "linear-gradient(90deg, #2e8bff, #5ccbff)",
      },
    ],
    elsewhere: "Somewhere else in Alberta? Tell us your fire department and we'll look at how they handle it.",
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
      { title: "One price per shop", body: "Hire another tech without your software bill going up." },
      { title: "Any panel", body: "Notifier, Mircom, Edwards, Simplex. If you inspect it, you can report on it in Strobe." },
      // TODO Lucas: keep only if the app really will run in Canada (e.g. Google Cloud Toronto).
      { title: "Stored in Canada", body: "Your customers' inspection data stays in Canada." },
      // TODO Lucas: confirm you'll import spreadsheets by hand. If not, use:
      // { title: "Up and running in a day", body: "No hardware, no install. Your techs use their own phones." },
      { title: "We'll move you over", body: "Send us your spreadsheets. We'll bring your sites and device lists in for you." },
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
