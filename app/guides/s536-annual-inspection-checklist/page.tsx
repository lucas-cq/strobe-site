import { GuidePage, guideMetadata } from "@/components/guides/guide-page";
import { s536ChecklistGuide as guide } from "@/content/guides/s536-annual-inspection-checklist";

export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
