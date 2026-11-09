"use client";

import { useState } from "react";
import { reportRulesGuide } from "@/content/guide-report-rules";
import type { ReportRule } from "@/lib/report-rules";
import { buttonClasses } from "../ui";

const { table } = reportRulesGuide;
const { columns } = table;
const COLUMN_COUNT = Object.keys(columns).length;
/** Contractor submits, when it hears, method, deadline and photos: replaced by one line when no rule was found. */
const RULE_COLUMNS = 5;

const fieldClasses =
  "mt-1.5 block h-12 w-full rounded-button border border-field bg-white px-3.5 text-base text-ink transition-colors hover:border-muted";

// Below lg each row is a card: cells stack and take their label from data-label. The explicit
// roles keep it a table for screen readers, since display:block otherwise removes that.
const cellClasses =
  "px-3 py-3 align-top max-lg:block max-lg:px-0 max-lg:py-1 max-lg:empty:hidden max-lg:before:block max-lg:before:text-[13px] max-lg:before:text-muted max-lg:before:content-[attr(data-label)]";

const searchable = (r: ReportRule) =>
  [r.city, table.provinces[r.province], r.province, r.whenFireDepartmentHears, r.method, r.deadline, r.notes].join(" ").toLowerCase();

function SourceCell({ row }: { row: ReportRule }) {
  return (
    <td role="cell" className={cellClasses}>
      {row.sourceUrl && (
        <a
          href={row.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium whitespace-nowrap text-indigo underline underline-offset-4 hover:text-violet"
        >
          {table.sourceLink}
          <span className="sr-only"> for {row.city} (opens in a new tab)</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </td>
  );
}

function Row({ row }: { row: ReportRule }) {
  return (
    <tr
      role="row"
      className={`border-t border-line max-lg:mt-3 max-lg:block max-lg:rounded-card max-lg:border max-lg:p-4 ${row.noRuleFound ? "bg-surface text-ink-2" : ""}`}
    >
      <td role="cell" className={`${cellClasses} max-lg:hidden`}>
        {row.province}
      </td>
      <th role="rowheader" scope="row" className="px-3 py-3 text-left align-top font-semibold text-ink max-lg:block max-lg:p-0">
        {row.city}
      </th>
      {row.noRuleFound ? (
        <td role="cell" colSpan={RULE_COLUMNS} className="px-3 py-3 align-top max-lg:block max-lg:px-0 max-lg:py-1">
          {table.noRule}
        </td>
      ) : (
        <>
          <td role="cell" data-label={columns.contractorSubmits} className={cellClasses}>
            {row.contractorSubmits}
          </td>
          <td role="cell" data-label={columns.whenFireDepartmentHears} className={cellClasses}>
            {row.whenFireDepartmentHears}
          </td>
          <td role="cell" data-label={columns.method} className={cellClasses}>
            {row.method}
          </td>
          <td role="cell" data-label={columns.deadline} className={cellClasses}>
            {row.deadline}
          </td>
          <td role="cell" data-label={columns.photos} className={cellClasses}>
            {row.photos}
          </td>
        </>
      )}
      <SourceCell row={row} />
      <td role="cell" data-label={row.notes ? columns.notes : undefined} className={cellClasses}>
        {row.notes}
      </td>
    </tr>
  );
}

/** Every row is in the server-rendered HTML. Search and the province filter only narrow it. */
export function RulesTable({ rows, csvHref }: { rows: ReportRule[]; csvHref: string }) {
  const [province, setProvince] = useState("all");
  const [query, setQuery] = useState("");

  const provinces = [...new Set(rows.map((r) => r.province))];
  const q = query.trim().toLowerCase();
  const visible = rows.filter((r) => (province === "all" || r.province === province) && (!q || searchable(r).includes(q)));
  const visibleProvinces = provinces.filter((p) => visible.some((r) => r.province === p));

  return (
    <div className="mt-8">
      <div className="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_16rem_auto]">
        <div>
          <label htmlFor="rules-search" className="text-[15px] font-medium text-ink">
            {table.searchLabel}
          </label>
          <input
            id="rules-search"
            type="search"
            value={query}
            placeholder={table.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
            className={`${fieldClasses} placeholder:text-muted`}
          />
        </div>
        <div>
          <label htmlFor="rules-province" className="text-[15px] font-medium text-ink">
            {table.provinceLabel}
          </label>
          <select id="rules-province" value={province} onChange={(e) => setProvince(e.target.value)} className={fieldClasses}>
            <option value="all">{table.allProvinces}</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {table.provinces[p]}
              </option>
            ))}
          </select>
        </div>
        <a href={csvHref} download className={buttonClasses("secondary", "lg")}>
          {table.download}
        </a>
      </div>

      <p aria-live="polite" className="mt-4 text-[15px] text-ink-2">
        {table.showing(visible.length, rows.length)}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 text-ink-2">{table.empty}</p>
      ) : (
        <div role="region" aria-label={table.title} tabIndex={0} className="mt-4 overflow-x-auto">
          <table role="table" className="w-full border-collapse text-sm text-ink-2 max-lg:block lg:min-w-[1080px]">
            <thead role="rowgroup" className="text-left max-lg:sr-only">
              <tr role="row">
                {Object.values(columns).map((label) => (
                  <th key={label} role="columnheader" scope="col" className="px-3 py-3 align-bottom font-semibold text-ink">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            {visibleProvinces.map((p) => (
              <tbody key={p} role="rowgroup" className="max-lg:block">
                <tr role="row" className="max-lg:block">
                  <th
                    role="columnheader"
                    scope="rowgroup"
                    colSpan={COLUMN_COUNT}
                    className="bg-lavender px-3 py-2.5 text-left text-[15px] font-semibold text-ink max-lg:mt-6 max-lg:block max-lg:rounded-button"
                  >
                    {table.provinces[p]}
                  </th>
                </tr>
                {visible
                  .filter((r) => r.province === p)
                  .map((r) => (
                    <Row key={r.city} row={r} />
                  ))}
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
