/**
 * Runs before `next build` (see the "build" script). Fails the build if two routes share a
 * title or a meta description, so every page keeps its own in search results.
 *
 * It imports each app/**\/page.tsx and reads its `metadata` export, rather than reading the
 * built HTML: on Vercel the build adapter moves the prerendered pages out of the project
 * before any post-build step can see them.
 */
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

const appDir = path.join(process.cwd(), "app");
// The dev-only effects gallery isn't a real route.
const skipDirs = new Set(["dev", "actions"]);

function* pageFiles(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!skipDirs.has(name)) yield* pageFiles(full);
    } else if (name === "page.tsx") {
      yield full;
    }
  }
}

function titleOf(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title) return title.default;
  return undefined;
}

async function main() {
  const problems: string[] = [];
  const pages: { route: string; title?: string; description?: string }[] = [];

  for (const file of pageFiles(appDir)) {
    const route = `/${path.relative(appDir, path.dirname(file)).split(path.sep).join("/")}`.replace(/\/$/, "") || "/";
    const mod: { metadata?: Metadata; generateMetadata?: unknown } = await import(file);
    if (mod.generateMetadata) {
      problems.push(`${route} uses generateMetadata, which this check can't read. Export a metadata object, or extend the check.`);
      continue;
    }
    pages.push({
      route,
      title: titleOf(mod.metadata?.title),
      description: mod.metadata?.description ?? undefined,
    });
  }

  for (const field of ["title", "description"] as const) {
    const seen = new Map<string, string>();
    for (const page of pages) {
      const value = page[field];
      if (!value) {
        problems.push(`${page.route} has no ${field} of its own`);
        continue;
      }
      const other = seen.get(value);
      if (other) problems.push(`${other} and ${page.route} share the ${field} "${value}"`);
      else seen.set(value, page.route);
    }
  }

  if (problems.length) {
    console.error(`check-meta: ${problems.length} problem(s):\n${problems.join("\n")}`);
    process.exit(1);
  }
  console.log(`check-meta: ${pages.length} pages, every title and description is unique`);
}

main().catch((err) => {
  console.error("check-meta: couldn't read page metadata", err);
  process.exit(1);
});
