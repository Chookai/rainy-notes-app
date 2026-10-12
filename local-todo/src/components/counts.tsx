import { Check, Layers3, CircleDashed } from "lucide-react";
import type { Counts as TaskCounts } from "@/lib/tasks";

export function Counts({ counts, label, compact = false }: {
  counts: TaskCounts;
  label: string;
  compact?: boolean;
}) {
  return (
    <dl aria-label={label} className={compact ? "counts counts-compact" : "counts"}>
      <div className="count total-count">
        <dt><Layers3 size={16} aria-hidden="true" /> Total</dt>
        <dd>{counts.total}</dd>
      </div>
      <div className="count completed-count">
        <dt><Check size={16} aria-hidden="true" /> Completed</dt>
        <dd>{counts.completed}</dd>
      </div>
      <div className="count remaining-count">
        <dt><CircleDashed size={16} aria-hidden="true" /> Remaining</dt>
        <dd>{counts.remaining}</dd>
      </div>
    </dl>
  );
}
