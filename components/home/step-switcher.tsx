"use client";

import { type ReactNode, useState } from "react";

export type Step = {
  role: string;
  title: string;
  body: string;
  /** Read by screen readers in place of the decorative mockup. */
  visualAlt: string;
  visual: ReactNode;
  /** Wider than a phone: zoom it down on narrow screens so it keeps its proportions. */
  wide?: boolean;
};

const number = (i: number) => String(i + 1).padStart(2, "0");

function RoleLabel({ step, i }: { step: Step; i: number }) {
  return (
    <p className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-ice">
      <span className="tabular">{number(i)}</span>
      <span aria-hidden="true" className="h-px w-4 bg-ice/50" />
      {step.role}
    </p>
  );
}

function Body({ step, active = true }: { step: Step; active?: boolean }) {
  return (
    <>
      <p className={`mt-2 text-[15px] transition-colors ${active ? "text-night-text" : "text-night-muted"}`}>{step.body}</p>
      <p className="sr-only">{step.visualAlt}</p>
    </>
  );
}

/**
 * The How it works steps. Phones and tablets: a plain list with each mockup under its text.
 * Desktop: the steps are buttons (aria-pressed) and the chosen step's mockup shows in the panel
 * on the right, crossfading over 200 ms (instantly with reduced motion). Never auto-advances.
 */
export function StepSwitcher({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Phones and tablets */}
      <ol className="mt-10 space-y-14 lg:hidden">
        {steps.map((step, i) => (
          <li key={step.title} className="reveal">
            <RoleLabel step={step} i={i} />
            <h3 className="mt-2 text-2xl text-white">{step.title}</h3>
            <Body step={step} />
            <div className="mt-6 flex justify-center">
              <div className={step.wide ? "max-[400px]:[zoom:0.74] min-[400px]:max-sm:[zoom:0.85]" : ""}>{step.visual}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop */}
      <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-14">
        <ol className="space-y-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <li
                key={step.title}
                className={`relative rounded-card-lg p-5 transition-colors has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-2 has-[button:focus-visible]:outline-[var(--focus-ring)] ${
                  isActive ? "bg-white/[0.07] ring-1 ring-white/15" : "hover:bg-white/[0.03]"
                }`}
              >
                <RoleLabel step={step} i={i} />
                <h3 className="mt-1.5 text-xl text-white">
                  {/* The ::after stretches the button over the whole step, so any part of it is clickable */}
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    className="text-left after:absolute after:inset-0 after:rounded-card-lg focus-visible:outline-none"
                  >
                    {step.title}
                  </button>
                </h3>
                <Body step={step} active={isActive} />
              </li>
            );
          })}
        </ol>

        <div
          aria-hidden="true"
          className="sticky top-24 grid h-[640px] place-items-center self-start rounded-card-lg bg-white/[0.04] p-8 ring-1 ring-white/10"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`[grid-area:1/1] flex w-full justify-center transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
                i === active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              {step.visual}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
