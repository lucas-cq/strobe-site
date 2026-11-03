"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HIDDEN: Keyframe = { opacity: 0, transform: "translateY(12px)" };
const SHOWN: Keyframe = { opacity: 1, transform: "none" };

/**
 * Fades `.reveal` elements up 12px over 400ms as they scroll into view, with sibling cards
 * staggered 60ms apart. Uses the Web Animations API instead of toggling classes, so it never
 * changes markup React is hydrating. Nothing is hidden unless this runs (it also marks <html>
 * with `js-ready`), elements already on screen are left alone, and reduced motion skips it.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-ready");

    const holds = new Map<Element, Animation>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el);
          const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
          const delay = siblings.length > 1 ? Math.min(siblings.indexOf(el), 6) * 60 : 0;
          holds.get(el)?.cancel();
          el.animate([HIDDEN, SHOWN], { duration: 400, delay, easing: "ease-out", fill: "backwards" });
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    // Each run (first load, every route change) holds back only what's still below the fold.
    // Anything at or above the fold is left alone, including cards revealed on an earlier run.
    for (const el of document.querySelectorAll(".reveal")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      holds.set(el, el.animate([HIDDEN], { duration: 0, fill: "forwards" }));
      io.observe(el);
    }

    return () => {
      io.disconnect();
      for (const hold of holds.values()) hold.cancel();
    };
  }, [pathname]);

  return null;
}
