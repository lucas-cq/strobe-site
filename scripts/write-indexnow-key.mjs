/**
 * Runs before `next build`. IndexNow proves we own the site by fetching /<key>.txt, so this
 * writes that file from the INDEXNOW_KEY env var. Without the var there's nothing to serve.
 */
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.log("indexnow: INDEXNOW_KEY isn't set, no key file written");
  process.exit(0);
}
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.error("indexnow: INDEXNOW_KEY must be 8 to 128 letters, numbers or dashes");
  process.exit(1);
}

const publicDir = path.join(process.cwd(), "public");
// A rotated key shouldn't leave the old file behind.
for (const name of readdirSync(publicDir)) {
  if (name.endsWith(".txt")) rmSync(path.join(publicDir, name));
}
writeFileSync(path.join(publicDir, `${key}.txt`), key);
console.log("indexnow: key file written");
