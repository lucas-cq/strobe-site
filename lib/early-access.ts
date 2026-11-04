import { z } from "zod";
import { earlyAccessForm } from "@/content/early-access";
import { type DetailsValues, type FormValues, hiddenFields, planIds } from "./early-access-shared";

export * from "./early-access-shared";

const { fields, errors } = earlyAccessForm;
const values = (options: { value: string }[]) => options.map((o) => o.value) as [string, ...string[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, errors.tooLong)
    .transform((s) => s || null);

/** Step 1: the fields everyone fills in. */
export const earlyAccessSchema = z.object({
  fullName: z.string().trim().min(1, errors.fullName).max(120, errors.tooLong),
  email: z.string().trim().toLowerCase().pipe(z.email(errors.email).max(254, errors.tooLong)),
  company: z.string().trim().min(1, errors.company).max(160, errors.tooLong),
  cities: z.array(z.enum(values(fields.cities.options))).min(1, errors.cities),
  techCount: z.enum(values(fields.techCount.options), errors.choose),
  city: optionalText(120),
  // Anything unexpected in the hidden field is dropped rather than shown as an error.
  plan: z.string().transform((s) => (planIds as readonly string[]).includes(s) ? s : null),
  consent: z.boolean(),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;

/** Step 2: optional details. Everything may be left blank. */
export const detailsSchema = z.object({
  currentMethod: z
    .union([z.literal(""), z.enum(values(fields.currentMethod.options))])
    .transform((s) => s || null),
  currentSoftware: optionalText(120),
  systems: z.array(z.enum(values(fields.systems.options))),
  phone: optionalText(40),
  notes: optionalText(fields.notes.maxLength),
});

export type DetailsInput = z.infer<typeof detailsSchema>;

const str = (formData: FormData, name: string) => {
  const v = formData.get(name);
  return typeof v === "string" ? v : "";
};
const all = (formData: FormData, name: string) =>
  formData.getAll(name).filter((v): v is string => typeof v === "string");

export function readFormValues(formData: FormData): FormValues {
  return {
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    company: str(formData, "company"),
    cities: all(formData, "cities"),
    techCount: str(formData, "techCount"),
    city: str(formData, "city"),
    plan: str(formData, hiddenFields.plan),
    consent: formData.get("consent") === "on",
  };
}

export function readDetailsValues(formData: FormData): DetailsValues {
  return {
    currentMethod: str(formData, "currentMethod"),
    currentSoftware: str(formData, "currentSoftware"),
    systems: all(formData, "systems"),
    phone: str(formData, "phone"),
    notes: str(formData, "notes"),
  };
}

export function firstNameOf(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "there";
}
