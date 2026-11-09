"use server";

import { sql } from "drizzle-orm";
import { after } from "next/server";
import { earlyAccessForm } from "@/content/early-access";
import { getDb } from "@/db";
import { leadSubmissions, leads } from "@/db/schema";
import { createDetailsToken } from "@/lib/details-token";
import {
  type EarlyAccessState,
  type FieldErrors,
  earlyAccessSchema,
  firstNameOf,
  hiddenFields,
  readFormValues,
} from "@/lib/early-access";
import { type LeadAttribution, sendLeadEmails } from "@/lib/lead-emails";
import { hashIp, isRateLimited, requestIp } from "@/lib/lead-guard";
import { pruneExpired } from "@/lib/retention";
import { verifyTurnstile } from "@/lib/turnstile";

const { errors } = earlyAccessForm;

function clip(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;
}

export async function submitEarlyAccess(prev: EarlyAccessState, formData: FormData): Promise<EarlyAccessState> {
  const attempt = prev.attempt + 1;
  const values = readFormValues(formData);
  const fail = (message: string, fieldErrors: FieldErrors = {}): EarlyAccessState => ({
    status: "error",
    attempt,
    message,
    fieldErrors,
    values,
  });

  // 1. Honeypot: bots fill every field. Pretend it worked and store nothing.
  if (clip(formData.get(hiddenFields.honeypot), 200)) {
    const firstName = firstNameOf(values.fullName);
    return { status: "success", attempt, firstName, fullName: values.fullName, email: "", detailsToken: null };
  }

  const ip = await requestIp();

  // 2. Turnstile, checked server-side.
  const token = typeof formData.get(hiddenFields.turnstile) === "string" ? String(formData.get(hiddenFields.turnstile)) : "";
  if (!(await verifyTurnstile(token, ip))) return fail(errors.turnstile);

  const db = getDb();
  const ipHash = hashIp(ip);

  try {
    // 3. Rate limit: more than 3 saved submissions from this IP hash in 10 minutes is rejected.
    if (await isRateLimited(db, ipHash)) return fail(errors.rateLimited);
  } catch (err) {
    console.error("[early-access] rate limit check failed", err);
    return fail(errors.server);
  }

  // 4. Validate. Field errors go back to the form, with everything the user typed.
  const parsed = earlyAccessSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      fieldErrors[field] ??= issue.message;
    }
    return fail(errors.summary(Object.keys(fieldErrors).length), fieldErrors);
  }
  const input = parsed.data;

  const attribution: LeadAttribution = {
    utmSource: clip(formData.get(hiddenFields.utmSource), 200),
    utmMedium: clip(formData.get(hiddenFields.utmMedium), 200),
    utmCampaign: clip(formData.get(hiddenFields.utmCampaign), 200),
    referrer: clip(formData.get(hiddenFields.referrer), 500),
    landingPath: clip(formData.get(hiddenFields.landingPath), 500),
  };

  // 5. Upsert by lowercased email. A repeat submission updates the row and bumps the count.
  // Only step-1 fields are written here, so a repeat never wipes the optional step-2 details.
  const now = new Date();
  const consent = input.consent
    ? { marketingConsent: true, consentAt: now, consentText: earlyAccessForm.fields.consent.label }
    : { marketingConsent: false, consentAt: null, consentText: null };
  const row = {
    fullName: input.fullName,
    company: input.company,
    cities: input.cities,
    techCount: input.techCount,
    city: input.city,
    plan: input.plan,
    ...consent,
    ...attribution,
    ipHash,
  };

  let submissionCount = 1;
  let leadId: string;
  try {
    const [saved] = await db
      .insert(leads)
      .values({ email: input.email, ...row })
      .onConflictDoUpdate({
        target: leads.email,
        set: { ...row, updatedAt: now, submissionCount: sql`${leads.submissionCount} + 1` },
      })
      .returning({ id: leads.id, submissionCount: leads.submissionCount });
    submissionCount = saved.submissionCount;
    leadId = saved.id;
    await db.insert(leadSubmissions).values({ ipHash, leadId: saved.id });
  } catch (err) {
    console.error("[early-access] saving lead failed", err);
    return fail(errors.server);
  }

  // 6. Emails go out after the response. Failures are logged; the lead is already saved.
  const firstName = firstNameOf(input.fullName);
  after(() => sendLeadEmails(input, attribution, { firstName, submissionCount }));
  // Housekeeping: enforce the retention periods in the privacy policy.
  after(() => pruneExpired(db).catch((err) => console.error("[early-access] pruning failed", err)));

  // 7. Success, with a short-lived token for the optional step-2 details.
  return {
    status: "success",
    attempt,
    firstName,
    fullName: input.fullName,
    email: input.email,
    detailsToken: createDetailsToken(leadId),
  };
}
