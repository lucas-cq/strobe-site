type Option = { value: string; label: string };

const opts = (...values: string[]): Option[] => values.map((value) => ({ value, label: value }));

export const earlyAccessForm = {
  fields: {
    fullName: { label: "Full name" },
    email: { label: "Work email" },
    company: { label: "Company" },
    phone: { label: "Phone", hint: "Optional" },
    cities: {
      label: "Where do you work?",
      hint: "Pick all that apply",
      options: opts("Calgary", "Edmonton", "Elsewhere in Alberta"),
    },
    techCount: {
      label: "How many techs?",
      placeholder: "Choose one",
      options: opts("Just me", "2–5", "6–15", "16+"),
    },
    currentMethod: {
      label: "How do you do reports today?",
      placeholder: "Choose one",
      options: [
        { value: "Paper", label: "Paper" },
        { value: "Word or Excel templates", label: "Word or Excel templates" },
        { value: "Inspection software", label: "Inspection software (please name it)" },
        { value: "Other", label: "Other" },
      ],
    },
    currentSoftware: { label: "Which software?", hint: "Optional" },
    systems: {
      label: "What do you inspect?",
      hint: "Optional",
      options: opts(
        "Fire alarm",
        "Sprinkler",
        "Kitchen suppression",
        "Special suppression",
        "Emergency lighting",
        "Generators",
        "Extinguishers",
      ),
    },
    notes: { label: "Anything we should know?", hint: "Optional", maxLength: 1000 },
    /** Stored word for word with each consent, so keep it exactly as shown. */
    consent: { label: "Send me occasional product updates from Strobe. Unsubscribe any time." },
  },

  /** The method value that reveals the "Which software?" field. */
  softwareMethod: "Inspection software",

  submit: "Get early access",
  submitting: "Sending…",
  privacyNote: { before: "We'll only use this to talk to you about Strobe. See our ", link: "privacy policy", after: "." },

  errors: {
    required: "This is required.",
    fullName: "Please enter your name.",
    email: "Please enter a valid email address.",
    company: "Please enter your company name.",
    cities: "Pick at least one.",
    choose: "Please choose one.",
    tooLong: "That's a bit long. Please shorten it.",
    summary: (n: number) => (n === 1 ? "Please fix the highlighted field." : `Please fix the ${n} highlighted fields.`),
    turnstile: "We couldn't confirm you're human. Please try again.",
    turnstilePending: "One moment, we're still checking you're human. Please try again in a few seconds.",
    rateLimited: "That's a lot of submissions in a short time. Please wait a few minutes and try again.",
    server: "Something went wrong on our side and your details weren't saved. Please try again, or email hello@strobehq.com.",
  },

  success: {
    title: (firstName: string) => `You're on the list, ${firstName}.`,
    body: "I'll email you from lucas@strobehq.com within one business day.",
    bookPrompt: "Want to skip the wait? Pick a time below.",
  },
};

export type EarlyAccessFormCopy = typeof earlyAccessForm;
