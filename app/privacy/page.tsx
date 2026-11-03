import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/content/privacy";
import { pageMetadata } from "@/lib/metadata";

// Draft, pending legal review.
export const metadata = pageMetadata({ ...privacy.meta, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
