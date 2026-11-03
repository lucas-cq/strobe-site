import { edmonton } from "@/content/edmonton";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Strobe for Edmonton: ${edmonton.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: edmonton.title, eyebrow: "Edmonton LIV report uploads" });
}
