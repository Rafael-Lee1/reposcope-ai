import type { ApiHealthStatus } from "../hooks/useApiHealth";
import { API_BASE_URL } from "../services/api";

interface ApiStatusBadgeProps {
  status: ApiHealthStatus;
}

/**
 * Short label per state. `detail` is exposed as a tooltip so the badge stays
 * compact while still explaining what was verified.
 */
const STATUS_META: Record<
  ApiHealthStatus,
  { label: string; tone: string; detail: string }
> = {
  checking: {
    label: "Checking API",
    tone: "neutral",
    detail: `Probing ${API_BASE_URL}/health`,
  },
  online: {
    label: "API Connected",
    tone: "success",
    detail: `Verified against ${API_BASE_URL}`,
  },
  offline: {
    label: "API Offline",
    tone: "danger",
    detail: `No response from ${API_BASE_URL}`,
  },
};

/**
 * Connection indicator for the backend.
 * "API Connected" is only shown after a real request to the RepoScope AI API
 * succeeded, so the indicator never overstates the system state.
 */
export function ApiStatusBadge({ status }: ApiStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <span
      className="api-status"
      data-tone={meta.tone}
      data-state={status}
      role="status"
      title={meta.detail}
    >
      <span className="api-status__dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export { STATUS_META };
