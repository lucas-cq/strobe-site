import type { MetadataRoute } from "next";
import { about } from "@/content/about";
import { calgary } from "@/content/calgary";
import { edmonton } from "@/content/edmonton";
import { reportRulesGuide } from "@/content/guide-report-rules";
import { guidesHub } from "@/content/guides-hub";
import { home } from "@/content/home";
import { lethbridge } from "@/content/lethbridge";
import { pricing } from "@/content/pricing";
import { privacy } from "@/content/privacy";
import { reportRulesGuidePath, site } from "@/content/site";
import { strathconaCounty } from "@/content/strathcona-county";
import { terms } from "@/content/terms";
import { deadlineTool } from "@/content/tool-deadline";
import { deviceTemplate } from "@/content/tool-device-template";
import { toolsIndex } from "@/content/tools";
import { yourData } from "@/content/your-data";

// lastmod always comes from the page's own lastReviewed date, never the build time.
// /early-access is noindex, so it stays out.
const routes: { path: string; priority: number; lastReviewed: string }[] = [
  { path: "/", priority: 1, lastReviewed: home.lastReviewed },
  { path: "/calgary", priority: 0.9, lastReviewed: calgary.lastReviewed },
  { path: "/edmonton", priority: 0.9, lastReviewed: edmonton.lastReviewed },
  { path: "/strathcona-county", priority: 0.9, lastReviewed: strathconaCounty.lastReviewed },
  { path: "/lethbridge", priority: 0.9, lastReviewed: lethbridge.lastReviewed },
  { path: "/pricing", priority: 0.8, lastReviewed: pricing.lastReviewed },
  { path: guidesHub.path, priority: 0.7, lastReviewed: guidesHub.lastReviewed },
  { path: reportRulesGuidePath, priority: 0.8, lastReviewed: reportRulesGuide.lastReviewed },
  { path: toolsIndex.path, priority: 0.6, lastReviewed: toolsIndex.lastReviewed },
  { path: deadlineTool.path, priority: 0.8, lastReviewed: deadlineTool.lastReviewed },
  { path: deviceTemplate.path, priority: 0.7, lastReviewed: deviceTemplate.lastReviewed },
  { path: "/about", priority: 0.5, lastReviewed: about.lastReviewed },
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
