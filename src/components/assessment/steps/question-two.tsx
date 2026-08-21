import { useState } from "react";

import { StepPanel } from "@/components/assessment/app-shell";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { SelectionCard, SelectionGroup } from "@/components/assessment/selection-card";
import { useAssessment, type AssessmentAnswers } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { SpeakingResponse } from "@/components/assessment/steps/speaking-response";
import { TypingResponse } from "@/components/assessment/steps/typing-response";
import { DrawingResponse } from "@/components/assessment/steps/drawing-response";

const OPTIONS = [
  ["speaking", "question2Speaking"],
  ["typing", "question2Typing"],
  ["drawing", "question2Drawing"],
] as const satisfies ReadonlyArray<[NonNullable<AssessmentAnswers["explanationMode"]>, "question2Speaking" | "question2Typing" | "question2Drawing"]>;

export function QuestionTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();
  const [showValidation, setShowValidation] = useState(false);
  const needsRecording = answers.explanationMode === "speaking" && !answers.speakingRecording;
  const needsTyping = answers.explanationMode === "typing" && !answers.typingResponse?.trim();
  const needsDrawing = answers.explanationMode === "drawing" && !answers.drawingData;

  const continueQuestion = () => {
    if (!answers.explanationMode) {
      setShowValidation(true);
      return;
    }
    if (needsRecording) {
      setShowValidation(true);
      return;
    }
    if (needsTyping) {
      setShowValidation(true);
      return;
    }
    if (needsDrawing) {
      setShowValidation(true);
      return;
    }
    onNext();
  };

  return (
    <StepPanel
      title={t("question2Title")}
      footer={
        <>
          {showValidation && !answers.explanationMode ? (
            <p role="alert" className="mb-4 text-sm font-medium text-destructive">
              {t("question2Validation")}
            </p>
          ) : null}
          {showValidation && answers.explanationMode === "speaking" && needsRecording ? (
            <p role="alert" className="mb-4 text-sm font-medium text-destructive">
              {t("speakingRequired")}
            </p>
          ) : null}
          {showValidation && needsTyping ? (
            <p role="alert" className="mb-4 text-sm font-medium text-destructive">
              {t("typingRequired")}
            </p>
          ) : null}
          {showValidation && needsDrawing ? (
            <p role="alert" className="mb-4 text-sm font-medium text-destructive">
              {t("drawingRequired")}
            </p>
          ) : null}
          <NavigationControls
            onBack={onBack}
            onNext={continueQuestion}
            backLabel={t("back")}
            nextLabel={t("continue")}
          />
        </>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-base font-semibold leading-relaxed text-card-foreground sm:text-lg">
            {t("question2Prompt")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("question2Instruction")}
          </p>
        </div>
        <SelectionGroup label={t("question2Instruction")} columns={1}>
          {OPTIONS.map(([value, labelKey]) => (
            <SelectionCard
              key={value}
              title={t(labelKey)}
              selected={answers.explanationMode === value}
              onSelect={() => {
                setAnswers({ explanationMode: value });
                setShowValidation(false);
              }}
            />
          ))}
        </SelectionGroup>
        {answers.explanationMode === "speaking" ? <SpeakingResponse /> : null}
        {answers.explanationMode === "typing" ? <TypingResponse /> : null}
        {answers.explanationMode === "drawing" ? <DrawingResponse /> : null}
      </div>
    </StepPanel>
  );
}
