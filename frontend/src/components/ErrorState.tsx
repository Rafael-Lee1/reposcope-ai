import { RotateCcw, TriangleAlert } from "lucide-react";

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

/**
 * Shown when an analysis request fails.
 * Deliberately calm: a soft warning tone and a clear next action rather than
 * an alarming full-screen error.
 */
export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <section className="error" role="alert">
      <span className="error__icon" aria-hidden="true">
        <TriangleAlert size={18} strokeWidth={1.9} />
        <span className="error__ring" />
      </span>

      <div className="error__body">
        <h2 className="error__title">{title}</h2>
        <p className="error__message">{message}</p>

        {onRetry ? (
          <button
            type="button"
            className="button button--secondary button--link"
            onClick={onRetry}
          >
            <RotateCcw className="button__icon" size={16} aria-hidden="true" />
            Try again
          </button>
        ) : null}
      </div>
    </section>
  );
}
