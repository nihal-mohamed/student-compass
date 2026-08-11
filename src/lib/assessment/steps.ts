/**
 * Canonical ordering of the assessment flow.
 * Screens are added incrementally; keep this list as the single source of truth
 * for progress calculation and navigation.
 */
export const ASSESSMENT_STEPS = [
  { id: "language", label: "Language" },
  { id: "format", label: "Format" },
  { id: "question-1", label: "Question 1" },
  { id: "question-2", label: "Question 2" },
  { id: "profile", label: "Profile" },
  { id: "results", label: "Results" },
] as const;

export type AssessmentStepId = (typeof ASSESSMENT_STEPS)[number]["id"];

export const stepIndex = (id: AssessmentStepId) =>
  ASSESSMENT_STEPS.findIndex((step) => step.id === id);
