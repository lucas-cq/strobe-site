import { CityPage } from "@/components/city/city-page";
import { EmailCard } from "@/components/mockups/email-card";
import { fortMcMurray } from "@/content/fort-mcmurray";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...fortMcMurray.meta, path: "/fort-mcmurray" });

export default function FortMcMurrayPage() {
  return (
    <CityPage
      content={fortMcMurray}
      path="/fort-mcmurray"
      visual={<EmailCard to="Fire Prevention Branch" className="mx-auto lg:mr-0" />}
    />
  );
}
