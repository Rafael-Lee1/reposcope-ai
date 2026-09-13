import { usePointerGlow } from "../hooks/usePointerGlow";

/**
 * A very low-intensity glow that follows the pointer.
 *
 * Purely decorative: hidden from assistive technology, transparent to pointer
 * events, and never a replacement for the real cursor. It is inert on touch
 * devices and when the user prefers reduced motion.
 */
export function PointerGlow() {
  const ref = usePointerGlow<HTMLDivElement>();

  return <div className="glow" ref={ref} aria-hidden="true" />;
}
