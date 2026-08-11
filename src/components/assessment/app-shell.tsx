import { GraduationCap } from "lucide-react";
import type { ReactNode } from "react";

import { ProgressIndicator } from "@/components/assessment/progress-indicator";

/** Application chrome: header, progress area, main content region. */
export function AppShell({
  children,
  currentStep,
  totalSteps,
  showProgress = true,
}: {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">Learning Preference</p>
              <p className="truncate text-xs text-muted-foreground">Student assessment</p>
            </div>
          </div>
        </div>
        {showProgress ? (
          <div className="mx-auto w-full max-w-3xl px-4 pb-3 sm:px-6">
            <ProgressIndicator current={currentStep} total={totalSteps} />
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>

      <footer className="border-t border-border py-5">
        <p className="mx-auto max-w-3xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          Your answers stay on this device.
        </p>
      </footer>
    </div>
  );
}

/** Card-like container for a single step's content. */
export function StepPanel({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </header>
      {children ? <div className="space-y-4">{children}</div> : null}
      {footer ? <div className="mt-8">{footer}</div> : null}
    </section>
  );
}
