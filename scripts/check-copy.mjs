/** Runs before `next build`. The voice rules ban em dashes, so one in the source fails the build. */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const EM_DASH = "—";
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|csv)$/.test(entry.name)) {
      readFileSync(full, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (line.includes(EM_DASH)) hits.push(`${full}:${i + 1}`);
        });
    }
  }
}

for (const dir of ["app", "components", "content", "lib"]) walk(dir);

if (hits.length) {
  console.error(`check-copy: em dash found in:\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("check-copy: no em dashes");
