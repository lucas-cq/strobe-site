import { home } from "@/content/home";
import { jurisdictionById } from "@/content/jurisdictions";
import { JurisdictionCard } from "../jurisdiction-card";
import { StepApprove, StepInspect, StepQuote, StepReport } from "../mockups/how-steps";
import { Section, SectionHeader } from "../section";
import { StepSwitcher } from "./step-switcher";

/** The five steps from inspection to city filing (STROBE_SITE_CANADA.md section 6), on the dark band. */
export function HowItWorks() {
  const { how } = home;
  const visuals = [
    { visual: <StepInspect /> },
    { visual: <StepReport />, wide: true },
    { visual: <StepQuote /> },
    { visual: <StepApprove /> },
    { visual: <JurisdictionCard jurisdiction={jurisdictionById("calgary")} decorative className="w-full max-w-[460px]" /> },
  ];
  const steps = how.steps.map((step, i) => ({ ...step, ...visuals[i] }));

  return (
    <Section id="how-it-works" tone="night" labelledBy="how-title">
      <SectionHeader id="how-title" eyebrow={how.eyebrow} title={how.title} lede={how.lede} dark />
      <StepSwitcher steps={steps} />
    </Section>
  );
}
