import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SelectionCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onSelect?: () => void;
  className?: string;
};

/**
 * Reusable option tile used by every selection screen (language, format,
 * question answers). Behaves as a radio or checkbox depending on `multiple`.
 */
export function SelectionCard({
  title,
  description,
  icon,
  selected = false,
  disabled = false,
  multiple = false,
  onSelect,
  className,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border bg-card p-4 text-left transition-all",
        "hover:border-primary/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        selected ? "border-primary bg-accent/40 shadow-soft" : "border-border",
        className,
      )}
    >
      {icon ? (
        <span
          className={cn(
            "mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-primary transition-colors",
            selected && "bg-primary text-primary-foreground",
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-card-foreground sm:text-base">
          {title}
        </span>
        {description ? (
          <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
        ) : null}
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-1 size-4 shrink-0 border-2 border-border transition-colors",
          multiple ? "rounded-[5px]" : "rounded-full",
          selected && "border-primary bg-primary",
        )}
      />
    </button>
  );
}

/** Responsive grid wrapper for groups of SelectionCards. */
export function SelectionGroup({
  children,
  columns = 2,
  label,
  multiple = false,
  className,
}: {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  label?: string;
  multiple?: boolean;
  className?: string;
}) {
  return (
    <div
      role={multiple ? "group" : "radiogroup"}
      aria-label={label}
      className={cn(
        "grid gap-3",
        columns === 1 && "grid-cols-1",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
