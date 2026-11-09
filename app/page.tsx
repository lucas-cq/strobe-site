import { EarlyAccessSection } from "@/components/early-access-section";
import { Cities } from "@/components/home/cities";
import { CityDeadline } from "@/components/home/city-deadline";
import { EarlyAccessBento } from "@/components/home/early-access-bento";
import { Faq } from "@/components/home/faq";
import { FounderNote } from "@/components/home/founder-note";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Problem } from "@/components/home/problem";
import { Switching } from "@/components/home/switching";
import { ProofStrip } from "@/components/proof-strip";
import { home } from "@/content/home";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { homeMetadata } from "@/lib/metadata";
import { orgId } from "@/lib/schema";

export const metadata = homeMetadata;

// No review, rating or offer fields: Strobe is in early access and prices aren't public yet.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Strobe",
  url: site.url,
  description: site.defaultDescription,
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android, Web",
  areaServed: { "@type": "Country", name: "Canada" },
  publisher: { "@id": orgId },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <ProofStrip label={home.proof.label} items={home.proof.items} />
      <Problem />
      <HowItWorks />
      <Cities />
      <Switching />
      <CityDeadline />
      <EarlyAccessBento />
      <FounderNote />
      <Faq />
      <EarlyAccessSection />
    </>
  );
}
