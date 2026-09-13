import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function readPreference(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia(QUERY).matches;
}

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 * JavaScript-driven animation (counters, timers) uses this to skip motion,
 * because CSS media queries cannot disable imperative rAF loops.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(readPreference);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);

    setPrefersReduced(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
