import { and, lt, ne } from "drizzle-orm";
import type { Db } from "../db";
import { leadSubmissions, leads } from "../db/schema";

/** Retention periods promised in content/privacy.ts. Change both together. */
export const RETENTION = {
  leadMonths: 24,
  submissionLogDays: 30,
};

/** The status that exempts a lead from deletion. Set it by hand when a shop signs up. */
export const CUSTOMER_STATUS = "customer";

/**
 * Deletes expired data: leads not updated in 24 months (unless they became customers)
 * and rate-limit records older than 30 days. Runs after each form submission and from
 * `pnpm leads:prune`.
 */
export async function pruneExpired(db: Db) {
  const leadCutoff = new Date();
  leadCutoff.setMonth(leadCutoff.getMonth() - RETENTION.leadMonths);
  const logCutoff = new Date(Date.now() - RETENTION.submissionLogDays * 24 * 60 * 60 * 1000);

  const deletedLogs = await db.delete(leadSubmissions).where(lt(leadSubmissions.createdAt, logCutoff)).returning({ id: leadSubmissions.id });
  const deletedLeads = await db
    .delete(leads)
    .where(and(lt(leads.updatedAt, leadCutoff), ne(leads.status, CUSTOMER_STATUS)))
    .returning({ id: leads.id });

  return { leads: deletedLeads.length, submissionLogs: deletedLogs.length };
}
