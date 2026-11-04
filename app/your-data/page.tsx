import { LegalPage } from "@/components/legal-page";
import { yourData } from "@/content/your-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...yourData.meta, path: "/your-data" });

export default function YourDataPage() {
  return <LegalPage doc={yourData} />;
}
