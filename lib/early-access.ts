import { z } from "zod";
import { earlyAccessForm } from "@/content/early-access";
import type { FormValues } from "./early-access-shared";

export * from "./early-access-shared";

const { fields, errors } = earlyAccessForm;
const values = (options: { value: string }[]) => options.map((o) => o.value) as [string, ...string[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, errors.tooLong)
    .transform((s) => s || null);

export const earlyAccessSchema = z.object({
  fullName: z.string().trim().min(1, errors.fullName).max(120, errors.tooLong),
  email: z.string().trim().toLowerCase().pipe(z.email(errors.email).max(254, errors.tooLong)),
  company: z.string().trim().min(1, errors.company).max(160, errors.tooLong),
  phone: optionalText(40),
  cities: z.array(z.enum(values(fields.cities.options))).min(1, errors.cities),
  techCount: z.enum(values(fields.techCount.options), errors.choose),
  currentMethod: z.enum(values(fields.currentMethod.options), errors.choose),
  currentSoftware: optionalText(120),
  systems: z.array(z.enum(values(fields.systems.options))),
  notes: optionalText(fields.notes.maxLength),
  consent: z.boolean(),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

export function readFormValues(formData: FormData): FormValues {
  const str = (name: string) => {
    const v = formData.get(name);
    return typeof v === "string" ? v : "";
  };
  return {
    fullName: str("fullName"),
    email: str("email"),
    company: str("company"),
    phone: str("phone"),
    cities: formData.getAll("cities").filter((v): v is string => typeof v === "string"),
    techCount: str("techCount"),
    currentMethod: str("currentMethod"),
    currentSoftware: str("currentSoftware"),
    systems: formData.getAll("systems").filter((v): v is string => typeof v === "string"),
    notes: str("notes"),
    consent: formData.get("consent") === "on",
  };
}

export function firstNameOf(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "there";
}
