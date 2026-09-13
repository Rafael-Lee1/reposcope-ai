import type {
  ActivityStatus,
  MaturityLevel,
  RepositoryClassification,
} from "../types/repository";

/** Visual tone used by badges, bars and status indicators. */
export type Tone = "success" | "info" | "accent" | "warning" | "danger" | "neutral";

export interface ToneMeta {
  label: string;
  tone: Tone;
  description: string;
}

/** Presentation metadata for each repository classification. */
export const CLASSIFICATION_META: Record<RepositoryClassification, ToneMeta> = {
  excellent: {
    label: "Excellent",
    tone: "success",
    description: "Outstanding technical indicators across activity and maturity.",
  },
  strong: {
    label: "Strong",
    tone: "info",
    description: "Solid repository with consistent engineering signals.",
  },
  promising: {
    label: "Promising",
    tone: "accent",
    description: "Good foundations with clear room for technical growth.",
  },
  developing: {
    label: "Developing",
    tone: "warning",
    description: "Early indicators — documentation and activity can be improved.",
  },
  early_stage: {
    label: "Early Stage",
    tone: "danger",
    description: "Limited technical signals detected so far.",
  },
};

/** Presentation metadata for each activity status. */
export const ACTIVITY_STATUS_META: Record<ActivityStatus, ToneMeta> = {
  very_active: {
    label: "Very Active",
    tone: "success",
    description: "Pushed within the last 30 days.",
  },
  active: {
    label: "Active",
    tone: "success",
    description: "Pushed within the last 90 days.",
  },
  moderate: {
    label: "Moderate",
    tone: "accent",
    description: "Pushed within the last 6 months.",
  },
  low: {
    label: "Low",
    tone: "warning",
    description: "No push activity in the last 6 months.",
  },
  inactive: {
    label: "Inactive",
    tone: "danger",
    description: "No push activity for over a year.",
  },
  unknown: {
    label: "Unknown",
    tone: "neutral",
    description: "Push date is not available.",
  },
};

/** Presentation metadata for each maturity level. */
export const MATURITY_LEVEL_META: Record<MaturityLevel, ToneMeta> = {
  mature: {
    label: "Mature",
    tone: "success",
    description: "Repository shows consolidated project indicators.",
  },
  developing: {
    label: "Developing",
    tone: "accent",
    description: "Repository is growing and adding structural elements.",
  },
  early_stage: {
    label: "Early Stage",
    tone: "warning",
    description: "Repository is still establishing its foundations.",
  },
};

/**
 * Safe lookups — the API values are validated at runtime, so an unexpected
 * value falls back to conservative metadata instead of breaking the UI.
 */
export function getClassificationMeta(value: string): ToneMeta {
  return (
    CLASSIFICATION_META[value as RepositoryClassification] ??
    CLASSIFICATION_META.early_stage
  );
}

export function getActivityStatusMeta(value: string): ToneMeta {
  return ACTIVITY_STATUS_META[value as ActivityStatus] ?? ACTIVITY_STATUS_META.unknown;
}

export function getMaturityLevelMeta(value: string): ToneMeta {
  return (
    MATURITY_LEVEL_META[value as MaturityLevel] ??
    MATURITY_LEVEL_META.early_stage
  );
}
