"use client";

import type { MouseEvent, ReactNode } from "react";
import { formAnchor } from "@/content/site";

export const CAL_NAMESPACE = "walkthrough";
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
export const hasCalLink = Boolean(calLink);

export const calUi = {
  hideEventTypeDetails: false,
  layout: "month_view",
  cssVarsPerTheme: { light: { "cal-brand": "#4B3BE6" }, dark: { "cal-brand": "#8FE6FF" } },
} as const;

/** Loads Cal.com's embed on demand and applies the brand styling. */
export async function calApi() {
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: CAL_NAMESPACE });
  cal("ui", calUi);
  return cal;
}

/**
 * "Book a 20-minute walkthrough". Cal.com's code only downloads on click, so it costs
 * nothing on page load. Without JavaScript the link opens the booking page; without a
 * Cal link it scrolls to the form.
 */
export function WalkthroughButton({ className, children }: { className?: string; children: ReactNode }) {
  if (!calLink) {
    return (
      <a href={`#${formAnchor}`} className={className}>
        {children}
      </a>
    );
  }

  const open = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let new-tab clicks through
    e.preventDefault();
    const cal = await calApi();
    cal("modal", { calLink, config: { layout: calUi.layout, theme: "light" } });
  };

  return (
    <a href={`https://cal.com/${calLink}`} onClick={open} className={className}>
      {children}
    </a>
  );
}
