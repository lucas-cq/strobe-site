export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: { title: string; items: FaqItem[] } = {
  title: "Questions contractors ask",
  items: [
    {
      question: "Does Strobe submit to the City for me?",
      answer:
        "In Calgary, Strobe fills every field of the 311 request and attaches the deficient reports. You review it and click submit, then the SR number is saved to the site. In Edmonton, Strobe prepares the report and deficiency details for your LIV upload. We don't submit on your behalf without your review.",
    },
    {
      question: "Does it work with no signal?",
      answer:
        "Yes. Inspections run fully offline on the phone and sync when the device is back online. Photos queue and upload on their own.",
    },
    {
      question: "Do building owners need an account?",
      answer: "No. Owners open reports, quotes and close-outs from a secure link that expires.",
    },
    {
      question: "What does it cost?",
      answer:
        "A flat monthly price per shop, not per tech. Early-access shops lock in founding pricing. Book a call and we'll walk you through it.",
    },
    {
      // TODO Lucas: confirm you'll do this import by hand for early shops.
      question: "Can we bring our existing sites and device lists?",
      answer: "Yes. During onboarding we'll import your current sites and device lists from your spreadsheets.",
    },
    {
      question: "Which systems does it cover?",
      answer:
        "Fire alarm inspections to CAN/ULC-S536 first. Other system types are on the roadmap. Tell us what you inspect on the early-access form.",
    },
    {
      question: "Where is our data stored?",
      answer: "Customer data in the Strobe app is stored in Canada.",
    },
    {
      question: "Is Strobe connected to the City or the fire department?",
      answer:
        "No. Strobe is independent software that prepares your filings. It's not affiliated with the City of Calgary, the City of Edmonton or their fire departments.",
    },
    {
      question: "We're outside Calgary and Edmonton. Can we use it?",
      answer: "Yes. Reports and quoting work anywhere. Tell us your fire department and we'll map its filing process.",
    },
  ],
};
