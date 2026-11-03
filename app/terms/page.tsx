import { LegalPage } from "@/components/legal-page";
import { terms } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

// Draft, pending legal review.
export const metadata = pageMetadata({ ...terms.meta, path: "/terms" });

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
