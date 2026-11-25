import { CityPage } from "@/components/city/city-page";
import { CityClock } from "@/components/mockups/city-clock";
import { medicineHat } from "@/content/medicine-hat";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...medicineHat.meta, path: "/medicine-hat" });

export default function MedicineHatPage() {
  return (
    <CityPage
      content={medicineHat}
      path="/medicine-hat"
      visual={<CityClock city="Medicine Hat" unit="days since the deficiency was found" limit={10} className="mx-auto max-w-[460px] lg:mr-0" />}
    />
  );
}
