import { Loader2, Search } from "lucide-react";
import { useId, useState } from "react";
import type { FormEvent } from "react";

interface RepositoryFormProps {
  defaultOwner: string;
  defaultRepo: string;
  isLoading: boolean;
  onSubmit: (owner: string, repo: string) => void;
}

/**
 * Primary search workspace and the entry point of the analysis workflow.
 *
 * The panel carries an animated focus border while either input is focused, and
 * the submit button changes shape into its analysing state during the request.
 * Submitting with Enter runs the same validated flow as the button.
 */
export function RepositoryForm({
  defaultOwner,
  defaultRepo,
  isLoading,
  onSubmit,
}: RepositoryFormProps) {
  const [owner, setOwner] = useState(defaultOwner);
  const [repo, setRepo] = useState(defaultRepo);
  const [validationError, setValidationError] = useState<string | null>(null);

  const ownerId = useId();
  const repoId = useId();
  const errorId = useId();

  const ownerIsInvalid = validationError !== null && owner.trim().length === 0;
  const repoIsInvalid = validationError !== null && repo.trim().length === 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (owner.trim().length === 0 || repo.trim().length === 0) {
      setValidationError("GitHub owner and repository name are both required.");
      return;
    }

    setValidationError(null);
    onSubmit(owner.trim(), repo.trim());
  }

  return (
    <section
      className="search"
      data-loading={isLoading}
      aria-labelledby={`${ownerId}-title`}
    >
      <span className="search__beam" aria-hidden="true" />

      <header className="search__header">
        <h2 className="search__title" id={`${ownerId}-title`}>
          Analyze a GitHub Repository
        </h2>
        <p className="search__description">
          Generate a technical profile based on repository metadata, activity,
          maturity and detected technologies.
        </p>
      </header>

      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field__label" htmlFor={ownerId}>
            GitHub Owner
          </label>
          <input
            id={ownerId}
            name="owner"
            type="text"
            className="field__input"
            value={owner}
            placeholder="Rafael-Lee1"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={isLoading}
            aria-invalid={ownerIsInvalid}
            aria-describedby={validationError ? errorId : undefined}
            onChange={(event) => setOwner(event.target.value)}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor={repoId}>
            Repository Name
          </label>
          <input
            id={repoId}
            name="repository"
            type="text"
            className="field__input"
            value={repo}
            placeholder="contractguard-ai"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={isLoading}
            aria-invalid={repoIsInvalid}
            aria-describedby={validationError ? errorId : undefined}
            onChange={(event) => setRepo(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="button button--primary"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="button__spinner" size={17} aria-hidden="true" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="button__icon" size={17} aria-hidden="true" />
              Analyze Repository
            </>
          )}
        </button>
      </form>

      {validationError ? (
        <p className="search__error" id={errorId} role="alert">
          {validationError}
        </p>
      ) : null}

      <p className="search__footer">
        Works with any public repository.
        <span>
          Press <kbd>Enter</kbd> to run the analysis.
        </span>
      </p>
    </section>
  );
}
