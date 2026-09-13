import { Layers } from "lucide-react";
import { Section } from "./Section";

interface DetectedStackProps {
  stack: string[];
}

/**
 * Technologies detected by the backend analysis.
 *
 * Pills arrive one after another so the section reads as a discovery sequence.
 * Only values returned by the API are rendered — nothing is inferred here.
 */
export function DetectedStack({ stack }: DetectedStackProps) {
  return (
    <Section
      title="Detected Stack"
      description="Technologies inferred from language, topics and description."
      icon={<Layers size={17} strokeWidth={1.8} />}
      variant="surface"
    >
      {stack.length > 0 ? (
        <ul className="stack">
          {stack.map((technology, index) => (
            <li
              className="stack__pill"
              key={technology}
              style={{ "--stagger-index": index }}
            >
              {technology}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">No technologies were detected for this repository.</p>
      )}
    </Section>
  );
}
