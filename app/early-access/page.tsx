import { EarlyAccessSection } from "@/components/early-access-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Get early access | Strobe fire inspection software for Alberta",
  description:
    "Apply for early access to Strobe, fire and life safety inspection software for Alberta contractors. Flat price per shop, not per tech.",
  path: "/early-access",
});

export default function EarlyAccessPage() {
  return <EarlyAccessSection asPageTitle />;
}
