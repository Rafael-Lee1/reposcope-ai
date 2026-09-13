/** Formatting helpers shared by the analysis components. */

/**
 * Formatter instances are created once at module scope.
 * The animated counters call these on every frame, so re-instantiating
 * `Intl.NumberFormat` per call would be needlessly expensive.
 */
const integerFormatter = new Intl.NumberFormat("en-US");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

/** Formats integers with locale-aware thousand separators. */
export function formatNumber(value: number): string {
  return integerFormatter.format(Math.round(value));
}

/** Formats a repository size in kilobytes using human readable units. */
export function formatSize(sizeKb: number): string {
  const safeSize = Math.max(0, sizeKb);

  if (safeSize < 1024) {
    return `${integerFormatter.format(Math.round(safeSize))} KB`;
  }

  const sizeMb = safeSize / 1024;

  if (sizeMb < 1024) {
    return `${sizeMb.toFixed(sizeMb < 10 ? 1 : 0)} MB`;
  }

  return `${(sizeMb / 1024).toFixed(2)} GB`;
}

/** Formats an ISO date string as a short, readable date. */
export function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return dateFormatter.format(date);
}

/** Formats a "days since" counter into a readable label. */
export function formatDaysSince(days: number | null): string {
  if (days === null) {
    return "—";
  }

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "1 day ago";
  }

  return `${integerFormatter.format(days)} days ago`;
}

/** Converts a snake_case identifier into a readable label. */
export function humanizeIdentifier(value: string): string {
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
