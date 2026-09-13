/**
 * Ambient, decorative background.
 *
 * Entirely CSS-driven (transform + opacity only) so it stays on the compositor
 * and costs no JavaScript. Purely presentational: hidden from assistive
 * technology and pointer events.
 */
export function AnimatedBackground() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__orb bg__orb--one" />
      <div className="bg__orb bg__orb--two" />
      <div className="bg__scan" />
      <div className="bg__vignette" />
    </div>
  );
}
