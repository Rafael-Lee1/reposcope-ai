import type {
  RepositoryAnalysisResponse,
  RepositoryInfo,
  RepositoryMetrics,
  RepositoryDates,
  TechnicalAnalysis,
  Activity,
  Maturity,
  RepositoryClassification,
  ActivityStatus,
  MaturityLevel,
} from "../types/repository";

/**
 * Base URL of the RepoScope AI FastAPI backend.
 * Overridable at build time through the VITE_API_BASE_URL environment variable.
 */
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 20_000;

/**
 * Classification of a failed request, used by the UI to pick a friendly
 * heading without having to re-interpret HTTP status codes.
 */
export type ApiErrorKind =
  | "connection"
  | "not-found"
  | "upstream"
  | "http"
  | "invalid-response";

/** Error type thrown by every request made through this service. */
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | null;

  constructor(
    message: string,
    options: { kind: ApiErrorKind; status?: number | null },
  ) {
    super(message);
    this.name = "ApiError";
    this.kind = options.kind;
    this.status = options.status ?? null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || typeof value === "number";
}

/**
 * Validates the payload returned by the API before it reaches the UI.
 * A malformed response is reported as an integration error instead of
 * producing runtime crashes in the analysis view.
 */
function parseAnalysisResponse(payload: unknown): RepositoryAnalysisResponse {
  if (!isRecord(payload)) {
    throw new ApiError("The API returned an unexpected response format.", {
      kind: "invalid-response",
    });
  }

  const repository = payload.repository;
  const metrics = payload.metrics;
  const dates = payload.dates;
  const analysis = payload.technical_analysis;

  if (!isRecord(repository) || !isRecord(metrics) || !isRecord(dates)) {
    throw new ApiError("The API response is missing required sections.", {
      kind: "invalid-response",
    });
  }

  if (!isRecord(analysis)) {
    throw new ApiError("The API response is missing the technical analysis.", {
      kind: "invalid-response",
    });
  }

  const activity = analysis.activity;
  const maturity = analysis.maturity;

  if (!isRecord(activity) || !isRecord(maturity)) {
    throw new ApiError(
      "The API response contains an invalid technical analysis.",
      { kind: "invalid-response" },
    );
  }

  const parsedRepository: RepositoryInfo = {
    name: isNullableString(repository.name) ? repository.name : null,
    full_name: isNullableString(repository.full_name) ? repository.full_name : null,
    description: isNullableString(repository.description) ? repository.description : null,
    url: isNullableString(repository.url) ? repository.url : null,
    language: isNullableString(repository.language) ? repository.language : null,
    license: isNullableString(repository.license) ? repository.license : null,
    default_branch: isNullableString(repository.default_branch)
      ? repository.default_branch
      : null,
    topics: isStringArray(repository.topics) ? repository.topics : [],
  };

  const parsedMetrics: RepositoryMetrics = {
    stars: typeof metrics.stars === "number" ? metrics.stars : 0,
    forks: typeof metrics.forks === "number" ? metrics.forks : 0,
    open_issues: typeof metrics.open_issues === "number" ? metrics.open_issues : 0,
    watchers: typeof metrics.watchers === "number" ? metrics.watchers : 0,
    size_kb: typeof metrics.size_kb === "number" ? metrics.size_kb : 0,
  };

  const parsedDates: RepositoryDates = {
    created_at: isNullableString(dates.created_at) ? dates.created_at : null,
    updated_at: isNullableString(dates.updated_at) ? dates.updated_at : null,
    pushed_at: isNullableString(dates.pushed_at) ? dates.pushed_at : null,
    days_since_last_push: isNullableNumber(dates.days_since_last_push)
      ? dates.days_since_last_push
      : null,
  };

  const parsedActivity: Activity = {
    score: typeof activity.score === "number" ? activity.score : 0,
    status: (isNullableString(activity.status)
      ? activity.status
      : "unknown") as ActivityStatus,
  };

  const parsedMaturity: Maturity = {
    score: typeof maturity.score === "number" ? maturity.score : 0,
    level: (isNullableString(maturity.level)
      ? maturity.level
      : "early_stage") as MaturityLevel,
  };

  const parsedAnalysis: TechnicalAnalysis = {
    technical_score:
      typeof analysis.technical_score === "number" ? analysis.technical_score : 0,
    classification: (isNullableString(analysis.classification)
      ? analysis.classification
      : "early_stage") as RepositoryClassification,
    activity: parsedActivity,
    maturity: parsedMaturity,
    detected_stack: isStringArray(analysis.detected_stack) ? analysis.detected_stack : [],
    strengths: isStringArray(analysis.strengths) ? analysis.strengths : [],
    attention_points: isStringArray(analysis.attention_points)
      ? analysis.attention_points
      : [],
  };

  return {
    repository: parsedRepository,
    metrics: parsedMetrics,
    dates: parsedDates,
    technical_analysis: parsedAnalysis,
  };
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();

    if (isRecord(payload) && typeof payload.detail === "string") {
      return payload.detail;
    }
  } catch {
    // The body is not JSON — fall back to the generic HTTP message below.
  }

  return `The API responded with status ${response.status}.`;
}

/**
 * Fetches the technical analysis of a public GitHub repository.
 *
 * GET {API_BASE_URL}/api/repositories/{owner}/{repo}
 *
 * @throws {ApiError} on validation problems, HTTP errors, timeouts or
 * connection failures.
 */
export async function analyzeRepository(
  owner: string,
  repo: string,
  signal?: AbortSignal,
): Promise<RepositoryAnalysisResponse> {
  const trimmedOwner = owner.trim();
  const trimmedRepo = repo.trim();

  if (!trimmedOwner || !trimmedRepo) {
    throw new ApiError("GitHub owner and repository name are required.", {
      kind: "http",
    });
  }

  const url = `${API_BASE_URL}/api/repositories/${encodeURIComponent(
    trimmedOwner,
  )}/${encodeURIComponent(trimmedRepo)}`;

  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(
    () => timeoutController.abort(),
    REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => timeoutController.abort();
  signal?.addEventListener("abort", onExternalAbort);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: timeoutController.signal,
    });
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    throw new ApiError(
      `The frontend could not reach ${API_BASE_URL}. Make sure the RepoScope AI API is running.`,
      { kind: "connection" },
    );
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onExternalAbort);
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError(
        "Check the GitHub owner and repository name and try again.",
        { kind: "not-found", status: 404 },
      );
    }

    if (response.status === 503) {
      throw new ApiError(
        "The GitHub API is currently unavailable. Please try again in a moment.",
        { kind: "upstream", status: 503 },
      );
    }

    throw new ApiError(await readErrorMessage(response), {
      kind: "http",
      status: response.status,
    });
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ApiError("The API returned a response that is not valid JSON.", {
      kind: "invalid-response",
    });
  }

  return parseAnalysisResponse(payload);
}

/**
 * Lightweight probe used by the header status indicator.
 * Uses the existing `/health` endpoint and never throws.
 */
export async function checkApiHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!response.ok) {
      return false;
    }

    const payload: unknown = await response.json();

    return isRecord(payload) && payload.status === "healthy";
  } catch {
    return false;
  }
}

export { API_BASE_URL };
