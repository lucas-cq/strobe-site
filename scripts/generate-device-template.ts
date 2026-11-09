/**
 * Writes public/downloads/strobe-device-list-template.xlsx: `pnpm template:generate`.
 * The file is committed, so run this and commit the result after changing anything here.
 * Nothing in it comes from the CAN/ULC-S536 standard.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const OUT = path.join(process.cwd(), "public/downloads/strobe-device-list-template.xlsx");
const LAST_VALIDATED_ROW = 2000;
// Fixed, so regenerating without changes doesn't produce a new file.
const CREATED = new Date("2026-11-09T00:00:00Z");

const deviceTypes = [
  "Smoke detector",
  "Heat detector",
  "Manual pull station",
  "Horn/strobe",
  "Bell",
  "Speaker",
  "Strobe",
  "Duct detector",
  "Water flow switch",
  "Valve tamper switch",
  "Monitor module",
  "Control module",
  "Annunciator",
  "Other",
];

const steps = [
  "Make one copy of this file for each building.",
  "On the Devices sheet, delete the 3 sample rows.",
  "Add one row per device. Pick the device type from the dropdown.",
  "Keep the file with the building's records, and update it when devices change.",
  "Import this file into Strobe from the site's device list.",
];

const workbook = new ExcelJS.Workbook();
workbook.creator = "Strobe";
workbook.created = CREATED;
workbook.modified = CREATED;

const devices = workbook.addWorksheet("Devices", { views: [{ state: "frozen", ySplit: 1 }] });
devices.columns = [
  { header: "Device number", key: "number", width: 16 },
  { header: "Device type", key: "type", width: 22 },
  { header: "Location", key: "location", width: 30 },
  { header: "Floor", key: "floor", width: 10 },
  { header: "Zone", key: "zone", width: 10 },
  { header: "Loop / circuit", key: "loop", width: 16 },
  { header: "Notes", key: "notes", width: 30 },
];
devices.getRow(1).font = { bold: true };
devices.autoFilter = "A1:G1";
devices.addRows([
  { number: "L1-01", type: "Manual pull station", location: "Main entrance", floor: "1", zone: "1", loop: "L1", notes: "Sample" },
  { number: "L1-02", type: "Smoke detector", location: "Level 1 corridor", floor: "1", zone: "1", loop: "L1", notes: "Sample" },
  { number: "L2-01", type: "Horn/strobe", location: "Level 2 east stair", floor: "2", zone: "2", loop: "L2", notes: "Sample" },
]);
for (let row = 2; row <= LAST_VALIDATED_ROW; row++) {
  devices.getCell(`B${row}`).dataValidation = {
    type: "list",
    allowBlank: true,
    formulae: [`"${deviceTypes.join(",")}"`],
  };
}

const howTo = workbook.addWorksheet("How to use");
howTo.getColumn(1).width = 80;
howTo.addRow(["How to use this template"]).font = { bold: true };
steps.forEach((step, i) => howTo.addRow([`${i + 1}. ${step}`]));

mkdirSync(path.dirname(OUT), { recursive: true });
workbook.xlsx.writeFile(OUT).then(() => console.log(`Wrote ${path.relative(process.cwd(), OUT)}`));
