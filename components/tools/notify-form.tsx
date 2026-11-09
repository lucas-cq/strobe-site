"use client";

import { useActionState } from "react";
import { submitNotifyMe } from "@/app/actions/notify-me";
import { earlyAccessForm } from "@/content/early-access";
import { deviceTemplate } from "@/content/tool-device-template";
import { hiddenFields } from "@/lib/early-access-shared";
import { initialNotifyState } from "@/lib/notify-shared";
import { Turnstile } from "../turnstile";
import { buttonClasses } from "../ui";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const { notify } = deviceTemplate;

export function NotifyForm() {
  const [state, formAction, pending] = useActionState(submitNotifyMe, initialNotifyState);

  if (state.status === "success") {
    return (
      <p role="status" className="font-medium text-ink">
        {notify.success}
      </p>
    );
  }

  const error = state.status === "error" ? state : null;
  return (
    // Remount on every response so Turnstile issues a fresh token.
    <form key={state.attempt} action={formAction} noValidate className="space-y-4">
      <div>
        <label htmlFor="notify-email" className="text-[15px] font-medium text-ink">
          {notify.label}
        </label>
        <input
          id="notify-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={error?.email ?? ""}
          aria-invalid={error?.field || undefined}
          aria-describedby={error ? "notify-status" : undefined}
          className="mt-1.5 block h-12 w-full rounded-button border border-field bg-white px-3.5 text-base text-ink transition-colors hover:border-muted"
        />
      </div>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" defaultChecked={error?.consent ?? false} className="mt-0.5 size-[18px] shrink-0 accent-indigo" />
        <span className="text-[15px] text-ink-2">{earlyAccessForm.fields.consent.label}</span>
      </label>

      {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name={hiddenFields.honeypot} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} />}

      <div id="notify-status" role="alert">
        {error && <p className="text-[15px] font-medium text-fail-ink">{error.message}</p>}
      </div>

      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg")}>
        {pending ? notify.pending : notify.button}
      </button>
    </form>
  );
}
