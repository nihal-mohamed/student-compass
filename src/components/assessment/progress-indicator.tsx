import { ASSESSMENT_STEPS } from "@/lib/assessment/steps";
import { cn } from "@/lib/utils";

export type ProgressIndicatorProps = {
  current: number; // 1-based
  total?: number;
  className?: string;
};

/** Slim segmented progress bar with an accessible step label. */
export function ProgressIndicator({
  current,
  total = ASSESSMENT_STEPS.length,
  className,
}: ProgressIndicatorProps) {
  const label = ASSESSMENT_STEPS[current - 1]?.label;

  return (
    <div
      className={cn("w-full", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Step ${current} of ${total}${label ? `: ${label}` : ""}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-2">
        <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
        <p className="shrink-0 text-xs font-medium text-muted-foreground">
          Step {current} of {total}
        </p>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i < current ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
