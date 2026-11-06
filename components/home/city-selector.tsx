"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import {
  type JurisdictionId,
  defaultJurisdiction,
  jurisdictionById,
  jurisdictions,
  matchJurisdiction,
} from "@/content/jurisdictions";
import { JurisdictionCard } from "../jurisdiction-card";
import { PrefillLink } from "../prefill-link";
import { ArrowLink } from "../section";

const SHADOW_ROOM = 32; // matches pb-8

/**
 * Type a site address or pick a city, and the card shows where that city wants the filing.
 * Matching is plain text against content/jurisdictions.ts: no geocoding, no network calls.
 */
export function CitySelector() {
  const { cities } = home;
  const [selected, setSelected] = useState<JurisdictionId>(defaultJurisdiction);
  const [address, setAddress] = useState("");
  const j = jurisdictionById(selected);

  // The card animates to its new height (instantly under reduced motion). The wrapper is padded
  // and pulled back with negative margins so overflow-hidden doesn't clip the card's shadow.
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const observer = new ResizeObserver(() => setHeight(inner.offsetHeight));
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  const linkLabel = cities.links[selected];
  const footer =
    linkLabel &&
    (selected === "elsewhere" ? (
      <PrefillLink
        values={{ city: address.trim() }}
        className="group inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-indigo underline-offset-4 hover:underline"
      >
        {linkLabel}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
          →
        </span>
      </PrefillLink>
    ) : (
      j.href && <ArrowLink href={j.href}>{linkLabel}</ArrowLink>
    ));

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
      <div className="reveal">
        <label htmlFor="site-address" className="text-[15px] font-medium text-ink">
          {cities.inputLabel}
        </label>
        <input
          id="site-address"
          type="text"
          autoComplete="off"
          value={address}
          placeholder={cities.inputPlaceholder}
          onChange={(e) => {
            setAddress(e.target.value);
            const match = matchJurisdiction(e.target.value);
            if (match) setSelected(match);
          }}
          className="mt-1.5 block h-12 w-full rounded-button border border-field bg-white px-3.5 text-base text-ink transition-colors placeholder:text-muted hover:border-muted"
        />

        <fieldset className="mt-6">
          <legend className="text-[15px] font-medium text-ink">{cities.chipsLabel}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {jurisdictions.map((option) => (
              <label
                key={option.id}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-field bg-white px-4 py-2 text-[15px] font-medium text-ink transition-colors select-none hover:border-muted has-[:checked]:border-indigo has-[:checked]:bg-indigo has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo"
              >
                <input
                  type="radio"
                  name="jurisdiction"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => {
                    setSelected(option.id);
                    // A real sample address for a city; an empty box for "Somewhere else", ready to type in.
                    setAddress(option.id === "elsewhere" ? "" : option.sampleAddress);
                  }}
                  className="sr-only"
                />
                {option.name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="reveal">
        <div
          className="-mx-4 -mb-8 overflow-hidden px-4 pb-8 transition-[height] duration-300 ease-out motion-reduce:transition-none"
          style={height ? { height: height + SHADOW_ROOM } : undefined}
        >
          <div ref={innerRef} aria-live="polite">
            <div key={selected} className="motion-safe:animate-[fade-in_200ms_ease-out]">
              <h3 className="sr-only">{j.name}</h3>
              <JurisdictionCard jurisdiction={j} footer={footer} />
              {j.note && <p className="mt-3 text-[15px] text-ink-2">{j.note}</p>}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{cities.footnote}</p>
      </div>
    </div>
  );
}
