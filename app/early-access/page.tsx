import { EarlyAccessSection } from "@/components/early-access-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Get early access | Strobe fire alarm inspection software",
  description:
    "Apply for early access to Strobe, fire alarm inspection software for Canadian shops. Free onboarding, and your data stays yours.",
  path: "/early-access",
});

export default function EarlyAccessPage() {
  return <EarlyAccessSection asPageTitle />;
}
