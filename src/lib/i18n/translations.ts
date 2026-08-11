/**
 * Central translation table for the assessment.
 * Every user-facing string should live here so the language choice made on the
 * first screen controls all assessment text shown later.
 */
export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const isLanguageCode = (value: unknown): value is LanguageCode =>
  typeof value === "string" && LANGUAGES.some((l) => l.code === value);

type Dictionary = {
  appName: string;
  appTagline: string;
  privacyNote: string;
  stepOf: string;
  back: string;
  continue: string;
  finish: string;
  languageTitle: string;
  languageDescription: string;
  languageEnglish: string;
  languageTamil: string;
  languageEnglishHint: string;
  languageTamilHint: string;
};

export const TRANSLATIONS: Record<LanguageCode, Dictionary> = {
  en: {
    appName: "Learning Preference",
    appTagline: "Student assessment",
    privacyNote: "Your answers stay on this device.",
    stepOf: "Step {current} of {total}",
    back: "Back",
    continue: "Continue",
    finish: "Finish",
    languageTitle: "Which language would you like to answer in?",
    languageDescription: "You can change this later by restarting the assessment.",
    languageEnglish: "English",
    languageTamil: "தமிழ்",
    languageEnglishHint: "Answer the assessment in English.",
    languageTamilHint: "Answer the assessment in Tamil.",
  },
  ta: {
    appName: "கற்றல் விருப்பம்",
    appTagline: "மாணவர் மதிப்பீடு",
    privacyNote: "உங்கள் பதில்கள் இந்தச் சாதனத்திலேயே இருக்கும்.",
    stepOf: "படி {current} / {total}",
    back: "பின்செல்",
    continue: "தொடரவும்",
    finish: "முடிக்கவும்",
    languageTitle: "எந்த மொழியில் பதிலளிக்க விரும்புகிறீர்கள்?",
    languageDescription: "மதிப்பீட்டை மீண்டும் தொடங்கி இதை பின்னர் மாற்றலாம்.",
    languageEnglish: "English",
    languageTamil: "தமிழ்",
    languageEnglishHint: "மதிப்பீட்டை ஆங்கிலத்தில் பதிலளிக்கவும்.",
    languageTamilHint: "மதிப்பீட்டை தமிழில் பதிலளிக்கவும்.",
  },
};

export type TranslationKey = keyof Dictionary;
