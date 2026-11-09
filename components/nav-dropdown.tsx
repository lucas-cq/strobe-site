"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { NavLink } from "@/content/site";
import { PageLink } from "./page-link";

export const navItemClasses =
  "rounded-button px-2 py-2 text-[15px] font-medium whitespace-nowrap text-ink-2 transition-colors hover:text-ink lg:px-3";

/**
 * A desktop nav menu that opens on click. The links stay in the HTML while it's closed, so
 * crawlers still find them.
 */
export function NavDropdown({ label, links }: { label: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const closeIfOutside = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("focusin", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("focusin", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`${navItemClasses} inline-flex items-center gap-1`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-3 transition-transform duration-150 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>
      <ul
        id={menuId}
        className={`absolute top-full left-0 mt-2 min-w-48 rounded-card border border-line bg-white p-1.5 shadow-soft ${open ? "" : "hidden"}`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <PageLink
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-button px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
