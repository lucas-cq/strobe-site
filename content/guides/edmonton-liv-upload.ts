import type { NavLink } from "../site";
import type { Guide } from "../guide-types";

// From the November 2026 SEO brief, S4. Only what the City of Edmonton publishes: its submission page
// and the Fire Marshal bulletin linked from it (revised October 2026). Checked November 24, 2026.
// Strobe is NOT integrated with LIV and does not upload. Keep the wording that way.

export const edmontonPage: NavLink = {
  label: "City of Edmonton: Fire Inspection Report Submission",
  href: "https://www.edmonton.ca/programs_services/fire_rescue/fire-inspection-report-submission",
};

export const edmontonBulletin: NavLink = {
  label: "Fire Marshal Bulletin: Fire Alarm Reporting and Inspection Form Requirements (revised October 2026)",
  href: "https://www.edmonton.ca/sites/default/files/public-files/documents/firemarshalbulletin-firealarmreporting-inspection-formrequirements.pdf",
};

export const livUploadGuide: Guide = {
  published: true,
  slug: "edmonton-liv-upload",
  lastReviewed: "2026-11-24",
  meta: {
    title: "How to upload a fire report to Edmonton's LIV (2026) | Strobe",
    description:
      "Uploading fire system reports to Edmonton's LIV, step by step: the account, what to have ready, the 14-day and 24-hour rules, and what gets turned away.",
  },
  title: "Uploading reports to Edmonton's LIV, step by step",
  intro:
    "Since September 8, 2026, Edmonton Fire Rescue Services takes third-party fire system reports through LIV, the Life Safety Inspection Vault. This guide covers what the City has published about it: what goes in, when, and what to have ready. Every point links back to the City's own documents.",
  sections: [
    {
      title: "What has to go in, and when",
      blocks: [
        {
          kind: "list",
          items: [
            "**Required: unrepaired defects.** If a defect isn't fixed, and the owner hasn't said they'll fix it, **within 14 days of the initial inspection**, upload the report to LIV after those 14 days.",
            "**Urgent: within 24 hours.** A defect that affects how a system works or what it covers needs reporting right away. It may need emergency repairs or a fire watch.",
            "**Recommended: every other report.** The City recommends uploading all fire protection system reports, and its page tells contractors to submit all their inspection reports through LIV. Uploading every report is the safe choice.",
            "**Systems:** fire alarm, fire pumps, range hood cleaning, emergency lights, standpipes, fire sprinklers and fixed fire suppression. The FAQ also mentions kitchen suppression and emergency generators.",
          ],
        },
      ],
    },
    {
      title: "Set up your company account",
      blocks: [
        {
          kind: "numbered",
          items: [
            "Register your company at [app.livsafe.com/register](https://app.livsafe.com/register). The City says contractors set up their own accounts.",
            "Add your inspectors and techs as users on the company profile.",
            `Before your first upload, watch the walkthrough videos linked in the [City's bulletin](${edmontonBulletin.href}).`,
          ],
        },
        {
          kind: "paragraph",
          text: "Neither the City's page nor its bulletin mentions fees. Ask before you assume: fireprevention@edmonton.ca.",
        },
      ],
    },
    {
      title: "What to have ready",
      blocks: [
        {
          kind: "list",
          items: [
            "**The complete report,** as a PDF or a digital report. Every section filled in, with anything not assessed marked N/A.",
            "**The standard's tabular format.** The bulletin says records follow the format shown in CAN/ULC-S536-19 and aren't reworded. You can recreate the forms with your company logo.",
            "**Smoke sensitivity and battery results.** Both are mandatory, and sensitivity goes in the individual device record for addressable and conventional systems alike.",
            "**The premises and the system type,** so the report links to the right building and system.",
            "**Each deficiency's type, location and severity.**",
          ],
        },
      ],
    },
    {
      title: "Upload the report",
      blocks: [
        {
          kind: "numbered",
          items: [
            "Sign in at app.livsafe.com.",
            "Upload the report and link it to the premises and the system type.",
            "Log each deficiency by type, location and severity.",
            "Track each one through its status: Open, In Progress, Cleared and Resolved. LIV sends reminders when something is due or overdue.",
            "After the repair, submit proof of correction. The owner can upload it too.",
          ],
        },
      ],
    },
    {
      title: "What happens next",
      blocks: [
        {
          kind: "list",
          items: [
            "When a system is reported defective, the City sends the owner a notice with a timeline to fix it, based on the category of deficiency.",
            "If the defects aren't corrected, a Fire Safety Codes Officer may inspect the site.",
            "Where the owner is making every effort to fix things within 14 days, the City treats them as compliant. If that timeline isn't met, it may act under the Safety Codes Act.",
            "Owners can ask for their own LIV access, to see reports and deficiencies and upload proof of correction.",
          ],
        },
      ],
    },
    {
      title: "What gets a report turned away",
      blocks: [
        {
          kind: "list",
          items: [
            "**A partial report.** The bulletin says partial reports won't be accepted. Mark sections you didn't assess N/A instead of leaving them out.",
            "**A reworded or rearranged form.** The tests and records stay as the standard lays them out. Adding your logo is fine.",
            "**No smoke sensitivity results.** The allowance for delaying sensitivity testing wasn't renewed, so the device record has to show it for every smoke detector.",
            "**Waiting 14 days on an urgent defect.** Anything that affects how a system works or what it covers is a 24-hour report.",
          ],
        },
      ],
    },
    {
      title: "Who to ask",
      blocks: [
        {
          kind: "list",
          items: [
            "**Fire code questions:** fireprevention@edmonton.ca, or 780-496-3628 (voicemail only).",
            "**LIV accounts and uploads:** support@livsafe.com.",
          ],
        },
      ],
    },
    {
      title: "Where Strobe fits",
      blocks: [
        {
          kind: "paragraph",
          text: "Strobe isn't connected to LIV and doesn't upload for you. It gets the report and the deficiency list ready, shows which deficiencies still need proof of correction, and keeps everything for the upload in one place. See [how Edmonton works with Strobe](/edmonton), or start with the [S536 annual inspection checklist](/guides/s536-annual-inspection-checklist).",
        },
      ],
    },
    {
      title: "Sources",
      blocks: [
        {
          kind: "list",
          items: [`[${edmontonPage.label}](${edmontonPage.href})`, `[${edmontonBulletin.label}](${edmontonBulletin.href})`],
        },
        { kind: "paragraph", text: "Checked November 24, 2026. Rules change, so always check with the City of Edmonton." },
      ],
    },
  ],
};
