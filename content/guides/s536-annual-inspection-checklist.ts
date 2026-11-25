import type { Guide } from "../guide-types";
import { edmontonBulletin } from "./edmonton-liv-upload";

// From the November 2026 SEO brief, S2. A summary in our own words: never quote the standard's text.
// The edition paragraph matches "Which edition of S536?" in content/guide-report-rules.ts.
export const s536ChecklistGuide: Guide = {
  published: true,
  slug: "s536-annual-inspection-checklist",
  lastReviewed: "2026-11-24",
  meta: {
    title: "CAN/ULC-S536 annual inspection checklist | Strobe",
    description:
      "What a CAN/ULC-S536 annual fire alarm inspection covers, section by section: control unit, power and batteries, field devices, annunciators, fault tests and the device record.",
  },
  title: "The CAN/ULC-S536 annual inspection, section by section",
  intro:
    "CAN/ULC-S536 is the Canadian standard for inspecting and testing fire alarm systems. Here's what the annual inspection covers, in the order most crews work through it. It's a summary in our own words, not the standard, so keep the edition your fire code references on hand and follow it.",
  sections: [
    {
      title: "Which edition applies",
      blocks: [
        {
          kind: "paragraph",
          text: "Alberta, Saskatchewan and Manitoba are on **CAN/ULC-S536-2019** through their fire codes. Sources disagree on Ontario, which may be on 2019 or 2024, so check with the Office of the Fire Marshal. We didn't verify the other provinces, so check with your provincial fire marshal.",
        },
        {
          kind: "paragraph",
          text: "Who gets the report afterwards depends on the city. See [fire alarm report rules in 51 Canadian cities](/guides/fire-alarm-report-rules-canada).",
        },
      ],
    },
    {
      title: "Before you start",
      blocks: [
        {
          kind: "list",
          items: [
            "**Last year's report and device list** for the building, so you know what's there and what failed last time.",
            "**The monitoring company and fire department dispatch,** told before you start testing, so a test alarm doesn't send a truck.",
            "**The building's occupants,** told when to expect alarms.",
            "**The edition of the standard** your province references, and the report forms that go with it.",
          ],
        },
      ],
    },
    {
      title: "Control unit",
      blocks: [
        {
          kind: "paragraph",
          text: "Start at the panel. You're checking that it's in good condition and that every kind of signal reaches it and shows up correctly.",
        },
        {
          kind: "list",
          items: [
            "The panel's condition, its indicators and its display.",
            "**Alarm, supervisory and trouble signals** each come in and show correctly.",
            "Silence and reset work.",
            "**Functions the panel controls,** like door holders, elevator recall and fan shutdown, operate when they should.",
            "Signals reach the **monitoring company**.",
          ],
        },
      ],
    },
    {
      title: "Power supplies and batteries",
      blocks: [
        {
          kind: "list",
          items: [
            "**Primary power:** the circuit is dedicated and labelled, and the power-on indicator works.",
            "**Batteries:** condition, date and connections, with voltage readings recorded.",
            "**On battery:** the system keeps working when primary power is removed.",
            "**The charger** is doing its job.",
            "**A generator,** where one supplies the system, is part of the check too.",
          ],
        },
        {
          kind: "paragraph",
          text: `Some fire departments spell this out. [Edmonton's Fire Marshal bulletin](${edmontonBulletin.href}) says battery testing is mandatory.`,
        },
      ],
    },
    {
      title: "Field devices",
      blocks: [
        {
          kind: "paragraph",
          text: "This is most of the day. The walker sets off each device and the panel tech confirms it arrives at the panel with the right address and description.",
        },
        {
          kind: "list",
          items: [
            "**Smoke detectors:** each one tested, with its sensitivity checked and recorded.",
            "**Heat detectors, pull stations and duct detectors:** each one tested.",
            "**Sprinkler flow and valve switches:** tested with the sprinkler side, often in the same pass.",
            "**Horns, strobes, bells and speakers:** each one works, and can be heard and seen where it needs to be.",
            "Every device's **location and label** match what the panel shows.",
          ],
        },
        {
          kind: "paragraph",
          text: `Edmonton's bulletin says smoke sensitivity testing is mandatory and has to be recorded in the individual device record, on addressable and conventional systems alike.`,
        },
      ],
    },
    {
      title: "Annunciators",
      blocks: [
        {
          kind: "list",
          items: [
            "Each remote annunciator's indicators match the zones and devices they're labelled for.",
            "The lamp or display test works.",
            "Its controls work, and troubles show up on it.",
          ],
        },
      ],
    },
    {
      title: "Fault tests",
      blocks: [
        {
          kind: "paragraph",
          text: "The system has to notice when its own wiring fails. You put faults on the circuits and check the panel reports them.",
        },
        {
          kind: "list",
          items: [
            "An **open circuit** on detection and signal circuits gives a trouble.",
            "A **ground fault** gives a trouble.",
            "A fault on a **loop or data circuit** gives a trouble.",
            "The system **restores** after each test.",
          ],
        },
      ],
    },
    {
      title: "The device record and the report",
      blocks: [
        {
          kind: "list",
          items: [
            "**Every device** gets a line: number, type, location and result.",
            "Anything you couldn't test is marked, with the reason.",
            "**Deficiencies** are listed clearly, so the owner knows what to fix.",
            "The tech signs, and the owner or their agent gets a copy.",
          ],
        },
        {
          kind: "paragraph",
          text: `Fire departments are strict about the format. [Edmonton's bulletin](${edmontonBulletin.href}) says every section has to be completed, with sections that weren't assessed marked N/A, and that partial reports won't be accepted. It also says the records follow the standard's own tabular format without rewording, though you can recreate it with your logo.`,
        },
      ],
    },
    {
      title: "After the inspection",
      blocks: [
        {
          kind: "paragraph",
          text: "If an owner won't or can't fix a deficiency, Alberta's fire code says to tell the fire department in writing. Some cities add their own deadline or method:",
        },
        {
          kind: "list",
          items: [
            "[Calgary](/calgary): 10 business days from the inspection.",
            "[Edmonton](/edmonton): upload to LIV after 14 days. See [the LIV upload, step by step](/guides/edmonton-liv-upload).",
            "[Strathcona County](/strathcona-county) and [Lethbridge](/lethbridge): they want every report, not just deficient ones.",
            "[Medicine Hat](/medicine-hat) and [Grande Prairie](/grande-prairie): 10 days.",
          ],
        },
      ],
    },
    {
      title: "How Strobe builds the report",
      blocks: [
        {
          kind: "paragraph",
          text: "Strobe loads last year's device list in walk order. The panel tech marks each device as the walker calls it, on a phone, even with no signal. The report builds as you go, and the deficiencies turn into a quote the same day.",
        },
        {
          kind: "list",
          items: [
            "Starting from spreadsheets? The free [device list template](/tools/device-list-template) imports straight into Strobe.",
            "Prefer paper for now? Print the free [annual inspection report template](/tools/s536-report-template).",
            "See [pricing](/pricing): every plan starts with a 30-day free trial.",
          ],
        },
      ],
    },
  ],
};
