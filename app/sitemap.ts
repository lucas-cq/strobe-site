import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/calgary", priority: 0.9 },
  { path: "/edmonton", priority: 0.9 },
  { path: "/pricing", priority: 0.8 },
  { path: "/early-access", priority: 0.7 },
  { path: "/your-data", priority: 0.4 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
