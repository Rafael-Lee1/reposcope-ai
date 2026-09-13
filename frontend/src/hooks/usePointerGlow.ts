import { useEffect, useRef } from "react";

/** Devices with a real pointing device, as opposed to touch. */
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Drives a subtle pointer-following glow on a decorative element.
 *
 * Performance contract:
 * - Pointer events are coalesced into a single animation frame, so moving the
 *   mouse never queues more than one write per frame.
 * - The position is written straight to CSS custom properties on the DOM node.
 *   No React state is involved, so pointing never triggers a render.
 * - The consumer animates `transform` only, keeping the work on the compositor.
 *
 * The listener is installed only when the device actually has a fine pointer
 * and the user has not requested reduced motion, so touch hardware and
 * reduced-motion users pay nothing at all.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    let frame = 0;
    let listening = false;

    const handleMove = (event: PointerEvent) => {
      // Copy before the frame callback: the event object must not be retained.
      const { clientX, clientY } = event;

      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        node.style.setProperty("--glow-x", `${clientX}px`);
        node.style.setProperty("--glow-y", `${clientY}px`);

        // Revealed only once a real position is known. Activating on mount
        // would bloom the glow at the layer's fallback position — the centre of
        // the viewport — before the pointer has ever moved.
        if (node.dataset.active !== "true") {
          node.dataset.active = "true";
        }
      });
    };

    const stop = () => {
      if (listening) {
        window.removeEventListener("pointermove", handleMove);
        listening = false;
      }

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      node.dataset.active = "false";
    };

    const start = () => {
      if (listening) {
        return;
      }

      window.addEventListener("pointermove", handleMove, { passive: true });
      listening = true;
    };

    const sync = () => {
      if (finePointer.matches && !reducedMotion.matches) {
        start();
      } else {
        stop();
      }
    };

    sync();

    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      stop();
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  return ref;
}
