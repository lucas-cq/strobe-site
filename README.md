# strobe-site

Pre-launch marketing site for Strobe, fire and life safety inspection software for Alberta
contractors. Its job is to get shops to join early access or book a 20-minute walkthrough.

Next.js 16 (App Router, Cache Components), Tailwind CSS 4, Drizzle + Postgres (Neon),
Resend + React Email, Cloudflare Turnstile, Cal.com, Vercel Web Analytics.

The original build brief is in `STROBE_SITE_BRIEF.md`. Deployment steps are in `DEPLOY.md`.

## Running it

Needs Node 22+ and pnpm (`corepack enable` gives you the pinned version).

```bash
pnpm install
cp .env.example .env.local   # then fill it in, see below
pnpm db:migrate
pnpm dev
```

The site works without any env vars except the form, which needs `DATABASE_URL`.
For local testing you can use:

- **Database:** any Postgres. A Neon dev branch works, or a local Postgres
  (`DATABASE_URL=postgres://...@localhost/...`). Non-Neon URLs use the `pg` driver.
- **Turnstile:** Cloudflare's always-pass test keys, listed in `.env.example`.
- **Email:** leave `RESEND_API_KEY` empty. Leads still save, and the log says the emails
  were skipped.
- **Cal.com:** leave `NEXT_PUBLIC_CAL_LINK` empty to hide booking.

## Editing copy

All wording lives in `content/` as typed objects. You shouldn't need to touch JSX to
change words.

| File | What's in it |
|---|---|
| `content/site.ts` | Site name, default title and description, nav, footer, 404 |
| `content/home.ts` | Every Home section |
| `content/features.ts` | Feature list and status (`early-access` or `coming-soon`) |
| `content/faq.ts` | FAQ |
| `content/calgary.ts`, `content/edmonton.ts` | City pages. Regulatory lines must match section 6 of the brief |
| `content/early-access.ts` | Form labels, options, errors, success message |
| `content/emails.ts` | Confirmation and notification email wording |
| `content/privacy.ts`, `content/terms.ts` | Legal drafts, pending review |

Copy rules from the brief: no em dashes, Canadian spelling, none of the banned words, and
never "Strobe" alone in a page title or description. Quick check:

```bash
grep -rn "—" content components app emails
```

## Where things are

| Path | What it does |
|---|---|
| `app/` | Routes, metadata, OG images, sitemap, robots, manifest |
| `app/actions/early-access.ts` | The form's Server Action: honeypot, Turnstile, rate limit, Zod, upsert, emails |
| `components/home/`, `components/city/` | Page sections |
| `components/mockups/` | The five product mockups (HTML and CSS, sample data, hidden from screen readers) |
| `components/early-access-form.tsx` | The form, its errors and its success state |
| `db/` | Drizzle schema and migrations |
| `emails/` | React Email templates |
| `lib/` | Validation, email sending, Turnstile, retention, metadata and OG helpers |
| `scripts/` | `leads:export` and `leads:prune` |
| `public/brand/` | Logo files, referenced by path. Swap them for new exports at the same paths |
| `fonts/` | The Inter files from the brand kit. `fonts/web/` holds the subsets the site actually loads |

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build`, `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm db:generate` | New migration from `db/schema.ts` |
| `pnpm db:migrate` | Apply migrations to `DATABASE_URL` |
| `pnpm db:studio` | Browse the database |
| `pnpm leads:export` | Leads to `exports/leads-YYYY-MM-DD.csv` |
| `pnpm leads:prune` | Delete data past its retention period |

## Notes

- **Brand files** are used as-is. The header crops the lockup SVG's built-in padding with a
  viewBox (`components/lockup.tsx`). If new exports have different padding, update
  `LOCKUP_CROP` there.
- **Fonts:** see `fonts/web/README.md` for how the subsets were made and how to redo them.
- **Lighthouse (mobile)** on a local production build: 95 to 97 for Performance and 100 for
  Accessibility, Best Practices and SEO on every page. Home and Calgary sit at 95, so keep an
  eye on anything that adds weight above the fold.
- **Retention:** leads are deleted 24 months after their last update unless `status` is
  `customer`, and rate-limit records after 30 days, as the privacy policy says.
