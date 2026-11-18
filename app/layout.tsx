import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { AttributionCapture } from "@/components/attribution";
import { JsonLd } from "@/components/json-ld";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

// Latin subsets of IBM Plex Sans and Plex Mono. See fonts/web/README.md.
const plex = localFont({
  src: [
    { path: "../fonts/web/IBMPlexSans-Regular.latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/web/IBMPlexSans-Medium.latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/web/IBMPlexSans-SemiBold.latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Device numbers and panel addresses in the product mockups.
const plexMono = localFont({
  src: [
    { path: "../fonts/web/IBMPlexMono-Regular.latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/web/IBMPlexMono-Medium.latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.defaultTitle,
  description: site.defaultDescription,
  applicationName: "Strobe",
  openGraph: { type: "website", siteName: "Strobe", locale: "en_CA" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#00708F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next 16 only scrolls new pages to the very top instantly when this is set,
    // since globals.css makes html scroll smoothly for in-page anchors.
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      className={`${plex.variable} ${plexMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={organizationSchema} />
        <a
          href="#main"
          className="sr-only z-50 rounded-button bg-brand px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {site.skipLink}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <AttributionCapture />
        <RevealObserver />
        {/* Cookieless. Only on Vercel, where the /_vercel/insights endpoint exists. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
