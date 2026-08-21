import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { ASSESSMENT_STEPS, stepIndex, type AssessmentStepId } from "./steps";
import { calculateLearningProfiles, type LearningProfile } from "./learning-profile";

/**
 * Local, in-memory state for the assessment flow.
 * No persistence or backend yet — answers are intentionally left open-ended so
 * later prompts can define the real question payloads.
 */
export type AssessmentAnswers = {
  language?: string;
  format?: "text" | "audio" | "video";
  learningMethods?: string[];
  explanationModes?: string[];
  explanationMode?: "speaking" | "typing" | "drawing";
  speakingRecording?: Blob;
  speakingDuration?: number;
  typingResponse?: string;
  drawingData?: string;
};

type AssessmentContextValue = {
  step: AssessmentStepId;
  stepNumber: number;
  totalSteps: number;
  answers: AssessmentAnswers;
  learningProfiles: LearningProfile[];
  setAnswers: (patch: Partial<AssessmentAnswers>) => void;
  goTo: (step: AssessmentStepId) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswersState] = useState<AssessmentAnswers>({});

  const setAnswers = useCallback((patch: Partial<AssessmentAnswers>) => {
    setAnswersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const value = useMemo<AssessmentContextValue>(() => {
    const total = ASSESSMENT_STEPS.length;
    return {
      step: ASSESSMENT_STEPS[index]!.id,
      stepNumber: index + 1,
      totalSteps: total,
      answers,
      learningProfiles: calculateLearningProfiles(answers.learningMethods ?? []),
      setAnswers,
      goTo: (step) => setIndex(Math.max(0, stepIndex(step))),
      next: () => setIndex((i) => Math.min(i + 1, total - 1)),
      back: () => setIndex((i) => Math.max(i - 1, 0)),
      reset: () => {
        setIndex(0);
        setAnswersState({});
      },
      canGoBack: index > 0,
      canGoNext: index < total - 1,
    };
  }, [index, answers, setAnswers]);

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within an AssessmentProvider");
  return ctx;
}
