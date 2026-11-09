import { CityPage } from "@/components/city/city-page";
import { LivChecklist } from "@/components/mockups/liv-checklist";
import { strathconaCounty } from "@/content/strathcona-county";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...strathconaCounty.meta, path: "/strathcona-county" });

export default function StrathconaCountyPage() {
  return (
    <CityPage
      content={strathconaCounty}
      path="/strathcona-county"
      visual={<LivChecklist title="SCES Contractor Portal" className="mx-auto lg:mr-0" />}
    />
  );
}
