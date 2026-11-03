import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { LOCKUP_CANVAS, LOCKUP_CROP } from "@/components/lockup";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// next/og can't read woff2, so fonts/og holds TTF copies of the two weights used here.
// Read synchronously at module load: async file reads would stop the images being prerendered.
const fontFile = (name: string) => readFileSync(path.join(process.cwd(), "fonts", "og", name));
const display = fontFile("InterDisplay-SemiBold.ttf");
const text = fontFile("Inter-Medium.ttf");
const lockupSrc = `data:image/svg+xml;base64,${readFileSync(
  path.join(process.cwd(), "public", "brand", "strobe-lockup-transparent-ink.svg"),
).toString("base64")}`;

/**
 * White card with the lockup, the page H1 and a thin gradient rule along the bottom.
 * Rendered at build time for each route that has an opengraph-image.tsx.
 */
export function renderOgImage({ title, eyebrow }: { title: string; eyebrow: string }) {
  // Show the lockup's visible artwork at 64px tall, cropping the SVG's built-in padding.
  const scale = 64 / LOCKUP_CROP.height;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px 0" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              overflow: "hidden",
              width: LOCKUP_CROP.width * scale,
              height: LOCKUP_CROP.height * scale,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
            <img
              src={lockupSrc}
              alt=""
              width={LOCKUP_CANVAS.width * scale}
              height={LOCKUP_CANVAS.height * scale}
              style={{ position: "absolute", left: -LOCKUP_CROP.x * scale, top: -LOCKUP_CROP.y * scale }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 88, fontSize: 28, color: "#4B3BE6", fontWeight: 500 }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              maxWidth: 1000,
              fontFamily: "Inter Display",
              fontSize: 76,
              textWrap: "balance",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#14112E",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 10,
            backgroundImage: "linear-gradient(90deg, #2B1A8C 0%, #4B3BE6 30%, #2E8BFF 65%, #8FE6FF 100%)",
          }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter Display", data: display, weight: 600, style: "normal" },
        { name: "Inter", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
