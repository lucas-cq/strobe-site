import { home } from "@/content/home";
import { Section, SectionHeader } from "../section";
import { CitySelector } from "./city-selector";

/** "Every city files differently": the interactive city selector (STROBE_SITE_CANADA.md section 7). */
export function Cities() {
  const { cities } = home;
  return (
    <Section id="cities" labelledBy="cities-title">
      <SectionHeader id="cities-title" eyebrow={cities.eyebrow} title={cities.title} lede={cities.lede} />
      <CitySelector />
    </Section>
  );
}
