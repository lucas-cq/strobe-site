# strobehq.com v2: copy rewrite and visual refresh

> **Lucas:** save this in the repo root as `SITE_V2.md` and tell Claude Code: *"Read SITE_V2.md and rebuild the pages to match it. Do it in the phases at the bottom, and stop after each one so I can look."*
> Everything below is written to Claude Code.

This replaces the page copy and section layout from `STROBE_SITE_BRIEF.md` and `SITE_REVIEW.md`. The brief's tech stack, form backend, legal pages, brand assets and accent colour all stay. Keep the current purple (`#4B3BE6`).

Three goals:
1. **Sound like a person.** The buyer runs a 3 to 15 tech fire alarm shop. They read this between jobs on a phone. Short sentences, plain words, no marketing voice.
2. **Show outcomes, not the playbook.** The site should make a contractor want it without handing a competitor our workflow. Describe what gets easier, not how Strobe works step by step.
3. **Make it feel alive.** Right now it's white on white on white. Add colour bands, depth and a little motion.

---

## 1. What to remove across the whole site

Delete these everywhere they appear, on the home page and the city pages:

- **The role and device pills** in How it works ("Tech", "Phone", "Tech, then manager", "Owner", "Any device", "Manager", "Tech, then owner", "Automatic"). Delete the component, not just the content.
- **The step-by-step lifecycle.** No more 9-step or 5-step timeline, and no numbered process lists on the city pages.
- **The "Two buttons" section**, along with the phrases "money button" and "compliance button".
- **The "Coming soon" roadmap**: the QuickBooks, "More report types" and "Calgary form auto-fill" cards and pills. Keep `content/features.ts` if you like, but render none of it.
- **The Calgary "Where every field comes from" table**, and the full 8-field packet in the mockup.
- **The Edmonton numbered "What Strobe does" steps.**
- **Implementation details** a competitor could copy. Grep for and remove: `20.2`, `price book`, `day 5`, `day 8`, `copy button`, `browser extension`, `one record`, `same thing twice`, `work order`, `guided submit`, `repair side`, `close-out package`, `tagged with`.
- **"Clause 6.x"** in the hero mockup. Replace it with "S536".
- The separate **"For owners"** and **"Built for shops like yours"** sections. Their best lines move into the new sections below.

Add these to the banned-words list in the brief: *done properly, in one record, money button, compliance button, seamless, effortless, peace of mind, hassle, say goodbye, whether you're, built for the way you work, not just, game-changer, the best part.* Still no em dashes anywhere.

---

## 2. Section colour and treatment

The home page should alternate in a clear rhythm. **No two sections in a row should share a background.**

| # | Section | Background | Treatment |
|---|---|---|---|
| 1 | Hero | White | Faint 32 px grid pattern that fades out toward the edges, a large soft indigo glow behind the mockups, and the logo mark huge at 5% opacity, off to one side |
| 2 | Proof strip | `indigo-50` band | A slow sideways scroll of short chips |
| 3 | Sound familiar? | `lavender` | White cards with a 2 px gradient line along the top edge |
| 4 | How it works | White | 4 cards with a thin gradient border, big gradient numerals, and a lift on hover |
| 5 | The City deadline | `night` (dark) | Full width, with the big logo mark at 8% opacity slowly pulsing like a strobe, the dark City clock mockup, and light text |
| 6 | Calgary and Edmonton | White | Two cards, each with a coloured gradient header strip |
| 7 | Early access | `lavender` | A bento grid with one large indigo gradient card and 4 small white cards |
| 8 | Founder | White | A big quotation mark in `indigo-100` behind the text, plus the photo |
| 9 | FAQ | `lavender` | The accordion |
| 10 | Form | Indigo gradient band | White form card on top, white heading text |
| 11 | Footer | `night` | Unchanged |

### New tokens (add to `@theme`)
```css
--color-lavender: #F5F3FF;      /* tinted section background */
--color-indigo-50: #EEEDFD;     /* proof strip, pills */
--color-indigo-100: #DEDBFB;    /* decorative quote marks, hover fills */
--gradient-brand: linear-gradient(135deg, #2B1A8C 0%, #4B3BE6 45%, #2E8BFF 100%);
--gradient-hairline: linear-gradient(135deg, rgb(75 59 230 / .45), rgb(46 139 255 / .15));
```

### Effects to build (keep them in `app/globals.css` or small components)
- **Grid pattern:** two repeating 1 px line gradients in `ink` at 4% opacity, 32 px apart, faded out at the edges with a radial mask. Use it in the hero and the form band only.
- **Gradient border cards:** set two backgrounds, `linear-gradient(#fff,#fff) padding-box` and `var(--gradient-hairline) border-box`, with `border: 1px solid transparent` and a 16 px radius. Use these in How it works and on the city cards.
- **Hover lift:** `translateY(-3px)` with a shadow of `0 16px 40px -16px rgb(75 59 230 / .35)`, over 200 ms. Apply it to cards only, not to text blocks.
- **Gradient numerals:** "01" to "04" in Inter Display at 48 px, filled with `--gradient-brand` as clipped text. They're decorative, so give them `aria-hidden`.
- **Strobe pulse:** in the dark band, the logo mark at about 640 px fades its opacity from .06 to .12 and back every 5 s, ease-in-out. Animate the whole image only. Never redraw or recolour the beams.
- **Live dot:** in the hero eyebrow only, a 6 px indigo dot that blinks from 1 to .35 opacity every 1.6 s. Nowhere else.
- **Proof strip scroll:** the chips scroll sideways at about 40 s per loop, as a duplicated list with `translateX`, and pause on hover. With reduced motion, show them as a static wrapped row.
- **Reveal on scroll:** sections fade up 12 px over 400 ms, with cards staggered 60 ms apart. Content must be fully visible if JavaScript doesn't run: only hide it once a `js-ready` class is on `<html>`.
- **Buttons:** the primary button gets an inner top highlight (`inset 0 1px 0 rgb(255 255 255 / .2)`), and on hover its background moves to the gradient. Arrows in text links slide 3 px right on hover.
- **Reduced motion:** turn off the pulse, blink, scrolling strip and reveals entirely under `prefers-reduced-motion`.
- **Contrast:** all text on `lavender`, `indigo-50` and the gradient band must still pass WCAG AA. Check it.

---

## 3. Home page copy

Put all of this in `content/home.ts`. Use it word for word unless something won't fit the layout.

### Hero
- Eyebrow (with the live dot): **Inspection software for Alberta fire alarm contractors**
- H1: **Inspect it. Quote it. File it. Same day.**
- Sub: **Your techs finish the S536 report on their phone. The owner gets the repair quote before you're out of the parking lot. And the City paperwork is ready before the deadline, in Calgary or Edmonton.**
- Buttons: **Get early access** (primary) · **Talk to Lucas** (secondary). If `NEXT_PUBLIC_CAL_LINK` is set, the second one says **Book a 20-minute call** and opens Cal.com.
- Small print: **Open to Alberta shops now. One flat price per shop, not per tech.**
- Visual: the phone and quote mockups as they are now, minus "Clause 6.x".

### Proof strip (the sideways-scrolling chips)
`CAN/ULC-S536 reports` · `Works with no signal` · `Calgary 311 reporting` · `Edmonton LIV uploads` · `Any panel brand` · `Owners sign from their phone` · `Data stored in Canada`

### Sound familiar?
- Eyebrow: **Sound familiar?**
- H2: **The inspection takes a day. The paperwork takes all week.**
- Card 1, **Typing it twice:** "Notes from site get typed into a report back at the office. Then someone types them again for the quote."
- Card 2, **Quotes that show up late:** "The owner gets your quote three days later. By then they've already called someone else."
- Card 3, **A deadline on a sticky note:** "Calgary wants deficient systems reported within 10 business days, and Edmonton wants reports in LIV. Right now that's tracked in someone's head."

### How it works (4 cards, no pills, no timeline line)
- Eyebrow: **How it works**
- H2: **Less office work after every inspection**
- Sub: **Your techs already do the hard part on site. Strobe takes care of what comes after.**
- **01 · Works in the parkade:** "Last year's devices are already loaded. Pass, fail, snap a photo, move on. No signal needed. It syncs when you're back upstairs."
- **02 · Report done on site:** "The S536 report is finished and signed before the tech leaves. Nobody types it up later."
- **03 · Quote out the same day:** "Failed devices turn into a quote the owner can approve and sign on their phone. No login, no chasing PDFs over email."
- **04 · City filing, handled:** "Strobe keeps an eye on the deadline for every deficient system and has your filing ready when it's time." Then two small links: **Calgary →** and **Edmonton →**.

Desktop: 4 across. Tablet: 2 by 2. Mobile: stacked.

### The City deadline (dark band)
- Eyebrow: **The City deadline**
- H2: **The clock starts at the inspection. Not when the owner says yes.**
- Body: **A signed quote doesn't pause Calgary's 10 business days. Only a fixed system does. Strobe keeps count for every site, warns you well before it's a problem, and keeps a timestamped record that you reported on time.**
- Links: **How Calgary reporting works →** · **How Edmonton LIV works →**
- Visual: the dark City clock mockup, using short sample addresses ("88 Elm St SE", "1200 Sample Ave SW", "455 Oak St NE") that never get cut off.

### Calgary and Edmonton
- Eyebrow: **Calgary and Edmonton**
- H2: **Set up for how each city actually does it**
- **Calgary card** (header strip from indigo to blue), labelled *311 deficiency reporting*: "Deficient systems get reported within 10 business days, one request per address. Strobe has the request ready, so filing takes minutes instead of an afternoon." Link: **Calgary reporting →**
- **Edmonton card** (header strip from blue to sky), labelled *LIV report uploads*: "Since September 8, 2026, third-party inspection reports go through LIV. Strobe has your report and deficiency list ready to upload." Link: **Edmonton LIV →**
- Line below both: **Somewhere else in Alberta? Tell us your fire department and we'll look at how they handle it.**

### Early access (the bento grid that replaces the old icons-over-checkmarks layout)
- Eyebrow: **Early access**
- H2: **Starting with fire alarm**
- Sub: **Sprinkler and kitchen suppression are next. Early shops decide which comes first.**

Layout on desktop:
```
┌──────────────────────────┬─────────────┬─────────────┐
│                          │ One price   │ Any panel   │
│   BIG CARD               │ per shop    │             │
│   (indigo gradient,      ├─────────────┼─────────────┤
│    white text, logo      │ Stored in   │ We'll move  │
│    mark at 10% in the    │ Canada      │ you over    │
│    corner)               │             │             │
└──────────────────────────┴─────────────┴─────────────┘
```
On mobile: the big card first, then the 4 small cards in a 2 by 2 grid.

- **Big card:** H3 **Help shape what we build.** Body: **Early-access shops get founding pricing, a direct line to me, and a real say in what gets built next.** Button (white): **Get early access**
- **One price per shop:** "Hire another tech without your software bill going up."
- **Any panel:** "Notifier, Mircom, Edwards, Simplex. If you inspect it, you can report on it in Strobe."
- **Stored in Canada:** "Your customers' inspection data stays in Canada."
- **We'll move you over:** "Send us your spreadsheets. We'll bring your sites and device lists in for you." *(Lucas: confirm you'll do this by hand. If not, swap it for "Up and running in a day: no hardware, no install. Your techs use their own phones.")*

The small cards have no icons, no checkmarks and no pills: a bold title, one line of text, white, with a 16 px radius and the hover lift.

### Founder
- Eyebrow: **From the founder**
- Quote: **"I'm Lucas, a software engineer in Calgary. I'm building Strobe with local fire alarm techs. Most shops I talk to still run inspections through Word templates and spreadsheets. If that's you, give me 20 minutes. I'll show you what we've built, and you tell me what's missing."**
- Signature: photo from `public/founder.jpg` (initials if it's missing), **Lucas Cummings**, *Founder, Strobe*, and a LinkedIn link if Lucas provides one.
- Link: **Talk to Lucas →** (or **Book 20 minutes →** when the Cal.com link is set)

### FAQ
- Eyebrow: **FAQ**
- H2: **Questions we get a lot**
- *Does Strobe file with the City for me?* "Strobe gets the filing ready. You look it over and send it. Nothing goes to the City without you."
- *Does it work with no signal?* "Yes. Inspections work fully offline and sync when you're back in range."
- *Do building owners need an account?* "No. They open the report and quote from a link on their phone."
- *What does it cost?* "One flat monthly price per shop, however many techs you have. Early-access shops lock in founding pricing. We'll go over it on a call."
- *Can we bring our existing sites over?* "Yes. We'll help move your sites and device lists over from your spreadsheets."
- *Which systems does it cover?* "Fire alarm first. Tell us what else you inspect on the form and it helps us decide what's next."
- *Where is our data stored?* "Your customers' inspection data is stored in Canada."
- *Is Strobe connected to the City or the fire department?* "No. Strobe is independent software. It isn't affiliated with the City of Calgary, the City of Edmonton or their fire departments."
- *We're not in Calgary or Edmonton. Can we use it?* "Yes. Reports and quotes work anywhere in Alberta. Tell us your fire department and we'll look at how they handle filings."

### Form band (indigo gradient)
- H2 (white): **Get early access**
- Sub (white at 85% opacity): **Tell us a bit about your shop. I'll get back to you within one business day.**
- Under the button: **We only use this to talk to you about Strobe. Privacy policy.**
- Keep the two-step form from `SITE_REVIEW.md` item 7 if it's built. If not, build it now.

---

## 4. Calgary page (`content/calgary.ts`)

Section backgrounds: hero white with the grid pattern → the rule in lavender → with Strobe in white → sources in lavender → form in the indigo band.

- **Hero.** Eyebrow: **Calgary**. H1: **Calgary deficiency reporting, ready before day 10**. Sub: **Calgary Fire Department expects deficient fire safety systems to be reported within 10 business days of the inspection. Strobe keeps count for every site and has the 311 request ready when it's time.** Buttons as on the home page.
- **Hero mockup (simplified):** a card titled "Calgary 311 request" with a green "Ready to file" pill. Show 2 real-looking rows (Service location, System type) and then 3 grey skeleton bars, plus "Reports attached" and "Sample data". **Don't show all 8 fields** and don't show copy buttons.
- **The rule, plainly** (lavender). Eyebrow: **What CFD expects**. H2: **The rule, in plain English**
  - "The 10 business days start at the inspection. Waiting on a quote doesn't pause them."
  - "Impairments that affect how a system works or what it covers get reported right away. They may need emergency repairs or a fire watch."
  - "It's one 311 request per address, with up to 7 systems in it, one of each type."
  - "You get a service request (SR) number when you submit. CFD reviews requests with non-compliant systems within 30 calendar days."
  - "There's no second filing after repairs. A Fire Safety Codes Officer follows up with the owner, who shows the inspection report and a letter from the repair company."
  - Chip row: **The 7 system types on the City form:** Fire Alarm · Sprinkler System · Special Suppression System · Fire Hydrant · Kitchen Canopy Cleaning · Kitchen Suppression System · Emergency Generator
- **With Strobe** (white, 3 gradient-border cards, no numbers). H2: **What reporting looks like with Strobe**
  - **Every site at a glance:** "See which systems are still deficient and how many business days are left."
  - **Filing in minutes:** "The request is ready with the reports attached. You check it and submit."
  - **Ready when the officer calls:** "The owner already has what the officer is going to ask for."
- **Sources** (lavender, unchanged): the CFD bulletin and the City page, plus "Rules change. Always check with Calgary Fire Department."
- Form band.

## 5. Edmonton page (`content/edmonton.ts`)

Same section rhythm as Calgary.

- **Hero.** Eyebrow: **Edmonton**. H1: **Edmonton LIV uploads without the retyping**. Sub: **Since September 8, 2026, the City of Edmonton requires third-party fire system inspection, testing and maintenance reports to go through LIV, the Life Safety Inspection Vault. It's required for non-compliant reports and recommended for all of them.**
- **Hero mockup (simplified):** a card titled "LIV upload" with a "Ready to upload" pill. Show "Report PDF ✓" and "Deficiency list ✓", then 2 skeleton rows, plus "Sample data". **Remove the High/Medium/Low severity labels and the 4-row status table.**
- **What LIV asks of contractors** (lavender). H2: **Your part of the LIV process**
  - "Register a company account. Your inspectors and techs submit through it."
  - "Upload reports and link them to the premises and system type."
  - "Log deficiencies and track each one until it's resolved."
  - "Submit proof of correction after the repair."
  - "Building owners can request access to see reports and upload proof of correction too."
  - Chip row: **Systems covered by LIV:** Fire alarm · Fire pumps · Range hood cleaning · Emergency lights · Standpipes · Fire sprinklers · Fixed fire suppression
- **With Strobe** (white, 3 cards). H2: **What LIV looks like with Strobe**
  - **Ready to upload:** "Your report and deficiency list come out the way LIV asks for them."
  - **See what's still open:** "Know which reports are in and which deficiencies still need proof of correction."
  - **Proof of correction, sorted:** "After the repair, everything you or the owner needs to upload is in one place."
  - The honesty line below the cards stays as is: **"Strobe isn't connected to LIV and doesn't upload for you. It gets everything ready so the upload is quick."**
- **Sources** (lavender, unchanged), plus "Questions about LIV: fireprevention@edmonton.ca" and "Rules change. Always check with the City of Edmonton."
- Form band.

## 6. Small pages
- `/early-access`: use the indigo gradient band as the whole page background behind the form card, with the grid pattern at low opacity.
- 404: keep the copy. Add the faint grid pattern and the large logo mark at 5% opacity.
- `/privacy` and `/terms`: no visual changes, apart from confirming the `{{LEGAL_ENTITY_NAME}}` fix from `SITE_REVIEW.md` shipped.

---

## 7. Build phases (stop after each)
1. **Tokens and effects:** add the new colours, grid pattern, gradient border cards, hover lift, reveal on scroll, live dot, strobe pulse, scrolling strip and button polish, all with the reduced-motion fallbacks.
2. **Home page:** the new sections and copy, with every removal from section 1 done.
3. **City pages:** the new copy and simplified mockups.
4. **Check it:**
   - Grep the built output for every phrase in the section 1 removal list and the banned words, and expect zero hits.
   - Expect no em dashes in rendered text.
   - The home page should be 7,500 px or less at 1440 px and 10,000 px or less at 375 px.
   - Lighthouse mobile should still be 95+.
   - No horizontal scroll at 360 px.
   - Check AA contrast on every tinted section.
