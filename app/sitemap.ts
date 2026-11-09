import type { MetadataRoute } from "next";
import { calgary } from "@/content/calgary";
import { edmonton } from "@/content/edmonton";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { privacy } from "@/content/privacy";
import { site } from "@/content/site";
import { terms } from "@/content/terms";
import { yourData } from "@/content/your-data";

// lastmod always comes from the page's own lastReviewed date, never the build time.
// /early-access is noindex, so it stays out.
const routes: { path: string; priority: number; lastReviewed: string }[] = [
  { path: "/", priority: 1, lastReviewed: home.lastReviewed },
  { path: "/calgary", priority: 0.9, lastReviewed: calgary.lastReviewed },
  { path: "/edmonton", priority: 0.9, lastReviewed: edmonton.lastReviewed },
  { path: "/pricing", priority: 0.8, lastReviewed: pricing.lastReviewed },
  { path: "/your-data", priority: 0.4, lastReviewed: yourData.lastReviewed },
  { path: "/privacy", priority: 0.2, lastReviewed: privacy.lastReviewed },
  { path: "/terms", priority: 0.2, lastReviewed: terms.lastReviewed },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, lastReviewed }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: lastReviewed,
    changeFrequency: "monthly",
    priority,
  }));
}
