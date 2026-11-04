/**
 * Runs after `next build` (see the "build" script). Fails the build if two routes share a
 * <title> or a meta description, so every page keeps its own in search results.
 *
 * It reads the prerendered HTML. Locally that's .next/server/app; on Vercel the build adapter
 * may move it, so .vercel/output is scanned too. If no pages are found at all it warns rather
 * than fails, because the files may simply be elsewhere on that platform.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const roots = [path.join(".next", "server", "app"), path.join(".vercel", "output")]
  .map((r) => path.join(process.cwd(), r))
  .filter(existsSync);
// Error pages and the dev-only effects gallery aren't real routes.
const skip = /(^|[\\/])(_not-found|_global-error|404|500|dev)([\\/.]|$)/;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) yield* htmlFiles(full);
    else if (name.endsWith(".html")) yield full;
  }
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** /calgary from .../app/calgary.html or .../static/calgary/index.html */
function routeOf(root, file) {
  let rel = path.relative(root, file).split(path.sep).join("/");
  rel = rel.replace(/^(static|functions)\//, "").replace(/(\.prerender-fallback)?\.html$/, "").replace(/(^|\/)index$/, "");
  return `/${rel}`;
}

const pages = new Map(); // route -> { title, description }
for (const root of roots) {
  for (const file of htmlFiles(root)) {
    const route = routeOf(root, file);
    if (skip.test(route)) continue;
    const html = readFileSync(file, "utf8");
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (!title) continue;
    pages.set(route, { title: decode(title), description: description ? decode(description) : "" });
  }
}

if (pages.size === 0) {
  console.warn("check-meta: no prerendered pages found, so titles and descriptions weren't checked.");
  process.exit(0);
}

const problems = [];
for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const [route, meta] of pages) {
    if (!meta[field]) {
      problems.push(`${route} has no ${field}`);
      continue;
    }
    const other = seen.get(meta[field]);
    if (other) problems.push(`${other} and ${route} share the ${field} "${meta[field]}"`);
    else seen.set(meta[field], route);
  }
}

if (problems.length) {
  console.error(`check-meta: ${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`check-meta: ${pages.size} pages, every title and description is unique`);
