import { CityPage } from "@/components/city/city-page";
import { LivChecklist } from "@/components/mockups/liv-checklist";
import { edmonton } from "@/content/edmonton";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...edmonton.meta, path: "/edmonton", ownImage: true });

export default function EdmontonPage() {
  return <CityPage content={edmonton} visual={<LivChecklist className="mx-auto lg:mr-0" />} />;
}
