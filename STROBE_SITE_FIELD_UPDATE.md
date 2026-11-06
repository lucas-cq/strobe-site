# strobehq.com: field-reality update

> **Lucas:** drop this in the site repo root and tell Claude Code: *"Read STROBE_SITE_FIELD_UPDATE.md. Make only these changes, then stop for review."*
> Everything below is written to Claude Code.

We learned how inspections actually run from a shop owner, and checked fire department rules in about 50 Canadian cities. Most of the site is right. This brief fixes only what's now wrong or misleading. **Change nothing else.** Keep the H1, layout, colours, voice rules (no em dashes) and every section not listed below.

What changed, in short:
- **Crews, not lone techs.** One tech walks the floor testing devices. One sits at the panel marking pass or fail. They talk by radio. Only the panel person uses the app, and **the phone is the main device**.
- **The contractor sends the report to the building contact.** The owner sends it on to the City and the insurer. The contractor only goes to the fire department when a deficiency isn't being fixed, except in Edmonton, Strathcona County and Lethbridge, where contractors submit reports routinely.
- **Photos are optional and off by default.** No fire department requires them.

---

## 1. Home: meta description
Replace with:
`Fire alarm inspection software for Canadian shops. Run the panel from your phone, even offline. S536 reports, same-day quotes, each city's rules built in.`
Update the OG description to match.

## 2. Home: hero sub (keep the H1 exactly)
Replace:
> Fire alarm inspection software for Canadian shops. Your techs inspect offline. Strobe builds the S536 report and the quote, then reads the site address and gets the deficiency filing ready in that city's format.

With:
> Fire alarm inspection software for Canadian shops. Run the panel from your phone, even with no signal. Strobe builds the S536 report, sends it to the building, quotes what's left to fix, and knows each city's rules for when the fire department needs it.

## 3. Home: hero mockup
On the failed smoke detector row, remove the **"Photo"** chip. Leave the rest of the mockup, and update its alt text so it doesn't mention a photo.

## 4. Home: "Sound familiar?" card 1
Replace the card **"Typing it twice"** with:

- **Title:** `A spreadsheet for every building`
- **Body:** `Every building is its own Excel file. Find last year's, copy the devices over, fill it in, save it as a PDF, email it. Then do it again next year.`

Leave the other two cards as they are.

## 5. Home: How it works

### Step 01
- **Role label:** `Panel tech · phone`
- **Title:** `Run the panel from your phone.`
- **Body:** `Your walker calls devices on the radio. Last year's devices are already loaded in walk order, so a pass is one tap and the next device comes up. Jump to any device by number. Works in basements and parkades and syncs when you're back online.`
- **Mockup:** replace the device list with **panel mode**:
  - one device shown large: "Pull station · L2-14 · Level 2 east stair", with last year's result "Pass (2025)" faded underneath
  - a big **Pass** button at the bottom, with a smaller **Fail** beside it
  - a **Jump** button showing a number pad icon
  - the counter `31 of 42`
  - the existing "Offline, 14 changes saved" pill

  Remove the photo and deficiency block. Update the alt text to match.

### Step 02
- **Role label:** `Panel tech · phone`
- **Body:** `The crew signs on the phone and the CAN/ULC-S536 report is ready, then emailed to the building contact. No more Excel to PDF to email at night.`

### Step 03
- **Body:** `Anything you didn't fix on site turns into a quote line. Price it from your price book and send it before anyone else quotes the job.`
- **Mockup:** remove the photo thumbnails from the quote lines, and update the alt text.

### Step 04
- **Body:** `No login and no app. The owner sees each deficiency with its location and price, approves what they want and signs.`

### Step 05
- **Role label:** `Office · web`
- **Title:** `Ready when the fire department needs it.`
- **Body:** `Strobe reads the site address and knows that city's rules. Where every report has to go in, like Edmonton or Lethbridge, it's ready to send. Anywhere else, if an owner won't fix a deficiency, you have to tell the fire department, and Strobe has the report and the paper trail ready.`
- Keep the Calgary filing card mockup as it is.

## 6. Home: city selector

### Heading and lead
- **H2:** `Strobe knows each city's rules.`
- **Lead:** `Your report goes to the building. When the fire department needs it too, every city wants it differently. Calgary uses a 311 request when a deficiency isn't fixed in time. Edmonton wants reports in LIV. Strathcona County has its own portal. Lethbridge wants every report by email.`

### Data fixes in `content/jurisdictions.ts`
- **Edmonton, "What triggers it":** `Non-compliant reports are required. All reports are recommended. Since Sept 8, 2026.` This matches the City's page and our Edmonton page.
- **Lethbridge:**
  - "What triggers it": `Every report`
  - "Deadline": `Clean reports within 30 days. Deficient reports within 10 business days if no repair is arranged.`
  - "Strobe gets ready": `The email with the report attached: to the Fire Prevention Bureau for clean reports, or to deficientreports@lethbridge.ca when a repair isn't arranged in time.`
  - Add a line under the card for Lethbridge only: `Lethbridge also requires contractors to be on its registry.`
- **Somewhere else:**
  - "What triggers it": `An owner who won't or can't fix a deficiency`
  - "Deadline": `Right away, in writing. That's the fire code rule in Alberta and most provinces.`
  - "Strobe gets ready": `The S536 report, a deficiency summary, and the paper trail (when the report and quote were sent, and the owner's answer), ready to send.`
- Set `checkedOn` to `2026-11-06` on all entries. Keep the sources.

## 7. Home: City deadline band
Leave it as it is, with one exception: rename the mockup button **"Report to City"** to **"Report to fire department"**, to match the app.

## 8. Home: Early access block
- Change **"Sprinkler and kitchen suppression are next."** to: `Extinguishers and sprinkler are next.`
- Change the "Works across Canada" card to: `Reports, quotes and owner approvals work anywhere. City rules are mapped for Calgary, Edmonton, Strathcona County and Lethbridge, with more added as shops ask.`

## 9. Home: FAQ

### Replace "Does Strobe file with the City for me?"
- **Q:** `Do I have to send reports to the fire department?`
- **A:** `Usually not. You send the report to the building contact, and Strobe does that when you sign. Edmonton, Strathcona County and Lethbridge want reports from the contractor. And anywhere, if an owner won't fix a deficiency, you're required to tell the fire department. In those cases Strobe has it ready, and you send it.`

### Replace "How does Strobe know which city to file with?"
- **Q:** `How does Strobe know each city's rules?`
- **A:** keep the current answer.

### Replace the answer to "Which systems does it cover?"
- **A:** `Fire alarm, including the sprinkler flow and tamper devices you test during the alarm inspection. Extinguishers are next.`

### Add two new questions, after "Does it work with no signal?"
- **Q:** `Does it work on my phone?` **A:** `Yes. It's built for the phone first, one-handed, with a radio in the other hand. It works on an iPad or a laptop too.`
- **Q:** `Does my whole crew need the app?` **A:** `No. Only whoever is running the panel. Everyone on the crew goes on the report.`

## 10. Pricing page
In "Every plan includes", replace **"Deficiency photos, quotes and owner approval by link"** with **"Quotes and owner approval by link"**, and add a new line: **"Optional deficiency photos"**.

Leave the plan names, tech ranges and wording as they are for now. Lucas will revisit the pricing model after the trial.

## 11. Edmonton page
In "Proof of correction, sorted", add a sentence at the end: `If the City asks for a note or a photo when you close a deficiency, it's there.`

Make no other changes to the page.

## 12. Calgary page
No changes.

## 13. Your data page
- Replace **"CSV files of your sites, devices, deficiencies and quotes."** with **"CSV files of your sites, devices, inspections and results, deficiencies and quotes."**
- Replace **"Your photos, in their original quality."** with **"Any photos, in their original quality."**
- Set "Last updated" to November 6, 2026.

## Done when
- [ ] The H1 is unchanged
- [ ] No copy says the contractor files with the City as the normal next step, except where a city requires it
- [ ] No mockup shows a photo chip or photo thumbnail
- [ ] The Lethbridge, Edmonton and "Somewhere else" cards match section 6 exactly
- [ ] There are two new FAQ entries, and the FAQ schema (if any) is updated
- [ ] Lighthouse mobile is still 95+, with no horizontal scroll at 360 px
