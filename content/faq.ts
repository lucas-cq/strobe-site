export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: { eyebrow: string; title: string; items: FaqItem[] } = {
  eyebrow: "FAQ",
  title: "Questions we get a lot",
  items: [
    {
      question: "Does Strobe file with the City for me?",
      answer: "Strobe gets the filing ready. You look it over and send it. Nothing goes to the City without you.",
    },
    {
      question: "Does it work with no signal?",
      answer: "Yes. Inspections work fully offline and sync when you're back in range.",
    },
    {
      question: "Do building owners need an account?",
      answer: "No. They open the report and quote from a link on their phone.",
    },
    {
      question: "What does it cost?",
      answer:
        "One flat monthly price per shop, however many techs you have. Early-access shops lock in founding pricing. We'll go over it on a call.",
    },
    {
      // TODO Lucas: confirm you'll do this import by hand for early shops.
      question: "Can we bring our existing sites over?",
      answer: "Yes. We'll help move your sites and device lists over from your spreadsheets.",
    },
    {
      question: "Which systems does it cover?",
      answer: "Fire alarm first. Tell us what else you inspect on the form and it helps us decide what's next.",
    },
    {
      question: "Where is our data stored?",
      answer: "Your customers' inspection data is stored in Canada.",
    },
    {
      question: "Is Strobe connected to the City or the fire department?",
      answer:
        "No. Strobe is independent software. It isn't affiliated with the City of Calgary, the City of Edmonton or their fire departments.",
    },
    {
      question: "We're not in Calgary or Edmonton. Can we use it?",
      answer: "Yes. Reports and quotes work anywhere in Alberta. Tell us your fire department and we'll look at how they handle filings.",
    },
  ],
};
