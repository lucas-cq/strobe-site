import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
