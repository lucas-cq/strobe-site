# strobehq.com: going Canada-wide

> **Lucas:** drop this file and `canada-flag.svg` in the site repo root. Then tell Claude Code: *"Read STROBE_SITE_CANADA.md and do it in order. Stop after section 9 so I can check it."*
> Everything below is written to Claude Code.

This changes the site's positioning from Alberta-only to Canada-wide, adds a "How it works" section, an interactive city selector, a "switching is on us" band with a new `/your-data` page, and a Canadian flag, and restructures the pricing page with no prices yet.

Keep everything in `STROBE_SITE_BRIEF.md` and the v2 copy rules: no em dashes, short sentences, no banned words, the purple accent, the existing components and mockups. Where this file disagrees with an earlier brief, this file wins.

**One earlier rule is reversed:** the v2 brief said not to show the full workflow in public. That's cancelled. We now show how the app works, end to end.

---

## 1. Positioning, in one line

Before: Alberta fire alarm software.
Now: **fire alarm inspection software for Canadian shops, that knows where every city wants the report.**

Alberta stays our home and our proof. The footer and the city pages still say it plainly. The home page, nav, meta and pricing speak to all of Canada.

Search all copy for "Alberta" and "Albertan" and update each one:
- **Keep:** the footer line (section 3), the city pages, the founder note, and the city selector data.
- **Change to Canada:** the hero, meta descriptions on non-city pages, the pricing page, FAQ answers about who Strobe is for, and the early-access form intro.

---

## 2. The Canadian flag

Use the provided `canada-flag.svg`. It is a correct 2:1 flag (red bands, white square, 11-point maple leaf). **Never use the 🇨🇦 emoji anywhere**, including meta tags and OG text.

- Put the file at `public/brand/canada-flag.svg`.
- Make a `CanadaFlag` component that renders it inline as SVG (copy the markup, don't load it as an `<img>`, so it stays crisp and loads with the page).
  - Props: `className`, `title` (default "Flag of Canada").
  - When the flag sits next to text that already says "Canada" or "Canadian", set `aria-hidden="true"` and drop the title so screen readers don't say it twice.
  - Keep its colours exactly (`#d52b1e` and `#fff`). Don't tint it purple, and don't apply the brand gradient.
  - Give it a 1px `rgba(0,0,0,0.08)` outline (as a ring or border on a wrapper) so the white square doesn't vanish on white backgrounds, and a 2px corner radius.
- Use it in exactly three places:
  1. **Hero eyebrow chip:** `[flag] Made in Canada · CAN/ULC-S536`. Flag at 20×10 px.
  2. **Footer:** before the "Built in Alberta" line. Flag at 24×12 px.
  3. **Pricing page:** next to "All prices in Canadian dollars (CAD)." Flag at 20×10 px.

Don't add it anywhere else. Three is enough to land the point without looking like a souvenir shop.

---

## 3. Footer

Replace the current location line with:

> [flag] **Built in Alberta, for Alberta.** Ready for shops across Canada.

Keep the non-affiliation line and the legal links as they are.

---

## 4. Meta and SEO

### Home page
- **Title:** `Strobe | Fire alarm inspection software for Canadian shops`
- **Description:** `Fire alarm inspection software for Canadian contractors. CAN/ULC-S536 reports, same-day quotes, and city filings routed by site address. Works offline.`
- **OG title:** same as the title. **OG description:** same as the description.

### Calgary page (`/calgary`): keeps its own local SEO
- **Title:** `Calgary fire alarm deficiency reporting | Strobe`
- **Description:** `Report deficient fire safety systems to the City of Calgary before day 10. Strobe builds the 311 packet from your inspection. You review and submit.`
- H1 stays "Calgary deficiency reporting, ready before day 10" (from the site review).

### Edmonton page (`/edmonton`): keeps its own local SEO
- **Title:** `Edmonton LIV fire inspection report submission | Strobe`
- **Description:** `Edmonton requires third-party fire system reports in LIV since Sept 8, 2026. Strobe prepares an upload-ready LIV package from every inspection.`

### Pricing page (`/pricing`)
- **Title:** `Pricing in CAD | Strobe`
- **Description:** `Simple per-tech pricing in Canadian dollars. Office users free. Plans for solo techs, crews of 2 to 5, and shops with 6 or more. No sales call.`

### Structured data
- **Home:** JSON-LD `SoftwareApplication`, with `applicationCategory: "BusinessApplication"`, `operatingSystem: "iOS, Android, Web"`, `areaServed: { "@type": "Country", "name": "Canada" }`, publisher `Organization` "Strobe" with `url` and `logo`. **No `offers` block yet**, since prices aren't public.
- **City pages:** `WebPage` with `about` set to the service and `areaServed` set to the `City` (Calgary, Edmonton).
- Update `sitemap.xml` with `/pricing` if it's missing.
- Every page keeps a unique title and description. Add a build check that fails if two routes share a title or a description.

---

## 5. Hero (home page)

**Keep the current H1 exactly as it is.** Keep the existing hero mockup. Change only the eyebrow, the sub, the CTAs and the trust line:

- **Eyebrow chip:** `[flag] Made in Canada · CAN/ULC-S536`
- **Sub:** `Fire alarm inspection software for Canadian shops. Your techs inspect offline. Strobe builds the S536 report and the quote, then reads the site address and gets the deficiency filing ready in that city's format.`
- **Primary CTA:** `Get early access` (to `#early-access`)
- **Secondary CTA:** `See how it works` (smooth-scroll to `#how-it-works`, respecting reduced motion)
- **Trust line** (small, muted, under the CTAs): `Free onboarding. Your data stays yours.`

If the new sub reads awkwardly under the current H1, adjust only the sub's first sentence, keep the facts the same, and tell Lucas what you changed.

---

## 6. New section: How it works (`#how-it-works`)

Placement: directly after "The problem" section, replacing the condensed 5-stage timeline from the site review. Delete that timeline; this section replaces it.

- **Eyebrow:** `How it works`
- **H2:** `One inspection, entered once.`
- **Lead:** `Everything after the inspection is built from it. Nobody retypes a thing.`

Five steps. Each has a small role label, a title, a body and a mockup.

| # | Role label | Title | Body | Mockup |
|---|---|---|---|---|
| 1 | Tech · phone | Inspect, even with no signal. | Last year's devices are already loaded. Pass or fail each one. A fail becomes a deficiency with a photo, a location and a note. Works in basements and parkades and syncs when you're back online. | Device list with pass/fail toggles and an "Offline, 14 changes saved" pill |
| 2 | Tech · phone | The report builds itself. | Sign on the device and the CAN/ULC-S536 report is ready. No retyping into Word at night. | Signature pad, then a PDF report preview card |
| 3 | Office · web | Quote it the same day. | Every deficiency turns into a quote line. Price it from your price book and send it before anyone else quotes the job. | Quote builder: deficiency rows, each with a photo thumbnail and price |
| 4 | Owner · any device | The owner approves by link. | No login and no app. The owner sees each deficiency with its photo and price, approves what they want and signs. | Phone frame: approve and decline toggles plus a signature |
| 5 | Office · web | Filed with the right city. | Strobe reads the site address, picks the right fire department and gets the filing ready in their format, with the deadline counting down. | The city selector result card from section 7, in "Calgary" state |

**Layout:**
- **Desktop (1024 px and up):** steps in a left column as a clickable list. The active step's mockup shows in a large right panel. Clicking a step swaps the mockup with a 200 ms crossfade. The first step is active on load. Don't auto-advance.
- **Mobile:** a vertical list, with each step's mockup directly under its text.
- Use real, readable UI in the mockups (built from components, not screenshots). Use made-up sample data only: "Elm Street Plaza", "88 Elm St SE", "Pull station, Level 2 east stair".
- The step list is a proper tablist (`role="tablist"`, arrow-key navigation) or plain buttons with `aria-pressed`. Pick one and test it by keyboard.
- Respect `prefers-reduced-motion`: no crossfade, swap instantly.

---

## 7. New section: the city selector (`#cities`)

Placement: directly after "How it works". It replaces the separate "Calgary and Edmonton" section on the home page. Those links now live inside the selector's result cards.

- **Eyebrow:** `Every city files differently`
- **H2:** `Strobe knows where your report goes.`
- **Lead:** `Calgary wants a 311 request. Edmonton wants LIV. Strathcona County has its own portal. Lethbridge wants an email. Strobe reads the site address and gets the right one ready.`

### The interaction
- A text input labelled **"Site address"**, placeholder `Try "Sherwood Park" or "Lethbridge"`.
- Under it, a row of chips: **Calgary · Edmonton · Strathcona County · Lethbridge · Somewhere else**.
- Typing matches city names in the text (case-insensitive) and selects the matching chip:
  - "calgary" → Calgary
  - "edmonton" → Edmonton
  - "sherwood park", "strathcona", "ardrossan" → Strathcona County
  - "lethbridge" → Lethbridge
  - Anything else after 3+ characters with no match → Somewhere else
- Clicking a chip selects it and fills the input with that city's sample address.
- **No external APIs, geocoding or tracking.** This is a demo, and the copy says so (see the footnote below).
- Default state: Calgary selected.
- Accessibility: the chips form a radio group. The result card is an `aria-live="polite"` region, so screen readers hear the change.

### The result card
It shows the same fields for every city. Animate the change with a short height and opacity transition (instant under reduced motion).

| Field | Calgary | Edmonton | Strathcona County | Lethbridge | Somewhere else |
|---|---|---|---|---|---|
| Sample address | 88 Elm St SE, Calgary | 10220 104 Ave NW, Edmonton | 401 Festival Lane, Sherwood Park | 910 4 Ave S, Lethbridge | Your site, anywhere in Canada |
| Goes to | Calgary Fire Department | Edmonton Fire Rescue Services | Strathcona County Emergency Services | Lethbridge Fire and Emergency Services | Your local fire department |
| How it's filed | 311 online request, one per address | LIV online platform | SCES Contractor Portal | Email to the Fire Prevention Bureau | Varies by city |
| What triggers it | A system still deficient at day 10 | Every third-party inspection report, required since Sept 8, 2026 | Every inspection report | A deficiency with no repair arranged within 10 business days | Check your fire department's rules |
| Deadline | 10 business days from the inspection. Impairments right away. | Submit after each inspection | Upload within 14 days of the inspection | Day 10 after the owner gets the report. Clean reports within 30 days. | n/a |
| Strobe gets ready | The full 311 packet, every field filled, reports attached. You review and click submit, then the SR number is saved to the site. | An upload-ready LIV package: the report PDF plus the deficiency list. | An upload-ready report for the portal, with a reminder before day 14. | The email to deficientreports@lethbridge.ca drafted with the report attached, ready on day 10. | A CAN/ULC-S536 report and a deficiency summary, ready to send. |
| Link | "Calgary details →" to `/calgary` | "Edmonton details →" to `/edmonton` | none | none | "Request my city →" to `#early-access?city=` with the typed text prefilled |

Under the card, in small muted text:

> Demo only: the app uses the full site address. Rules checked November 2026, so always confirm with your fire department. More cities are added as shops ask for them.

Store all of this in `content/jurisdictions.ts` as typed data (`id`, `name`, `matchTerms[]`, `sampleAddress`, `goesTo`, `method`, `trigger`, `deadline`, `strobePrepares`, `href?`, `sourceUrl`, `checkedOn`). The app will reuse the same shape later, so keep it clean.

Source URLs for `sourceUrl` (they don't need to show on the page, but keep them in the data):
- Calgary: https://www.calgary.ca/for-business/operations/fire-safety-systems.html
- Edmonton: https://www.edmonton.ca/programs_services/fire_rescue/fire-inspection-report-submission
- Strathcona County: https://www.strathcona.ca/business-and-development/business/fire-inspections/
- Lethbridge: https://www.lethbridge.ca/media/1hrlio4n/2026-letter-to-fire-alarm-testing-companies.pdf

### Copy guardrails for this section
- Never say Strobe "submits automatically" or "files for you". It picks the destination and gets the filing ready; a person submits. Use "gets ready" or "prepares".
- Don't name any competitor or any portal vendor other than the city's own system name (LIV, SCES Contractor Portal).
- Don't claim provinces or cities beyond these four.

### Early-access form change
Add an optional **"City or town"** field to step 1 of the form, prefilled from `?city=`. Save it on the lead.

---

## 7b. New band: switching is on us (`#switching`)

Placement: directly after the city selector. Use a compact two-card band on the lavender section background, not a full-height section.

- **Eyebrow:** `Switching`
- **H2:** `We set you up. You keep your data.`

**Card 1: Free onboarding session**
> Every plan starts with a free onboarding session. We move your sites, devices and past reports over from spreadsheets or your current software, set up your team and price book, and walk your techs through their first inspection. No setup fee, no paid migration.

**Card 2: Your data, always**
> Everything you put into Strobe belongs to you. Export all of it, any time: sites, devices, reports, photos, quotes and city filings, as CSV and PDF. No fee, no request, no waiting. If you ever leave, you leave with everything.

Under the cards, one line: `Questions about switching? Talk to Lucas.` (to `#early-access`; use "Book 20 minutes" only if `NEXT_PUBLIC_CAL_LINK` is set, as the site review says.)

### Repeat these two promises around the site
Use the same wording each time, so it reads as a policy, not a slogan:
- **Hero trust line:** `Free onboarding. Your data stays yours.` (section 5)
- **Pricing page:** in "Every plan includes" (section 9)
- **FAQ:** two entries (section 8)
- **Early-access success screen:** `Next step: we'll book your free onboarding session.`
- **Footer:** add a small link, `Your data`, to `/your-data`

### New page: `/your-data`
A short, plain page (under 300 words) saying:
- You own your data. Strobe stores and processes it to run the service, nothing else.
- How to export: Settings → Export. You get a ZIP of CSV files plus every report, quote and filing as a PDF, and photos in their original quality.
- Export works on every plan, including after you cancel. Your account stays read-only with export available for 90 days after cancelling, then the data is deleted.
- Where it's stored: Google Cloud in Toronto, Canada.
- Questions: the contact email from `content/site.ts`.

- **Title:** `Your data | Strobe`
- **Description:** `Your inspection data belongs to you. Export sites, devices, reports, photos and quotes any time as CSV and PDF, on every plan, even after you cancel.`

Link to it from the privacy page too.

---

## 8. Home page order after this change

1. Hero (section 5)
2. The problem
3. **How it works** (section 6)
4. **City selector** (section 7)
5. **Switching band** (section 7b)
6. The two buttons (Send quote / Report to City), as already reworked by the site review
7. What's in early access, merged with "Built for shops like yours"
8. Founder note
9. FAQ (with the updates below)
10. Form

### FAQ: add or replace these
- **Does Strobe work outside Alberta?** Yes. Inspections, S536 reports, quotes and owner approvals work anywhere in Canada. City filing is mapped for Calgary, Edmonton, Strathcona County and Lethbridge, and more get added as shops ask for them.
- **How does Strobe know which city to file with?** From the site address. When you set up a site, Strobe matches it to the fire department that covers it and uses that department's rules and format.
- **My city isn't on the list. Now what?** You still get a clean S536 report and a deficiency summary to send. Tell us your city in the form and we'll map its rules.
- **Do I have to talk to sales?** No. Pricing will be on the website, and you can start without a call.
- **How hard is it to switch?** Not hard, because we do the heavy lifting. Every plan starts with a free onboarding session: we move your sites, devices and past reports over from spreadsheets or your current software, and get your team set up.
- **Who owns the data?** You do. Export all of it any time, as CSV and PDF, on every plan, even after you cancel. See [Your data](/your-data).

---

## 9. Pricing page (`/pricing`): structure only, no numbers

Keep the page. Restructure it into three plans. **Don't put any prices in the code yet.** Lucas will add them later.

### Data
Create `content/pricing.ts`:

```ts
export type Plan = {
  id: "solo" | "crew" | "shop";
  name: string;
  techRange: string;
  priceCadPerTechMonthly: number | null;   // null until Lucas sets it
  priceCadPerTechAnnual: number | null;    // monthly equivalent when billed yearly
  blurb: string;
  extras: string[];
};
```

| id | name | techRange | blurb | extras |
|---|---|---|---|---|
| solo | Solo | 1 tech | For the tech who runs the whole show. Everything Strobe does, at a price that makes sense for one person. | Includes one free office login, for whoever does the books |
| crew | Crew | 2 to 5 techs | For small shops. Pay for techs, not for the office. | Unlimited office users |
| shop | Shop | 6+ techs | For growing shops with a full office. | Unlimited office users. Priority support. Onboarding for each office and crew. |

### Rendering rules
- When the price is `null`, show **"Pricing announced soon"** where the price would go, and swap the plan CTA to **"Get notified"** (to `#early-access` with `?plan=solo|crew|shop` prefilled into a hidden field on the lead).
- When a price exists, format it as `$49 CAD` with `Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })`, then append " CAD". Write it as "per tech, per month" for Crew and Shop, and "per month" for Solo. **Always CAD. Never show USD anywhere.**
- Add a monthly/yearly toggle, but hide it until both price fields exist on every plan.
- Above the plans: `[flag] All prices in Canadian dollars (CAD).`
- The Solo card is equal in size and design to the others. Don't shrink it, don't mute it, don't style it as a "starter" plan. Solo techs are first-class customers.

### Everything plan (one shared list under the cards)
**Every plan includes:**
- Offline inspections on iOS and Android
- CAN/ULC-S536 reports
- Deficiency photos, quotes and owner approval by link
- City filing for supported cities
- **A free onboarding session:** we migrate your data and get you set up
- **Your data, always:** export everything any time, as CSV and PDF
- Month-to-month. Cancel anytime.
- No sales call. No setup fee.

### Pricing FAQ
- **Why show prices at all?** Because you shouldn't have to sit through a demo to find out what software costs.
- **Do office users cost extra?** No. On Crew and Shop you pay per tech. Office users are free.
- **What if I hire my first tech?** Move from Solo to Crew in the app. No new contract.
- **Is there a contract?** No. Month-to-month, cancel anytime.
- **Is onboarding extra?** No. Every plan, Solo included, starts with a free onboarding session. We migrate your data and get you set up.
- **What happens to my data if I cancel?** It's yours. Export everything any time, including for 90 days after you cancel.

**Stop here** so Lucas can review.

---

## 10. Done when
- [ ] The 🇨🇦 emoji appears nowhere; the SVG flag appears exactly three times
- [ ] Home meta is Canada-wide; the Calgary and Edmonton pages keep their own titles and descriptions; no duplicate titles or descriptions across routes
- [ ] "How it works" shows all five steps with mockups, works by keyboard, and respects reduced motion
- [ ] The city selector matches the four cities from typed text, falls back to "Somewhere else", and announces changes to screen readers
- [ ] No copy says Strobe submits or files automatically
- [ ] The pricing page shows three equal plans in CAD wording with no numbers, and "Get notified" CTAs
- [ ] The early-access form saves `city` and `plan`
- [ ] The hero H1 is unchanged
- [ ] "Free onboarding session" and "Your data, always" use identical wording in the hero trust line, switching band, pricing, FAQ and the `/your-data` page
- [ ] `/your-data` is live, linked from the footer and the privacy page, with a unique title and description
- [ ] Lighthouse mobile is still 95+ everywhere, and there's no horizontal scroll at 360 px
