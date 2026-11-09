/**
 * Export every lead to CSV: `pnpm leads:export`
 * Writes exports/leads-YYYY-MM-DD.csv. The exports folder is git-ignored
 * because it holds personal information.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { asc } from "drizzle-orm";
import { getDb } from "../db";
import { leads, type Lead } from "../db/schema";

try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local: rely on the shell environment.
}

const columns: [string, (lead: Lead) => unknown][] = [
  ["created_at", (l) => l.createdAt.toISOString()],
  ["updated_at", (l) => l.updatedAt.toISOString()],
  ["status", (l) => l.status],
  ["full_name", (l) => l.fullName],
  ["email", (l) => l.email],
  ["company", (l) => l.company],
  ["phone", (l) => l.phone],
  ["cities", (l) => l.cities.join("; ")],
  ["tech_count", (l) => l.techCount],
  ["city", (l) => l.city ?? ""],
  ["plan", (l) => l.plan ?? ""],
  ["source", (l) => l.source ?? ""],
  ["current_method", (l) => l.currentMethod],
  ["current_software", (l) => l.currentSoftware],
  ["systems", (l) => l.systems.join("; ")],
  ["notes", (l) => l.notes],
  ["marketing_consent", (l) => l.marketingConsent],
  ["consent_at", (l) => l.consentAt?.toISOString()],
  ["utm_source", (l) => l.utmSource],
  ["utm_medium", (l) => l.utmMedium],
  ["utm_campaign", (l) => l.utmCampaign],
  ["referrer", (l) => l.referrer],
  ["landing_path", (l) => l.landingPath],
  ["submission_count", (l) => l.submissionCount],
];

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // Quote anything with commas, quotes or newlines, and defuse spreadsheet formulas.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

async function main() {
  const rows = await getDb().select().from(leads).orderBy(asc(leads.createdAt));
  const csv = [
    columns.map(([name]) => name).join(","),
    ...rows.map((lead) => columns.map(([, get]) => csvCell(get(lead))).join(",")),
  ].join("\n");

  const dir = path.join(process.cwd(), "exports");
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `leads-${new Date().toISOString().slice(0, 10)}.csv`);
  writeFileSync(file, `${csv}\n`);
  console.log(`Exported ${rows.length} leads to ${path.relative(process.cwd(), file)}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
