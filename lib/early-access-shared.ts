/**
 * Form types and constants that the browser needs. Kept apart from lib/early-access.ts
 * so the client bundle doesn't pull in Zod.
 */

export type FieldErrors = Partial<Record<string, string>>;

/** Step 1: what the user typed, echoed back so nothing is lost when there's an error. */
export type FormValues = {
  fullName: string;
  email: string;
  company: string;
  cities: string[];
  techCount: string;
  consent: boolean;
};

/** Step 2: the optional details on the success screen. */
export type DetailsValues = {
  currentMethod: string;
  currentSoftware: string;
  systems: string[];
  phone: string;
  notes: string;
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
  | {
      status: "success";
      attempt: number;
      firstName: string;
      fullName: string;
      email: string;
      /** Signed, short-lived token that lets step 2 update this lead. Null when step 2 is unavailable. */
      detailsToken: string | null;
    };

export const initialEarlyAccessState: EarlyAccessState = { status: "idle", attempt: 0 };

export type DetailsState =
  | { status: "idle"; attempt: number }
  | { status: "error"; attempt: number; message: string; fieldErrors: FieldErrors; values: DetailsValues }
  | { status: "saved"; attempt: number }
  | { status: "expired"; attempt: number };

export const initialDetailsState: DetailsState = { status: "idle", attempt: 0 };

/** Hidden fields the forms send alongside the visible ones. */
export const hiddenFields = {
  honeypot: "website",
  turnstile: "cf-turnstile-response",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  referrer: "referrer",
  landingPath: "landing_path",
  detailsToken: "details_token",
} as const;
