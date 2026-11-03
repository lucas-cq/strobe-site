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
 * The walkthrough button. With a Cal link it says `label` and opens the booking modal
 * (Cal.com's code only downloads on click; without JavaScript the link opens the booking
 * page). Without a Cal link it says `fallbackLabel` and goes to the form, so it never
 * promises a booking it can't deliver. `children` is an optional trailing element, like an arrow.
 */
export function WalkthroughButton({
  className,
  label,
  fallbackLabel,
  children,
}: {
  className?: string;
  label: string;
  fallbackLabel: string;
  children?: ReactNode;
}) {
  if (!calLink) {
    return (
      <a href={`#${formAnchor}`} className={className}>
        {fallbackLabel}
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
      {label}
      {children}
    </a>
  );
}
