# strobehq.com: SEO build (technical fixes + new content)

> **Lucas:** put this file and `report-rules.csv` in the site repo root. Then tell Claude Code: *"Read STROBE_SITE_SEO_BUILD.md and build it in order. One PR per part. Stop after each PR."*
>
> Before it starts:
> 1. If `STROBE_SITE_FIELD_UPDATE.md` isn't merged yet, merge it first.
> 2. Fill in the **Lucas inputs** (section 0).
>
> Everything below is written to Claude Code.

## Ground rules for all content
- Keep the existing voice: plain words, short sentences, **no em dashes**, and nothing from the banned-words list in `STROBE_SITE_BRIEF.md`.
- **Every fact has a source link and a "Checked" date.** Don't add facts that aren't in this file. If something seems missing, leave it out and list it in the PR.
- **Never paste or paraphrase text from the CAN/ULC-S536 standard.** It's fine to name the standard. Don't reproduce its form or wording.
- **Bylines.** Every city page and guide shows "Written by Lucas Cummings" and a "Last reviewed" date. A reviewer line appears only if `reviewer` is set in the page data.
- **Drafts.** Pages marked **DRAFT** below get `published: false`. They render in preview builds only: no production route, not in the sitemap, not linked anywhere. Lucas flips them after a working tech reviews them.
- Use semantic HTML: one H1 per page, then H2/H3 in order.

## 0. Lucas inputs (fill these in `content/site.ts` before building)
- `founder.photo`: put a headshot at `public/founder.jpg`. If it's missing, keep the current initials avatar.
- `founder.linkedin`: your LinkedIn profile URL, or leave it empty to hide the link.
- `org.sameAs`: a list of profile URLs (LinkedIn company page, etc.). It can be empty.
- `reviewer` (optional, used for guides only): name and role of the tech who reviewed a guide, and only with their written OK. Example: `{ name: "…", role: "Fire alarm technician" }`.

---

## Part 1: technical fixes (PR 1)

1. **`/early-access`:** add `<meta name="robots" content="noindex, follow">` and remove the page from `sitemap.xml`. Keep the page.
2. **Titles:**
   - `/pricing` → `Fire alarm inspection software pricing (CAD) | Strobe`
   - `/your-data` → `Your data: ownership and export | Strobe`
3. **Organization schema** in the root layout, linked to the existing `SoftwareApplication` with `publisher: { "@id": "https://strobehq.com/#org" }`:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "@id": "https://strobehq.com/#org",
     "name": "Strobe",
     "url": "https://strobehq.com/",
     "logo": "https://strobehq.com/brand/png/icon-512.png",
     "email": "hello@strobehq.com",
     "foundingLocation": { "@type": "Place", "name": "Calgary, Alberta, Canada" },
     "areaServed": { "@type": "Country", "name": "Canada" },
     "founder": { "@type": "Person", "name": "Lucas Cummings" },
     "sameAs": []
   }
   ```
   Fill `sameAs` from `org.sameAs`. Omit the key when it's empty.
4. **BreadcrumbList schema** on every city page, guide and tool page. For example: Home › Calgary, Home › Guides › [title], Home › Tools › [title].
5. **`og:url`** must match the canonical URL exactly on every page.
6. **Sitemap `lastmod`:** every content page gets a `lastReviewed` date in its data. The sitemap uses it as `lastmod`, never the build time.
7. **IndexNow:**
   - Generate a key and serve it at `/<key>.txt`.
   - Add a post-deploy step, Vercel deploy hook or GitHub Action on `main`, that POSTs the changed URLs to `https://api.indexnow.org/indexnow`.
   - Store the key in an env var. Lucas will add it in Vercel.
8. **Lighthouse mobile** on `/`, `/calgary`, `/edmonton` and `/pricing`. Targets: LCP under 2.5 s, CLS under 0.1, SEO 100, accessibility 100. Fix anything under target and paste the scores in the PR.
9. **Internal links:**
   - Add a "Cities" item to the nav (desktop dropdown, mobile list) with Calgary, Edmonton, Strathcona County and Lethbridge.
   - Footer gains: About, Guides, Tools.
   - Every city page ends with an "Other cities" row linking the others, plus links to the 51-city guide and to `/pricing`.
   - In the home city selector, the result card's link goes to each city's page. Strathcona County and Lethbridge get links now too.

---

## Part 2: About + city pages (PR 2)

Shared city page layout (already used by Calgary and Edmonton), in this order:
1. Hero: H1, intro and CTAs
2. The rule in plain English
3. Step by step
4. Easy ways to get it wrong (where given)
5. Questions
6. With Strobe
7. Sources, checked date and "Rules change" line
8. Other cities
9. Form

The byline goes under the H1.

### 2.1 `/about` (new)
- **Title:** `About Strobe | Fire alarm inspection software from Calgary`
- **Description:** `Strobe is fire alarm inspection software built in Calgary with working fire alarm techs. Who we are, why we built it, and how to reach us.`
- **H1:** `Built in Calgary, with the techs who use it`

> Strobe is fire alarm inspection software for Canadian shops. It's built in Calgary by Lucas Cummings, a software engineer, with help from fire alarm technicians who run real inspections every week.

**H2: Why it exists**
> Most shops I talk to run inspections out of Excel or Word. One tech walks the floor testing devices, another sits at the panel marking each one, and afterwards someone turns the file into a PDF, finds the right email, and keeps track of which deficiencies still need a quote. The inspection is the easy part. The paperwork around it isn't.
>
> The software the big companies use is priced and sold for big companies. Smaller shops get a demo call and a quote. Strobe is for the shop with one crew or five: phone first, works with no signal, and the price is on the website.

**H2: How we work**
- **Built with working techs.** Features get tried on real inspections before they ship.
- **Rules we publish are checked.** Every city rule on this site links to the city's own documents and shows the date we checked it.
- **Your data is yours.** Export everything, any time. [Your data](/your-data)
- **Independent.** Strobe isn't affiliated with any city, county or fire department.

**H2: Get in touch**
> Email hello@strobehq.com. I read every message.

Founder card: photo (or initials), "Lucas Cummings, Founder", and the LinkedIn link if set.

Add `/about` to the footer and sitemap. Also add a `Person` schema for Lucas on this page, with `worksFor` set to `#org`.

### 2.2 `/calgary` (expand; keep the current title, description, H1 and hero mockup)
**Keep:** the intro, the 7 system types list, "What reporting looks like with Strobe", and Sources. **Replace** the current "The rule, in plain English" list with the version below, and **add** the new sections.

**H2: The rule, in plain English**
- Calgary Fire Department expects deficient fire safety systems to be reported within **10 business days of the inspection**. Waiting on a quote doesn't pause the clock.
- **Impairments**, meaning problems that affect how a system works or what it covers, get reported **right away**. They may need emergency repairs or a fire watch.
- If an owner **won't or can't fix** a deficiency, the Alberta Fire Code says the person doing the maintenance notifies the fire department and the owner **in writing, right away**.
- Reports go in **through the City's 311 direct access reporting page**. Service companies get the link by emailing **FireLegal@calgary.ca**. Questions go to **FPBSupport1@calgary.ca**.
- **Full reports only.** CFD's bulletin says partial reports won't be accepted.
- **One 311 request per address**, with up to 7 systems, one of each type.
- You get a **service request (SR) number** when you submit. CFD reviews requests with non-compliant systems within 30 calendar days.
- **There's no second filing after repairs.** A Fire Safety Codes Officer follows up with the owner, who shows the inspection report and supporting documents from the company that made the repairs.
- Owners keep inspection records for **2 years**.

**H2: Step by step**
1. **Inspection day.** Finish the full report. Report any impairment right away.
2. **Send the report and the quote** to the building contact the same day if you can.
3. **Business days 1 to 10.** The owner approves, and repairs get done, or don't. Count business days, not calendar days. ([Use the deadline calculator](/tools/calgary-10-day-deadline))
4. **Day 10, still deficient.** Submit the 311 request with the full report attached. Save the SR number.
5. **Owner refuses at any point.** Notify CFD and the owner in writing right away. Don't wait for day 10.
6. **After repairs.** Give the owner a letter confirming what was repaired. That's what the officer will ask them for.

**H2: Easy ways to get it wrong**
- Counting **calendar days** instead of business days.
- **Waiting for the quote** to be approved before the clock starts. It started at the inspection.
- Sending a **partial report**. CFD won't accept it.
- Filing **one request per system** instead of one per address.
- Not saving the **SR number** with the site's records.

**H2: Questions**
- **Does a signed quote pause the 10 days?** No. Only a repaired system ends it.
- **What if everything's fixed before day 10?** The bulletin says to report deficient systems within 10 business days. It doesn't say plainly whether a system fully repaired inside that window still needs a 311 request. If you're unsure, ask CFD at FPBSupport1@calgary.ca.
- **Does this cover sprinklers too?** The 311 form lists 7 system types, including sprinklers. Check the bulletin for the systems it applies to.

**Sources** (add to the existing ones):
- Calgary Fire Marshal letter on enforcement of reporting, which quotes Alberta Fire Code Division C, 2.2.7.2.(4) (notification when the owner won't or can't fix): https://www.calgary.ca/content/dam/www/csps/fire/documents/fa-current-fire-marshal-letter-enforcement-of-reporting-nfc.pdf
- `lastReviewed: 2026-11-09`

### 2.3 `/edmonton` (expand; keep the current title, description, H1, hero mockup and "With Strobe" section)

**H2: What the City requires**
- Since **September 8, 2026**, third-party fire system inspection, testing and maintenance reports go through **LIV, the Life Safety Inspection Vault**.
- **The City's page says two things.** One section says non-compliant reports are required and recommends uploading all of them. The FAQ says both compliant and non-compliant reports. **Until the City clears that up, upload every report.**
- **Systems covered:** fire alarm, fire pumps, range hood cleaning, emergency lights, standpipes, fire sprinklers and fixed fire suppression. The FAQ also mentions kitchen suppression and generators.

**H2: Your part of the LIV process** (keep the current 4 bullets, then add:)
- Building owners can request access too. They can see reports and upload proof of correction.

**H2: Step by step**
1. **Register your company in LIV** and add your inspectors and techs.
2. **After each inspection,** upload the report as a PDF or a digital report, linked to the premises and system type.
3. **Log each deficiency** and keep it open until it's fixed.
4. **After the repair,** upload proof of correction. LIV lets a fire department require a note or an image at this step, so keep both handy.

**H2: Questions**
- **Does LIV cost contractors anything?** The City's page doesn't mention fees. LIV charges contractors per report in some other cities, so ask the City before you assume it's free: fireprevention@edmonton.ca.
- **Do I need photos?** The City's page doesn't ask for them. If the City turns on LIV's note-or-image setting for closing deficiencies, you'll need one there.
- **Does Strobe upload to LIV for me?** No. Strobe isn't connected to LIV. It gets the report and deficiency list ready so the upload is quick.

`lastReviewed: 2026-11-09`

### 2.4 `/strathcona-county` (new)
- **Title:** `Strathcona County fire inspection report submission | Strobe`
- **Description:** `Strathcona County wants every fire inspection report in its contractor portal within 14 days. Here's how it works for fire alarm contractors.`
- **H1:** `Strathcona County reports, uploaded on time`
- **Intro:** `Strathcona County Emergency Services wants every fire protection inspection report uploaded to its contractor portal. Not just the deficient ones. Here's what that means for your shop.`
- **Hero mockup:** reuse the LIV upload card style, labelled "SCES Contractor Portal · Ready to upload", with "Report PDF" and "Deficiency list" ticked. Sample data.

**H2: The rule, in plain English**
- **Every report goes in**, clean or deficient, through the **SCES Contractor Portal**. This has been required since January 1, 2021.
- **Upload within 14 days** of the inspection.
- **The occupant gets the report within 7 days.**
- **Each technician is registered** on the portal with their credentials.
- **If repair approval doesn't come within 14 days** of finding a deficiency, notify the County through the portal.
- **Critical deficiencies** get reported right away.
- **Reports need** the standard and its year, the technician's name, signature and certification number, and the deficiencies.
- The County **doesn't act on recommendations or comments**, only on deficiencies.

**H2: Step by step**
1. **Inspection day.** Finish the report. Report anything critical right away.
2. **Within 7 days,** the occupant has the report.
3. **Within 14 days,** the report is uploaded to the portal.
4. **Day 14, no repair approval?** Notify the County through the portal.

**H2: With Strobe**
- **Ready to upload:** the report and deficiency list come out ready for the portal.
- **Both deadlines tracked:** 7 days for the occupant and 14 for the portal, for every site.
- **Tech details filled in:** names and certification numbers are saved once and added to every report.

Strobe isn't connected to the portal and doesn't upload for you.

**Sources:**
- Strathcona County: Fire inspections, https://www.strathcona.ca/business-and-development/business/fire-inspections/
- SCES Contractor Portal introduction letter, https://www.strathcona.ca/files/files/sces-contractor_portal_introduction_letter1.pdf
- `lastReviewed: 2026-11-09`. "Rules change. Always check with Strathcona County Emergency Services."

### 2.5 `/lethbridge` (new)
- **Title:** `Lethbridge fire alarm report submission rules | Strobe`
- **Description:** `Lethbridge wants every fire alarm report, clean or deficient, plus a contractor registry. The deadlines and where to send them, explained.`
- **H1:** `Lethbridge reports, clean or deficient`
- **Intro:** `Lethbridge Fire and Emergency Services wants a copy of every fire alarm inspection report, and every testing company has to be on its registry. Here's how the deadlines work.`
- **Hero mockup:** an email card, "To: Fire Prevention Bureau · Report attached · Ready to send". Sample data.

**H2: The rule, in plain English**
- **Every testing company must be on the City's contractor registry.** Contact fireprevention@lethbridge.ca.
- **The customer gets the report within 15 business days** of the inspection.
- **Clean reports,** with no deficiencies, go to the Fire Prevention Bureau **within 30 days**.
- **Deficient reports:** if the owner hasn't fixed it or arranged a repair **within 10 business days of getting the report**, send the report to **deficientreports@lethbridge.ca**.
- Fire alarm work follows CAN/ULC-S536-19. Water-based systems have their own letter and rules (NFPA 25).

**H2: Step by step**
1. **Get on the registry** before you test in Lethbridge.
2. **Inspection day.** Finish the report.
3. **Within 15 business days,** the customer has it.
4. **Clean report?** Send it to the Fire Prevention Bureau within 30 days.
5. **Deficient, and no repair arranged 10 business days after the owner got the report?** Email it to deficientreports@lethbridge.ca.

**H2: With Strobe**
- **The right email, ready:** clean or deficient, Strobe drafts it with the report attached.
- **Every clock tracked:** 15 business days, 10 business days and 30 days, per site.

Strobe doesn't send anything to the City for you. You review and send.

**Sources:**
- 2026 letter to fire alarm testing companies, https://www.lethbridge.ca/media/1hrlio4n/2026-letter-to-fire-alarm-testing-companies.pdf
- 2026 letter to water-based testing companies, https://www.lethbridge.ca/media/htcl1apj/2026-letter-to-water-based-fire-protection-testing-companies.pdf
- `lastReviewed: 2026-11-09`. "Rules change. Always check with Lethbridge Fire and Emergency Services."

**Also:** add both new cities to the nav "Cities" menu, the sitemap, and the "Other cities" rows. Add `WebPage` schema with `areaServed` set to the city, as on the Calgary page.

---

## Part 3: The 51-city guide (PR 3)

### `/guides/fire-alarm-report-rules-canada`
- **Title:** `Fire alarm report rules in 51 Canadian cities (2026) | Strobe`
- **Description:** `Who gets your fire alarm inspection report? We checked 51 Canadian cities: who must submit, how, deadlines and photo rules, with sources.`
- **H1:** `Who gets your fire alarm report? Rules in 51 Canadian cities`
- **Byline:** "Written by Lucas Cummings · Research checked November 6, 2026"

**Intro:**
> When a fire alarm inspection is done, the report goes to the building. But in some cities the fire department wants it too, and every city wants it differently. We checked the public rules in 51 cities across Canada so you don't have to. Every row links to the city's own document.

**H2: What we found**
- **3 of the 51 want reports from contractors as a routine:** Edmonton (LIV), Strathcona County (its contractor portal) and Lethbridge (email).
- **More hear from you only when something isn't fixed.** Calgary wants deficient systems reported within 10 business days. Medicine Hat, Grande Prairie and Wood Buffalo want notice when a repair isn't approved or the owner won't fix it.
- **Everywhere else we found rules for, owners keep the records** on site, usually for 2 years, and the fire department reviews them when it inspects.
- **Halifax has a 1996 bylaw** asking owners to file test records within 30 days. We couldn't confirm it's still enforced.
- **Saskatoon, Regina and Winnipeg license technicians** and want their numbers on tags or documents.
- **No city we checked requires photos.**
- **For 29 of the 51 we found no public rule at all.** That doesn't mean there isn't one. Ask your fire department.

**H2: The table**
- Render `report-rules.csv` (51 rows) as a table: Province, City, "Contractor submits routinely?", "When the fire department hears about it", Method, Deadline, Photos, Source (link), Notes.
- Group by province, with a province filter and a text search. On mobile, show each row as a card.
- Rows reading "No public info found" show a muted style and the line "No public rule found. Ask your fire department."
- Add a **Download CSV** button serving the same file at `/guides/fire-alarm-report-rules-canada.csv`.

**H2: Which edition of S536?**
> Alberta, Saskatchewan and Manitoba are on CAN/ULC-S536-2019 through their fire codes. Sources disagree on Ontario, which may be on 2019 or 2024, so check with the Office of the Fire Marshal. We didn't verify the other provinces.

**H2: How we did this**
> We searched each city's fire department pages, bylaws, bulletins and letters to contractors, in November 2026. We only list what we found in the city's own documents. If you know of a rule we missed, email hello@strobehq.com and we'll check it and update the table.

**Schema:** `Article` with `author` (Lucas), `datePublished`, `dateModified`, and a `Dataset` describing the CSV with `license` "CC BY 4.0", `creator` `#org` and `temporalCoverage` 2026.

**Linking:** link to this guide from every city page, the home FAQ answer about the fire department, and the footer under Guides.

---

## Part 4: Tools (PR 4)

### 4.1 `/tools/calgary-10-day-deadline`
- **Title:** `Calgary 10 business day deadline calculator | Strobe`
- **Description:** `Enter an inspection date and get Calgary's 10 business day reporting deadline, skipping weekends and Alberta holidays. Free, no signup.`
- **H1:** `Calgary 10 business day deadline calculator`
- **Intro:** `Calgary Fire Department expects deficient systems reported within 10 business days of the inspection. Enter the inspection date to see your deadline.`

**Behaviour** (client-side only, no tracking):
- **Input:** the inspection date (default today).
- **Count:** business day 1 is the first business day after the inspection. Skip Saturdays, Sundays and Alberta general holidays: New Year's Day (Jan 1), Family Day (third Monday in February), Good Friday, Victoria Day (the Monday before May 25), Canada Day (July 1, or July 2 when July 1 is a Sunday), Labour Day (first Monday in September), Thanksgiving (second Monday in October), Remembrance Day (Nov 11) and Christmas Day (Dec 25).
- **Optional holidays,** as checkboxes, off by default: Easter Monday, Heritage Day (first Monday in August), National Day for Truth and Reconciliation (Sept 30) and Boxing Day (Dec 26). Label them: "Turn on any your fire department treats as non-business days."
- **Output:** the deadline as a large date, plus a list of the 10 business days and any skipped holidays.
- **"Add to calendar"** downloads an `.ics` event on the deadline date, titled "Calgary deficiency report due".
- **Note under the result:** `Impairments get reported right away, not on day 10. This tool counts days only. Confirm the rules with Calgary Fire Department.`
- **Source links:** CFD Bulletin 2025-001, and Alberta general holidays (https://www.alberta.ca/alberta-general-holidays).
- **Tests:** holidays computed for 2026 to 2028, including the Easter-based dates. A deadline across Christmas is correct. A Friday inspection lands correctly.

### 4.2 `/tools/device-list-template`
- **Title:** `Free fire alarm device list template (Excel) | Strobe`
- **Description:** `A free Excel template for your fire alarm device list: device number, type, location, floor and zone. Imports straight into Strobe.`
- **H1:** `Free fire alarm device list template`
- **Intro:** `A clean Excel sheet for keeping each building's device list, the part you reuse every year. It's not a report form. It's the device list your report is built from.`

**The file:** generate `public/downloads/strobe-device-list-template.xlsx` with `exceljs` at build time and commit it.
- **Sheet "Devices"** has columns `Device number`, `Device type`, `Location`, `Floor`, `Zone`, `Loop / circuit` and `Notes`.
  - Freeze the header row and turn on filters.
  - `Device type` uses a dropdown: Smoke detector, Heat detector, Manual pull station, Horn/strobe, Bell, Speaker, Strobe, Duct detector, Water flow switch, Valve tamper switch, Monitor module, Control module, Annunciator, Other.
  - Include 3 sample rows marked "Sample".
- **Sheet "How to use"** gives 5 plain steps, including "Import this file into Strobe from the site's device list."
- **No content from the S536 standard.**

**Download:** the button downloads directly, with no gate. Next to it, show an optional "Email me when Strobe opens" field. It saves to `leads` with `source: "device-template"`, with the updates checkbox unchecked by default, and uses the same Turnstile and rate limits as the main form.

**`/tools` index:** a simple page listing both tools.
- **Title:** `Free tools for fire alarm contractors | Strobe`
- **Description:** `Free tools for Canadian fire alarm contractors: a Calgary deadline calculator and an Excel device list template. No signup needed.`

---

## Part 5: Guides hub + drafts (PR 5)

### 5.1 `/guides` (published)
- **Title:** `Fire alarm inspection guides | Strobe`
- **Description:** `Practical guides for Canadian fire alarm contractors: inspections, reporting rules by city, quoting and paperwork. Written with working techs.`
- **H1:** `Guides for fire alarm contractors`
- Lists published guides only. At launch that's the 51-city guide.

### 5.2 DRAFT `/guides/fire-alarm-annual-inspection`
`published: false`. It needs a working tech's review before publishing, because it describes field practice.

- **Title:** `How a fire alarm annual inspection actually runs | Strobe`
- **Description:** `Who does what on a fire alarm annual inspection in Canada: the walker, the panel tech, sprinkler devices, the report, and what happens after.`
- **H1:** `How a fire alarm annual inspection actually runs`

> An annual fire alarm inspection in Canada follows CAN/ULC-S536. On paper it's a list of tests. On site it's a small crew working together, usually over a radio.

**H2: The crew**
- **The walker** goes floor by floor and sets off each device: smoke detectors, heat detectors, pull stations, horn/strobes and the rest.
- **The panel tech** sits at the fire alarm panel and confirms each signal comes in. They mark each device pass or fail in the report as they go.
- They talk by **radio**. The walker calls the device and the panel tech confirms it.
- **When the building has sprinklers,** a sprinkler fitter often joins. The water flow and valve tamper switches tie into the fire alarm, so they're tested in the same pass.

**H2: The report**
> The standard includes the report form you fill in. You complete it as written, with nothing added and nothing taken out. Shops fill it in different ways:
- **By hand on a printout.** It's valid, and it's slow.
- **A fillable PDF** on a laptop or iPad. Better, but tedious with hundreds of devices.
- **An Excel version of the form.** Many small shops use this and get very fast at it. The cost is file management: one file per building, every year.
- **An inspection app.** Common in bigger companies. Reports are stored in one place and sent automatically, but some techs find data entry slower than their spreadsheet.

**H2: Extinguishers are a different report**
> Portable extinguishers are sometimes checked on the same visit, but they follow NFPA 10 and have their own report. Keep them separate from the S536 report.

**H2: Small repairs on the spot**
> Many contracts let the tech fix small deficiencies during the inspection, up to an amount the owner pre-approved, often a few hundred dollars. Anything over that gets quoted separately.

**H2: After the inspection**
- The report goes to the **building contact**, usually whoever pays.
- The **owner keeps a copy on site** for the fire department, and sends it to anyone else who needs it, like their insurer.
- **Deficiencies get quoted and repaired.**
- If an owner **won't fix a deficiency**, the contractor has to tell the fire department. Some cities want more than that. See [our 51-city guide](/guides/fire-alarm-report-rules-canada).

### 5.3 DRAFT `/guides/excel-vs-inspection-app`
`published: false`

- **Title:** `Excel vs an inspection app for fire alarm reports | Strobe`
- **Description:** `An honest comparison of Excel and inspection apps for CAN/ULC-S536 fire alarm reports, including when Excel is the right answer.`
- **H1:** `Excel vs an inspection app for fire alarm reports`

> Plenty of good shops run every report in Excel. Here's an honest look at when that works, when it doesn't, and what to check before you switch.

**H2: Where Excel wins**
- **It's fast once you know it.** Keyboard, copy, paste, fill down.
- **No subscription.**
- **It works with no signal.**
- **You control the file.**

**H2: Where Excel costs you**
- **One file per building, per year.** Finding last year's and copying the device list over is manual.
- **Turning it into a PDF and emailing it** is extra work after every inspection.
- **Nothing tracks deficiencies** after the report goes out: which got quoted, approved, fixed, or still need reporting.
- **Files drift.** Two techs, two versions of the same building.

**H2: Where apps win**
- **Last year's devices** are already loaded.
- **The report goes out when you sign.**
- **Deficiencies roll into quotes,** and open ones stay visible.
- **One place for every building's history.**

**H2: Where apps cost you**
- **A monthly fee,** often per user, and sometimes with a minimum number of techs or an annual contract.
- **Entry can be slower** than a spreadsheet you've mastered.
- **Some make it hard to leave.** Check how you'd get your data out before you sign.

**H2: When Excel is the right answer**
> One crew, a short list of buildings, and a tidy folder system. If that's you and the paperwork isn't eating your evenings, stay with Excel.

**H2: What to check before switching**
1. Is data entry at the panel **at least as fast** as your spreadsheet? Test it on a real building.
2. **Does it work offline?**
3. **Can you export everything** (devices, results, reports) whenever you want?
4. **Is the price on the website,** and is it month to month?
5. **Will they move your existing files over** for you?

> Strobe is built to pass that checklist. If you want to try it against your spreadsheet, [get early access](/early-access).

### 5.4 DRAFT `/guides/how-to-quote-fire-alarm-inspection`
`published: false`. A working tech must confirm the method and replace the example numbers with realistic ones before publishing.

- **Title:** `How to quote a fire alarm inspection | Strobe`
- **Description:** `How fire alarm shops price an annual inspection: device count, time per device, crew size and truck charge, with a worked example.`
- **H1:** `How to quote a fire alarm inspection`

> Most shops price an annual inspection the same basic way: count the devices, estimate the time per device, and add a truck charge. The details are where shops differ.

**H2: The basic formula**
`(number of devices × minutes per device ÷ 60) × number of techs × hourly rate + truck charge`

**H2: A worked example**
> These are made-up numbers to show the math. Use your own rates.
- 120 devices × 3 minutes = 360 minutes = **6 hours** on site
- 2 techs × 6 hours × $X per hour = **labour**
- **plus** a truck charge of $Y
- **= the quote**

Render it as a small interactive calculator with all inputs editable. It's client-side and empty by default, with placeholders shown, not real prices.

**H2: What changes the time per device**
- **Device type:** a pull station is quick, a duct detector takes longer.
- **Access:** ceiling height, lifts, locked suites.
- **Sprinkler flow and tamper devices,** tested with the fitter.
- **Panel tests and batteries.**
- **Report time.** Count it, or it comes out of your margin.

**H2: Put these in the contract**
- **A pre-approved repair limit,** so small fixes happen on the spot.
- **What's included,** and what gets quoted separately.
- **When the report goes out,** and to whom.

---

## Part 6: Sitemap, nav and checks (in each PR as you go)
- **Sitemap:** includes every published page with `lastmod` from `lastReviewed`. Draft guides are excluded.
- **Nav:** How it works · Cities (dropdown) · Pricing · Guides · FAQ · Get early access.
- **Footer:** add About, Guides, Tools.
- **Each PR runs:** a build, a check that no route shares a title or description, Lighthouse on the new pages, no em dashes in new copy (fail on `—`), and the unpublished-drafts check (drafts must not appear in the production build or sitemap).

## Done when
- [ ] Part 1 technical fixes merged, with Lighthouse scores in the PR
- [ ] `/about`, `/strathcona-county` and `/lethbridge` are live; `/calgary` and `/edmonton` are expanded
- [ ] The 51-city guide is live with search, filter and a CSV download
- [ ] Both tools are live and tested
- [ ] The guides hub is live, and three drafts exist but don't appear in production
