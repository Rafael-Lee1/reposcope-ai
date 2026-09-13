import type { LucideIcon } from "lucide-react";
import type { Tone } from "../constants/status";

interface InsightsListProps {
  items: string[];
  /** Icon rendered for every entry. */
  icon: LucideIcon;
  tone: Tone;
  /** Shown when the list is empty. */
  emptyMessage: string;
}

/** Shared list used by both strengths and attention points. */
export function InsightsList({
  items,
  icon: Icon,
  tone,
  emptyMessage,
}: InsightsListProps) {
  if (items.length === 0) {
    return <p className="muted">{emptyMessage}</p>;
  }

  return (
    <ul className="insight-list">
      {items.map((item, index) => (
        <li
          className="insight"
          data-tone={tone}
          key={item}
          style={{ "--stagger-index": index }}
        >
          <Icon size={16} strokeWidth={2} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
