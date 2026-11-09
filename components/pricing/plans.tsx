"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  type Plan,
  monthlyEquivalent,
  plans,
  pricing,
  yearlySaving,
  yearlySavingPercent,
} from "@/content/pricing";
import { CheckIcon } from "../mockups/parts";
import { PrefillLink } from "../prefill-link";
import { buttonClasses } from "../ui";

type Billing = "monthly" | "yearly";

const money = (amount: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

/** "$49 CAD" or "$40.83 CAD". Always CAD, never USD. */
const formatCad = (amount: number) => `${money(amount)} CAD`;

const isPerTech = (plan: Plan) => plan.id !== "solo";

// The choice lives in the URL (?billing=yearly), so it survives a refresh and can be linked.
const BILLING_PARAM = "billing";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

const readBilling = (): Billing =>
  new URLSearchParams(window.location.search).get(BILLING_PARAM) === "yearly" ? "yearly" : "monthly";

function writeBilling(billing: Billing) {
  const url = new URL(window.location.href);
  if (billing === "yearly") url.searchParams.set(BILLING_PARAM, billing);
  else url.searchParams.delete(BILLING_PARAM);
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

function BillingToggle({ billing }: { billing: Billing }) {
  const buttons = useRef<Partial<Record<Billing, HTMLButtonElement | null>>>({});
  const options: Billing[] = ["monthly", "yearly"];

  return (
    <div className="mt-8 flex justify-center">
      <div
        role="radiogroup"
        aria-label={pricing.billing.label}
        className="relative inline-grid grid-cols-2 rounded-full bg-surface p-1 ring-1 ring-line"
        onKeyDown={(e) => {
          if (!ARROW_KEYS.includes(e.key)) return;
          e.preventDefault();
          const next = billing === "monthly" ? "yearly" : "monthly";
          writeBilling(next);
          buttons.current[next]?.focus();
        }}
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-indigo transition-transform duration-200 ease-out motion-reduce:transition-none ${
            billing === "yearly" ? "translate-x-full" : ""
          }`}
        />
        {options.map((option) => {
          const selected = billing === option;
          return (
            <button
              key={option}
              ref={(el) => {
                buttons.current[option] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => writeBilling(option)}
              className={`relative flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3 text-[15px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:px-5 ${
                selected ? "font-semibold text-white" : "font-medium text-muted"
              }`}
            >
              {pricing.billing[option]}
              {option === "yearly" && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${selected ? "bg-white text-indigo" : "bg-indigo/10 text-indigo"}`}
                >
                  {pricing.billing.badge(yearlySavingPercent)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Examples({ plan, billing }: { plan: Plan; billing: Billing }) {
  if (plan.exampleTechCounts.length === 0) return null;
  const price = billing === "yearly" ? plan.priceCadYearly : plan.priceCadMonthly;
  return (
    <ul className="tabular mt-3 text-sm text-ink-2">
      {plan.exampleTechCounts.map((techs) => (
        <li key={techs}>{pricing.example(techs, formatCad(techs * price), pricing.billing.period[billing])}</li>
      ))}
    </ul>
  );
}

/** Both states share one grid cell, so the card is the same height in each and only opacity changes. */
const layerClasses = (active: boolean) =>
  `col-start-1 row-start-1 transition-[opacity,visibility] duration-150 motion-reduce:transition-none ${
    active ? "visible opacity-100" : "invisible opacity-0"
  }`;

function Price({ plan, billing }: { plan: Plan; billing: Billing }) {
  const perTech = isPerTech(plan);
  return (
    <div className="mt-6 grid border-y border-line py-4 md:min-h-[18.5rem] lg:min-h-[14rem]">
      <div className={layerClasses(billing === "monthly")}>
        <p className="tabular font-display text-3xl font-semibold text-ink">{formatCad(plan.priceCadMonthly)}</p>
        <p className="mt-1 text-sm text-ink-2">{perTech ? pricing.unit.perTech : pricing.unit.solo}</p>
        <Examples plan={plan} billing="monthly" />
      </div>
      <div className={layerClasses(billing === "yearly")}>
        <p className="tabular font-display text-3xl font-semibold text-ink">{formatCad(monthlyEquivalent(plan))}</p>
        <p className="mt-1 text-sm text-ink-2">{perTech ? pricing.unit.perTechYearly : pricing.unit.soloYearly}</p>
        <p className="tabular mt-3 text-sm font-medium text-ink">
          {pricing.billing.yearlyTotal(formatCad(plan.priceCadYearly), money(yearlySaving(plan)), perTech)}
        </p>
        <Examples plan={plan} billing="yearly" />
      </div>
    </div>
  );
}

/** The billing toggle and the three plans, equal in size and design: Solo is not a lesser "starter" card. */
export function Plans() {
  const billing = useSyncExternalStore(subscribe, readBilling, () => "monthly" as Billing);

  return (
    <>
      <BillingToggle billing={billing} />
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.id} className="reveal card-gradient flex flex-col p-6 md:p-7">
            <h2 className="text-2xl text-ink">{plan.name}</h2>
            <p className="mt-1 text-sm font-medium text-indigo">{plan.techRange}</p>
            <p className="mt-4 text-[15px] text-ink-2 md:min-h-[9rem] lg:min-h-[6rem] xl:min-h-[4.5rem]">{plan.blurb}</p>

            <Price plan={plan} billing={billing} />

            <ul className="mt-5 space-y-2.5 text-[15px] text-ink">
              {plan.extras.map((extra) => (
                <li key={extra} className="flex gap-2.5">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-indigo" />
                  {extra}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <PrefillLink values={{ plan: plan.id }} className={`${buttonClasses("primary", "lg")} w-full`}>
                {pricing.start}
                <span className="sr-only">: {plan.name}</span>
              </PrefillLink>
              <p className="mt-3 text-center text-sm font-medium text-ink-2">{pricing.reassurance}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
