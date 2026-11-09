"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { EarlyAccessLink } from "./early-access-link";
import { Lockup } from "./lockup";
import { PageLink } from "./page-link";
import { buttonClasses } from "./ui";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-button text-ink hover:bg-surface md:hidden"
        aria-label={site.menu.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-white p-0 text-ink backdrop:bg-night/40 md:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <PageLink href="/" onClick={close} aria-label="Strobe home">
              <Lockup className="h-7 w-auto" label="" />
            </PageLink>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-button hover:bg-surface"
              aria-label={site.menu.close}
              onClick={close}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="divide-y divide-line">
              {site.nav.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="py-3">
                    <p className="text-[15px] font-medium text-muted">{item.label}</p>
                    <ul className="mt-1">
                      {item.children.map((link) => (
                        <li key={link.href}>
                          <PageLink
                            href={link.href}
                            onClick={close}
                            className="flex min-h-12 items-center text-lg font-medium text-ink"
                          >
                            {link.label}
                          </PageLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <PageLink
                      href={item.href}
                      onClick={close}
                      className="flex min-h-14 items-center text-lg font-medium text-ink"
                    >
                      {item.label}
                    </PageLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <EarlyAccessLink onClick={close} className={`${buttonClasses("primary", "lg")} w-full`}>
              {site.cta.primary}
            </EarlyAccessLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
