import { GuidePage, guideMetadata } from "@/components/guides/guide-page";
import { excelVsAppGuide as guide } from "@/content/guides/excel-vs-inspection-app";

export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
