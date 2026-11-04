/**
 * Runs after `next build` (see the "build" script). Fails the build if two routes share a
 * <title> or a meta description, so every page keeps its own in search results.
 *
 * It reads the prerendered HTML. Locally that's .next/server/app. On Vercel, the build adapter
 * moves it into the Build Output API folder, /vercel/output (outside the project), where a page
 * may be saved without a .html extension, so files there are recognised by their content.
 * If no pages are found at all it warns and lists what it saw, rather than failing the deploy.
 */
import { closeSync, existsSync, openSync, readFileSync, readSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const roots = [
  path.join(process.cwd(), ".next", "server", "app"),
  path.join(process.cwd(), ".vercel", "output"),
  ...(process.env.VERCEL ? ["/vercel/output"] : []),
].filter(existsSync);
// Error pages and the dev-only effects gallery aren't real routes.
const skip = /(^|[\\/])(_not-found|_global-error|404|500|dev)([\\/.]|$)/;

const MAX_BYTES = 5 * 1024 * 1024;

/** True when the file starts like an HTML document, whatever its name. */
function looksLikeHtml(file) {
  const fd = openSync(file, "r");
  const head = Buffer.alloc(64);
  const n = readSync(fd, head, 0, head.length, 0);
  closeSync(fd);
  return /^\s*<!doctype html/i.test(head.subarray(0, n).toString("utf8"));
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = statSync(full);
    // Function bundles (*.func) hold server code, not pages
    if (stat.isDirectory()) {
      if (!name.endsWith(".func") && name !== "node_modules") yield* htmlFiles(full);
    } else if (stat.size <= MAX_BYTES && /(\.html|^[^.]+)$/.test(name) && looksLikeHtml(full)) {
      yield full;
    }
  }
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** /calgary from .../app/calgary.html, .../functions/calgary.prerender-fallback.html or .../static/calgary */
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
  console.warn(`check-meta: no prerendered pages found, so titles and descriptions weren't checked. Looked in: ${roots.join(", ") || "nothing (no output folders exist)"}`);
  for (const root of roots) {
    const sample = readdirSync(root).slice(0, 15).join(", ");
    console.warn(`  ${root}: ${sample}`);
  }
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
