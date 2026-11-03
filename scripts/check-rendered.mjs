/**
 * Runs after `next build` (see the "build" script). Fails the build if a template
 * placeholder such as {{LEGAL_ENTITY_NAME}} made it into the build output.
 *
 * It scans every text file Next wrote, not just the prerendered HTML, because on Vercel
 * the build adapter moves prerendered pages out of .next/server/app. Any placeholder in
 * page copy also lands in the server and client bundles, so it is still caught. The
 * pattern is a full placeholder ({{NAME}} or {{ name }}), not a bare "{{", which can
 * legitimately appear in minified JavaScript.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const roots = [".next", path.join(".vercel", "output")].map((r) => path.join(process.cwd(), r)).filter(existsSync);
const skipDirs = new Set(["cache", "dev", "node_modules", "types"]);
// Next's own config and manifests (copied into every Vercel function) contain built-in
// import templates like "@mui/icons-material/{{member}}". They never hold page copy.
const skipFiles = /(^|[\\/])(required-server-files\.(js|json)|[\w-]*manifest(\.\w+)*\.(js|json)|[^\\/]*\.nft\.json|\.vc-config\.json)$/;
const placeholder = /\{\{\s*[A-Za-z_][\w.]*\s*\}\}/;
const MAX_BYTES = 5 * 1024 * 1024;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (!skipDirs.has(name)) yield* walk(full);
    } else if (stat.size <= MAX_BYTES && !skipFiles.test(full)) {
      yield full;
    }
  }
}

const problems = [];
let checked = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    const bytes = readFileSync(file);
    if (bytes.includes(0)) continue; // binary files (images, fonts) can't hold copy
    checked++;
    const text = bytes.toString("utf8");
    const match = placeholder.exec(text);
    if (match) {
      const at = match.index;
      const snippet = text.slice(Math.max(0, at - 40), at + 60).replace(/\s+/g, " ");
      problems.push(`${path.relative(process.cwd(), file)}: …${snippet}…`);
    }
  }
}

if (checked === 0) {
  console.error("check-rendered: no build output found. Run it after `next build`.");
  process.exit(1);
}
if (problems.length) {
  console.error(`check-rendered: found a {{placeholder}} in ${problems.length} build file(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`check-rendered: ${checked} build files, no {{placeholders}}`);
