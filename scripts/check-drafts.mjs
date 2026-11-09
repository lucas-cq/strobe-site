/**
 * Runs after `next build`. Draft guides live at app/guides/<slug>/page.draft.tsx, which next.config.ts
 * only treats as a page in preview and dev. This fails the build if a draft's flag and file disagree,
 * if anything links to a draft, or if a draft reached a production build.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const guidesDir = "app/guides";
const contentDir = "content/guides";
const problems = [];

const drafts = readdirSync(guidesDir).filter((slug) => existsSync(path.join(guidesDir, slug, "page.draft.tsx")));

for (const slug of drafts) {
  const content = path.join(contentDir, `${slug}.ts`);
  if (!existsSync(content) || !readFileSync(content, "utf8").includes("published: false")) {
    problems.push(`${slug}: page.draft.tsx needs ${content} with published: false`);
  }
  if (existsSync(path.join(guidesDir, slug, "page.tsx"))) problems.push(`${slug}: has both page.tsx and page.draft.tsx`);
}
for (const file of readdirSync(contentDir)) {
  const slug = file.replace(/\.ts$/, "");
  if (readFileSync(path.join(contentDir, file), "utf8").includes("published: false") && !drafts.includes(slug)) {
    problems.push(`${slug}: marked published: false but has no page.draft.tsx, so it would be a live page`);
  }
}

function* walk(dir, skip = new Set()) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!skip.has(name)) yield* walk(full, skip);
    } else {
      yield full;
    }
  }
}

// Drafts mustn't be linked from anywhere, or listed in the hub or the sitemap.
for (const dir of ["app", "components", "content", "lib"]) {
  for (const file of walk(dir)) {
    const text = readFileSync(file, "utf8");
    for (const slug of drafts) {
      const own = file.startsWith(path.join(guidesDir, slug)) || file === path.join(contentDir, `${slug}.ts`);
      if (!own && text.includes(slug)) problems.push(`${file} mentions the draft ${slug}`);
    }
  }
}

// Previews are allowed to have them. Everything else, including a local build, isn't.
let scanned = 0;
if (process.env.VERCEL_ENV !== "preview") {
  const roots = [".next", path.join(".vercel", "output")].filter(existsSync);
  for (const root of roots) {
    for (const file of walk(root, new Set(["cache", "dev", "node_modules", "types"]))) {
      if (statSync(file).size > 5 * 1024 * 1024) continue;
      const bytes = readFileSync(file);
      if (bytes.includes(0)) continue;
      scanned++;
      const text = bytes.toString("utf8");
      for (const slug of drafts) {
        if (text.includes(slug)) problems.push(`${file} contains the draft ${slug}`);
      }
    }
  }
}

if (problems.length) {
  console.error(`check-drafts: ${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(
  process.env.VERCEL_ENV === "preview"
    ? `check-drafts: ${drafts.length} drafts, allowed in this preview build`
    : `check-drafts: ${drafts.length} drafts, none in ${scanned} build files`,
);
