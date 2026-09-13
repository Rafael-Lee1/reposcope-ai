import { useId } from "react";
import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  /**
   * `surface` wraps the section in an elevated panel.
   * `plain` (default) relies on the child content to provide the surface,
   * which keeps the interface from becoming a stack of boxes.
   */
  variant?: "plain" | "surface";
  className?: string;
  children: ReactNode;
}

/** Grouped block with a consistent heading and description. */
export function Section({
  title,
  description,
  icon,
  variant = "plain",
  className,
  children,
}: SectionProps) {
  const titleId = useId();

  return (
    <section
      className={["section", `section--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <header className="section__header">
        <div className="section__heading">
          <h2 className="section__title" id={titleId}>
            {icon ? (
              <span className="section__icon" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            {title}
          </h2>
          {description ? (
            <p className="section__description">{description}</p>
          ) : null}
        </div>
      </header>

      <div className="section__body">{children}</div>
    </section>
  );
}
