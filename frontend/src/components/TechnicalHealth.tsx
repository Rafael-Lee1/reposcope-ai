import {
  Activity as ActivityIcon,
  CalendarDays,
  Clock,
  GitCommitHorizontal,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { getActivityStatusMeta, getMaturityLevelMeta } from "../constants/status";
import type { RepositoryDates, TechnicalAnalysis } from "../types/repository";
import { formatDate, formatDaysSince } from "../utils/format";
import { ProgressBar } from "./ProgressBar";
import { Section } from "./Section";

interface TechnicalHealthProps {
  analysis: TechnicalAnalysis;
  dates: RepositoryDates;
}

/**
 * Repository health: activity and maturity side by side.
 *
 * Activity reads as movement (recency, push cadence) while maturity reads as
 * consolidation (age, structure). Both use the same visual grammar so they
 * stay comparable, and each bar grows once from zero to its real value.
 */
export function TechnicalHealth({ analysis, dates }: TechnicalHealthProps) {
  const activity = getActivityStatusMeta(analysis.activity.status);
  const maturity = getMaturityLevelMeta(analysis.maturity.level);

  return (
    <Section
      title="Technical Health"
      description="Activity and maturity indicators computed from repository metadata."
      variant="surface"
    >
      <div className="health">
        <div
          className="health__column"
          data-tone={activity.tone}
          data-kind="activity"
          style={{ "--stagger-index": 0 }}
        >
          <h3 className="health__heading">
            <ActivityIcon size={16} strokeWidth={1.8} aria-hidden="true" />
            Activity
          </h3>

          <div className="health__score">
            <span className="health__value">{analysis.activity.score}</span>
            <span className="health__max">/ 100</span>
            <span className="badge" data-tone={activity.tone}>
              {activity.label}
            </span>
          </div>

          <ProgressBar
            value={analysis.activity.score}
            tone={activity.tone}
            label="Activity score"
            delayMs={120}
          />

          <p className="health__note">{activity.description}</p>

          <dl className="stat-list">
            <div className="stat-row">
              <dt className="stat-row__label">
                <Clock size={15} strokeWidth={1.8} aria-hidden="true" />
                Days since last push
              </dt>
              <dd className="stat-row__value">
                {formatDaysSince(dates.days_since_last_push)}
              </dd>
            </div>
            <div className="stat-row">
              <dt className="stat-row__label">
                <RefreshCw size={15} strokeWidth={1.8} aria-hidden="true" />
                Last update
              </dt>
              <dd className="stat-row__value">{formatDate(dates.updated_at)}</dd>
            </div>
            <div className="stat-row">
              <dt className="stat-row__label">
                <GitCommitHorizontal size={15} strokeWidth={1.8} aria-hidden="true" />
                Last push
              </dt>
              <dd className="stat-row__value">{formatDate(dates.pushed_at)}</dd>
            </div>
          </dl>
        </div>

        <div
          className="health__column"
          data-tone={maturity.tone}
          data-kind="maturity"
          style={{ "--stagger-index": 1 }}
        >
          <h3 className="health__heading">
            <TrendingUp size={16} strokeWidth={1.8} aria-hidden="true" />
            Maturity
          </h3>

          <div className="health__score">
            <span className="health__value">{analysis.maturity.score}</span>
            <span className="health__max">/ 100</span>
            <span className="badge" data-tone={maturity.tone}>
              {maturity.label}
            </span>
          </div>

          <ProgressBar
            value={analysis.maturity.score}
            tone={maturity.tone}
            label="Maturity score"
            delayMs={240}
          />

          <p className="health__note">{maturity.description}</p>

          <dl className="stat-list">
            <div className="stat-row">
              <dt className="stat-row__label">
                <CalendarDays size={15} strokeWidth={1.8} aria-hidden="true" />
                Repository created
              </dt>
              <dd className="stat-row__value">{formatDate(dates.created_at)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
