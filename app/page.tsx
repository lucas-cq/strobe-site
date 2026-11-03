import { EarlyAccessSection } from "@/components/early-access-section";
import { Cities } from "@/components/home/cities";
import { CityDeadline } from "@/components/home/city-deadline";
import { EarlyAccessBento } from "@/components/home/early-access-bento";
import { Faq } from "@/components/home/faq";
import { FounderNote } from "@/components/home/founder-note";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Problem } from "@/components/home/problem";
import { ProofStrip } from "@/components/proof-strip";
import { home } from "@/content/home";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata;

// No review, rating or offer fields: Strobe is in early access and has none to show.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "Strobe",
      url: site.url,
      logo: `${site.url}/brand/png/icon-512.png`,
      email: site.email,
      areaServed: { "@type": "AdministrativeArea", name: "Alberta" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Strobe",
      url: site.url,
      description: site.defaultDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <ProofStrip label={home.proof.label} items={home.proof.items} />
      <Problem />
      <HowItWorks />
      <CityDeadline />
      <Cities />
      <EarlyAccessBento />
      <FounderNote />
      <Faq />
      <EarlyAccessSection />
    </>
  );
}
