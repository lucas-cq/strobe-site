# Data inventory

Built from the code on November 27, 2026, for the Privacy Policy and Terms (SITE_LEGAL, M4 step 1). It covers both repos: the marketing site (`strobe-site`) and the app (`strobe`: `apps/api`, `apps/web`, `apps/mobile`, `apps/pdf-worker`, `packages/*`, `infra/gcloud`).

**Approved by Lucas on November 27, 2026**, with his corrections: only services installed or called in either repo, and the retention numbers in section 4. `/privacy` and `/terms` (version 1.0) are written from this file. Change them together.

## 1. Services

| Service | What it does for us | Personal data it handles | Region | Source in code |
| --- | --- | --- | --- | --- |
| Vercel | Hosts strobehq.com. Vercel Web Analytics (cookieless page views). | Request logs (IP, user agent), page views without identifiers | United States | `@vercel/analytics`, `next.config.ts` |
| Neon | The early access database (`leads`, `lead_submissions`) | Form fields, consent record, hashed IP, UTM, referrer | United States | `@neondatabase/serverless`, `db/schema.ts` |
| Resend | Site email from mail.strobehq.com. App email from app.strobehq.com, including the report and quote emails customers send. | Recipient name and email, message content, opens and clicks | United States | `resend` in both repos |
| Cloudflare Turnstile | Bot checks on the early access form, the notify forms, and the app's sign-in, sign-up and admin pages | IP, browser signals, sent to Cloudflare | Global, including the United States | `components/turnstile.tsx`, `apps/api/src/lib/turnstile.ts`, `apps/web/src/components/auth/turnstile.tsx` |
| Google Cloud, northamerica-northeast2 (Toronto) | App database (Cloud SQL), file storage (photos, signatures, PDFs, exports), PDF worker, API and web app (Cloud Run), offline sync (PowerSync, self-hosted on our own VM, not PowerSync Cloud), Cloud Logging, Cloud Armor | Everything in sections 3 and 4 | Toronto, Canada. Backups are also in Toronto (`--backup-location`). | `@google-cloud/storage`, `@powersync/*`, `infra/gcloud`, `infra/powersync` |
| Stripe | Subscriptions, invoices, card payments, Customer Portal | Billing contact name, email, billing address, card details (Strobe never sees full card numbers) | United States and Canada | `stripe` in `apps/api` |
| Sentry | Error tracking in the API, web app and phone app | Error reports with personal data scrubbed (`packages/shared/src/scrub.ts`, `sendDefaultPii: false`). No IP stored. | United States | `@sentry/*`, `SENTRY_DSN*` |
| Expo push service | Delivers push notifications to phones, through Apple (APNs) and Google (FCM) | Device push token, notification title and body | United States | `expo-notifications`, `apps/api/src/lib/push.ts` |

Not used, so not in the policy: Google Analytics, ad pixels, PowerSync Cloud, any CRM, any cloud speech service. Google Workspace (our inbox) and the app stores aren't installed or called in either repo, so they're left out too. Voice entry on the phone is on-device only (`requiresOnDeviceRecognition: true`), so no audio leaves the phone. IndexNow sends page URLs only.

## 2. On-device and browser storage

| Where | What | Kept how long |
| --- | --- | --- |
| strobehq.com: sessionStorage | First-touch attribution (UTM tags, referrer, landing page), sent with the form | Until the tab closes |
| strobehq.com: cookies | None set by the site. Vercel Analytics sets none. | n/a |
| App (web): sign-in cookie | `strobe` session cookie (better-auth) | 30 days |
| App (web): OPFS or IndexedDB | The company's synced data (PowerSync SQLite) | Until sign-out or the browser clears it |
| App (web): service worker cache | App files for offline use (`apps/web/src/app/service-worker.tsx`) | Until the next app update |
| App (web): localStorage | UI preferences (sidebar, touch mode, dismissed notices, import seen) | Until cleared |
| App (phone): SecureStore | Session token | 30 days |
| App (phone): op-sqlite | The company's synced data, photos waiting to upload | Until sign-out |

## 3. What's collected, and where it's stored

| Data | Who it's about | Where it comes from | Why | Stored where (service, region) | Kept how long | Shared with |
| --- | --- | --- | --- | --- | --- | --- |
| Name, work email, company, phone, cities, tech count, city, plan interest, step-2 answers, notes | Early access leads | The early access form | To reply and run early access | Neon, United States | 24 months after the last submission, unless they become a customer (`lib/retention.ts`) | Resend (emails) |
| Consent to product updates: yes or no, time, exact wording, source | Leads | The form's checkbox | CASL proof of consent | Neon | With the lead | None |
| Hashed IP (one-way, salted) | Leads and site visitors who submit | The request | Rate limit and spam | Neon (`lead_submissions`, `leads.ip_hash`) | 30 days for rate-limit rows. The lead's hash stays with the lead. | None |
| UTM tags, referrer, landing page | Leads | sessionStorage, sent with the form | Which campaigns work | Neon | With the lead | None |
| Page views | Site visitors | Vercel Analytics | Traffic stats | Vercel | Vercel's retention | None |
| Name, email, image, sign-in records (sessions with IP and user agent), role, panel or office seat | App users | Sign-up, invitations, sign-in | Accounts and security | Cloud SQL, Toronto (`users`, `sessions`, `accounts`, `members`) | While the account is active. Deleted 90 days after the account goes read-only. | None |
| Phone, tech number, certification, licence number | App users and crew people (no account) | Team and crew settings | Printed on reports and tags | Cloud SQL, Toronto (`crew_people`, report fields) | As above | Printed on reports sent to building contacts |
| Signature images | App users, crew, owners | Signed in the app or on owner pages | Reports, quotes, compliance statements | Cloud Storage, Toronto | As above | In the PDFs sent to building contacts |
| Billing contact, billing address, card | Billing contact | Stripe Checkout | Billing | Stripe. The app stores only Stripe IDs and the billing status (`companies.billing`, `subscriptions`, `stripe_events`). | 6 years (CRA). Stripe keeps invoices and payment records. | Stripe |
| Companies, sites, systems, devices, inspections, results, deficiencies, repairs, quotes, price book, attendance, notes, city filings, imports, exports | Customer content, which can include contacts' names | Entered by the customer, or imported | The service | Cloud SQL and Cloud Storage, Toronto, and users' devices | While the account is active. Deleted 90 days after the account goes read-only, with a final warning email 14 days before. | Building contacts the customer sends to |
| Customer, site and report contacts: name, business name, email, phone, notes | Building owners, property managers and contacts | Entered by the customer | Sending reports and quotes | Cloud SQL, Toronto (`customers`, `customer_contacts`, `site_contacts`, `report_recipients`) | As above | Resend (emails) |
| Owner page events: opened, approved, declined, signed, with time, IP and user agent | Owners and building contacts | Visiting an owner link (`/o/...`) | The quote's "viewed" status and a proof trail | Cloud SQL, Toronto (`owner_link_events`) | As above | Shown to the customer |
| Owner signatures: signer name, signature image, time, IP, user agent, SHA-256 of the signed document, PO number, decision and who gave it | Owners and building contacts | Signing a quote or compliance statement on an owner page | Proof of approval | Cloud SQL and Cloud Storage, Toronto (`quotes`, `closeouts`) | As above | Shown to the customer and printed on the signed PDF |
| "Quote opened" | Owners | The owner page being visited. The first open sets `quotes.viewed_at`. | Shows the shop the quote was seen | Cloud SQL, Toronto | As above | The customer |
| Report and quote sends | Building contacts | Sending | Delivery record | Cloud SQL, Toronto (`report_sends`) | As above | None |
| Audit log: role changes, sends, signatures, filings, staff actions, with IP and user agent | App users and Strobe staff | Actions in the app | Security and support | Cloud SQL, Toronto (`audit_events`) | As above | None |
| Push tokens and notifications | App users | The phone app | Push notifications | Cloud SQL, Toronto (`push_tokens`, `notifications`) | As above | Expo, Apple, Google |
| Feedback | App users | In-app feedback | Improving the product | Cloud SQL, Toronto (`feedback`) | As above | None |
| Rate-limit records | Anyone using the API | The request | Abuse prevention | Cloud SQL, Toronto (`rate_limits`) | 30 days (spam records) | None |
| Request logs: IP, user agent, path, time | Anyone using the app or API | Load balancer and Cloud Run | Security and debugging | Cloud Logging, Toronto | Up to 30 days (Cloud Logging's `_Default` bucket) | None |
| Error reports (scrubbed) | App users | Crashes and errors | Fixing bugs | Sentry, United States | Up to 90 days (Sentry Team plan) | None |
| Support emails | Anyone who writes in | Email | Support | Our support inbox | While the account is active, plus 2 years | None |

## 4. Retention (approved)

| Data | Kept |
| --- | --- |
| Account and customer data | While the account is active. Deleted 90 days after the account goes read-only, with a final warning email 14 days before. |
| Backups | Deleted data is removed from backups within 14 days. Cloud SQL keeps 14 daily backups plus 7 days of point-in-time recovery. Google Cloud Storage soft delete keeps deleted files 7 days. Neon is on the Free plan, whose history window is at most 6 hours. |
| Logs | Up to 30 days (Google Cloud Logging) |
| Error reports | Kept up to 90 days (Sentry Team plan) |
| Invoices and payment records | 6 years (CRA) |
| Early access submissions | 24 months |
| Spam records | 30 days |
| Support email | While the account is active, plus 2 years |

- **Deletion:** day 76 of read-only, a final warning email. Day 90, the company is marked, and the daily job deletes it (`apps/api/src/jobs/billing.ts`, `ops/deletion-schedule.sh`).
- **The policy follows the config, not the other way round.** Nothing in Google Cloud, Neon or Sentry was changed for it. Cloud SQL backups come from `infra/gcloud/setup/4-database.sh` (`--retained-backups-count 14`, `--retained-transaction-log-days 7`).
- **If a setting changes, change the policy:** a longer Cloud SQL backup count or a paid Neon plan with a history window over 14 days (Launch allows up to 7 days, Scale up to 30) needs a new backup line. A Sentry plan change needs a new error report line.

## 5. Email engagement

The policy says: "We track whether our emails, and the report and quote emails our customers send through Strobe, are opened and whether links in them are clicked." Tracking is a per-domain setting in Resend, not in the code, so open and click tracking must be on for mail.strobehq.com and app.strobehq.com for that sentence to be accurate.

## 6. Still to do outside the code

- **Product-update emails:** the site has no sender for these. Whatever tool sends them (Resend Broadcasts, for example) needs an unsubscribe link, Strobe Labs Inc.'s name and the mailing address in every email, and unsubscribes honoured within 10 business days.
- **Mailing address:** decided: Strobe Labs Inc., 514-1528 16 Ave NW, Calgary, AB T2M 5A3. Set in `site.mailingAddress` (`content/site.ts`) and shown in email footers, the About contact section, Terms and Privacy.
- **Quebec:** decided: Strobe is not offered to businesses based in Quebec at this time (Terms section 23). No Law 25 or French versions for now.
- **Privacy Officer:** Lucas Cummings, privacy@strobehq.com.
