import { StepPanel } from "@/components/assessment/app-shell";
import { NavigationControls } from "@/components/assessment/navigation-controls";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LearningProfile } from "@/lib/assessment/learning-profile";

const DESCRIPTION_KEY: Record<LearningProfile, "profileActiveListener" | "profileIndependentReader" | "profileVisualExplorer" | "profileHandsOnLearner" | "profileExplainer" | "profileActiveWriter" | "profileIntegratedLearner"> = {
  "👂 Active Listener": "profileActiveListener",
  "📖 Independent Reader": "profileIndependentReader",
  "👁️ Visual Explorer": "profileVisualExplorer",
  "🛠️ Hands-on Learner": "profileHandsOnLearner",
  "🗣️ Explainer": "profileExplainer",
  "✍️ Active Writer": "profileActiveWriter",
  "🔄 Integrated Learner": "profileIntegratedLearner",
};

export function ProfileStep({ onBack }: { onBack: () => void }) {
  const { learningProfiles } = useAssessment();
  const { t } = useLanguage();

  return (
    <StepPanel
      title={t("profileTitle")}
      footer={
        <NavigationControls
          onBack={onBack}
          showBack
          nextDisabled
          backLabel={t("back")}
          nextLabel={t("finish")}
        />
      }
    >
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("profileDescription")}
        </p>
        {learningProfiles.length > 0 ? (
          <div className="grid gap-3" role="list" aria-label={t("profileTitle")}>
            {learningProfiles.map((profile) => (
              <article key={profile} role="listitem" className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-base font-semibold text-card-foreground sm:text-lg">{profile}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(DESCRIPTION_KEY[profile])}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            {t("profileNoSelection")}
          </p>
        )}
      </div>
    </StepPanel>
  );
}
