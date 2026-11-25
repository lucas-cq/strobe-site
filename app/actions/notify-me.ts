"use server";

import { sql } from "drizzle-orm";
import { z } from "zod";
import { earlyAccessForm } from "@/content/early-access";
import { deviceTemplate } from "@/content/tool-device-template";
import { reportTemplate } from "@/content/tool-report-template";
import { getDb } from "@/db";
import { leadSubmissions, leads } from "@/db/schema";
import { hiddenFields } from "@/lib/early-access-shared";
import { hashIp, isRateLimited, requestIp } from "@/lib/lead-guard";
import type { NotifyState } from "@/lib/notify-shared";
import { verifyTurnstile } from "@/lib/turnstile";

const { errors, fields } = earlyAccessForm;
/** Where the signup came from. Anything else in the form is ignored, so it can't be used to write free text. */
const sources = new Set([deviceTemplate.leadSource, reportTemplate.leadSource]);
const emailSchema = z.string().trim().toLowerCase().pipe(z.email(errors.email).max(254, errors.tooLong));

/** The optional "Email me when Strobe opens" box on the template pages. */
export async function submitNotifyMe(prev: NotifyState, formData: FormData): Promise<NotifyState> {
  const attempt = prev.attempt + 1;
  const email = String(formData.get("email") ?? "");
  const consent = formData.get("consent") === "on";
  const rawSource = String(formData.get("source") ?? "");
  const source = sources.has(rawSource) ? rawSource : deviceTemplate.leadSource;
  const fail = (message: string, field = false): NotifyState => ({ status: "error", attempt, message, field, email, consent });

  // Honeypot: bots fill every field. Pretend it worked and store nothing.
  if (formData.get(hiddenFields.honeypot)) return { status: "success", attempt };

  const ip = await requestIp();
  if (!(await verifyTurnstile(String(formData.get(hiddenFields.turnstile) ?? ""), ip))) return fail(errors.turnstile);

  const db = getDb();
  const ipHash = hashIp(ip);
  try {
    if (await isRateLimited(db, ipHash)) return fail(errors.rateLimited);
  } catch (err) {
    console.error("[notify-me] rate limit check failed", err);
    return fail(errors.server);
  }

  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) return fail(errors.email, true);

  const now = new Date();
  // Ticking the box opts in. Leaving it unticked never opts out someone who already said yes.
  const optIn = consent ? { marketingConsent: true, consentAt: now, consentText: fields.consent.label } : {};

  try {
    const [saved] = await db
      .insert(leads)
      // The form only asks for an email, so the columns the main form requires stay blank.
      .values({ email: parsed.data, fullName: "", company: "", cities: [], techCount: "", source, ipHash, ...optIn })
      // Someone already on the list keeps their details and their original source.
      .onConflictDoUpdate({
        target: leads.email,
        set: { ...optIn, ipHash, updatedAt: now, submissionCount: sql`${leads.submissionCount} + 1` },
      })
      .returning({ id: leads.id });
    await db.insert(leadSubmissions).values({ ipHash, leadId: saved.id });
  } catch (err) {
    console.error("[notify-me] saving lead failed", err);
    return fail(errors.server);
  }

  return { status: "success", attempt };
}
