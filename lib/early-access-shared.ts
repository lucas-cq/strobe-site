/**
 * Form types and constants that the browser needs. Kept apart from lib/early-access.ts
 * so the client bundle doesn't pull in Zod.
 */

export type FieldName =
  | "fullName"
  | "email"
  | "company"
  | "phone"
  | "cities"
  | "techCount"
  | "currentMethod"
  | "currentSoftware"
  | "systems"
  | "notes"
  | "consent";
export type FieldErrors = Partial<Record<FieldName, string>>;

/** What the user typed, echoed back so nothing is lost when there's an error. */
export type FormValues = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  cities: string[];
  techCount: string;
  currentMethod: string;
  currentSoftware: string;
  systems: string[];
  notes: string;
  consent: boolean;
};

export type EarlyAccessState =
  | { status: "idle"; attempt: number }
  | {
      status: "error";
      attempt: number;
      message: string;
      fieldErrors: FieldErrors;
      values: FormValues;
    }
  | { status: "success"; attempt: number; firstName: string; fullName: string; email: string };

export const initialEarlyAccessState: EarlyAccessState = { status: "idle", attempt: 0 };

/** Hidden fields the form sends alongside the visible ones. */
export const hiddenFields = {
  honeypot: "website",
  turnstile: "cf-turnstile-response",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  referrer: "referrer",
  landingPath: "landing_path",
} as const;

