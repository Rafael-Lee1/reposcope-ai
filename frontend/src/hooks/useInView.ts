import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseInViewOptions {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  /** Extra margin around the viewport, e.g. "0px 0px -8% 0px". */
  rootMargin?: string;
}

/**
 * Reports whether an element has entered the viewport, once.
 *
 * Uses IntersectionObserver (no scroll listeners) and stops observing as soon
 * as the element is revealed, so the entrance animation never replays.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -6% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [prefersReduced, rootMargin, threshold]);

  return { ref, isInView };
}
