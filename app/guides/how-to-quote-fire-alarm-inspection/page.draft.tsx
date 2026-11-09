import { GuidePage, guideMetadata } from "@/components/guides/guide-page";
import { quotingGuide as guide } from "@/content/guides/how-to-quote-fire-alarm-inspection";

export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
