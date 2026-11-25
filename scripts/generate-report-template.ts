/**
 * Writes public/downloads/strobe-annual-inspection-report-template.xlsx: `pnpm template:generate`.
 * The file is committed, so run this and commit the result after changing anything here.
 *
 * A printable worksheet in our own words, in the order of an annual fire alarm inspection.
 * Nothing in it comes from the CAN/ULC-S536 standard, and it isn't the standard's report forms.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const OUT = path.join(process.cwd(), "public/downloads/strobe-annual-inspection-report-template.xlsx");
// Fixed, so regenerating without changes doesn't produce a new file.
const CREATED = new Date("2026-11-24T00:00:00Z");
const DEVICE_ROWS = 300;
const RESULT = '"Pass,Fail,N/A"';
const YES_NO = '"Yes,No,N/A"';

const deviceTypes = [
  "Smoke detector",
  "Heat detector",
  "Manual pull station",
  "Duct detector",
  "Water flow switch",
  "Valve tamper switch",
  "Horn/strobe",
  "Bell",
  "Speaker",
  "Strobe",
  "Monitor module",
  "Control module",
  "Annunciator",
  "Other",
];

const thin = { style: "thin" as const, color: { argb: "FFB8C4C9" } };
const border = { top: thin, left: thin, bottom: thin, right: thin };
const brand = "FF00708F";
const tint = "FFEDF7F9";

const workbook = new ExcelJS.Workbook();
workbook.creator = "Strobe";
workbook.created = CREATED;
workbook.modified = CREATED;

const footer = "&LStrobe annual inspection report template · strobehq.com&RPage &P of &N";

/** The report: site details, then each part of the inspection as a checklist with a result and notes. */
const report = workbook.addWorksheet("Report", {
  pageSetup: { orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.5, right: 0.5, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 } },
  headerFooter: { oddFooter: footer },
});
report.columns = [{ width: 46 }, { width: 14 }, { width: 44 }];

const title = report.addRow(["Fire alarm annual inspection report"]);
title.font = { bold: true, size: 16, color: { argb: brand } };
report.addRow(["A worksheet for collecting everything on site. It isn't the CAN/ULC-S536 report forms: see the How to use sheet."]).font = { italic: true, size: 9, color: { argb: "FF5E6D75" } };
report.addRow([]);

function section(name: string, headers?: [string, string, string]) {
  const row = report.addRow([name]);
  row.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  row.eachCell({ includeEmpty: true }, (c) => (c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: brand } }));
  report.mergeCells(`A${row.number}:C${row.number}`);
  if (headers) {
    const h = report.addRow(headers);
    h.font = { bold: true };
    h.eachCell((c) => {
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: tint } };
      c.border = border;
    });
  }
}

/** Label and a wide value box across columns B and C. */
function fields(labels: string[]) {
  for (const label of labels) {
    const row = report.addRow([label]);
    report.mergeCells(`B${row.number}:C${row.number}`);
    row.height = 20;
    ["A", "B", "C"].forEach((col) => (report.getCell(`${col}${row.number}`).border = border));
  }
  report.addRow([]);
}

/** Check, result dropdown, notes. */
function checks(items: string[], validation = RESULT) {
  for (const item of items) {
    const row = report.addRow([item]);
    row.height = 20;
    row.getCell(1).alignment = { wrapText: true, vertical: "middle" };
    row.getCell(2).dataValidation = { type: "list", allowBlank: true, formulae: [validation] };
    row.getCell(2).alignment = { horizontal: "center", vertical: "middle" };
    [1, 2, 3].forEach((i) => (row.getCell(i).border = border));
  }
  report.addRow([]);
}

section("Site and system");
fields([
  "Building name",
  "Address",
  "City",
  "Owner or authorized agent",
  "Owner contact (phone, email)",
  "Inspection date",
  "Previous inspection date",
  "Edition of CAN/ULC-S536 used",
  "Panel make and model",
  "Panel location",
  "Monitoring company and account",
  "Inspecting company",
  "Panel tech",
  "Walker",
]);

section("Before testing", ["Check", "Done", "Notes"]);
checks(
  [
    "Monitoring company told testing is starting",
    "Fire department dispatch told, if required",
    "Occupants told to expect alarms",
    "Last year's report and device list on hand",
  ],
  YES_NO,
);

section("Control unit", ["Check", "Result", "Notes"]);
checks([
  "Panel condition, indicators and display",
  "Alarm signal received and shown correctly",
  "Supervisory signal received and shown correctly",
  "Trouble signal received and shown correctly",
  "Silence and reset work",
  "Door holders release",
  "Elevator recall operates",
  "Fan shutdown operates",
  "Other controlled functions operate",
  "Signals reach the monitoring company",
]);

section("Power supplies and batteries", ["Check", "Result", "Notes or reading"]);
checks([
  "Primary power circuit dedicated and labelled",
  "Primary power indicator on",
  "Battery date and condition",
  "Battery connections clean and tight",
  "Battery voltage, no load (record in notes)",
  "Battery voltage, under load (record in notes)",
  "System works on battery with primary power off",
  "Charger output (record in notes)",
  "Generator, where it supplies the system",
]);

section("Annunciators", ["Check", "Result", "Notes"]);
checks([
  "Annunciator location (record in notes)",
  "Indicators match the zones and devices",
  "Lamp or display test",
  "Controls work",
  "Troubles show",
]);

section("Fault tests", ["Check", "Result", "Notes"]);
checks([
  "Open circuit on detection circuits gives a trouble",
  "Open circuit on signal circuits gives a trouble",
  "Ground fault gives a trouble",
  "Fault on loop or data circuits gives a trouble",
  "System restores after each test",
]);

section("Field devices");
fields(["Devices tested (count)", "Devices not tested, and why", "Device record", "Deficiencies found (count)"]);
report.getCell(`B${report.rowCount - 2}`).value = "On the Device record sheet";

section("Sign-off");
fields([
  "Panel tech name and signature",
  "Date",
  "Owner or agent name and signature",
  "Date the owner got the report",
  "Fire department notified (date and how), if needed",
]);

/** The device record: one row per device, header repeated on every printed page. */
const devices = workbook.addWorksheet("Device record", {
  views: [{ state: "frozen", ySplit: 1 }],
  pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: "1:1", margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.6, header: 0.3, footer: 0.3 } },
  headerFooter: { oddFooter: footer },
});
devices.columns = [
  { header: "Device number", key: "number", width: 13 },
  { header: "Device type", key: "type", width: 20 },
  { header: "Location", key: "location", width: 28 },
  { header: "Floor", key: "floor", width: 7 },
  { header: "Zone", key: "zone", width: 7 },
  { header: "Signal at panel", key: "panel", width: 11 },
  { header: "Label matches", key: "label", width: 11 },
  { header: "Sensitivity (smoke)", key: "sensitivity", width: 13 },
  { header: "Audible or visible", key: "signal", width: 12 },
  { header: "Result", key: "result", width: 9 },
  { header: "Notes", key: "notes", width: 30 },
];
const head = devices.getRow(1);
head.font = { bold: true, color: { argb: "FFFFFFFF" } };
head.alignment = { wrapText: true, vertical: "middle" };
head.height = 32;
head.eachCell((c) => {
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: brand } };
  c.border = border;
});
for (let r = 2; r <= DEVICE_ROWS + 1; r++) {
  const row = devices.getRow(r);
  row.height = 18;
  for (let c = 1; c <= 11; c++) row.getCell(c).border = border;
  row.getCell(2).dataValidation = { type: "list", allowBlank: true, formulae: [`"${deviceTypes.join(",")}"`] };
  for (const c of [6, 7, 9]) row.getCell(c).dataValidation = { type: "list", allowBlank: true, formulae: [YES_NO] };
  row.getCell(10).dataValidation = { type: "list", allowBlank: true, formulae: [RESULT] };
}

/** Deficiencies, so the owner sees exactly what to fix. */
const deficiencies = workbook.addWorksheet("Deficiencies", {
  views: [{ state: "frozen", ySplit: 1 }],
  pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: "1:1" },
  headerFooter: { oddFooter: footer },
});
deficiencies.columns = [
  { header: "#", width: 5 },
  { header: "Device or item", width: 22 },
  { header: "Location", width: 26 },
  { header: "What's wrong", width: 38 },
  { header: "What it needs", width: 32 },
  { header: "Owner told (date)", width: 14 },
  { header: "Fixed (date)", width: 12 },
];
const dHead = deficiencies.getRow(1);
dHead.font = { bold: true, color: { argb: "FFFFFFFF" } };
dHead.eachCell((c) => {
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: brand } };
  c.border = border;
});
for (let r = 2; r <= 41; r++) {
  const row = deficiencies.getRow(r);
  row.height = 22;
  row.getCell(1).value = r - 1;
  for (let c = 1; c <= 7; c++) row.getCell(c).border = border;
}

const howTo = workbook.addWorksheet("How to use");
howTo.getColumn(1).width = 100;
const lines: [string, boolean?][] = [
  ["How to use this template", true],
  ["1. Print the Report, Device record and Deficiencies sheets, or fill them in on a laptop."],
  ["2. Fill in the site details before you start, and tell the monitoring company you're testing."],
  ["3. Work through the panel, power, annunciators and fault tests on the Report sheet."],
  ["4. On the Device record sheet, give every device a row as the walker calls it."],
  ["5. List each problem on the Deficiencies sheet, so the owner knows exactly what to fix."],
  [""],
  ["What this is, and what it isn't", true],
  ["This is a worksheet in our own words, in the order crews work. It isn't the report forms in CAN/ULC-S536."],
  ["Many fire departments want the standard's own forms, filled in completely. Edmonton, for example, won't accept"],
  ["partial or reworded reports. Use this sheet to collect everything on site, then complete the forms your fire"],
  ["department accepts, in the edition your province references."],
  [""],
  ["Or let Strobe fill it in", true],
  ["Strobe builds the report from your device list as you test, and turns the deficiencies into a quote the same day."],
  ["See strobehq.com/pricing. Every plan starts with a 30-day free trial."],
];
for (const [text, bold] of lines) howTo.addRow([text]).font = bold ? { bold: true, size: 12 } : {};

mkdirSync(path.dirname(OUT), { recursive: true });
workbook.xlsx.writeFile(OUT).then(() => console.log(`Wrote ${path.relative(process.cwd(), OUT)}`));
