"use client";

import type { ReactNode } from "react";
import { formAnchor } from "@/content/site";

/** The form fields a link can fill in: the "City or town" box and the hidden plan. */
export type Prefill = { city?: string; plan?: string };

export const PREFILL_EVENT = "strobe:prefill";

/** Reads ?city= and ?plan= from the current URL. */
export function readPrefill(): Prefill {
  const params = new URLSearchParams(window.location.search);
  return { city: params.get("city") ?? undefined, plan: params.get("plan") ?? undefined };
}

/**
 * A link to the early-access form that prefills it, e.g. "?plan=crew#early-access".
 * With JavaScript it updates the URL in place, tells the form, and scrolls (smoothly unless
 * reduced motion is on, via the html scroll-behavior). Without it, the browser loads the
 * URL and the form reads the query string when it mounts.
 */
export function PrefillLink({
  values,
  className,
  children,
}: {
  values: Prefill;
  className?: string;
  children: ReactNode;
}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) if (value) params.set(key, value);
  const query = params.toString();
  const href = `${query ? `?${query}` : ""}#${formAnchor}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        const form = document.getElementById(formAnchor);
        if (!form || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${href}`);
        window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: values }));
        form.scrollIntoView();
      }}
    >
      {children}
    </a>
  );
}
