import { useEffect, useState } from "react";

import englishVideoSource from "../../../videos/completed video for student site.mp4";
import tamilVideoSource from "../../../videos/Tamil video for student site.mp4";
import { useLanguage } from "@/lib/i18n/language-context";

export function AssessmentVideoPlayer() {
  const { language } = useLanguage();
  const [unavailable, setUnavailable] = useState(false);
  const videoSource = language === "ta" ? tamilVideoSource : englishVideoSource;

  useEffect(() => {
    setUnavailable(false);
  }, [videoSource]);

  if (unavailable) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground" role="status">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black">
      <video
        key={videoSource}
        className="block h-auto max-h-[28rem] w-full"
        controls
        playsInline
        preload="metadata"
        src={videoSource}
        onError={() => setUnavailable(true)}
      >
        Your browser cannot play this video.
      </video>
    </div>
  );
}
