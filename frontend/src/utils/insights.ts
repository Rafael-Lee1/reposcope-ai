import {
  getActivityStatusMeta,
  getClassificationMeta,
  getMaturityLevelMeta,
} from "../constants/status";
import type { TechnicalAnalysis } from "../types/repository";

/**
 * Builds a concise interpretation sentence for the technical score.
 *
 * Every value is read from existing API fields — no data is invented or
 * inferred beyond what the backend already computed.
 */
export function buildInterpretation(analysis: TechnicalAnalysis): string {
  const classification = getClassificationMeta(analysis.classification);
  const activity = getActivityStatusMeta(analysis.activity.status);
  const maturity = getMaturityLevelMeta(analysis.maturity.level);

  return [
    classification.description,
    `Activity is ${activity.label.toLowerCase()} (${analysis.activity.score}/100)`,
    `and maturity is ${maturity.label.toLowerCase()} (${analysis.maturity.score}/100).`,
  ].join(" ");
}
