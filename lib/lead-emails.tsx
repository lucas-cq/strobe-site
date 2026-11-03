import { render } from "@react-email/render";
import { Resend } from "resend";
import { emails } from "@/content/emails";
import { site } from "@/content/site";
import { ConfirmationEmail, confirmationText } from "@/emails/confirmation";
import { LeadNotificationEmail, leadNotificationText } from "@/emails/lead-notification";
import type { EarlyAccessInput } from "./early-access";

export type LeadAttribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
  landingPath: string | null;
};

export function bookingUrl() {
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  return link ? `https://cal.com/${link}` : null;
}

function techLabel(techCount: string) {
  return techCount === "Just me" ? "1 tech" : `${techCount} techs`;
}

/**
 * Sends the confirmation to the lead and the notification to LEADS_NOTIFY_TO.
 * Never throws: the lead is already saved, so failures are logged and the user still sees success.
 */
export async function sendLeadEmails(
  lead: EarlyAccessInput,
  attribution: LeadAttribution,
  meta: { firstName: string; submissionCount: number },
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const notifyTo = process.env.LEADS_NOTIFY_TO;
  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or RESEND_FROM is not set; skipping emails for", lead.email);
    return;
  }

  const resend = new Resend(apiKey);
  const replyTo = from.match(/<([^>]+)>/)?.[1] ?? from;
  const cities = lead.cities.join(", ");

  const confirmationProps = { firstName: meta.firstName, bookingUrl: bookingUrl(), siteUrl: site.url };
  const rows: [string, string][] = [
    ["Full name", lead.fullName],
    ["Work email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone ?? ""],
    ["Where they work", cities],
    ["Techs", lead.techCount],
    ["Reports today", lead.currentMethod],
    ["Which software", lead.currentSoftware ?? ""],
    ["What they inspect", lead.systems.join(", ")],
    ["Notes", lead.notes ?? ""],
    ["Product updates", lead.consent ? "Yes" : "No"],
    ["Submission count", String(meta.submissionCount)],
    ["UTM source", attribution.utmSource ?? ""],
    ["UTM medium", attribution.utmMedium ?? ""],
    ["UTM campaign", attribution.utmCampaign ?? ""],
    ["Referrer", attribution.referrer ?? ""],
    ["Landing path", attribution.landingPath ?? ""],
  ];
  const summary = `${lead.company} · ${cities} · ${techLabel(lead.techCount)}`;

  const sends = [
    (async () =>
      resend.emails.send({
        from,
        to: lead.email,
        replyTo,
        subject: emails.confirmation.subject(meta.firstName),
        html: await render(<ConfirmationEmail {...confirmationProps} />),
        text: confirmationText(confirmationProps),
      }))(),
  ];
  if (notifyTo) {
    sends.push(
      (async () =>
        resend.emails.send({
          from,
          to: notifyTo,
          replyTo: lead.email,
          subject: emails.notification.subject(lead.company, cities, techLabel(lead.techCount)),
          html: await render(<LeadNotificationEmail rows={rows} summary={summary} />),
          text: leadNotificationText({ rows, summary }),
        }))(),
    );
  } else {
    console.warn("[email] LEADS_NOTIFY_TO is not set; skipping the notification email");
  }

  const results = await Promise.allSettled(sends);
  for (const result of results) {
    if (result.status === "rejected") console.error("[email] send failed", result.reason);
    else if (result.value.error) console.error("[email] Resend error", result.value.error);
  }
}
