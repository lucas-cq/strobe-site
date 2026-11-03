import { sql } from "drizzle-orm";
import { boolean, index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

/** One row per person, keyed by lowercased email. Repeat submissions update the row. */
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  ...timestamps,
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  phone: text("phone"),
  cities: text("cities").array().notNull(),
  techCount: text("tech_count").notNull(),
  // Optional: collected in step 2 of the form.
  currentMethod: text("current_method"),
  currentSoftware: text("current_software"),
  systems: text("systems").array().notNull().default(sql`'{}'::text[]`),
  notes: text("notes"),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  consentAt: timestamp("consent_at", { withTimezone: true }),
  consentText: text("consent_text"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  landingPath: text("landing_path"),
  ipHash: text("ip_hash"),
  submissionCount: integer("submission_count").notNull().default(1),
  status: text("status").notNull().default("new"),
});

/**
 * One row per saved submission, used only for the rate limit
 * (more than 3 from the same IP hash in 10 minutes is rejected).
 */
export const leadSubmissions = pgTable(
  "lead_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    ipHash: text("ip_hash").notNull(),
    leadId: uuid("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  },
  (t) => [index("lead_submissions_ip_hash_created_at_idx").on(t.ipHash, t.createdAt)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
