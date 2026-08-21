import { Textarea } from "@/components/ui/textarea";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";

export function TypingResponse() {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();

  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
      <label htmlFor="typing-response" className="text-sm font-semibold text-card-foreground sm:text-base">
        {t("typingPrompt")}
      </label>
      <Textarea
        id="typing-response"
        value={answers.typingResponse ?? ""}
        onChange={(event) => setAnswers({ typingResponse: event.target.value })}
        placeholder={t("typingPlaceholder")}
        rows={8}
        aria-label={t("typingPrompt")}
      />
    </div>
  );
}
