import { ArrowUpRight } from "lucide-react";
import type { RepositoryInfo } from "../types/repository";

interface RepositorySummaryProps {
  repository: RepositoryInfo;
}

/** Cohesive panel summarising the analysed repository. */
export function RepositorySummary({ repository }: RepositorySummaryProps) {
  const meta = [
    { label: "Primary language", value: repository.language ?? "Not detected" },
    { label: "License", value: repository.license ?? "Not specified" },
    {
      label: "Default branch",
      value: repository.default_branch ?? "Not available",
    },
  ];

  return (
    <section className="summary" aria-label="Repository summary">
      <div className="summary__top">
        <div className="summary__identity">
          <h2 className="summary__name">{repository.name ?? "Unknown repository"}</h2>
          <p className="summary__owner">{repository.full_name ?? "—"}</p>
          <p className="summary__description">
            {repository.description ?? "This repository has no description."}
          </p>
        </div>

        {repository.url ? (
          <a
            className="button button--secondary button--link"
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
            <ArrowUpRight className="button__icon" size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <dl className="summary__meta">
        {meta.map((item, index) => (
          <div
            className="summary__meta-item"
            key={item.label}
            style={{ "--stagger-index": index }}
          >
            <dt className="summary__meta-label">{item.label}</dt>
            <dd className="summary__meta-value">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
