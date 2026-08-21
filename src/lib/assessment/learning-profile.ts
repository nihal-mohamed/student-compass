export type LearningProfile =
  | "👂 Active Listener"
  | "📖 Independent Reader"
  | "👁️ Visual Explorer"
  | "🛠️ Hands-on Learner"
  | "🗣️ Explainer"
  | "✍️ Active Writer"
  | "🔄 Integrated Learner";

const PROFILE_BY_CODE: Record<string, LearningProfile> = {
  A: "👂 Active Listener",
  B: "📖 Independent Reader",
  C: "👁️ Visual Explorer",
  D: "🛠️ Hands-on Learner",
  E: "🗣️ Explainer",
  F: "✍️ Active Writer",
  G: "🔄 Integrated Learner",
};

/**
 * Converts Question 1 method codes into profiles without scoring or ranking.
 * Question 2 answers are intentionally not accepted by this function.
 */
export function calculateLearningProfiles(codes: readonly string[]): LearningProfile[] {
  if (codes.includes("G")) return [PROFILE_BY_CODE.G];
  return codes
    .filter((code) => code !== "G")
    .map((code) => PROFILE_BY_CODE[code])
    .filter((profile): profile is LearningProfile => Boolean(profile));
}
