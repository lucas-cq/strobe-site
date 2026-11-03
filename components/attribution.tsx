"use client";

import { useEffect } from "react";

const KEY = "strobe:attribution";

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
  landing_path: string;
};

const empty: Attribution = { utm_source: "", utm_medium: "", utm_campaign: "", referrer: "", landing_path: "" };

function capture(): Attribution {
  const params = new URLSearchParams(window.location.search);
  let referrer = "";
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.origin !== window.location.origin) referrer = ref.href;
  } catch {
    // Unparseable referrer: leave it empty.
  }
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    referrer,
    landing_path: window.location.pathname,
  };
}

/** Where this visit started, saved on the first page view of the session. */
export function readAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return { ...empty, ...JSON.parse(saved) };
    const fresh = capture();
    sessionStorage.setItem(KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    // Storage blocked (private mode, for example): fall back to the current page.
    return typeof window === "undefined" ? empty : capture();
  }
}

/** Mounted once in the root layout so the landing page and UTM tags are recorded on arrival. */
export function AttributionCapture() {
  useEffect(() => {
    readAttribution();
  }, []);
  return null;
}
