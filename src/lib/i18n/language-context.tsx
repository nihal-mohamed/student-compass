import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_LANGUAGE,
  TRANSLATIONS,
  isLanguageCode,
  type LanguageCode,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "lp.language";

type LanguageContextValue = {
  /** Currently active language (falls back to English until one is chosen). */
  language: LanguageCode;
  /** Null until the student picks a language (or a stored one is restored). */
  selectedLanguage: LanguageCode | null;
  setLanguage: (code: LanguageCode) => void;
  clearLanguage: () => void;
  /** True once localStorage has been read on the client. */
  hydrated: boolean;
  /** Translate a key, with optional {placeholder} substitution. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore a previously chosen language after hydration (SSR-safe).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguageCode(stored)) setSelectedLanguage(stored);
    } catch {
      // localStorage unavailable (private mode) — fall back to in-memory state.
    }
    setHydrated(true);
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setSelectedLanguage(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const clearLanguage = useCallback(() => {
    setSelectedLanguage(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const language = selectedLanguage ?? DEFAULT_LANGUAGE;
    return {
      language,
      selectedLanguage,
      setLanguage,
      clearLanguage,
      hydrated,
      t: (key, vars) => {
        let text = TRANSLATIONS[language][key];
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      },
    };
  }, [selectedLanguage, setLanguage, clearLanguage, hydrated]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Shorthand for components that only need the translator. */
export const useT = () => useLanguage().t;
