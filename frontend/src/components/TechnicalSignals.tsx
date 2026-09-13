import { CircleDot, Eye, GitFork, HardDrive, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RepositoryMetrics } from "../types/repository";
import { formatNumber, formatSize } from "../utils/format";
import { AnimatedCounter } from "./AnimatedCounter";
import { Section } from "./Section";

interface TechnicalSignalsProps {
  metrics: RepositoryMetrics;
}

interface Signal {
  label: string;
  value: number;
  format: (value: number) => string;
  icon: LucideIcon;
}

/**
 * Deliberately secondary to the technical score: a compact strip of signals
 * that count up and settle into their real API values.
 */
export function TechnicalSignals({ metrics }: TechnicalSignalsProps) {
  const signals: Signal[] = [
    { label: "Stars", value: metrics.stars, format: formatNumber, icon: Star },
    { label: "Forks", value: metrics.forks, format: formatNumber, icon: GitFork },
    {
      label: "Open issues",
      value: metrics.open_issues,
      format: formatNumber,
      icon: CircleDot,
    },
    { label: "Watchers", value: metrics.watchers, format: formatNumber, icon: Eye },
    {
      label: "Repository size",
      value: metrics.size_kb,
      format: formatSize,
      icon: HardDrive,
    },
  ];

  return (
    <Section
      title="Technical Signals"
      description="Public repository metrics and footprint."
    >
      <dl className="signals">
        {signals.map((signal, index) => (
          <div
            className="signal"
            key={signal.label}
            style={{ "--stagger-index": index }}
          >
            <dt className="signal__label">
              <signal.icon size={15} strokeWidth={1.8} aria-hidden="true" />
              {signal.label}
            </dt>
            <dd className="signal__value">
              <AnimatedCounter
                value={signal.value}
                format={signal.format}
                durationMs={850}
              />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
