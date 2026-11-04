"use client";

import { useState } from "react";
import { type Plan, plans, pricing } from "@/content/pricing";
import { CheckIcon } from "../mockups/parts";
import { PrefillLink } from "../prefill-link";
import { buttonClasses } from "../ui";

const cadFormat = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/** "$49 CAD". Always CAD, never USD. */
export const formatCad = (amount: number) => `${cadFormat.format(amount)} CAD`;

type Billing = "monthly" | "yearly";

const priceOf = (plan: Plan, billing: Billing) =>
  billing === "yearly" ? plan.priceCadPerTechAnnual : plan.priceCadPerTechMonthly;

/**
 * The three plans, equal in size and design: Solo is not a lesser "starter" card.
 * The monthly/yearly toggle only appears once every plan has both prices.
 */
export function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const showToggle = plans.every((p) => p.priceCadPerTechMonthly !== null && p.priceCadPerTechAnnual !== null);

  return (
    <>
      {showToggle && (
        <fieldset className="mt-8 flex justify-center">
          <legend className="sr-only">{pricing.billing.label}</legend>
          <div className="inline-flex rounded-full bg-surface p-1 ring-1 ring-line">
            {(["monthly", "yearly"] as const).map((option) => (
              <label
                key={option}
                className="cursor-pointer rounded-full px-4 py-2 text-[15px] font-medium text-ink-2 has-[:checked]:bg-white has-[:checked]:text-ink has-[:checked]:shadow-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-indigo"
              >
                <input
                  type="radio"
                  name="billing"
                  value={option}
                  checked={billing === option}
                  onChange={() => setBilling(option)}
                  className="sr-only"
                />
                {pricing.billing[option]}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const price = priceOf(plan, billing);
          const unit = plan.id === "solo" ? pricing.unit.solo : pricing.unit.perTech;
          return (
            <li key={plan.id} className="reveal card-gradient flex flex-col p-6 md:p-7">
              <h2 className="text-2xl text-ink">{plan.name}</h2>
              <p className="mt-1 text-sm font-medium text-indigo">{plan.techRange}</p>
              <p className="mt-4 text-[15px] text-ink-2">{plan.blurb}</p>

              <div className="mt-6 flex min-h-16 flex-col justify-center border-y border-line py-4">
                {price === null ? (
                  <p className="font-display text-xl font-semibold text-ink">{pricing.pricePending}</p>
                ) : (
                  <p>
                    <span className="tabular font-display text-3xl font-semibold text-ink">{formatCad(price)}</span>
                    <span className="mt-1 block text-sm text-ink-2">
                      {unit}
                      {billing === "yearly" && `, ${pricing.billing.yearlyNote}`}
                    </span>
                  </p>
                )}
              </div>

              <ul className="mt-5 space-y-2.5 text-[15px] text-ink">
                {plan.extras.map((extra) => (
                  <li key={extra} className="flex gap-2.5">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-indigo" />
                    {extra}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-7">
                <PrefillLink values={{ plan: plan.id }} className={`${buttonClasses("primary", "lg")} w-full`}>
                  {price === null ? pricing.notify : pricing.start}
                  <span className="sr-only">: {plan.name}</span>
                </PrefillLink>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
