"use server";

import { eq } from "drizzle-orm";
import { after } from "next/server";
import { earlyAccessForm } from "@/content/early-access";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { verifyDetailsToken } from "@/lib/details-token";
import { type DetailsState, type FieldErrors, detailsSchema, hiddenFields, readDetailsValues } from "@/lib/early-access";
import { sendLeadDetailsEmail } from "@/lib/lead-emails";

const { errors, details: copy } = earlyAccessForm;

/**
 * Step 2: saves the optional details onto the lead created in step 1.
 * The signed token from step 1 is the only way in, so it can't touch any other lead.
 */
export async function saveLeadDetails(prev: DetailsState, formData: FormData): Promise<DetailsState> {
  const attempt = prev.attempt + 1;
  const values = readDetailsValues(formData);

  const token = formData.get(hiddenFields.detailsToken);
  const check = verifyDetailsToken(typeof token === "string" ? token : "");
  if (!check.ok) return { status: "expired", attempt };

  const parsed = detailsSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return {
      status: "error",
      attempt,
      message: errors.summary(Object.keys(fieldErrors).length),
      fieldErrors,
      values,
    };
  }
  const input = parsed.data;
  if (input.currentMethod !== earlyAccessForm.softwareMethod) input.currentSoftware = null;

  try {
    const [lead] = await getDb()
      .update(leads)
      .set({
        currentMethod: input.currentMethod,
        currentSoftware: input.currentSoftware,
        systems: input.systems,
        phone: input.phone,
        notes: input.notes,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, check.leadId))
      .returning({ fullName: leads.fullName, email: leads.email, company: leads.company });

    if (!lead) return { status: "expired", attempt };
    after(() => sendLeadDetailsEmail(lead, input));
  } catch (err) {
    console.error("[lead-details] saving details failed", err);
    return { status: "error", attempt, message: copy.server, fieldErrors: {}, values };
  }

  return { status: "saved", attempt };
}
