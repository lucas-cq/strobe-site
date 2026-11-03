# Deploying strobehq.com

Everything here needs your accounts, so it's written as steps for you to follow. Nothing
in this repo deploys or changes DNS on its own.

> **Vercel plan.** Vercel's Hobby (free) plan is for personal, non-commercial use. A
> company marketing site counts as commercial. Build and preview on Hobby if you like, but
> before strobehq.com goes live either upgrade the project to Pro (US$20 per user a month)
> or host it somewhere else. The code runs anywhere Next.js runs.

## 1. GitHub and Vercel

1. Create an empty GitHub repo called `strobe-site` and push this folder to it.
   `.env.local` and `/exports` are git-ignored, so no secrets or lead data go up.
2. In Vercel: **Add New → Project**, import `strobe-site`. Vercel detects Next.js and pnpm.
   Leave the build settings as they are.
3. Don't worry if the first deploy's form doesn't work yet. It needs the steps below.

## 2. Database (Neon)

1. In the Vercel project: **Storage → Marketplace → Neon → Create** (free plan). Pick a
   region close to Calgary (an AWS `us-west-2` or Canadian region if offered). This sets
   `DATABASE_URL` on the project automatically.
2. Pull the env vars locally and run the migration once:

   ```bash
   vercel env pull .env.local
   pnpm db:migrate
   ```

   `pnpm db:studio` opens a browser view of the tables if you want to check.

## 3. Email sending (Resend)

1. Create a Resend account and an API key with sending access. Add it to Vercel as
   `RESEND_API_KEY`.
2. **Domains → Add domain → `strobehq.com`.** Resend gives you DKIM and SPF records. Its
   bounce and SPF records sit on a `send.strobehq.com` subdomain, which keeps them apart
   from your inbox provider's records. Add exactly what Resend shows at your DNS host and
   wait for it to verify.
   - If you'd rather verify only a subdomain (for example `send.strobehq.com`), the From
     address has to use that subdomain. Change `RESEND_FROM` to match.
3. Add DMARC for `strobehq.com` as a TXT record on `_dmarc`, starting relaxed with a report
   address:

   ```
   v=DMARC1; p=none; rua=mailto:dmarc@strobehq.com
   ```

   Once a few weeks of mail has gone out cleanly, tighten to `p=quarantine`.
4. In Vercel set `RESEND_FROM="Lucas at Strobe <lucas@strobehq.com>"` and
   `LEADS_NOTIFY_TO=lucas@strobehq.com`.

## 4. A real inbox for lucas@ and hello@strobehq.com

The confirmation email tells people to reply, and the footer shows hello@strobehq.com, so
both addresses must reach you. privacy@strobehq.com and dmarc@strobehq.com are also used.
Pick one:

- **Google Workspace or Zoho Mail** for a full mailbox you can send from.
- **Free forwarding to Gmail:** Cloudflare Email Routing (if DNS is on Cloudflare) or
  ImprovMX. Forward `lucas@`, `hello@`, `privacy@` and `dmarc@`.

Send a test to each address before launch.

## 5. Spam protection (Cloudflare Turnstile)

1. Cloudflare dashboard → **Turnstile → Add widget**, mode **Managed**.
2. Hostnames: `strobehq.com`, `localhost` and your Vercel preview domain
   (`strobe-site-*.vercel.app` or the project's preview hostname).
3. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel.

Without the secret key, production rejects every submission on purpose.

## 6. The rest of the environment variables

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://strobehq.com` |
| `IP_HASH_SALT` | A long random string: `openssl rand -hex 32`. Set once and don't change it. |
| `NEXT_PUBLIC_CAL_LINK` | See step 7 |

Variables starting with `NEXT_PUBLIC_` are baked in at build time, so **redeploy** after
changing them.

## 7. Booking (Cal.com)

1. Create the event type **Strobe walkthrough (20 min)** with Google Meet and a phone
   option.
2. Its link looks like `cal.com/your-name/strobe-walkthrough`. Set
   `NEXT_PUBLIC_CAL_LINK=your-name/strobe-walkthrough` (no `cal.com/`) and redeploy.

Without it, the walkthrough buttons scroll to the form and the success message shows
without the booking calendar.

## 8. Domains

In Vercel → **Settings → Domains**:

1. Add `strobehq.com` and make it the primary domain.
2. Add `www.strobehq.com` → **Redirect to** `strobehq.com` (308).
3. Add `strobeinspect.com` and `www.strobeinspect.com` → **Redirect to**
   `https://strobehq.com` (308).

Add the DNS records Vercel shows for each domain at your DNS host.

## 9. Analytics

Vercel project → **Analytics → Enable** (Web Analytics). It's cookieless, so there's no
cookie banner. The component only renders on Vercel builds, so local builds stay clean.

## 10. Before you announce it

- [ ] Confirm `legalEntityName` in `content/site.ts` (used on `/privacy` and `/terms`), and
      have both legal drafts reviewed.
- [ ] Confirm the FAQ import answer in `content/faq.ts` (marked TODO).
- [ ] Submit the form on strobehq.com with your own address. Check: the row in Neon, the
      confirmation email (and that replying reaches you), the notification email, and the
      booking calendar on the success screen.
- [ ] Run Lighthouse (mobile) on the live site.
- [ ] Share a link in Slack or iMessage to check the preview image.
- [ ] In Google Search Console, add `strobehq.com` and submit `/sitemap.xml`.

## Day to day

- `pnpm leads:export` writes every lead to `exports/leads-YYYY-MM-DD.csv` (git-ignored).
- When a shop becomes a customer, set its `status` to `customer` (for example in
  `pnpm db:studio`) so the 24-month deletion skips it.
- `pnpm leads:prune` deletes expired data by hand. The form also does it after each
  submission.
- Schema change: edit `db/schema.ts`, run `pnpm db:generate`, commit the new migration, then
  `pnpm db:migrate` against Neon.
