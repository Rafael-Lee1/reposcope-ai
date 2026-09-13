import { Radar } from "lucide-react";
import { ApiStatusBadge } from "./ApiStatusBadge";
import type { ApiHealthStatus } from "../hooks/useApiHealth";

interface HeaderProps {
  apiStatus: ApiHealthStatus;
}

/** Compact application header: brand on the left, API status on the right. */
export function Header({ apiStatus }: HeaderProps) {
  return (
    <header className="app-header" data-reveal="visible">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          <Radar size={18} strokeWidth={1.9} />
          <span className="brand__pulse" />
        </span>

        <div className="brand__text">
          <h1 className="brand__name">RepoScope AI</h1>
          <p className="brand__tagline">Technical Repository Intelligence</p>
        </div>
      </div>

      <ApiStatusBadge status={apiStatus} />
    </header>
  );
}
