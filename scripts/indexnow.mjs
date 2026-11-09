/**
 * Tells IndexNow which pages changed in the latest commit. Run by
 * .github/workflows/indexnow.yml once Vercel has finished deploying main.
 *
 *   INDEXNOW_KEY=... node scripts/indexnow.mjs [--dry-run]
 *
 * Only URLs in the live sitemap are sent, so noindex pages and drafts can never go out.
 */
import { execFileSync } from "node:child_process";

const SITE = "https://strobehq.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

// Pages whose copy lives in content/ rather than in their app/ folder.
const contentRoutes = {
  "content/home.ts": "/",
  "content/faq.ts": "/",
  "content/calgary.ts": "/calgary",
  "content/edmonton.ts": "/edmonton",
  "content/pricing.ts": "/pricing",
  "content/your-data.ts": "/your-data",
  "content/privacy.ts": "/privacy",
  "content/terms.ts": "/terms",
};

function routeFor(file) {
  if (contentRoutes[file]) return contentRoutes[file];
  const page = file.match(/^app\/(?:(.+)\/)?page\.tsx$/);
  if (page) return `/${page[1] ?? ""}`;
  return null;
}

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.log("indexnow: INDEXNOW_KEY isn't set, skipping");
  process.exit(0);
}

const changed = execFileSync("git", ["diff", "--name-only", "HEAD~1", "HEAD"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
const routes = new Set(changed.map(routeFor).filter(Boolean));

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const published = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const urlList = [...routes].map((route) => new URL(route, SITE).toString()).filter((url) => published.has(url));

if (urlList.length === 0) {
  console.log("indexnow: no published pages changed");
  process.exit(0);
}

const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList };
if (dryRun) {
  console.log("indexnow: would send", JSON.stringify(urlList));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
if (!res.ok) {
  console.error(`indexnow: ${res.status} ${await res.text()}`);
  process.exit(1);
}
console.log(`indexnow: sent ${urlList.length} URL(s), status ${res.status}`);
