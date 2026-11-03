import { CityPage } from "@/components/city/city-page";
import { CalgaryPacket } from "@/components/mockups/calgary-packet";
import { calgary } from "@/content/calgary";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...calgary.meta, path: "/calgary", ownImage: true });

export default function CalgaryPage() {
  return <CityPage content={calgary} visual={<CalgaryPacket className="mx-auto lg:mr-0" />} />;
}
