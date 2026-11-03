"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { formAnchor, formRoutes } from "@/content/site";

/** Scrolls to the form when this page has one, otherwise goes to /early-access. */
export function EarlyAccessLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const href = formRoutes.includes(pathname) ? `#${formAnchor}` : "/early-access";
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
