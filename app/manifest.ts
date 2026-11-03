import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Strobe",
    short_name: "Strobe",
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#4B3BE6",
    icons: [
      { src: "/brand/png/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/png/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/png/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
