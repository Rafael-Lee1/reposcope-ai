import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { AnalysisPipeline, PIPELINE_SEQUENCE_MS } from "./components/AnalysisPipeline";
import { DetectedStack } from "./components/DetectedStack";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { Header } from "./components/Header";
import { InsightsPanel } from "./components/InsightsPanel";
import { PointerGlow } from "./components/PointerGlow";
import { RepositoryForm } from "./components/RepositoryForm";
import { RepositorySummary } from "./components/RepositorySummary";
import { RevealOnScroll } from "./components/RevealOnScroll";
import { TechnicalHealth } from "./components/TechnicalHealth";
import { TechnicalScore } from "./components/TechnicalScore";
import { TechnicalSignals } from "./components/TechnicalSignals";
import { useApiHealth } from "./hooks/useApiHealth";
import { ApiError, analyzeRepository } from "./services/api";
import type { RepositoryAnalysisResponse } from "./types/repository";
import { describeError } from "./utils/errors";
import type { ErrorDescription } from "./utils/errors";
import "./App.css";

/** Example repository used to prefill the search workspace. */
const DEFAULT_OWNER = "Rafael-Lee1";
const DEFAULT_REPO = "contractguard-ai";

/**
 * Minimum time the analysis console stays on screen.
 *
 * The GitHub-backed request often completes in under 300ms, which makes the
 * phase sequence flash past as an unreadable frame. This floor is derived from
 * the pipeline's own sequence budget so every phase is always reached, plus a
 * short tail so the final phase is legible rather than instant.
 *
 * This is presentation pacing only. No progress value is invented and the real
 * response is never delayed beyond this floor.
 */
const MIN_PIPELINE_MS = PIPELINE_SEQUENCE_MS + 400;

/** Resolves after `ms`, or immediately if the request is aborted. */
function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }

    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      window.clearTimeout(timer);
      resolve();
    }

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

type AnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: RepositoryAnalysisResponse }
  | { status: "error"; error: ErrorDescription };

export default function App() {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const { status: apiStatus, markOnline, markOffline } = useApiHealth();

  const abortRef = useRef<AbortController | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const lastRequestRef = useRef<{ owner: string; repo: string } | null>(null);

  // Cancel any in-flight request when the app unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const runAnalysis = useCallback(
    async (owner: string, repo: string) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;
      lastRequestRef.current = { owner, repo };

      const startedAt = performance.now();

      setState({ status: "loading" });

      try {
        const data = await analyzeRepository(owner, repo, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        // Keep the pipeline legible when the API answers very quickly.
        const elapsed = performance.now() - startedAt;

        if (elapsed < MIN_PIPELINE_MS) {
          await delay(MIN_PIPELINE_MS - elapsed, controller.signal);

          if (controller.signal.aborted) {
            return;
          }
        }

        markOnline();
        setState({ status: "success", data });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (error instanceof ApiError && error.kind === "connection") {
          markOffline();
        }

        setState({ status: "error", error: describeError(error) });
      }
    },
    [markOffline, markOnline],
  );

  const handleRetry = useCallback(() => {
    const lastRequest = lastRequestRef.current;

    if (lastRequest) {
      void runAnalysis(lastRequest.owner, lastRequest.repo);
    }
  }, [runAnalysis]);

  // Bring the result area into view once an analysis settles.
  useEffect(() => {
    if (state.status === "success" || state.status === "error") {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.status]);

  const analysis = state.status === "success" ? state.data : null;

  return (
    <>
      <AnimatedBackground />
      <PointerGlow />

      <div className="app">
        <a className="skip-link" href="#results">
          Skip to analysis
        </a>

        <Header apiStatus={apiStatus} />

        <main className="app__main">
          <RevealOnScroll delayMs={60}>
            <RepositoryForm
              defaultOwner={DEFAULT_OWNER}
              defaultRepo={DEFAULT_REPO}
              isLoading={state.status === "loading"}
              onSubmit={runAnalysis}
            />
          </RevealOnScroll>

          <div className="app__results" id="results" ref={resultsRef}>
            {state.status === "idle" ? <EmptyState /> : null}

            {state.status === "loading" ? <AnalysisPipeline /> : null}

            {state.status === "error" ? (
              <ErrorState
                title={state.error.title}
                message={state.error.message}
                onRetry={lastRequestRef.current ? handleRetry : undefined}
              />
            ) : null}

            {analysis ? (
              <>
                <RevealOnScroll index={0}>
                  <RepositorySummary repository={analysis.repository} />
                </RevealOnScroll>

                <RevealOnScroll index={1}>
                  <TechnicalScore analysis={analysis.technical_analysis} />
                </RevealOnScroll>

                <RevealOnScroll index={2}>
                  <TechnicalSignals metrics={analysis.metrics} />
                </RevealOnScroll>

                <RevealOnScroll index={3}>
                  <TechnicalHealth
                    analysis={analysis.technical_analysis}
                    dates={analysis.dates}
                  />
                </RevealOnScroll>

                <RevealOnScroll index={4}>
                  <InsightsPanel analysis={analysis.technical_analysis} />
                </RevealOnScroll>

                <RevealOnScroll index={5}>
                  <DetectedStack stack={analysis.technical_analysis.detected_stack} />
                </RevealOnScroll>
              </>
            ) : null}
          </div>
        </main>

        <footer className="app__footer">
          <span>RepoScope AI · Technical Repository Intelligence</span>
          <code>GET /api/repositories/&#123;owner&#125;/&#123;repo&#125;</code>
        </footer>
      </div>
    </>
  );
}
