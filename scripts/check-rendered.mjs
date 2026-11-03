/**
 * Runs after `next build` (see the "build" script). Fails the build if any prerendered
 * page still contains "{{", which would mean a template placeholder slipped through.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "server", "app");
const rendered = /\.(html|rsc|body)$/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (rendered.test(name)) yield full;
  }
}

const problems = [];
let checked = 0;
for (const file of walk(root)) {
  const bytes = readFileSync(file);
  if (bytes.includes(0)) continue; // binary bodies (OG images, icons) aren't pages
  checked++;
  const text = bytes.toString("utf8");
  const at = text.indexOf("{{");
  if (at !== -1) {
    const snippet = text.slice(Math.max(0, at - 40), at + 60).replace(/\s+/g, " ");
    problems.push(`${path.relative(process.cwd(), file)}: …${snippet}…`);
  }
}

if (checked === 0) {
  console.error("check-rendered: no prerendered pages found. Run it after `next build`.");
  process.exit(1);
}
if (problems.length) {
  console.error(`check-rendered: found "{{" in ${problems.length} rendered file(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`check-rendered: ${checked} rendered files, no "{{" placeholders`);
