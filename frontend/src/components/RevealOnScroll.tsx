import { useInView } from "../hooks/useInView";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Position in the stagger sequence. */
  index?: number;
  /** Extra delay in milliseconds, applied on top of the stagger index. */
  delayMs?: number;
  /** Entrance direction. */
  from?: "bottom" | "left" | "right";
  className?: string;
  /** Rendered as `<li>` when the reveal wraps a list item. */
  as?: "div" | "li";
}

/**
 * Reveals its children once when they scroll into view.
 *
 * The hidden state is carried by `data-reveal`, so CSS fully controls the
 * transition and `prefers-reduced-motion` can neutralise it.
 */
export function RevealOnScroll({
  children,
  index = 0,
  delayMs = 0,
  from = "bottom",
  className,
  as = "div",
}: RevealOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement & HTMLLIElement>();

  const style = {
    "--reveal-delay": `${index * 70 + delayMs}ms`,
  };

  const Element = as;

  return (
    <Element
      ref={ref}
      className={className}
      data-reveal={isInView ? "visible" : "hidden"}
      data-reveal-from={from}
      style={style}
    >
      {children}
    </Element>
  );
}
