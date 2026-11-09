const longDate = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" });

/** "2026-11-06" to "November 6, 2026". */
export const formatDate = (iso: string) => longDate.format(new Date(iso));
