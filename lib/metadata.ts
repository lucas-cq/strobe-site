import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Page metadata with a canonical URL and matching Open Graph and Twitter tags.
 * Titles are absolute and must pair "Strobe" with what it is (see the name rule in the brief).
 * Open Graph images come from the nearest opengraph-image.tsx file.
 */
export function pageMetadata({
  title,
  description,
  path,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  /** True when the route has its own opengraph-image.tsx. */
  ownImage?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Strobe",
      locale: "en_CA",
      url: path,
      title,
      description,
      // A page-level openGraph replaces the parent's, so point back at the shared image
      // unless the route generates its own.
      ...(ownImage
        ? {}
        : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Strobe, fire inspection software for Alberta" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const homeMetadata = pageMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
  ownImage: true,
});
