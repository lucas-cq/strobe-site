import { home } from "@/content/home";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Strobe, fire inspection software for Alberta: ${home.hero.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: home.hero.title, eyebrow: "Fire and life safety inspection software for Alberta" });
}
