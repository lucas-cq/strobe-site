import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Brand images carry their version in the name (icon-512-v2.png): a changed image gets a
  // new name, never the same path, so a versioned one can be kept a year. Plain names keep
  // Vercel's default (checked every time).
  headers() {
    return Promise.resolve([
      {
        source: "/brand/:path*-v:version(\\d+).:ext(png|svg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]);
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

/**
 * Draft guides are named page.draft.tsx. Only preview deployments and `next dev` treat that as a
 * page, so a production build has no route for them at all. See content/guide-types.ts.
 */
export default function config(phase: string): NextConfig {
  const showDrafts = phase === PHASE_DEVELOPMENT_SERVER || process.env.VERCEL_ENV === "preview";
  return showDrafts ? { ...nextConfig, pageExtensions: ["draft.tsx", "tsx", "ts", "jsx", "js"] } : nextConfig;
}
