# strobehq.com review: fixes for Claude Code

> Lucas: drop this file in the repo root and tell Claude Code: "Read SITE_REVIEW.md and work through it in priority order. Stop after P0 so I can check it, then do P1 and P2." Everything below is written to Claude Code.

Reviewed live on Nov 3, 2026 at 375 px (mobile) and 1440 px (desktop), across `/`, `/calgary`, `/edmonton`, `/early-access`, `/privacy`, `/terms` and the 404 page. Keep the current purple accent and everything in `STROBE_SITE_BRIEF.md` (voice rules, no em dashes, facts in section 6) unless an item below says otherwise.

What's working, so don't break it: the hero headline and copy, the product mockups, the honest early-access and "coming soon" labelling, the sourced city pages, the non-affiliation footer line, the 404 page ("This page isn't on the panel." is great), no horizontal scroll at 375 px, and good titles and meta descriptions on every page.

## P0: fix before anyone else sees the site

### 1. A template placeholder is showing on the legal pages

`/privacy` and `/terms` both show the literal text `{{LEGAL_ENTITY_NAME}}` in their first sentence. On a page about trust, that looks broken.

- Move the value into `content/site.ts` as `legalEntityName` and use it in both pages.
- Set it to "Lucas Cummings, operating as Strobe" for now. (Lucas: confirm this, and change it once you incorporate.)
- Add a build-time check that fails if any rendered page contains `{{`.

### 2. "Book a 20-minute walkthrough" doesn't book anything

`NEXT_PUBLIC_CAL_LINK` isn't set, so every "Book a 20-minute walkthrough" button and "Book 20 minutes with Lucas →" link jumps to `#early-access`. A button that says "book" and drops you on a form is exactly the bait-and-switch feeling we're trying to avoid.

- When `NEXT_PUBLIC_CAL_LINK` is not set, change those labels to "Talk to Lucas", still linking to the form. Don't promise a booking you can't deliver.
- When it is set, open the Cal.com modal as the brief describes.
- (Lucas: create the Cal.com event "Strobe walkthrough (20 min)" and add `NEXT_PUBLIC_CAL_LINK` in Vercel, then redeploy.)

### 3. The Calgary page headline overpromises

The H1 says "Calgary fire safety system reporting, done in one click". The same page then says you review the form and click submit yourself, and that one-click form fill is "Coming soon". The page contradicts itself.

- Change the H1 to "Calgary deficiency reporting, ready before day 10".
- Search all copy for "one click" and keep it only where it describes building the packet ("One click builds the whole filing" is fine).

## P1: structure and length

### 5. The home page is too long and repeats itself

It's about 11,000 px on desktop and about 15,500 px on mobile (about 19 phone screens). The same things appear more than once:

- The owner quote card appears twice (in the hero and in "Two buttons").
- The City clock appears twice in a row (a light version in "Two buttons", then a dark version in the next section).
- Calgary and Edmonton come up three times: in step 7, in the clock band links, and in the "Calgary and Edmonton" section.
- "What's in early access" lists 11 features that mostly restate the 9 steps.

Rework the home page into this order, aiming for 8,000 px or less on desktop:

1. Hero (unchanged)
2. The problem (unchanged)
3. How it works, condensed (see item 6)
4. The two buttons. Keep the "Send quote" card, but use a small crop of the quote rather than repeating the full card. Move the dark City clock into the "Report to City" card and delete the separate clock band. Keep its headline, "The clock starts at the inspection, not when the owner says yes.", as the card's sub-headline.
5. Calgary and Edmonton (unchanged, and the only place on the home page that links to the city pages, apart from the nav)
6. What's in early access, merged with "Built for shops like yours": one compact grid with the features plus the 3 shop points, with "coming soon" items in their own short row.
7. Founder note
8. FAQ
9. Form

Remove "For owners" as a separate section and fold its best line into step 4 or 5 of the condensed timeline.

### 6. Condense "How it works" from 9 steps to 5

On mobile, the 9-step timeline alone is about 2,600 px. On desktop, the sticky heading leaves a tall, mostly empty left column. Use 5 stages and keep the detail for the city pages:

1. Inspect, even with no signal. Tech, phone. (Folds in "set up the site once".)
2. Report and quote on site. Tech, then manager. (Folds in finishing, reviewing and pricing.)
3. Owner approves by link. Owner, any device.
4. File with the City. Manager. Links to `/calgary` and `/edmonton`.
5. Repair, close out, keep the record. Tech, then owner.

On desktop (1024 px and up), show the 5 stages as a horizontal row of cards or a compact 2-column grid instead of a tall vertical timeline. Keep the vertical timeline on mobile.

### 7. Make the form shorter

On mobile the form has 11 fields, and the 7 "What do you inspect?" checkboxes are each a full-width row, so it's about 2,700 px of form. Split it into two steps:

- Step 1, the form people see: full name, work email, company, where you work (as compact chips), how many techs (as chips), the updates consent checkbox, and submit. Save the lead on submit, exactly as now.
- Step 2, on the success screen: "Help me prepare for our call (optional)", with how you do reports today, which software, what you inspect (as 2-column chips) and notes. Saving updates the same lead. Skipping is fine.
- Keep Turnstile, the honeypot and rate limiting on step 1. Step 2 updates by lead ID with a short-lived signed token, so it can't be used to edit other leads.
- Update the `/early-access` page to match.

### 8. Show a button in the mobile header

At 375 px, the header has only the logo and a menu icon, so there's no way to act without scrolling or opening the menu. Add a compact "Get access" button next to the menu icon on mobile, linking to `#early-access`, or to `/early-access` on the city pages if they have no form. Keep the header sticky.

## P2: polish

### 9. Mockup details that read as placeholders

- The hero deficiency card says "Clause 6.x". The "x" looks unfinished. Use "S536 ref.", or a real clause reference only if Lucas confirms the exact number.
- The Edmonton LIV mockup labels severity High / Medium / Low. We don't know that those are LIV's labels. Either use a generic "Severity" column with a dot, or have Lucas confirm the exact LIV wording. Don't imply we know LIV's field values.
- On the mobile City clock, "88 Placeholder Rd SE" gets cut off to "88 Pla…". Use shorter sample addresses (e.g. "88 Elm St SE"), and let the address wrap to a second line rather than cutting off.
- On mobile, the light City clock's "Sample data" label wraps onto two lines. Make it `whitespace-nowrap` and smaller.

### 10. The founder note needs a face

The avatar is "LC" initials. A real photo is the single biggest trust boost for a one-person, pre-launch company.

- Use `public/founder.jpg` when it exists. (Lucas: add a plain, friendly headshot.)
- Add a small LinkedIn link next to "Lucas, founder". (Lucas: give Claude Code the URL.)
- On mobile, drop the founder quote one size. At the moment it's a large bold block of 9+ lines.

### 11. Calgary page: the 8 City form fields appear twice

The hero packet mockup and the "Where every field comes from" table list the same 8 fields. Keep the table, which is the useful one for search and for skimming. In the hero mockup, show only the first 4 fields and add "+ 4 more fields" with the attached PDFs and SR number.

### 12. Speed up the entrance animation

The hero mockups fade in slowly. On load, the mockup is still mostly transparent a second or more in, and the mockup is likely the page's largest element, which hurts load-speed scores. Cap the hero animation at 300 ms with no delay, start it at 0.6 opacity rather than 0, and keep the `prefers-reduced-motion` path showing everything immediately.

### 13. "Your data stays in Canada"

This is a promise about the product, not the website: the privacy policy correctly says website form data may be processed in the US. Change the shop point to "Your customers' inspection data is stored in Canada." so the two don't seem to conflict. (Lucas: only keep this line if the app really will run in Google Cloud Toronto.)

### 14. Small copy fixes

- In step 8, "the owner signs the compliance statement by link, and / Strobe produces…" breaks awkwardly before "Strobe" on mobile. Check for a `whitespace-nowrap` or non-breaking span causing it and let it wrap naturally.
- The hero eyebrow wraps to two lines at 375 px. Shorten it on mobile only to "Fire and life safety software · Alberta", or leave it if the two lines look intentional.

## Done when

- [ ] No `{{` appears anywhere on the live site
- [ ] No button says "book" unless it opens a real booking
- [ ] The Calgary H1 no longer says "one click"
- [ ] A test lead lands in Neon from production
- [ ] The home page is 8,000 px or less at 1440 px and 11,000 px or less at 375 px, with no duplicated mockups
- [ ] The form's first step has 6 inputs or fewer
- [ ] Lighthouse mobile is still 95+ across the board, and there's still no horizontal scroll at 360 px
