import { calgary } from "@/content/calgary";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Strobe for Calgary: ${calgary.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: calgary.title, eyebrow: "Calgary 311 deficiency reporting" });
}
