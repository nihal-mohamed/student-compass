import { Check } from "lucide-react";

import { SelectionCard, SelectionGroup } from "@/components/assessment/selection-card";
import { StepPanel } from "@/components/assessment/app-shell";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { useLanguage } from "@/lib/i18n/language-context";
import { LANGUAGES, TRANSLATIONS, type LanguageCode } from "@/lib/i18n/translations";

const HINT_KEY: Record<LanguageCode, "languageEnglishHint" | "languageTamilHint"> = {
  en: "languageEnglishHint",
  ta: "languageTamilHint",
};

/**
 * First screen of the assessment: choose the answering language.
 * The question is shown in both languages so either student can read it.
 */
export function LanguageStep({ onNext }: { onNext: () => void }) {
  const { selectedLanguage, setLanguage, t } = useLanguage();

  return (
    <StepPanel
      title={TRANSLATIONS.en.languageTitle}
      description={TRANSLATIONS.ta.languageTitle}
      footer={
        <NavigationControls
          onNext={onNext}
          showBack={false}
          nextDisabled={!selectedLanguage}
          nextLabel={t("continue")}
        />
      }
    >
      <SelectionGroup label="Language" columns={2}>
        {LANGUAGES.map((lang) => {
          const selected = selectedLanguage === lang.code;
          return (
            <SelectionCard
              key={lang.code}
              title={`${lang.flag} ${lang.label}`}
              description={TRANSLATIONS[lang.code][HINT_KEY[lang.code]]}
              icon={selected ? <Check className="size-4" /> : undefined}
              selected={selected}
              onSelect={() => setLanguage(lang.code)}
            />
          );
        })}
      </SelectionGroup>
    </StepPanel>
  );
}
