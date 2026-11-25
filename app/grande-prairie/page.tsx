import { CityPage } from "@/components/city/city-page";
import { CityClock } from "@/components/mockups/city-clock";
import { grandePrairie } from "@/content/grande-prairie";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...grandePrairie.meta, path: "/grande-prairie" });

export default function GrandePrairiePage() {
  return (
    <CityPage
      content={grandePrairie}
      path="/grande-prairie"
      visual={<CityClock city="Grande Prairie" unit="days to notify" limit={10} className="mx-auto max-w-[460px] lg:mr-0" />}
    />
  );
}
