import { useEffect, useState } from "react";

import audioSource from "../../../audio/student site audio question.mp3";
import tamilAudioSource from "../../../audio/student site audio question TAMIL.mp3";
import { useLanguage } from "@/lib/i18n/language-context";

export function AssessmentAudioPlayer() {
  const { language } = useLanguage();
  const [unavailable, setUnavailable] = useState(false);
  const source = language === "ta" ? tamilAudioSource : audioSource;

  useEffect(() => {
    setUnavailable(false);
  }, [source]);

  if (unavailable) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Audio unavailable
      </p>
    );
  }

  return (
    <audio
      key={source}
      className="w-full"
      controls
      preload="metadata"
      src={source}
      onError={() => setUnavailable(true)}
    />
  );
}
