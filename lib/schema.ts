import { site } from "@/content/site";

const home = new URL("/", site.url).toString();

/** Other schema points at the Organization with `{ "@id": orgId }` instead of repeating it. */
export const orgId = `${home}#org`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  url: home,
  logo: new URL("/brand/png/icon-512.png", site.url).toString(),
  email: site.email,
  foundingLocation: { "@type": "Place", name: "Calgary, Alberta, Canada" },
  areaServed: { "@type": "Country", name: "Canada" },
  founder: { "@type": "Person", name: site.founder.name },
  ...(site.org.sameAs.length > 0 ? { sameAs: site.org.sameAs } : {}),
};

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: new URL(path, site.url).toString(),
    author: { "@type": "Person", name: site.founder.name, url: new URL("/about", site.url).toString() },
    publisher: { "@id": orgId },
    datePublished,
    dateModified,
  };
}

/** For city, guide and tool pages, e.g. Home › Calgary. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).toString(),
    })),
  };
}
