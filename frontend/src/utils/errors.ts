import { ApiError } from "../services/api";
import type { ApiErrorKind } from "../services/api";

/** Human-friendly heading and explanation shown by the error state. */
export interface ErrorDescription {
  title: string;
  message: string;
}

/**
 * Short headings for each failure kind. The explanatory sentence lives in
 * `ApiError.message`, so the two never repeat each other.
 */
const ERROR_TITLES: Record<ApiErrorKind, string> = {
  connection: "Unable to connect to the RepoScope AI API",
  "not-found": "Repository not found",
  upstream: "Upstream service unavailable",
  http: "Analysis failed",
  "invalid-response": "Unexpected API response",
};

/** Normalises any thrown value into a title/message pair for the UI. */
export function describeError(error: unknown): ErrorDescription {
  if (error instanceof ApiError) {
    return {
      title: ERROR_TITLES[error.kind],
      message: error.message,
    };
  }

  return {
    title: "Analysis failed",
    message:
      "An unexpected error occurred while analyzing the repository. Please try again.",
  };
}
