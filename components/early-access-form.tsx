"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { type ReactNode, useActionState, useEffect, useRef, useState } from "react";
import { submitEarlyAccess } from "@/app/actions/early-access";
import { earlyAccessForm as copy } from "@/content/early-access";
import {
  type EarlyAccessState,
  type FieldErrors,
  type FieldName,
  type FormValues,
  hiddenFields,
  initialEarlyAccessState,
} from "@/lib/early-access-shared";
import { type Attribution, readAttribution } from "./attribution";
import { hasCalLink } from "./cal-booking";
import { Turnstile } from "./turnstile";
import { buttonClasses } from "./ui";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Cal.com's embed is only needed after a successful submission, so it loads then.
const CalInline = dynamic(() => import("./cal-inline").then((m) => m.CalInline), {
  ssr: false,
  loading: () => <div className="h-[640px] w-full animate-pulse bg-surface" />,
});

// Visual order of fields, used to focus the first one with an error.
const fieldOrder: FieldName[] = [
  "fullName",
  "email",
  "company",
  "phone",
  "cities",
  "techCount",
  "currentMethod",
  "currentSoftware",
  "systems",
  "notes",
];

export function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(submitEarlyAccess, initialEarlyAccessState);

  if (state.status === "success") {
    return <SuccessState firstName={state.firstName} fullName={state.fullName} email={state.email} />;
  }
  // Remount on every response so defaults reflect what was sent back and Turnstile issues a fresh token.
  return <FormBody key={state.attempt} state={state} action={formAction} pending={pending} />;
}

function FormBody({
  state,
  action,
  pending,
}: {
  state: EarlyAccessState;
  action: (formData: FormData) => void;
  pending: boolean;
}) {
  const values: Partial<FormValues> = state.status === "error" ? state.values : {};
  const errors: FieldErrors = state.status === "error" ? state.fieldErrors : {};
  const formRef = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState(values.currentMethod ?? "");
  const [notesLength, setNotesLength] = useState(values.notes?.length ?? 0);
  const attributionRef = useRef<HTMLDivElement>(null);
  const [pendingCheck, setPendingCheck] = useState(false);

  // Fill the hidden attribution inputs from session storage (browser only).
  useEffect(() => {
    const data = readAttribution();
    attributionRef.current?.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.value = data[input.name as keyof Attribution] ?? "";
    });
  }, []);

  // After an error, move focus to the first field that needs fixing.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = fieldOrder.find((f) => state.fieldErrors[f]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
  }, [state]);

  const f = copy.fields;

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={(e) => {
        // Turnstile issues its token a second or two after it loads. Don't spend a submission before then.
        const token = formRef.current?.querySelector<HTMLInputElement>(`[name="${hiddenFields.turnstile}"]`)?.value;
        if (turnstileSiteKey && !token) {
          e.preventDefault();
          setPendingCheck(true);
        }
      }}
      noValidate
      className="space-y-6"
      aria-describedby="form-status"
    >

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="fullName" label={f.fullName.label} autoComplete="name" required defaultValue={values.fullName} error={errors.fullName} />
        <TextField name="email" type="email" label={f.email.label} autoComplete="email" required defaultValue={values.email} error={errors.email} />
        <TextField name="company" label={f.company.label} autoComplete="organization" required defaultValue={values.company} error={errors.company} />
        <TextField name="phone" type="tel" label={f.phone.label} hint={f.phone.hint} autoComplete="tel" defaultValue={values.phone} error={errors.phone} />
      </div>

      <CheckboxGroup
        name="cities"
        legend={f.cities.label}
        hint={f.cities.hint}
        options={f.cities.options}
        defaultValues={values.cities}
        error={errors.cities}
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          name="techCount"
          label={f.techCount.label}
          placeholder={f.techCount.placeholder}
          options={f.techCount.options}
          defaultValue={values.techCount}
          error={errors.techCount}
        />
        <SelectField
          name="currentMethod"
          label={f.currentMethod.label}
          placeholder={f.currentMethod.placeholder}
          options={f.currentMethod.options}
          defaultValue={values.currentMethod}
          error={errors.currentMethod}
          onChange={setMethod}
        />
      </div>

      {method === copy.softwareMethod && (
        <TextField
          name="currentSoftware"
          label={f.currentSoftware.label}
          hint={f.currentSoftware.hint}
          defaultValue={values.currentSoftware}
          error={errors.currentSoftware}
        />
      )}

      <CheckboxGroup
        name="systems"
        legend={f.systems.label}
        hint={f.systems.hint}
        options={f.systems.options}
        defaultValues={values.systems}
        error={errors.systems}
        columns
      />

      <Field name="notes" label={f.notes.label} hint={f.notes.hint} error={errors.notes}>
        {(props) => (
          <>
            <textarea
              {...props}
              rows={4}
              maxLength={f.notes.maxLength}
              defaultValue={values.notes}
              onChange={(e) => setNotesLength(e.target.value.length)}
              className={`${inputClasses(!!errors.notes)} min-h-28 py-3`}
            />
            <p className="tabular mt-1.5 text-right text-xs text-muted" aria-hidden="true">
              {notesLength.toLocaleString("en-CA")} / {f.notes.maxLength.toLocaleString("en-CA")}
            </p>
          </>
        )}
      </Field>

      <label className="flex cursor-pointer items-start gap-3 rounded-button border border-line p-4">
        <input
          type="checkbox"
          name="consent"
          defaultChecked={values.consent ?? false}
          className="mt-0.5 size-[18px] shrink-0 accent-indigo"
        />
        <span className="text-[15px] text-ink-2">{f.consent.label}</span>
      </label>

      {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name={hiddenFields.honeypot} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div ref={attributionRef} hidden>
        <input type="hidden" name={hiddenFields.utmSource} />
        <input type="hidden" name={hiddenFields.utmMedium} />
        <input type="hidden" name={hiddenFields.utmCampaign} />
        <input type="hidden" name={hiddenFields.referrer} />
        <input type="hidden" name={hiddenFields.landingPath} />
      </div>

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} />}

      {/* Form-level messages sit by the button, where the person is looking when they submit. */}
      <div id="form-status" role="alert" aria-live="assertive">
        {(pendingCheck || state.status === "error") && (
          <p className="rounded-button border border-fail-ink/30 bg-fail/[0.06] px-4 py-3 text-[15px] font-medium text-fail-ink">
            {pendingCheck ? copy.errors.turnstilePending : state.status === "error" && state.message}
          </p>
        )}
      </div>

      <div>
        <button type="submit" disabled={pending} className={`${buttonClasses("primary", "lg")} w-full`}>
          {pending ? copy.submitting : copy.submit}
        </button>
        <p className="mt-3 text-center text-sm text-muted">
          {copy.privacyNote.before}
          <Link href="/privacy" className="font-medium text-ink-2 underline underline-offset-4 hover:text-ink">
            {copy.privacyNote.link}
          </Link>
          {copy.privacyNote.after}
        </p>
      </div>
    </form>
  );
}

function SuccessState({ firstName, fullName, email }: { firstName: string; fullName: string; email: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div className="text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex size-12 items-center justify-center rounded-full bg-pass/10 text-pass-ink"
      >
        <svg viewBox="0 0 16 16" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl text-ink focus:outline-none md:text-3xl">
        {copy.success.title(firstName)}
      </h3>
      <p className="mt-3 text-lg text-ink-2">{copy.success.body}</p>
      {hasCalLink && (
        <>
          <p className="mt-8 font-medium text-ink">{copy.success.bookPrompt}</p>
          <div className="mt-4 overflow-hidden rounded-card border border-line text-left">
            <CalInline name={fullName} email={email} />
          </div>
        </>
      )}
    </div>
  );
}

/* Field primitives */

function inputClasses(invalid: boolean) {
  return `block w-full rounded-button border bg-white px-3.5 text-base text-ink placeholder:text-muted transition-colors ${
    invalid ? "border-fail-ink" : "border-field hover:border-muted"
  }`;
}

type ControlProps = {
  id: string;
  name: string;
  "data-field": string;
  "aria-invalid": boolean | undefined;
  "aria-describedby": string | undefined;
};

function Field({
  name,
  label,
  hint,
  error,
  required,
  children,
}: {
  name: FieldName;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = `ea-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] font-medium text-ink">
          {label}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="text-sm text-muted">
            {hint}
          </span>
        )}
      </div>
      <div className="mt-1.5">
        {children({ id, name, "data-field": name, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-fail-ink">
      <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm-.75 3.25h1.5v4.5h-1.5v-4.5Zm0 5.75h1.5V12h-1.5v-1.5Z" />
      </svg>
      {children}
    </p>
  );
}

function TextField({
  name,
  label,
  type = "text",
  hint,
  autoComplete,
  required,
  defaultValue,
  error,
}: {
  name: FieldName;
  label: string;
  type?: string;
  hint?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <Field name={name} label={label} hint={hint} error={error} required={required}>
      {(props) => (
        <input
          {...props}
          type={type}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
          className={`${inputClasses(!!error)} h-12`}
        />
      )}
    </Field>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  error,
  onChange,
}: {
  name: FieldName;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Field name={name} label={label} error={error} required>
      {(props) => (
        <div className="relative">
          <select
            {...props}
            required
            defaultValue={defaultValue ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            className={`${inputClasses(!!error)} h-12 appearance-none pr-10`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </Field>
  );
}

function CheckboxGroup({
  name,
  legend,
  hint,
  options,
  defaultValues = [],
  error,
  required,
  columns,
}: {
  name: FieldName;
  legend: string;
  hint?: string;
  options: { value: string; label: string }[];
  defaultValues?: string[];
  error?: string;
  required?: boolean;
  columns?: boolean;
}) {
  const id = `ea-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className="flex w-full items-baseline justify-between gap-3 text-[15px] font-medium text-ink">
        <span>
          {legend}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {hint && (
          <span id={`${id}-hint`} className="text-sm font-normal text-muted">
            {hint}
          </span>
        )}
      </legend>
      <div className={`mt-2 grid gap-2 ${columns ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
        {options.map((o, i) => (
          <label
            key={o.value}
            className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-button border bg-white px-3.5 py-2.5 text-[15px] text-ink transition-colors has-[:checked]:border-indigo has-[:checked]:bg-indigo/[0.04] ${
              error ? "border-fail-ink" : "border-field hover:border-muted"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={o.value}
              defaultChecked={defaultValues.includes(o.value)}
              data-field={i === 0 ? name : undefined}
              className="size-[18px] shrink-0 accent-indigo"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </fieldset>
  );
}
