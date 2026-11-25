import { GuidePage, guideMetadata } from "@/components/guides/guide-page";
import { livUploadGuide as guide } from "@/content/guides/edmonton-liv-upload";

export const metadata = guideMetadata(guide);

export default function Page() {
  return <GuidePage guide={guide} />;
}
