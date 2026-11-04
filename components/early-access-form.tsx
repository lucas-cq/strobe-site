"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { type ReactNode, useActionState, useEffect, useRef, useState } from "react";
import { submitEarlyAccess } from "@/app/actions/early-access";
import { saveLeadDetails } from "@/app/actions/lead-details";
import { earlyAccessForm as copy } from "@/content/early-access";
import {
  type DetailsState,
  type DetailsValues,
  type EarlyAccessState,
  type FieldErrors,
  type FormValues,
  hiddenFields,
  initialDetailsState,
  initialEarlyAccessState,
} from "@/lib/early-access-shared";
import { type Attribution, readAttribution } from "./attribution";
import { hasCalLink } from "./cal-booking";
import { PREFILL_EVENT, type Prefill, readPrefill } from "./prefill-link";
import { Turnstile } from "./turnstile";
import { buttonClasses } from "./ui";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Cal.com's embed is only needed after a successful submission, so it loads then.
const CalInline = dynamic(() => import("./cal-inline").then((m) => m.CalInline), {
  ssr: false,
  loading: () => <div className="h-[640px] w-full animate-pulse bg-surface" />,
});

const f = copy.fields;

/** Moves focus to the first field with an error, in the order given. */
function useFocusFirstError(formRef: React.RefObject<HTMLFormElement | null>, errors: FieldErrors, order: string[]) {
  useEffect(() => {
    const first = order.find((name) => errors[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
  }, [formRef, errors, order]);
}

/* Step 1 */

const stepOneOrder = ["fullName", "email", "company", "cities", "city", "techCount"];

export function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(submitEarlyAccess, initialEarlyAccessState);

  if (state.status === "success") {
    return (
      <SuccessState
        firstName={state.firstName}
        fullName={state.fullName}
        email={state.email}
        detailsToken={state.detailsToken}
      />
    );
  }
  // Remount on every response so defaults reflect what was sent back and Turnstile issues a fresh token.
  return <StepOne key={state.attempt} state={state} action={formAction} pending={pending} />;
}

function StepOne({
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
  const attributionRef = useRef<HTMLDivElement>(null);
  const [pendingCheck, setPendingCheck] = useState(false);

  // Fill the hidden attribution inputs from session storage (browser only).
  useEffect(() => {
    const data = readAttribution();
    attributionRef.current?.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.value = data[input.name as keyof Attribution] ?? "";
    });
  }, []);

  // Fill "City or town" and the hidden plan from ?city= and ?plan=, and again whenever a
  // PrefillLink on this page is clicked. A value the server echoed back after an error wins.
  useEffect(() => {
    const apply = ({ city, plan }: Prefill, overwrite: boolean) => {
      const form = formRef.current;
      const cityInput = form?.querySelector<HTMLInputElement>('[name="city"]');
      const planInput = form?.querySelector<HTMLInputElement>(`[name="${hiddenFields.plan}"]`);
      if (cityInput && city !== undefined && (overwrite || !cityInput.value)) cityInput.value = city;
      if (planInput && plan !== undefined && (overwrite || !planInput.value)) planInput.value = plan;
    };
    apply(readPrefill(), false);
    const onPrefill = (e: Event) => apply((e as CustomEvent<Prefill>).detail, true);
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useFocusFirstError(formRef, errors, stepOneOrder);

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
        <div className="sm:col-span-2">
          <TextField name="company" label={f.company.label} autoComplete="organization" required defaultValue={values.company} error={errors.company} />
        </div>
      </div>

      <ChipGroup
        type="checkbox"
        name="cities"
        legend={f.cities.label}
        hint={f.cities.hint}
        options={f.cities.options}
        defaultValues={values.cities}
        error={errors.cities}
        required
      />

      <TextField
        name="city"
        label={f.city.label}
        hint={f.city.hint}
        autoComplete="address-level2"
        defaultValue={values.city}
        error={errors.city}
      />

      <ChipGroup
        type="radio"
        name="techCount"
        legend={f.techCount.label}
        options={f.techCount.options}
        defaultValues={values.techCount ? [values.techCount] : []}
        error={errors.techCount}
        required
      />

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

      <input type="hidden" name={hiddenFields.plan} defaultValue={values.plan ?? ""} />

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
          <ErrorBanner>{pendingCheck ? copy.errors.turnstilePending : state.status === "error" && state.message}</ErrorBanner>
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

/* Success, with the optional step 2 */

function SuccessState({
  firstName,
  fullName,
  email,
  detailsToken,
}: {
  firstName: string;
  fullName: string;
  email: string;
  detailsToken: string | null;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="text-center">
        <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full bg-pass/10 text-pass-ink">
          <svg viewBox="0 0 16 16" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl text-ink focus:outline-none md:text-3xl">
          {copy.success.title(firstName)}
        </h3>
        <p className="mt-3 text-lg text-ink-2">{copy.success.body}</p>
        <p className="mt-2 font-medium text-ink">{copy.success.nextStep}</p>
      </div>

      {detailsToken && <StepTwo token={detailsToken} />}

      {hasCalLink && (
        <div className="mt-10 text-center">
          <p className="font-medium text-ink">{copy.success.bookPrompt}</p>
          <div className="mt-4 overflow-hidden rounded-card border border-line text-left">
            <CalInline name={fullName} email={email} />
          </div>
        </div>
      )}
    </div>
  );
}

function StepTwo({ token }: { token: string }) {
  const [state, action, pending] = useActionState(saveLeadDetails, initialDetailsState);
  const [skipped, setSkipped] = useState(false);
  const d = copy.details;

  if (state.status === "saved" || state.status === "expired" || skipped) {
    const message = state.status === "saved" ? d.saved : state.status === "expired" ? d.expired : d.skipped;
    return (
      <p role="status" className="mt-8 rounded-card border border-line bg-surface px-5 py-4 text-center text-ink-2">
        {message}
      </p>
    );
  }

  return (
    <section aria-labelledby="details-title" className="mt-8 rounded-card border border-line bg-surface/60 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 id="details-title" className="text-lg text-ink">
          {d.title}
        </h4>
        <span className="text-sm text-muted">{d.optional}</span>
      </div>
      <p className="mt-1 text-[15px] text-ink-2">{d.intro}</p>
      <DetailsForm key={state.attempt} state={state} action={action} pending={pending} token={token} onSkip={() => setSkipped(true)} />
    </section>
  );
}

const stepTwoOrder = ["currentMethod", "currentSoftware", "systems", "phone", "notes"];

function DetailsForm({
  state,
  action,
  pending,
  token,
  onSkip,
}: {
  state: DetailsState;
  action: (formData: FormData) => void;
  pending: boolean;
  token: string;
  onSkip: () => void;
}) {
  const values: Partial<DetailsValues> = state.status === "error" ? state.values : {};
  const errors: FieldErrors = state.status === "error" ? state.fieldErrors : {};
  const formRef = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState(values.currentMethod ?? "");
  const [notesLength, setNotesLength] = useState(values.notes?.length ?? 0);
  const d = copy.details;

  useFocusFirstError(formRef, errors, stepTwoOrder);

  return (
    <form ref={formRef} action={action} noValidate className="mt-5 space-y-5">
      <input type="hidden" name={hiddenFields.detailsToken} value={token} />

      <ChipGroup
        type="radio"
        name="currentMethod"
        legend={f.currentMethod.label}
        options={f.currentMethod.options}
        defaultValues={values.currentMethod ? [values.currentMethod] : []}
        error={errors.currentMethod}
        onChange={setMethod}
      />

      {method === copy.softwareMethod && (
        <TextField name="currentSoftware" label={f.currentSoftware.label} defaultValue={values.currentSoftware} error={errors.currentSoftware} />
      )}

      <ChipGroup
        type="checkbox"
        name="systems"
        legend={f.systems.label}
        hint={f.systems.hint}
        options={f.systems.options}
        defaultValues={values.systems}
        error={errors.systems}
        columns
      />

      <TextField name="phone" type="tel" label={f.phone.label} autoComplete="tel" defaultValue={values.phone} error={errors.phone} />

      <Field name="notes" label={f.notes.label} error={errors.notes}>
        {(props) => (
          <>
            <textarea
              {...props}
              rows={3}
              maxLength={f.notes.maxLength}
              defaultValue={values.notes}
              onChange={(e) => setNotesLength(e.target.value.length)}
              className={`${inputClasses(!!errors.notes)} min-h-24 py-3`}
            />
            <p className="tabular mt-1.5 text-right text-xs text-muted" aria-hidden="true">
              {notesLength.toLocaleString("en-CA")} / {f.notes.maxLength.toLocaleString("en-CA")}
            </p>
          </>
        )}
      </Field>

      <div role="alert" aria-live="assertive">
        {state.status === "error" && <ErrorBanner>{state.message}</ErrorBanner>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={buttonClasses("primary")}>
          {pending ? d.submitting : d.submit}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-button px-2 py-2 text-[15px] font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
        >
          {d.skip}
        </button>
      </div>
    </form>
  );
}

/* Field primitives */

function inputClasses(invalid: boolean) {
  return `block w-full rounded-button border bg-white px-3.5 text-base text-ink placeholder:text-muted transition-colors ${
    invalid ? "border-fail-ink" : "border-field hover:border-muted"
  }`;
}

function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-button border border-fail-ink/30 bg-fail/[0.06] px-4 py-3 text-[15px] font-medium text-fail-ink">
      {children}
    </p>
  );
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
  name: string;
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
  name: string;
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

/**
 * Pill-shaped choices built on real checkboxes or radios, so keyboard and screen-reader
 * behaviour is native. The input is visually hidden; the pill shows its state, with a
 * tick as well as the colour change.
 */
function ChipGroup({
  type,
  name,
  legend,
  hint,
  options,
  defaultValues = [],
  error,
  required,
  columns,
  onChange,
}: {
  type: "checkbox" | "radio";
  name: string;
  legend: string;
  hint?: string;
  options: { value: string; label: string }[];
  defaultValues?: string[];
  error?: string;
  required?: boolean;
  /** Two equal columns instead of wrapping pills. */
  columns?: boolean;
  onChange?: (value: string) => void;
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
      <div className={`mt-2 ${columns ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}`}>
        {options.map((o, i) => (
          <label
            key={o.value}
            className={`group inline-flex min-h-11 cursor-pointer items-center gap-1.5 border bg-white px-4 py-2 text-[15px] font-medium text-ink transition-colors select-none has-[:checked]:border-indigo has-[:checked]:bg-indigo has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo ${
              columns ? "rounded-button" : "rounded-full"
            } ${error ? "border-fail-ink" : "border-field hover:border-muted"}`}
          >
            <input
              type={type}
              name={name}
              value={o.value}
              defaultChecked={defaultValues.includes(o.value)}
              onChange={(e) => onChange?.(e.target.value)}
              data-field={i === 0 ? name : undefined}
              className="sr-only"
            />
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="-ml-1 hidden size-4 shrink-0 group-has-[:checked]:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
            >
              <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {o.label}
          </label>
        ))}
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </fieldset>
  );
}
