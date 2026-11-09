import { type Plan, plans, pricing } from "@/content/pricing";
import { CheckIcon } from "../mockups/parts";
import { PrefillLink } from "../prefill-link";
import { buttonClasses } from "../ui";

const cadFormat = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/** "$49 CAD". Always CAD, never USD. */
const formatCad = (amount: number) => `${cadFormat.format(amount)} CAD`;

const isPerTech = (plan: Plan) => plan.id !== "solo";

/**
 * The three plans, equal in size and design: Solo is not a lesser "starter" card.
 * Monthly and yearly prices sit side by side, so nobody has to flip a toggle to find the price.
 */
export function Plans() {
  return (
    <ul className="mt-8 grid gap-5 md:grid-cols-3">
      {plans.map((plan) => (
        <li key={plan.id} className="reveal card-gradient flex flex-col p-6 md:p-7">
          <h2 className="text-2xl text-ink">{plan.name}</h2>
          <p className="mt-1 text-sm font-medium text-indigo">{plan.techRange}</p>
          <p className="mt-4 text-[15px] text-ink-2 md:min-h-[9rem] lg:min-h-[4.5rem]">{plan.blurb}</p>

          <div className="mt-6 border-y border-line py-4 md:min-h-[17rem] lg:min-h-[12.5rem]">
            <p className="tabular font-display text-3xl font-semibold text-ink">{formatCad(plan.priceCadMonthly)}</p>
            <p className="mt-1 text-sm text-ink-2">{isPerTech(plan) ? pricing.unit.perTech : pricing.unit.solo}</p>
            <p className="tabular mt-3 text-sm text-ink-2">
              {pricing.billing.or} {formatCad(plan.priceCadMonthly * pricing.billing.monthsPaidPerYear)}{" "}
              {isPerTech(plan) ? pricing.billing.perTechYear : pricing.billing.perYear}
              <strong className="block font-semibold text-indigo">{pricing.billing.saving}</strong>
            </p>
            {plan.exampleTechCounts.length > 0 && (
              <ul className="tabular mt-3 text-sm text-ink-2">
                {plan.exampleTechCounts.map((techs) => (
                  <li key={techs}>
                    {pricing.example(techs, formatCad(techs * plan.priceCadMonthly))}
                  </li>
                ))}
              </ul>
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
  );
}
