/**
 * Business day counting for Calgary's 10 business day rule. Dates are "YYYY-MM-DD" strings and
 * all the arithmetic is in UTC, so a visitor's time zone can't move a date.
 */

export type Holiday = { date: string; name: string };
export type OptionalHolidayId = "easterMonday" | "heritageDay" | "truthAndReconciliation" | "boxingDay";

export const optionalHolidays: { id: OptionalHolidayId; name: string }[] = [
  { id: "easterMonday", name: "Easter Monday" },
  { id: "heritageDay", name: "Heritage Day" },
  { id: "truthAndReconciliation", name: "National Day for Truth and Reconciliation" },
  { id: "boxingDay", name: "Boxing Day" },
];

const MONDAY = 1;
const SUNDAY = 0;
const SATURDAY = 6;
const DAY_MS = 86_400_000;

const toIso = (date: Date) => date.toISOString().slice(0, 10);
const fromIso = (iso: string) => new Date(`${iso}T00:00:00Z`);
const date = (year: number, month: number, day: number) => new Date(Date.UTC(year, month - 1, day));
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * DAY_MS);

/** The nth Monday of a month, counting from 1. */
function nthMonday(year: number, month: number, n: number) {
  const first = date(year, month, 1);
  const offset = (MONDAY - first.getUTCDay() + 7) % 7;
  return addDays(first, offset + (n - 1) * 7);
}

/** Easter Sunday in the Gregorian calendar (the anonymous computus). */
export function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return date(year, month, day);
}

/** Alberta's general holidays, which are never business days. */
export function generalHolidays(year: number): Holiday[] {
  const canadaDay = date(year, 7, 1);
  // The Monday before May 25.
  const may24 = date(year, 5, 24);
  const victoriaDay = addDays(may24, -((may24.getUTCDay() - MONDAY + 7) % 7));
  return [
    { date: date(year, 1, 1), name: "New Year's Day" },
    { date: nthMonday(year, 2, 3), name: "Family Day" },
    { date: addDays(easterSunday(year), -2), name: "Good Friday" },
    { date: victoriaDay, name: "Victoria Day" },
    { date: canadaDay.getUTCDay() === SUNDAY ? date(year, 7, 2) : canadaDay, name: "Canada Day" },
    { date: nthMonday(year, 9, 1), name: "Labour Day" },
    { date: nthMonday(year, 10, 2), name: "Thanksgiving" },
    { date: date(year, 11, 11), name: "Remembrance Day" },
    { date: date(year, 12, 25), name: "Christmas Day" },
  ].map((h) => ({ date: toIso(h.date), name: h.name }));
}

/** The date of each optional holiday in a year. */
export function optionalHolidayDates(year: number): Record<OptionalHolidayId, string> {
  return {
    easterMonday: toIso(addDays(easterSunday(year), 1)),
    heritageDay: toIso(nthMonday(year, 8, 1)),
    truthAndReconciliation: toIso(date(year, 9, 30)),
    boxingDay: toIso(date(year, 12, 26)),
  };
}

function holidaysIn(year: number, optional: readonly OptionalHolidayId[]) {
  const dates = optionalHolidayDates(year);
  const extra = optionalHolidays.filter((h) => optional.includes(h.id)).map((h) => ({ date: dates[h.id], name: h.name }));
  return new Map([...generalHolidays(year), ...extra].map((h) => [h.date, h.name]));
}

export type Deadline = {
  /** The last business day. */
  deadline: string;
  /** Every business day counted, in order. */
  businessDays: string[];
  /** Holidays that fell on a weekday in the count. */
  skippedHolidays: Holiday[];
};

/** Business day 1 is the first business day after the inspection. */
export function businessDayDeadline(inspection: string, optional: readonly OptionalHolidayId[] = [], count = 10): Deadline {
  const businessDays: string[] = [];
  const skippedHolidays: Holiday[] = [];
  const byYear = new Map<number, Map<string, string>>();
  let day = fromIso(inspection);

  while (businessDays.length < count) {
    day = addDays(day, 1);
    const weekday = day.getUTCDay();
    if (weekday === SATURDAY || weekday === SUNDAY) continue;
    const year = day.getUTCFullYear();
    if (!byYear.has(year)) byYear.set(year, holidaysIn(year, optional));
    const iso = toIso(day);
    const holiday = byYear.get(year)?.get(iso);
    if (holiday) skippedHolidays.push({ date: iso, name: holiday });
    else businessDays.push(iso);
  }

  return { deadline: businessDays[businessDays.length - 1], businessDays, skippedHolidays };
}

/** True for a complete, real calendar date in a sensible range, which a half-typed one isn't. */
export function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  if (year < 2000 || year > 2100) return false;
  const parsed = fromIso(value);
  return !Number.isNaN(parsed.getTime()) && toIso(parsed) === value;
}

/** An all-day calendar event on the deadline. `now` is the event's creation time. */
export function deadlineIcs(deadline: string, now: Date) {
  const compact = (iso: string) => iso.replaceAll("-", "");
  const stamp = `${now.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Strobe//Calgary deadline calculator//EN",
    "BEGIN:VEVENT",
    `UID:calgary-deadline-${deadline}@strobehq.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(deadline)}`,
    `DTEND;VALUE=DATE:${compact(toIso(addDays(fromIso(deadline), 1)))}`,
    "SUMMARY:Calgary deficiency report due",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
