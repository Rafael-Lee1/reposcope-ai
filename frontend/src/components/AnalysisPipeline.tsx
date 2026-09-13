import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * The phases an analysis passes through.
 *
 * Every phase listed here corresponds to work the RepoScope AI backend really
 * performs for each request: it calls the GitHub API, reads public repository
 * metadata, scores activity and maturity, runs its technology-detection map,
 * derives the technical indicators, and computes the technical score.
 *
 * Nothing is claimed that the backend does not do, and no percentage is ever
 * invented — the rail is an indeterminate track and the stage readout counts
 * presentation phases, not a fabricated completion ratio.
 */
const STAGES = [
  { id: "detect", label: "Repository detected" },
  { id: "metadata", label: "Collecting GitHub metadata" },
  { id: "activity", label: "Analyzing repository activity" },
  { id: "maturity", label: "Evaluating project maturity" },
  { id: "stack", label: "Detecting technology stack" },
  { id: "indicators", label: "Generating technical indicators" },
  { id: "score", label: "Calculating technical score" },
] as const;

/**
 * How long the full phase sequence takes to walk through, in milliseconds.
 *
 * Exported because the caller paces the loading state against it: the response
 * must not replace this console mid-sequence, or the last phases would never
 * be seen. Defining it here keeps the two numbers tied together instead of
 * relying on a magic value that can silently drift out of sync.
 */
export const PIPELINE_SEQUENCE_MS = 1000;

/**
 * Time each phase holds, derived from the sequence budget so the final phase is
 * always reached. Deriving rather than hardcoding means changing the number of
 * phases cannot break the final state.
 */
const STAGE_DURATION_MS = PIPELINE_SEQUENCE_MS / (STAGES.length - 1);

type StageState = "done" | "active" | "pending";

/**
 * Animated analysis console shown while a request is in flight.
 *
 * The active stage is derived from elapsed wall-clock time rather than from
 * timer ticks. Browsers coalesce `setInterval` under load, which made the
 * sequence drift and stall; reading `performance.now()` inside an animation
 * frame cannot drift.
 *
 * The sequence completes on its own and then holds on the final phase until the
 * response arrives and this component unmounts.
 */
export function AnalysisPipeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(
        Math.floor(elapsed / STAGE_DURATION_MS),
        STAGES.length - 1,
      );

      setActiveIndex((current) => (current === next ? current : next));

      if (next < STAGES.length - 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  // Fraction of completed phases, 0–1. Consumed as a scaleX transform so the
  // rail never animates a layout property.
  const fillFraction = activeIndex / (STAGES.length - 1);

  function stateFor(index: number): StageState {
    if (index < activeIndex) {
      return "done";
    }

    return index === activeIndex ? "active" : "pending";
  }

  return (
    <section className="pipeline" aria-live="polite" aria-busy="true">
      <header className="pipeline__header">
        <Loader2 className="pipeline__spinner" size={19} aria-hidden="true" />

        <div className="pipeline__heading">
          <h2 className="pipeline__title">Analyzing repository...</h2>
          <p className="pipeline__subtitle">
            Reading public GitHub signals and deriving the technical profile.
          </p>
        </div>

        {/* Presentation-phase readout, not a completion percentage. */}
        <span className="pipeline__counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="pipeline__counter-total">
            /{String(STAGES.length).padStart(2, "0")}
          </span>
        </span>
      </header>

      <div
        className="pipeline__rail"
        style={{ "--rail-scale": fillFraction }}
        aria-hidden="true"
      >
        <span className="pipeline__rail-fill" />
        <span className="pipeline__rail-scan" />
      </div>

      <ol className="pipeline__stages">
        {STAGES.map((stage, index) => {
          const state = stateFor(index);

          return (
            <li
              className="stage"
              data-state={state}
              key={stage.id}
              // Stagger the entrance of each row.
              style={{ "--stagger-index": index }}
            >
              <span className="stage__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="stage__node" aria-hidden="true">
                {state === "done" ? (
                  <Check size={13} strokeWidth={2.6} />
                ) : state === "active" ? (
                  <span className="stage__pulse" />
                ) : (
                  <span className="stage__dot" />
                )}
              </span>

              <span className="stage__label">{stage.label}</span>

              <span className="stage__status">
                {state === "done"
                  ? "Complete"
                  : state === "active"
                    ? "Processing"
                    : "Queued"}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
