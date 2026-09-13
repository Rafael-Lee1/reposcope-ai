import { GitBranch, Github, Sparkles } from "lucide-react";
import { useId } from "react";

const STEPS = [
  {
    title: "Enter a GitHub repository",
    description: "Provide the owner and repository name of any public project.",
  },
  {
    title: "Collect technical signals",
    description:
      "RepoScope AI reads public metadata, activity and detected technologies.",
  },
  {
    title: "Review the technical profile",
    description:
      "Read the technical score, health indicators, strengths and attention points.",
  },
] as const;

/**
 * Shown before the first analysis is executed.
 *
 * Rendered as an "intelligence workspace waiting for input": a signal flow
 * diagram that traces input metadata toward a repository profile, which then
 * settles into a calm idle state.
 */
export function EmptyState() {
  const titleId = useId();

  return (
    <section className="empty" aria-labelledby={titleId}>
      <div className="workspace" aria-hidden="true">
        <span className="workspace__rail workspace__rail--top" />
        <span className="workspace__rail workspace__rail--bottom" />

        <span className="workspace__node workspace__node--input">
          <Github size={17} strokeWidth={1.8} />
        </span>

        <span className="workspace__node workspace__node--process">
          <GitBranch size={17} strokeWidth={1.8} />
        </span>

        <span className="workspace__node workspace__node--output">
          <Sparkles size={17} strokeWidth={1.8} />
        </span>

        <span className="workspace__pulse" />
        <span className="workspace__sweep" />
      </div>

      <header className="empty__header">
        <h2 className="empty__title" id={titleId}>
          How RepoScope AI works
        </h2>
        <p className="empty__description">
          RepoScope AI turns public GitHub metadata into an engineering profile.
          No configuration or credentials are required.
        </p>
      </header>

      <ol className="empty__steps">
        {STEPS.map((step, index) => (
          <li
            className="empty__step"
            key={step.title}
            style={{ "--stagger-index": index }}
          >
            <span className="empty__step-index" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="empty__step-title">{step.title}</h3>
            <p className="empty__step-description">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
