import { readFileSync } from "node:fs";
import path from "node:path";

export type ReportRule = {
  province: string;
  city: string;
  contractorSubmits: string;
  whenFireDepartmentHears: string;
  method: string;
  deadline: string;
  photos: string;
  sourceUrl: string;
  notes: string;
  /** We searched and found nothing public for this city. */
  noRuleFound: boolean;
};

const COLUMNS = 9;
const NO_RULE = "No public info found";

/** Splits CSV text into rows of fields, allowing "quoted, fields" and "" as an escaped quote. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') field += text[++i];
      else quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) rows.push([...row, field]);
  return rows;
}

/** The CSV people download is the same file the table is built from. Read at build time. */
export function loadReportRules(): ReportRule[] {
  const csv = readFileSync(path.join(process.cwd(), "public/guides/fire-alarm-report-rules-canada.csv"), "utf8");
  return parseCsv(csv)
    .slice(1)
    .map((fields, i) => {
      if (fields.length !== COLUMNS) throw new Error(`report rules CSV: row ${i + 2} has ${fields.length} columns, expected ${COLUMNS}`);
      const [province, city, contractorSubmits, whenFireDepartmentHears, method, deadline, photos, sourceUrl, notes] = fields;
      return {
        province,
        city,
        contractorSubmits,
        whenFireDepartmentHears,
        method,
        deadline,
        photos,
        sourceUrl,
        notes,
        noRuleFound: contractorSubmits === NO_RULE,
      };
    });
}
