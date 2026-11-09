"use client";

import { useState } from "react";

const fields = [
  { id: "devices", label: "Number of devices", placeholder: "120" },
  { id: "minutes", label: "Minutes per device", placeholder: "3" },
  { id: "techs", label: "Number of techs", placeholder: "2" },
  { id: "rate", label: "Hourly rate", placeholder: "$X" },
  { id: "truck", label: "Truck charge", placeholder: "$Y" },
] as const;

type FieldId = (typeof fields)[number]["id"];

const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

/** Empty by default: the placeholders show what goes where, and no real prices appear. */
export function QuoteCalculator() {
  const [values, setValues] = useState<Partial<Record<FieldId, string>>>({});

  const numbers = fields.map((f) => Number(values[f.id] || NaN));
  const complete = numbers.every((n) => Number.isFinite(n) && n >= 0);
  const [devices, minutes, techs, rate, truck] = numbers;
  const hours = (devices * minutes) / 60;
  const labour = hours * techs * rate;

  return (
    <div className="mt-6 rounded-card-lg border border-line bg-white p-6 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={`quote-${field.id}`} className="text-[15px] font-medium text-ink">
              {field.label}
            </label>
            <input
              id={`quote-${field.id}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
              className="mt-1.5 block h-12 w-full rounded-button border border-field bg-white px-3.5 text-base text-ink transition-colors placeholder:text-muted hover:border-muted"
            />
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-5 border-t border-line pt-4">
        {complete ? (
          <dl className="tabular space-y-1 text-[15px] text-ink-2">
            <div className="flex justify-between">
              <dt>Hours on site</dt>
              <dd>{hours.toFixed(1)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Labour</dt>
              <dd>{money.format(labour)}</dd>
            </div>
            <div className="flex justify-between pt-1 text-lg font-semibold text-ink">
              <dt>The quote</dt>
              <dd>{money.format(labour + truck)}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-[15px] text-ink-2">Fill in every box to see the quote.</p>
        )}
      </div>
    </div>
  );
}
