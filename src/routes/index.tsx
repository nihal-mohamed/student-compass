import { createFileRoute } from "@tanstack/react-router";

import { AppShell, StepPanel } from "@/components/assessment/app-shell";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { LanguageStep } from "@/components/assessment/steps/language-step";
import { AssessmentProvider, useAssessment } from "@/lib/assessment/assessment-context";
import { ASSESSMENT_STEPS } from "@/lib/assessment/steps";
import { LanguageProvider, useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Learning Preference Assessment" },
      {
        name: "description",
        content:
          "A short, guided assessment that helps students discover how they learn and explain ideas best.",
      },
      { property: "og:title", content: "Student Learning Preference Assessment" },
      {
        property: "og:description",
        content:
          "A short, guided assessment that helps students discover how they learn and explain ideas best.",
      },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  return (
    <LanguageProvider>
      <AssessmentProvider>
        <AssessmentFlow />
      </AssessmentProvider>
    </LanguageProvider>
  );
}

/**
 * Screen router for the flow. Each step gets its own component in a later
 * prompt; the language step is implemented, the rest use the shell panel.
 */
function AssessmentFlow() {
  const { step, stepNumber, totalSteps, next, back, canGoBack, canGoNext } = useAssessment();
  const { t } = useLanguage();
  const label = ASSESSMENT_STEPS[stepNumber - 1]?.label ?? "";

  return (
    <AppShell currentStep={stepNumber} totalSteps={totalSteps}>
      {step === "language" ? (
        <LanguageStep onNext={next} />
      ) : (
        <StepPanel
          title={label}
          description="This screen is part of the assessment shell. Its content will be added next."
          footer={
            <NavigationControls
              onBack={back}
              onNext={next}
              showBack={canGoBack}
              backLabel={t("back")}
              nextLabel={canGoNext ? t("continue") : t("finish")}
            />
          }
        >
          <div
            className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground"
            data-step={step}
          >
            Content area
          </div>
        </StepPanel>
      )}
    </AppShell>
  );
}

