import { useId } from "react";
import {
  getActivityStatusMeta,
  getClassificationMeta,
  getMaturityLevelMeta,
} from "../constants/status";
import type { TechnicalAnalysis } from "../types/repository";
import { buildInterpretation } from "../utils/insights";
import { AnimatedCounter } from "./AnimatedCounter";
import { ProgressBar } from "./ProgressBar";
import { RadialProgress } from "./RadialProgress";

interface TechnicalScoreProps {
  analysis: TechnicalAnalysis;
}

/**
 * Primary section of the analysis view.
 *
 * The radial stroke draws itself in, the number counts up from zero and the
 * tone comes from the backend classification — the score itself is never
 * invented on the client.
 */
export function TechnicalScore({ analysis }: TechnicalScoreProps) {
  const titleId = useId();

  const classification = getClassificationMeta(analysis.classification);
  const activity = getActivityStatusMeta(analysis.activity.status);
  const maturity = getMaturityLevelMeta(analysis.maturity.level);

  const score = Math.max(0, Math.min(100, Math.round(analysis.technical_score)));

  return (
    <section
      className="score"
      data-tone={classification.tone}
      aria-labelledby={titleId}
    >
      <h2 className="score__eyebrow" id={titleId}>
        Technical Score
      </h2>

      <div className="score__grid">
        <div className="score__gauge">
          <RadialProgress
            className="score__ring"
            value={score}
            tone={classification.tone}
            label={`Technical score: ${score} out of 100. Classification: ${classification.label}.`}
          >
            <AnimatedCounter
              className="score__value"
              value={score}
              durationMs={1100}
            />
            <span className="score__max">/ 100</span>
          </RadialProgress>
        </div>

        <div className="score__body">
          <div className="score__classification">
            <span className="badge badge--prominent" data-tone={classification.tone}>
              {classification.label}
            </span>
          </div>

          <p className="score__interpretation">{buildInterpretation(analysis)}</p>

          <div className="score__breakdown">
            <div className="breakdown">
              <div className="breakdown__row">
                <span className="breakdown__label">Activity</span>
                <span className="breakdown__value">
                  {analysis.activity.score}
                  <span className="breakdown__max"> / 100</span>
                </span>
              </div>
              <ProgressBar
                value={analysis.activity.score}
                tone={activity.tone}
                label="Activity score summary"
                delayMs={280}
              />
            </div>

            <div className="breakdown">
              <div className="breakdown__row">
                <span className="breakdown__label">Maturity</span>
                <span className="breakdown__value">
                  {analysis.maturity.score}
                  <span className="breakdown__max"> / 100</span>
                </span>
              </div>
              <ProgressBar
                value={analysis.maturity.score}
                tone={maturity.tone}
                label="Maturity score summary"
                delayMs={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
