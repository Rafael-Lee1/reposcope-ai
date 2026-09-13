import { CircleCheck, TriangleAlert } from "lucide-react";
import type { TechnicalAnalysis } from "../types/repository";
import { InsightsList } from "./InsightsList";
import { Section } from "./Section";

interface InsightsPanelProps {
  analysis: TechnicalAnalysis;
}

/** Strengths and attention points, side by side on desktop. */
export function InsightsPanel({ analysis }: InsightsPanelProps) {
  return (
    <div className="insights">
      <Section
        title="Strengths"
        description="Positive technical indicators."
        icon={<CircleCheck size={17} strokeWidth={1.8} />}
        variant="surface"
      >
        <InsightsList
          items={analysis.strengths}
          icon={CircleCheck}
          tone="success"
          emptyMessage="No technical strengths were detected."
        />
      </Section>

      <Section
        title="Attention Points"
        description="Areas that could improve the repository."
        icon={<TriangleAlert size={17} strokeWidth={1.8} />}
        variant="surface"
      >
        <InsightsList
          items={analysis.attention_points}
          icon={TriangleAlert}
          tone="warning"
          emptyMessage="No technical attention points detected."
        />
      </Section>
    </div>
  );
}
