import { CityPage } from "@/components/city/city-page";
import { EmailCard } from "@/components/mockups/email-card";
import { lethbridge } from "@/content/lethbridge";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...lethbridge.meta, path: "/lethbridge" });

export default function LethbridgePage() {
  return <CityPage content={lethbridge} path="/lethbridge" visual={<EmailCard className="mx-auto lg:mr-0" />} />;
}
