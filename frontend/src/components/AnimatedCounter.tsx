import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface AnimatedCounterProps {
  /** Final value to count up to. */
  value: number;
  /** Formats the intermediate and final value. Must be referentially stable. */
  format?: (value: number) => string;
  /** Animation length in milliseconds. */
  durationMs?: number;
  className?: string;
}

/** Standard ease-out cubic: fast start, gentle settle. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const identity = (value: number) => String(value);

/**
 * Counts from 0 to `value` once, driven by requestAnimationFrame.
 *
 * The animated text is written straight to the DOM node so the burst of frames
 * does not trigger a React render per frame.
 *
 * `format` is intentionally excluded from the effect dependencies: callers pass
 * module-level or memoised functions, and re-running the whole animation
 * whenever a new inline function identity appears would be undesirable.
 */
export function AnimatedCounter({
  value,
  format = identity,
  durationMs = 900,
  className,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) {
      return;
    }

    if (prefersReduced || durationMs <= 0) {
      node.textContent = formatRef.current(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const current = value * easeOutCubic(progress);

      // Counters show whole numbers unless the target itself is fractional.
      node.textContent = formatRef.current(
        Number.isInteger(value) ? Math.round(current) : current,
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, durationMs, prefersReduced]);

  return (
    <span className={className} ref={nodeRef}>
      {format(value)}
    </span>
  );
}
