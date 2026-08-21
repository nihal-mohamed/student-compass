import { SelectionCard, SelectionGroup } from "@/components/assessment/selection-card";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { StepPanel } from "@/components/assessment/app-shell";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";

const OPTIONS = [
  ["text", "formatText"],
  ["audio", "formatAudio"],
  ["video", "formatVideo"],
] as const;

export function FormatStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();
  const audioAvailable = true;

  return (
    <StepPanel
      title={t("formatTitle")}
      footer={
        <NavigationControls
          onBack={onBack}
          onNext={onNext}
          backLabel={t("back")}
          nextLabel={t("continue")}
          nextDisabled={!answers.format || (answers.format === "audio" && !audioAvailable)}
        />
      }
    >
      <SelectionGroup label={t("formatTitle")} columns={1}>
        {OPTIONS.map(([value, labelKey]) => (
          <SelectionCard
            key={value}
            title={t(labelKey)}
            {...(value === "audio" && !audioAvailable
              ? { description: t("formatAudioUnavailable") }
              : {})}
            selected={answers.format === value}
            disabled={value === "audio" && !audioAvailable}
            onSelect={() => setAnswers({ format: value })}
          />
        ))}
      </SelectionGroup>
    </StepPanel>
  );
}
