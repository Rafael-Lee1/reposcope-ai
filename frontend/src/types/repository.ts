/**
 * Type definitions for the RepoScope AI backend response.
 *
 * Mirrors the contract exposed by:
 * GET /api/repositories/{owner}/{repo}
 */

/** Repository classification produced by the technical score. */
export type RepositoryClassification =
  | "excellent"
  | "strong"
  | "promising"
  | "developing"
  | "early_stage";

/** Activity status derived from the last push date. */
export type ActivityStatus =
  | "very_active"
  | "active"
  | "moderate"
  | "low"
  | "inactive"
  | "unknown";

/** Maturity level derived from repository indicators. */
export type MaturityLevel = "mature" | "developing" | "early_stage";

/** Section: `repository` */
export interface RepositoryInfo {
  name: string | null;
  full_name: string | null;
  description: string | null;
  url: string | null;
  language: string | null;
  license: string | null;
  default_branch: string | null;
  topics: string[];
}

/** Section: `metrics` */
export interface RepositoryMetrics {
  stars: number;
  forks: number;
  open_issues: number;
  watchers: number;
  size_kb: number;
}

/** Section: `dates` */
export interface RepositoryDates {
  created_at: string | null;
  updated_at: string | null;
  pushed_at: string | null;
  days_since_last_push: number | null;
}

/** Section: `technical_analysis.activity` */
export interface Activity {
  score: number;
  status: ActivityStatus;
}

/** Section: `technical_analysis.maturity` */
export interface Maturity {
  score: number;
  level: MaturityLevel;
}

/** Section: `technical_analysis` */
export interface TechnicalAnalysis {
  technical_score: number;
  classification: RepositoryClassification;
  activity: Activity;
  maturity: Maturity;
  detected_stack: string[];
  strengths: string[];
  attention_points: string[];
}

/** Full response body returned by the analysis endpoint. */
export interface RepositoryAnalysisResponse {
  repository: RepositoryInfo;
  metrics: RepositoryMetrics;
  dates: RepositoryDates;
  technical_analysis: TechnicalAnalysis;
}
