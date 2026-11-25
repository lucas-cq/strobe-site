import { CityPage } from "@/components/city/city-page";
import { CityClock, type SystemRow } from "@/components/mockups/city-clock";
import { grandePrairie } from "@/content/grande-prairie";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...grandePrairie.meta, path: "/grande-prairie" });

// Grande Prairie addresses don't use quadrants, and the rule here isn't about impairments.
const sampleRows: SystemRow[] = [
  { system: "Fire Alarm", site: "1200 Sample Ave", day: 9 },
  { system: "Fire Alarm", site: "455 Oak St", day: 6 },
  { system: "Fire Alarm", site: "88 Elm St", day: 3 },
];

export default function GrandePrairiePage() {
  return (
    <CityPage
      content={grandePrairie}
      path="/grande-prairie"
      visual={<CityClock city="Grande Prairie" unit="days to notify" limit={10} rows={sampleRows} className="mx-auto max-w-[460px] lg:mr-0" />}
    />
  );
}
