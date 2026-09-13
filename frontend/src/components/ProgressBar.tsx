import type { Tone } from "../constants/status";

interface ProgressBarProps {
  /** Progress value between 0 and 100. */
  value: number;
  tone?: Tone;
  /** Accessible description of what is being measured. */
  label: string;
  /** Delay before the bar grows, used to stagger grouped bars. */
  delayMs?: number;
}

/**
 * Accessible horizontal progress indicator.
 * The bar grows from 0 to its real value using a GPU-friendly scaleX
 * animation, so the width always reflects the API value at rest.
 */
export function ProgressBar({ value, tone = "accent", label, delayMs = 0 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div
      className="progress"
      data-tone={tone}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
    >
      <div className="progress__track">
        <div
          className="progress__fill"
          style={{ width: `${clamped}%`, "--grow-delay": `${delayMs}ms` }}
        />
      </div>
    </div>
  );
}
