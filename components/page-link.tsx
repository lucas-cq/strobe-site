"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A Link that scrolls to the top itself when it points at the page you're already on.
 * Next treats /#early-access → / as a hash-only change and keeps smooth scrolling on, so its
 * own scroll and scrollIntoView fight and the page stops short of the top.
 */
export function PageLink({ href, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || href !== pathname) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        if (window.location.hash) window.history.pushState(null, "", href);
        window.scrollTo({ top: 0 });
      }}
    />
  );
}
