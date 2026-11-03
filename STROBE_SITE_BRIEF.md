# Strobe marketing site: build brief for Claude Code

> **Lucas, how to use this:** make an empty folder called `strobe-site`, unzip this kit into it, open Claude Code there and say:
> *"Read STROBE_SITE_BRIEF.md and build the site. Work through the phases in order and stop at the end of each phase so I can check it."*
> Everything below this box is written to Claude Code.

---

## 0. Read this first

You are building the pre-launch marketing site for **Strobe**, inspection software for fire and life safety contractors in Alberta. The domain is **strobehq.com**, and **strobeinspect.com** redirects to it.

The site has one job: get small and mid-size Alberta fire and life safety shops to **join early access** or **book a 20-minute walkthrough**. Every section should push toward one of those two actions.

Ground rules:

- **Check the current docs before you write code.** Next.js, Tailwind, Drizzle, Resend, Turnstile and Cal.com all change often. Use the current stable version of each and follow its official docs, not memory. If something in this brief conflicts with the current docs, follow the docs and tell me what you changed.
- **Accuracy matters more than hype.** The buyers are licensed contractors who know the fire code. One wrong claim about the City process will lose them. Section 6 lists the facts you may state; don't add regulatory claims beyond them.
- **The product is in early access.** Never invent customers, logos, testimonials, ratings, user counts or stats.
- **Keep all copy in `content/`** as typed TypeScript objects, so I can edit wording without digging through JSX.
- **Stop at the end of each phase** in section 11 and summarize what you did.

---

## 1. Stack

| Concern | Use | Notes |
|---|---|---|
| Framework | Next.js, latest stable (16.x when this was written), App Router, TypeScript `strict` | `pnpm create next-app@latest` |
| Styling | Tailwind CSS (latest, CSS-first config with `@theme` tokens) | Tokens from section 3, no component library needed |
| Package manager | pnpm | |
| Fonts | `next/font/local` with the files in `fonts/` | Inter Display for headings, Inter for body |
| Forms | Server Action + Zod | No client-side form libraries needed |
| Spam protection | Cloudflare Turnstile (free) + honeypot field + basic rate limit | |
| Database | Postgres on Neon, free plan, added through the Vercel Marketplace | Drizzle ORM + drizzle-kit migrations |
| Email | Resend (free plan: 3,000 emails a month, 100 a day) + React Email templates | Sends from our own domain |
| Booking | Cal.com embed (free plan) | `@calcom/embed-react` |
| Analytics | Vercel Web Analytics | Cookieless, so no cookie banner |
| Hosting | Vercel | See section 10 about the Hobby plan |

This is a **separate repo** from the product. Don't set up a monorepo.

---

## 2. Brand assets (already in this kit)

```
brand/
  strobe-mark.svg                        icon only, for light backgrounds
  strobe-mark-on-dark.svg                icon only, for dark backgrounds
  strobe-lockup-transparent-ink.svg      icon + "Strobe" wordmark, dark text, no background (site header)
  strobe-lockup-transparent-white.svg    icon + wordmark, white text, no background (dark sections, footer)
  strobe-lockup-light.svg / -dark.svg    lockups with a background (OG images, decks)
  strobe-app-icon-light.svg / -dark.svg  rounded-square app icon
  strobe-favicon.svg                     same icon as the app icon, used for the browser tab
  png/                                   favicon-16, favicon-32, apple-touch-icon-180, icon-192, icon-512, app-icon-1024, lockup-1200
fonts/
  InterDisplay-Medium/SemiBold/Bold.woff2, Inter-Regular/Medium/SemiBold.woff2, OFL.txt
```

- **There is one mark: four tapered beams fanning up and to the right from a hidden point.** Every file above uses that same mark, from the favicon to the header. Don't create other versions of it.
- Copy `brand/` to `public/brand/`. Use `strobe-favicon.svg` as `app/icon.svg` and `png/apple-touch-icon-180.png` as `app/apple-icon.png`.
- The wordmark in the SVGs is already outlined from Inter Display SemiBold. Use the SVG lockup in the header, never live text styled to look like the logo.
- **Don't redraw, recolour, stretch or animate the beam geometry.** The beams sit on an exact radial grid. You may fade or scale the whole mark as one unit.
- I may swap these files for Figma exports later at the same paths, so reference them by path only.

---

## 3. Design system

### Colour tokens (put these in `@theme` in `app/globals.css`)

```css
/* Brand ramp, taken from the logo gradient */
--color-violet: #2B1A8C;   /* deepest, where beams start */
--color-indigo: #4B3BE6;   /* primary brand colour: buttons, links, focus */
--color-blue:   #2E8BFF;   /* secondary accent */
--color-sky:    #5CCBFF;   /* light accent; decoration only on white, fails contrast as text */
--color-ice:    #8FE6FF;   /* only on dark backgrounds */

/* Neutrals */
--color-night:  #0B0A1F;   /* dark sections, footer */
--color-ink:    #14112E;   /* headings and body text on white */
--color-ink-2:  #3B3858;   /* secondary text */
--color-muted:  #6B6880;   /* captions, labels */
--color-line:   #E6E5EF;   /* borders, dividers */
--color-surface:#F7F7FB;   /* alternate section background */

/* Status, used only inside product mockups */
--color-fail:   #E5484D;
--color-warn:   #F5A524;
--color-pass:   #16A34A;
```

Gradient, used sparingly (hero glow, one accent rule, the OG image):
`linear-gradient(135deg, #2B1A8C 0%, #4B3BE6 30%, #2E8BFF 65%, #8FE6FF 100%)`

Rules:

- Clean white base, a lot of space, ink text. One dark `night` band (the "City clock" section) and a dark footer.
- The primary button is solid `indigo` with white text. Secondary buttons have an ink outline. No gradient buttons.
- Never use gradient text for anything people need to read. Never use `sky` or `ice` as text on white.
- All text must meet WCAG AA contrast. Check it.

### Type

- Headings use **Inter Display** SemiBold (600) with letter-spacing `-0.02em`. H1 is about 56 to 64 px on desktop and 36 to 40 px on mobile.
- Body text uses **Inter** Regular (400), 17 to 18 px, line-height 1.6. Labels use Inter Medium.
- Use tabular numbers (`font-variant-numeric: tabular-nums`) for countdowns, prices and day counts.
- Load the fonts with `next/font/local` from `/fonts`, using `display: swap` and CSS variables.

### Look and feel

- Calm, precise and technical, like a well-made tool rather than a startup template. Think Linear or Stripe docs, not a crypto landing page.
- **Product mockups are React components built with HTML and CSS**, not screenshots and not stock photos (section 5 has the specs). Label each one "Sample data" in small muted text.
- Motion: one subtle hero entrance where the whole mark fades and scales from 96% to 100%, plus gentle section fade-ins. Respect `prefers-reduced-motion`. No parallax, no scroll-jacking.
- Rounded corners: 12 px on cards and 10 px on buttons. Subtle borders (`line`). Very soft shadows, or none.
- Mobile first. Most contractors will first see this on a phone between jobs.

---

## 4. Voice and copy rules

- Write like a contractor talking to another contractor: short sentences, plain words, trade terms used correctly (techs, sites, panels, devices, deficiencies, impairments, SR number, work order, PO).
- **No em dashes anywhere in the copy.** Use periods, commas or colons.
- Banned words: seamless, revolutionize, unlock, leverage, cutting-edge, game-changer, empower, supercharge, effortless, next-generation, AI-powered, all-in-one, robust, elevate, streamline.
- Use Canadian spelling: colour, centre, licence (noun), cheque.
- First person from the founder is fine in the founder note and emails ("I'm Lucas..."). Everywhere else use "we" or "Strobe".
- **Name rule:** never use "Strobe" alone in a page title or meta description. Always pair it with what it is, for example "Strobe | Fire inspection software for Alberta contractors". (There's an existing "Strobe" trademark in software, so the descriptor matters.)
- Never say Strobe is endorsed by, partnered with or connected to the City of Calgary, the City of Edmonton, Calgary Fire Department or Edmonton Fire Rescue Services. Put this line in the footer: "Strobe is independent software and is not affiliated with the City of Calgary, the City of Edmonton or their fire departments."

---

## 5. Pages and content

Put copy in `content/home.ts`, `content/calgary.ts`, `content/edmonton.ts`, `content/faq.ts`, `content/features.ts` and `content/site.ts`. The text below is the starting copy. Use it closely, and tighten it if it doesn't fit the layout.

### Feature status

Strobe isn't fully built yet. In `content/features.ts`, give every feature a `status: "early-access" | "coming-soon"`. Show a small "Coming soon" pill on anything marked `coming-soon`. Defaults:

| Feature | Status |
|---|---|
| Offline mobile inspections, device list carried year to year | early-access |
| S536 fire alarm report generated on site, tech signature | early-access |
| Quote built from deficiencies, price book | early-access |
| Owner approves and e-signs by link, no login | early-access |
| City clock: business-day countdown per system, reminders | early-access |
| Calgary 311 packet, guided submit, SR number saved | early-access |
| Edmonton LIV upload-ready report package | early-access |
| Repair work order, 20.2 repair side, owner close-out | early-access |
| QuickBooks Online invoice push | coming-soon |
| Other system report types (sprinkler, kitchen suppression and others) | coming-soon |
| Browser extension that fills the Calgary form in one click | coming-soon |

### Site map

```
/            Home
/calgary     Calgary: the 10-business-day rule and the 311 filing
/edmonton    Edmonton: LIV uploads
/early-access  The form (also embedded at the bottom of Home, Calgary and Edmonton)
/privacy     Privacy policy (draft)
/terms       Terms of use (draft)
not-found    Custom 404
```

Header: lockup on the left; links to How it works (`/#how`), Calgary, Edmonton and FAQ (`/#faq`); primary button "Get early access". On mobile, use a simple sheet menu with the button pinned.

Footer (dark): white lockup, the links again, Privacy, Terms, `hello@strobehq.com`, "Built in Calgary, Alberta", the non-affiliation line, and © year.

---

### HOME

**Hero**
- Eyebrow: "Fire and life safety inspection software for Alberta"
- H1: "Inspect it. Quote it. File it. Same day."
- Sub: "Strobe takes your techs from the panel to a finished CAN/ULC-S536 report on their phone, gets the repair quote to the owner before you leave the site, and has your Calgary or Edmonton filing ready before the deadline."
- Buttons: "Get early access" (primary, scrolls to the form), "Book a 20-minute walkthrough" (secondary, opens the Cal.com modal)
- Under the buttons, small text: "Early access for Alberta shops. Flat price per shop, not per tech."
- Visual: the **Inspect phone mockup** next to the **owner quote card**, overlapping slightly, with a soft radial glow in the brand gradient behind them at low opacity.

**The problem** (short, three cards)
- Title: "One inspection. Three jobs. Done three times."
- Card 1, "Retyping": "Notes on paper or in a Word template, retyped into a report back at the office, then retyped again into a quote."
- Card 2, "Late quotes": "The quote goes out days after the inspection. By then the owner has called someone else."
- Card 3, "The City clock": "Calgary wants deficient systems reported within 10 business days, and Edmonton wants reports in LIV. That deadline lives in someone's head or a spreadsheet."

**How it works** (`id="how"`): a numbered, vertical timeline. Each step has a short title, one or two lines, and who does it.
1. **Set up the site once.** Manager, web. "Customer, site, systems, devices and contacts are entered once. Every report, quote and City filing pulls from that record."
2. **Inspect, even with no signal.** Tech, phone. "Last year's device list is already loaded. Pass or fail each device. A fail becomes a deficiency with a photo, location, clause reference and note. An impairment alerts the manager right away. Works offline in basements and parkades, and syncs when back online."
3. **Finish the report on site.** Tech, phone. "Recommendations and the tech's signature, and the S536 report is generated. That's day 0 for the City clock."
4. **Review and price.** Manager. "See every deficiency with its photos, fix the wording, and price the lines from your price book."
5. **Send report + quote.** Manager. "One link to the owner. No login, works on a phone, and every quote line shows the deficiency photo next to the price. You see when they open it, and a reminder goes out if they don't open it within 2 days."
6. **Owner signs.** Owner, any device. "They approve all or some lines, e-sign and add a PO number. Approval becomes a work order for your techs."
7. **File with the City.** Manager. "Strobe tracks business days per system and flags anything still deficient. Calgary gets a pre-filled 311 packet, and Edmonton gets an upload-ready LIV package." Link to /calgary and /edmonton.
8. **Repair and close out.** Tech, then owner. "The work order carries the original photos. The tech completes the repair side of section 20.2, the owner signs the compliance statement by link, and Strobe produces the repair completion letter."
9. **Records that keep.** Automatic. "Every test, photo, signature, quote and filing is stored per site, and next year's inspection starts from this one."

**The two buttons** (two large cards side by side)
- Card A: "**Send quote.** The money button." "Quote lines come straight from the deficiencies, priced from your price book, plus labour and tax. It goes out the same day, before anyone else has quoted." Visual: the owner quote card.
- Card B: "**Report to City.** The compliance button." "It lights up when a site has a system with open deficiencies and turns urgent at day 8, or immediately for an impairment. One click builds the whole filing, and every filing is timestamped." Visual: the City clock widget.

**City clock band** (the dark `night` section)
- Title: "The clock starts at the inspection, not when the owner says yes."
- Body: "Approving a quote doesn't pause Calgary's 10 business days. Only a fixed system does. Strobe counts business days per system, reminds you at day 5 and day 8, and keeps a timestamped record that you reported on time."
- Visual: the City clock widget in its dark variant.
- Two links: "How Calgary filing works →" and "How Edmonton LIV works →"

**Calgary and Edmonton** (two cards; short versions of the city pages, see section 6)
- Calgary: "10 business days. One 311 request per address. Up to 7 systems per request. Strobe fills every field, attaches the deficient reports and saves your SR number."
- Edmonton: "Since September 8, 2026, third-party ITM reports go through LIV. Strobe gives you the report PDF and deficiency list laid out the way LIV asks for them, and tracks proof of correction."
- Small line under both: "Elsewhere in Alberta? Strobe follows the Alberta Fire Code. Tell us your fire department and we'll map its process."

**For owners** (short split section)
- Title: "Building owners don't need another login."
- Body: "Reports, quotes and close-outs open from a link on any phone. Photos sit next to every line, so owners see what they're paying for. When the fire officer asks for proof of repair, the owner has the whole package with the SR number on it."

**Built for shops like yours** (three short points)
- "Flat price per shop, not per tech."
- "Panel-agnostic: Notifier, Mircom, Edwards, Simplex, whatever you service."
- "Your data stays in Canada."

**Founder note** (small, personal; leave space for an optional photo at `public/founder.jpg` and show initials if it's missing)
- "I'm Lucas, a software engineer in Calgary. I'm building Strobe with local fire alarm techs because the reporting side of this work is still Word templates, spreadsheets and retyping. If you run a shop in Alberta, I'd like 20 minutes of your time to show you where it's at and hear what's missing."
- Signed "Lucas, founder", with a link to book.

**FAQ** (`id="faq"`, accordion, from `content/faq.ts`)
- *Does Strobe submit to the City for me?* "In Calgary, Strobe fills every field of the 311 request and attaches the deficient reports. You review it and click submit, then the SR number is saved to the site. In Edmonton, Strobe prepares the report and deficiency details for your LIV upload. We don't submit on your behalf without your review."
- *Does it work with no signal?* "Yes. Inspections run fully offline on the phone and sync when the device is back online. Photos queue and upload on their own."
- *Do building owners need an account?* "No. Owners open reports, quotes and close-outs from a secure link that expires."
- *What does it cost?* "A flat monthly price per shop, not per tech. Early-access shops lock in founding pricing. Book a call and we'll walk you through it."
- *Can we bring our existing sites and device lists?* "Yes. During onboarding we'll import your current sites and device lists from your spreadsheets." *(TODO Lucas: confirm you'll do this by hand for early shops.)*
- *Which systems does it cover?* "Fire alarm inspections to CAN/ULC-S536 first. Other system types are on the roadmap. Tell us what you inspect on the early-access form."
- *Where is our data stored?* "Customer data in the Strobe app is stored in Canada."
- *Is Strobe connected to the City or the fire department?* "No. Strobe is independent software that prepares your filings. It's not affiliated with the City of Calgary, the City of Edmonton or their fire departments."
- *We're outside Calgary and Edmonton. Can we use it?* "Yes. Reports and quoting work anywhere. Tell us your fire department and we'll map its filing process."

**Early-access form**: see section 7. Section title: "Get early access", with the sub line "Tell us about your shop. You'll hear from me within one business day."

---

### /calgary

- Title: "Calgary fire safety system reporting, done in one click" (meta title: "Calgary 311 deficiency reporting for fire alarm contractors | Strobe")
- Intro: "Calgary Fire Department expects deficient fire safety systems to be reported within 10 business days of the initial inspection. Strobe tracks that clock for every system and builds the 311 request for you."
- **The rule, plainly** (bullets, facts from section 6):
  - The clock starts at the inspection. Getting more quotes doesn't pause it.
  - Impairments that affect a system's operation or coverage get reported right away and may need emergency repairs or a fire watch.
  - One 311 request per address, with up to 7 systems in it (one of each system type).
  - There's no second City submission after repairs. A Fire Safety Codes Officer contacts the building owner, and the owner proves the repairs with the inspection report and a letter from the repair company.
- **What Strobe does** (step list): business-day countdown per system → reminders at day 5 and 8 → "Report to City" turns urgent at day 8 → pre-filled packet with every field and the deficient reports attached → you open the City form next to a checklist with copy buttons and click submit → paste the SR number back (or forward the City's confirmation email) → close-out package for the owner, tagged with the SR number.
- **Field map table** (City form field → where Strobe gets it):
  | City form field | Filled from |
  |---|---|
  | Service location | Site record |
  | Number of systems (1 to 7) | Deficient systems on the site |
  | System type + date of service, per system | Each system's report |
  | Customer business name and address | Customer record |
  | All deficient reports attached? | Always "Yes" |
  | Business contact (name, address, email, phone) | Customer contact |
  | Contact available on site | Site contact |
  | Additional details, file upload | Deficiency summary + report PDFs |
- The 7 system types as a chip row: Fire Alarm, Sprinkler System, Special Suppression System, Fire Hydrant, Kitchen Canopy Cleaning, Kitchen Suppression System, Emergency Generator.
- Visual: the Calgary packet checklist mockup.
- Sources box at the bottom with links: CFD Fire Marshal Bulletin 2025-001 (https://www-prd.calgary.ca/content/dam/www/csps/fire/documents/fire-marshal-bulletins/industry-fire-alarm-reporting.pdf) and City of Calgary: Fire safety systems (https://www.calgary.ca/for-business/operations/fire-safety-systems.html). Add "Rules change. Always check with Calgary Fire Department."
- Form at the bottom.

### /edmonton

- Title: "Edmonton LIV uploads without the retyping" (meta title: "Edmonton LIV inspection report uploads for fire contractors | Strobe")
- Intro: "Since September 8, 2026, the City of Edmonton requires third-party fire system inspection, testing and maintenance (ITM) reports to be submitted electronically through LIV, the Life Safety Inspection Vault. It's required for non-compliant reports and recommended for all."
- **What LIV asks of contractors** (bullets, facts from section 6): register a company account; upload reports and link them to the premises and system type; log deficiencies by type, location and severity; track each deficiency through Open, In Progress, Cleared and Resolved; submit proof of correction. Owners can request access to see reports and deficiency status.
- Systems covered (chip row): Fire alarm, Fire pumps, Range hood cleaning, Emergency lights, Standpipes, Fire sprinklers, Fixed fire suppression.
- **What Strobe does**: the report PDF plus a deficiency list already sorted by type, location and severity, ready to upload → tracks which reports are uploaded and which deficiencies are still open → after repair, packages proof of correction for you or the owner to upload → reminders for anything not yet uploaded.
- Be careful with the wording: Strobe makes LIV uploads fast. It is **not** integrated with LIV and doesn't upload automatically. Don't imply otherwise.
- Visual: the Edmonton LIV checklist mockup.
- Sources box with a link to City of Edmonton: Fire Inspection Report Submission (https://www.edmonton.ca/programs_services/fire_rescue/fire-inspection-report-submission), plus "Questions about LIV: fireprevention@edmonton.ca".
- Form at the bottom.

---

### Product mockups (build in `components/mockups/`, all sample data, no real company names)

1. **InspectPhone**: a phone frame. Header "1200 Sample Ave SW · Fire Alarm · Annual". A device list where each row shows a device (e.g. "Smoke detector · 2nd floor corridor"), its location and a pass/fail chip. One expanded failed row shows a deficiency card: a photo placeholder (abstract gradient block labelled "Photo"), "Clause 6.x", a note, and a red "Impairment" tag on one item. A bottom bar shows "Offline · 14 changes queued".
2. **OwnerQuoteCard**: "Quote for 1200 Sample Ave SW". 3 or 4 lines, each with a small photo thumbnail, a description, a price and a checkbox. Subtotal, GST, total. An "Approve 3 of 4 lines" button, a PO number field and a signature line.
3. **CityClock** (light and dark variants): 3 system rows with type, site and a "Day 6 of 10 business days" progress bar (warn colour at day 8 and up, fail for an impairment), plus a "Report to City" button whose state follows the most urgent row.
4. **CalgaryPacket**: a checklist of the 8 form fields with filled values and small "Copy" buttons, attached PDFs, and an "SR number" input with "Saved · timestamped".
5. **LivChecklist**: report PDF ✓, premises and system type ✓, deficiencies by type, location and severity ✓, a status pill per deficiency (Open, In Progress, Cleared, Resolved), and a "Proof of correction" row.

Make the mockups responsive and mark them `aria-hidden` with a text alternative nearby, so screen readers get the point without reading out fake data.

---

## 6. Facts you may state (don't go beyond these)

**Calgary** (sources: CFD Fire Marshal Bulletin 2025-001; calgary.ca Fire safety systems; the City 311 life safety systems form)
- CFD expects deficient fire safety systems reported within 10 business days of the initial inspection. Getting multiple quotes doesn't pause it.
- Deficiencies affecting a system's operation or coverage must be reported immediately and may need emergency repairs or a fire watch.
- Filing is through a City 311 service request. One request per address, with up to 7 systems, because the System Type list has 7 options: Fire Alarm, Sprinkler System, Special Suppression System, Fire Hydrant, Kitchen Canopy Cleaning, Kitchen Suppression System, Emergency Generator.
- Submitting returns a service request (SR) number. CFD reviews requests with non-compliant systems within 30 calendar days.
- There's no second City submission after repairs. A Fire Safety Codes Officer contacts the owner, who proves repairs with the inspection report plus a letter from the repair company saying the repairs were made and the system is fully functional.
- Owners must keep reports on site for two years, available to a Fire Safety Codes Officer.

**Edmonton** (source: edmonton.ca Fire Inspection Report Submission)
- Since September 8, 2026, all third-party fire system ITM reports must be submitted electronically through LIV (Life Safety Inspection Vault). It's required for non-compliant reports and recommended for all.
- Contractors must register a company account. Inspectors and technicians submit through it. Owners can optionally request access to view reports and deficiency status.
- Systems listed: fire alarm, fire pumps, range hood cleaning, emergency lights, standpipes, fire sprinklers, fixed fire suppression.
- Contractors can upload PDF or digital reports, link them to premises and system types, log deficiencies by type, location and severity, track status (Open, In Progress, Cleared, Resolved), and submit proof of correction. Owners can upload proof of correction too.
- LIV sends automated reminders for due and overdue items.

**Don't state**: specific Edmonton deadlines, fees, anything about a LIV API, or that Strobe is approved or recognized by either city.

---

## 7. The early-access form (this replaces "contact form → email")

A basic form that emails a Gmail inbox looks like a scam to a contractor because nothing on the other end feels real. This setup fixes that:

1. **Ask useful questions**, so it reads like an application, not a generic contact box.
2. **Show a proper success state on the page**, with a named person and a clear next step.
3. **Send an immediate confirmation email from our own domain**, signed by a real person, with a working reply-to.
4. **Offer to book right away**, with a real calendar slot via Cal.com.
5. **Store every lead in our own database**, so nothing gets lost in an inbox.

### Fields (`components/early-access-form.tsx`, Server Action in `app/actions/early-access.ts`)

| Field | Type | Required |
|---|---|---|
| Full name | text | yes |
| Work email | email | yes |
| Company | text | yes |
| Phone | tel | no |
| Where do you work? | checkboxes: Calgary, Edmonton, Elsewhere in Alberta | at least one |
| How many techs? | select: Just me, 2–5, 6–15, 16+ | yes |
| How do you do reports today? | select: Paper, Word or Excel templates, Inspection software (please name it), Other | yes |
| Which software? | text, shown only if "Inspection software" is picked | no |
| What do you inspect? | checkboxes: Fire alarm, Sprinkler, Kitchen suppression, Special suppression, Emergency lighting, Generators, Extinguishers | no |
| Anything we should know? | textarea, max 1,000 chars | no |
| Updates consent | checkbox, **unchecked by default**: "Send me occasional product updates from Strobe. Unsubscribe any time." | no |
| Hidden | honeypot field, Turnstile token, `utm_*` params, referrer, landing path | |

Under the button, in small text: "We'll only use this to talk to you about Strobe. See our privacy policy."

### Server Action flow

1. Honeypot filled → return a fake success and store nothing.
2. Verify the Turnstile token server-side through Cloudflare's siteverify endpoint. On failure, show a friendly retry message.
3. Rate limit: hash the IP (SHA-256 with `IP_HASH_SALT`) and reject if there are more than 3 submissions from that hash in 10 minutes.
4. Validate with Zod and return field errors that the form shows inline. Keep everything the user typed when there's an error.
5. Upsert into `leads` by lowercased email. A repeat submission updates the row and bumps `submission_count`.
6. Send the **confirmation email** to the lead and the **notification email** to `LEADS_NOTIFY_TO`. If email fails, log it (console is fine for now) and **still show success**, because the lead is saved.
7. Return success. The form swaps to the success state.

### Success state

> **You're on the list, {firstName}.**
> I'll email you from lucas@strobehq.com within one business day.
> Want to skip the wait? Pick a time below. *(inline Cal.com embed for the 20-minute walkthrough)*

If `NEXT_PUBLIC_CAL_LINK` isn't set, hide the booking part and show only the message.

### Emails (React Email, in `emails/`)

- **Confirmation**: from `RESEND_FROM` ("Lucas at Strobe <lucas@strobehq.com>"), with reply-to set to the same address. Subject: "Got it, {firstName}. Here's what happens next." Mostly plain text, with the small mark at the top and no heavy design:
  "Hi {firstName}, thanks for signing up for Strobe early access. I'm Lucas, and I'm building Strobe in Calgary. I'll reach out within one business day to set up a short walkthrough. If it's easier, book a time here: {calLink}. Or just reply to this email." Then a blank line and the sign-off "Lucas" on its own line.
  Footer: Strobe, Calgary, Alberta, and a link to strobehq.com.
- **Notification** to Lucas: subject "New early access: {company} ({cities}, {techCount} techs)", with every field in a simple table plus UTM and referrer.

### Database (Drizzle schema in `db/schema.ts`)

`leads`: id (uuid), created_at, updated_at, full_name, email (unique, lowercased), company, phone, cities (text[]), tech_count, current_method, current_software, systems (text[]), notes, marketing_consent (bool), consent_at (timestamp, null if no consent), consent_text (the exact checkbox wording), utm_source, utm_medium, utm_campaign, referrer, landing_path, ip_hash, submission_count, status (text, default `new`).

Add a tiny script to export leads to CSV: `pnpm leads:export`.

---

## 8. SEO and metadata

- Per-page `metadata` with title, description, canonical URL and Open Graph tags. Titles follow the name rule in section 4.
- `app/opengraph-image.tsx` uses `next/og`: a white card with the lockup, the page H1 and a thin gradient rule at the bottom. Add variants for /calgary and /edmonton.
- `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts` (name "Strobe", theme colour `#4B3BE6`, icons from `public/brand/png`).
- JSON-LD on Home: `Organization` (name "Strobe", url, logo, areaServed: Alberta) and `SoftwareApplication` (applicationCategory BusinessApplication, operatingSystem "iOS, Android, Web"). Don't include any review or rating fields.
- Phrases to cover naturally in headings and copy: fire inspection software Alberta, CAN/ULC-S536 inspection report app, fire alarm inspection software Calgary, Calgary 311 fire safety system deficiency reporting, Edmonton LIV inspection report upload, fire alarm deficiency quote.

---

## 9. Quality bar

- Lighthouse on mobile: 95 or higher for Performance, Accessibility, Best Practices and SEO.
- Server components by default. Use client components only for the form, accordion, mobile menu and Cal.com embed.
- Images: SVG for brand assets. `next/image` for anything raster.
- Semantic HTML, one H1 per page, logical heading order, visible focus rings in `indigo`, a skip link, labelled inputs, and errors announced with `aria-live`.
- No layout shift from fonts (use the `next/font` size adjustment).
- Works at 360 px wide with no horizontal scroll.
- `.env.example` lists every variable. No secrets in git.

---

## 10. Deploy

**About the Vercel plan (read this, Lucas):** Vercel's Hobby (free) plan is limited to personal, non-commercial use under its fair use guidelines. A company marketing site counts as commercial. You can build and preview on Hobby, but before strobehq.com goes live, either upgrade to Pro (US$20 per user a month) or plan to move. The code here deploys anywhere Next.js runs.

Steps for Claude Code to walk me through. Write them to `DEPLOY.md` and don't run anything that needs my accounts:

1. Push to a new GitHub repo `strobe-site` and import it into Vercel.
2. Vercel Marketplace → add Neon (free plan) to the project, which sets `DATABASE_URL` automatically. Run `pnpm db:migrate`.
3. Resend: add the sending domain on a subdomain (e.g. `send.strobehq.com`) and add the SPF and DKIM records it gives you at the DNS host. Add DMARC for `strobehq.com`, starting at `p=none` with a report address, then tighten to `quarantine` once mail is flowing.
4. **A real inbox for lucas@strobehq.com and hello@strobehq.com.** The confirmation email tells people to reply, so replies must land somewhere: Google Workspace, Zoho Mail, or free forwarding to Gmail (Cloudflare Email Routing if DNS is on Cloudflare, or ImprovMX).
5. Cloudflare Turnstile: create a widget with hostnames `strobehq.com` and `localhost`, plus the Vercel preview domain.
6. Cal.com: create the event "Strobe walkthrough (20 min)" with a Google Meet or phone option, and set `NEXT_PUBLIC_CAL_LINK`.
7. Vercel → Domains: `strobehq.com` as primary, `www.strobehq.com` → 308 redirect to the apex, `strobeinspect.com` and `www.strobeinspect.com` → 308 redirect to `https://strobehq.com`.
8. Turn on Vercel Web Analytics.

Env vars (`.env.example`):
```
NEXT_PUBLIC_SITE_URL=https://strobehq.com
DATABASE_URL=
RESEND_API_KEY=
RESEND_FROM="Lucas at Strobe <lucas@strobehq.com>"
LEADS_NOTIFY_TO=lucas@strobehq.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
IP_HASH_SALT=
NEXT_PUBLIC_CAL_LINK=          # e.g. strobe/walkthrough
```

---

## 11. Build order (stop after each phase)

1. **Scaffold**: Next.js, Tailwind tokens, fonts, brand assets, favicon/manifest, layout with header and footer, empty pages. Show me the header and footer on mobile and desktop.
2. **Home**: every section, with copy coming from `content/`.
3. **Mockups**: the 5 components from section 5.
4. **City pages**: /calgary and /edmonton.
5. **Form**: fields, Server Action, Turnstile, Neon + Drizzle, Resend emails, success state, Cal.com embed. Test the full flow locally with real keys.
6. **Legal + SEO**: /privacy and /terms (see below), metadata, OG images, sitemap, robots, JSON-LD.
7. **Polish**: Lighthouse pass, accessibility pass, 404 page, `DEPLOY.md`, README.

**Privacy page (draft, mark "Draft, pending legal review" in a comment, not on the page):** what we collect (the form fields, hashed IP, UTM data, cookieless analytics), why (to contact you about Strobe and decide who gets early access), where it's processed (Vercel, Neon, Resend, Cloudflare, Cal.com; some of these may store data outside Canada), how long (leads deleted after 24 months unless you become a customer), consent for updates and how to withdraw it, and how to request access or deletion (privacy@strobehq.com). Written to fit Canadian privacy law (PIPEDA, and Alberta's PIPA). The legal entity name is a placeholder: `{{LEGAL_ENTITY_NAME}}`.

**Terms page:** short website terms of use with the same placeholder.

---

## 12. Definition of done

- [ ] Every page renders well at 360 px, 768 px and 1440 px
- [ ] No em dashes and no banned words anywhere in the copy (grep for them)
- [ ] No fake testimonials, logos, stats or customer names
- [ ] Every regulatory statement matches section 6, and both city pages link their sources
- [ ] The footer non-affiliation line is on every page
- [ ] The form saves to Neon, sends both emails, blocks the honeypot, verifies Turnstile and rate-limits
- [ ] The consent checkbox is unchecked by default, and consent time and wording are stored
- [ ] The success state shows Cal.com when the link is set
- [ ] Lighthouse mobile scores are 95+ across the board
- [ ] `DEPLOY.md`, `.env.example` and README are complete
