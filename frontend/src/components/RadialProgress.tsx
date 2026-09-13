import type { ReactNode } from "react";
import type { Tone } from "../constants/status";

interface RadialProgressProps {
  /** Progress value between 0 and 100. */
  value: number;
  tone?: Tone;
  /** Stroke width in viewBox units. */
  thickness?: number;
  /** Accessible description of the measurement. */
  label: string;
  /** Content rendered inside the ring. */
  children: ReactNode;
  className?: string;
}

const VIEW_BOX = 200;

/**
 * Circular progress indicator drawn with a single stroked circle.
 * The stroke draws itself in from zero on mount; the target offset is applied
 * inline so the final rendered value always matches the real API value even if
 * animations are disabled.
 */
export function RadialProgress({
  value,
  tone = "accent",
  thickness = 12,
  label,
  children,
  className,
}: RadialProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (VIEW_BOX - thickness) / 2;
  const center = VIEW_BOX / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  const style = {
    "--circumference": circumference,
    "--offset": offset,
  };

  return (
    <div
      className={["radial", className].filter(Boolean).join(" ")}
      data-tone={tone}
      style={style}
    >
      <svg viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} role="img" aria-label={label}>
        <circle
          className="radial__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
        />
        <circle
          className="radial__value"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <div className="radial__center">{children}</div>
    </div>
  );
}
