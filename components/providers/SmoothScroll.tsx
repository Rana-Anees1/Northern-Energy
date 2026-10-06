"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smooth-scrolling via Lenis. Initialised once at the root. Disabled
 * for users who prefer reduced motion (native scrolling is used instead).
 *
 * The active instance is held in a module singleton so other components
 * (BackToTop, modals) can drive or pause it.
 */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smoothly scroll to the top, falling back to native behaviour. */
export function scrollToTop(): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.25 });
    return;
  }
  if (typeof window !== "undefined") {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.35,
      wheelMultiplier: 0.95,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
