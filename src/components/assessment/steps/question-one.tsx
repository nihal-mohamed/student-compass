import { SelectionCard, SelectionGroup } from "@/components/assessment/selection-card";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { StepPanel } from "@/components/assessment/app-shell";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { AssessmentVideoPlayer } from "@/components/assessment/video-player";
import { AssessmentAudioPlayer } from "@/components/assessment/audio-player";
import { useState } from "react";

const OPTIONS = [
  ["A", "question1OptionA", "question1OptionADescription"],
  ["B", "question1OptionB", "question1OptionBDescription"],
  ["C", "question1OptionC", "question1OptionCDescription"],
  ["D", "question1OptionD", "question1OptionDDescription"],
  ["E", "question1OptionE", "question1OptionEDescription"],
  ["F", "question1OptionF", "question1OptionFDescription"],
  ["G", "question1OptionG", "question1OptionGDescription"],
] as const;

export function QuestionOne({ onNext, onBack, showVideo = false, showAudio = false }: { onNext: () => void; onBack: () => void; showVideo?: boolean; showAudio?: boolean }) {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();
  const [showValidation, setShowValidation] = useState(false);
  const selected = answers.learningMethods ?? [];
  const hasValidationError = showValidation && selected.length === 0;

  const toggle = (code: string) => {
    if (code === "G") {
      setAnswers({ learningMethods: selected.includes("G") ? [] : ["G"] });
      return;
    }

    const withoutCombination = selected.filter((item) => item !== "G");
    if (withoutCombination.includes(code)) {
      setAnswers({ learningMethods: withoutCombination.filter((item) => item !== code) });
    } else if (withoutCombination.length < 3) {
      setAnswers({ learningMethods: [...withoutCombination, code] });
    }
  };

  const continueQuestion = () => {
    if (selected.length === 0) {
      setShowValidation(true);
      return;
    }
    onNext();
  };

  return (
    <StepPanel
      title={t("question1Title")}
      footer={
        <>
          {hasValidationError ? (
            <p role="alert" className="mb-4 text-sm font-medium text-destructive">
              {t("question1Validation")}
            </p>
          ) : null}
          <NavigationControls
            onBack={onBack}
            onNext={continueQuestion}
            showBack
            backLabel={t("back")}
            nextLabel={t("continue")}
          />
        </>
      }
    >
      <div className="space-y-6">
        {showVideo ? <AssessmentVideoPlayer /> : null}
        {showAudio ? <AssessmentAudioPlayer /> : null}
        {!showAudio ? (
          <p className="whitespace-pre-line text-sm leading-relaxed text-card-foreground sm:text-base">
            {t("question1Prompt")}
          </p>
        ) : null}
        <p className="text-sm font-semibold leading-relaxed text-card-foreground sm:text-base">
          {t("question1SelectPrompt")}
        </p>
        <SelectionGroup label={t("question1SelectPrompt")} columns={1} multiple>
          {OPTIONS.map(([code, titleKey, descriptionKey]) => {
            const isSelected = selected.includes(code);
            const isAtLimit = selected.length >= 3 && !isSelected;
            const disabled = code === "G" ? selected.length > 0 && !isSelected : isAtLimit;
            return (
              <SelectionCard
                key={code}
                title={t(titleKey)}
                description={t(descriptionKey)}
                selected={isSelected}
                disabled={disabled}
                multiple
                onSelect={() => toggle(code)}
              />
            );
          })}
        </SelectionGroup>
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {t("question1NoRightWrong")}
        </p>
      </div>
    </StepPanel>
  );
}
