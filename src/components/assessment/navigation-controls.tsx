import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavigationControlsProps = {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  showBack?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

/** Bottom navigation for every step: back on the left, primary action right. */
export function NavigationControls({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  showBack = true,
  nextDisabled = false,
  className,
}: NavigationControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {showBack ? (
        <Button variant="ghost" size="lg" onClick={onBack} className="sm:w-auto">
          <ArrowLeft />
          {backLabel}
        </Button>
      ) : (
        <span className="hidden sm:block" />
      )}
      <Button size="lg" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
        <ArrowRight />
      </Button>
    </div>
  );
}
