import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";

export function ForOwners() {
  const { owners } = home;
  return (
    <Section tone="surface" labelledBy="owners-title">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
        <SectionHeader id="owners-title" eyebrow={owners.eyebrow} title={owners.title} />
        <p className="reveal text-lg text-ink-2 lg:pt-9">{owners.body}</p>
      </div>
    </Section>
  );
}
