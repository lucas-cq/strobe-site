type Option = { value: string; label: string };

const opts = (...values: string[]): Option[] => values.map((value) => ({ value, label: value }));

export const earlyAccessForm = {
  fields: {
    // Step 1: the form people see
    fullName: { label: "Full name" },
    email: { label: "Work email" },
    company: { label: "Company" },
    cities: {
      label: "Where do you work?",
      hint: "Pick all that apply",
      options: opts("Calgary", "Edmonton", "Elsewhere in Alberta"),
    },
    techCount: {
      label: "How many techs?",
      options: opts("Just me", "2–5", "6–15", "16+"),
    },
    /** Stored word for word with each consent, so keep it exactly as shown. */
    consent: { label: "Send me occasional product updates from Strobe. Unsubscribe any time." },

    // Step 2: optional details on the success screen
    currentMethod: {
      label: "How do you do reports today?",
      options: [
        { value: "Paper", label: "Paper" },
        { value: "Word or Excel templates", label: "Word or Excel templates" },
        { value: "Inspection software", label: "Inspection software" },
        { value: "Other", label: "Other" },
      ],
    },
    currentSoftware: { label: "Which software?" },
    systems: {
      label: "What do you inspect?",
      hint: "Pick all that apply",
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
    phone: { label: "Best number for the call" },
    notes: { label: "Anything we should know?", maxLength: 1000 },
  },

  /** The method value that reveals the "Which software?" field. */
  softwareMethod: "Inspection software",

  submit: "Get early access",
  submitting: "Sending…",
  privacyNote: { before: "We only use this to talk to you about Strobe. ", link: "Privacy policy", after: "." },

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

  /** Step 2, shown on the success screen. Every field is optional. */
  details: {
    title: "Help me prepare for our call",
    optional: "Optional",
    intro: "A few quick answers so our first call is about your shop, not my questions.",
    submit: "Save details",
    submitting: "Saving…",
    skip: "Skip",
    saved: "Thanks, that helps. I'll read it before we talk.",
    skipped: "No problem. We can cover it on the call.",
    expired: "This form has timed out. Reply to your confirmation email with anything you'd like me to know.",
    server: "Something went wrong saving that. Reply to your confirmation email instead, and I'll add it by hand.",
  },
};

export type EarlyAccessFormCopy = typeof earlyAccessForm;
