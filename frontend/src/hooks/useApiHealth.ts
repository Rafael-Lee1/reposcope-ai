import { useCallback, useEffect, useRef, useState } from "react";
import { checkApiHealth } from "../services/api";

/** Connection status of the RepoScope AI API. */
export type ApiHealthStatus = "checking" | "online" | "offline";

export interface ApiHealth {
  status: ApiHealthStatus;
  /** Called after a successful analysis so the indicator reflects reality. */
  markOnline: () => void;
  /** Called after a connection failure so the indicator reflects reality. */
  markOffline: () => void;
}

/**
 * Verifies that the backend is actually reachable via `GET /health`.
 * The status indicator is only ever shown as connected when this probe
 * succeeds or a real analysis request completed against the API.
 */
export function useApiHealth(): ApiHealth {
  const [status, setStatus] = useState<ApiHealthStatus>("checking");
  const mountedRef = useRef(true);

  const markOnline = useCallback(() => setStatus("online"), []);
  const markOffline = useCallback(() => setStatus("offline"), []);

  useEffect(() => {
    mountedRef.current = true;

    void checkApiHealth().then((healthy) => {
      if (mountedRef.current) {
        setStatus(healthy ? "online" : "offline");
      }
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { status, markOnline, markOffline };
}
