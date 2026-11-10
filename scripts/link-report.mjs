/**
 * Reads lychee's JSON output and decides whether the link check passes. Run by
 * .github/workflows/links.yml after lychee has checked the built site.
 *
 *   node scripts/link-report.mjs lychee.json
 *
 * Fails on dead links (404 or 410). Sites that block bots (403, 429, and LinkedIn's 999)
 * and anything else that went wrong (timeouts, 5xx, network errors) are reported but
 * don't fail the check, since a retry next week usually clears them.
 */
import { appendFileSync, existsSync, readFileSync } from "node:fs";

const DEAD = new Set([404, 410]);
const BLOCKED = new Set([403, 429, 999]);

const file = process.argv[2] ?? "lychee.json";
if (!existsSync(file)) {
  console.error(`link-report: ${file} not found, so lychee didn't run`);
  process.exit(1);
}
const report = JSON.parse(readFileSync(file, "utf8"));
if (!report.total) {
  console.error("link-report: lychee checked 0 links, so the site didn't load");
  process.exit(1);
}

/** One row per broken URL, with every page it appears on. */
function collect(map) {
  const byUrl = new Map();
  for (const [page, items] of Object.entries(map ?? {})) {
    for (const item of items) {
      const entry = byUrl.get(item.url) ?? { url: item.url, status: item.status, pages: new Set() };
      if (!/cached/i.test(item.status?.text ?? "")) entry.status = item.status;
      entry.pages.add(new URL(page).pathname);
      byUrl.set(item.url, entry);
    }
  }
  return [...byUrl.values()];
}

const codeOf = (status) => status?.code ?? Number(/\b(\d{3})\b/.exec(status?.text ?? "")?.[1]);
const errors = collect(report.error_map);
const dead = errors.filter((e) => DEAD.has(codeOf(e.status)));
const blocked = errors.filter((e) => BLOCKED.has(codeOf(e.status)));
const other = [
  ...errors.filter((e) => !DEAD.has(codeOf(e.status)) && !BLOCKED.has(codeOf(e.status))),
  ...collect(report.timeout_map),
];

const row = (e) => `| ${e.url} | ${e.status?.text ?? "unknown"} | ${[...e.pages].join(", ")} |`;
const section = (title, list) =>
  list.length === 0 ? [] : [`### ${title} (${list.length})`, "", "| Link | Result | Found on |", "| --- | --- | --- |", ...list.map(row), ""];

const lines = [
  "## Link check",
  "",
  `${report.total} links checked, ${report.unique ?? report.total} unique.`,
  "",
  ...(dead.length === 0 ? ["No dead links.", ""] : []),
  ...section("Dead links, fix these", dead),
  ...section("Blocked by the site, not failing", blocked),
  ...section("Other problems, not failing", other),
];
const text = lines.join("\n");
console.log(text);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);

// Warnings also show on the run's page, next to the failure if there is one.
for (const e of [...blocked, ...other]) console.log(`::warning title=Link not checked::${e.url} (${e.status?.text ?? "unknown"})`);
for (const e of dead) console.log(`::error title=Dead link::${e.url} on ${[...e.pages].join(", ")}`);

process.exit(dead.length > 0 ? 1 : 0);
