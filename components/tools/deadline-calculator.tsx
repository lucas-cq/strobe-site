"use client";

import { useState, useSyncExternalStore } from "react";
import { deadlineTool as copy } from "@/content/tool-deadline";
import { type OptionalHolidayId, businessDayDeadline, deadlineIcs, isValidDate, optionalHolidays } from "@/lib/business-days";
import { buttonClasses } from "../ui";

const BUSINESS_DAYS = 10;
const NBSP = " ";

const utcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const longDate = new Intl.DateTimeFormat("en-CA", { dateStyle: "full", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("en-CA", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Today on the visitor's own calendar, as YYYY-MM-DD. */
function localToday() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// The page is prerendered, so the server can't know today's date. It renders the empty state,
// which has the same height as a result, and the browser fills it in.
const useToday = () => useSyncExternalStore(() => () => {}, localToday, () => "");

function downloadIcs(deadline: string) {
  const url = URL.createObjectURL(new Blob([deadlineIcs(deadline, new Date())], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "calgary-deficiency-report-due.ics";
  link.click();
  URL.revokeObjectURL(url);
}

export function DeadlineCalculator() {
  const today = useToday();
  const [picked, setPicked] = useState<string | null>(null);
  const [optional, setOptional] = useState<OptionalHolidayId[]>([]);

  const inspection = picked ?? today;
  const result = isValidDate(inspection) ? businessDayDeadline(inspection, optional, BUSINESS_DAYS) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
      <div>
        <label htmlFor="inspection-date" className="text-[15px] font-medium text-ink">
          {copy.dateLabel}
        </label>
        <input
          id="inspection-date"
          type="date"
          value={inspection}
          onChange={(e) => setPicked(e.target.value)}
          className="mt-1.5 block h-12 w-full rounded-button border border-field bg-white px-3.5 text-base text-ink transition-colors hover:border-muted"
        />

        <fieldset className="mt-8">
          <legend className="text-[15px] font-medium text-ink">{copy.optionalLegend}</legend>
          <div className="mt-3 space-y-2.5">
            {optionalHolidays.map((holiday) => (
              <label key={holiday.id} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={optional.includes(holiday.id)}
                  onChange={(e) =>
                    setOptional((current) => (e.target.checked ? [...current, holiday.id] : current.filter((id) => id !== holiday.id)))
                  }
                  className="mt-0.5 size-[18px] shrink-0 accent-indigo"
                />
                <span className="text-[15px] text-ink-2">{holiday.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="rounded-card-lg border border-line bg-white p-6 shadow-soft md:p-8">
        <div aria-live="polite">
          <p className="text-[15px] font-medium text-muted">{copy.resultLabel}</p>
          <p className="tabular mt-1 min-h-[4.5rem] font-display text-2xl leading-9 font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
            {result ? longDate.format(utcDate(result.deadline)) : copy.emptyResult}
          </p>
        </div>

        <button
          type="button"
          disabled={!result}
          onClick={() => result && downloadIcs(result.deadline)}
          className={`${buttonClasses("secondary", "md")} mt-4 disabled:opacity-50`}
        >
          {copy.addToCalendar}
        </button>

        <p className="mt-5 rounded-button bg-lavender p-4 text-[15px] text-ink">{copy.note}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{copy.daysTitle}</h2>
            <ol className="tabular mt-2 space-y-1 text-[15px] text-ink-2">
              {Array.from({ length: BUSINESS_DAYS }, (_, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-5 shrink-0 text-right text-muted">{i + 1}</span>
                  <span>{result ? shortDate.format(utcDate(result.businessDays[i])) : NBSP}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-sans text-[15px] font-semibold tracking-normal text-ink">{copy.skippedTitle}</h2>
            {result && result.skippedHolidays.length > 0 ? (
              <ul className="tabular mt-2 space-y-2 text-[15px] text-ink-2">
                {result.skippedHolidays.map((holiday) => (
                  <li key={holiday.date}>
                    {holiday.name}
                    <span className="block text-sm text-muted">{shortDate.format(utcDate(holiday.date))}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-[15px] text-ink-2">{copy.noneSkipped}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
