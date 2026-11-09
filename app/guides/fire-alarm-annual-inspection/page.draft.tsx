import { GuidePage, guideMetadata } from "@/components/guides/guide-page";
import { annualInspectionGuide as guide } from "@/content/guides/fire-alarm-annual-inspection";

export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
