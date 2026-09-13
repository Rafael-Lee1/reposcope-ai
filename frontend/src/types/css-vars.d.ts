import "react";

/**
 * Allows CSS custom properties in the `style` prop.
 *
 * React's `CSSProperties` type does not model custom properties, which forced
 * every component that drives the design system with `--token` values to cast
 * its style object. Declaring the index signature once, here, makes
 * `style={{ "--stagger-index": index }}` type-safe at every call site and
 * removes the need for casts in component code.
 *
 * Only the `--`-prefixed namespace is opened, so ordinary CSS properties stay
 * fully type-checked.
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
