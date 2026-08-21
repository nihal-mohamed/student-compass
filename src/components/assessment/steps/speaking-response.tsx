import { Mic, Play, Square, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function SpeakingResponse() {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<"permission" | "unsupported" | null>(null);
  const [playbackError, setPlaybackError] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const supported = typeof window !== "undefined" && "MediaRecorder" in window && !!navigator.mediaDevices?.getUserMedia;

  useEffect(() => {
    if (!answers.speakingRecording) {
      setAudioUrl(null);
      return;
    }
    const url = URL.createObjectURL(answers.speakingRecording);
    setAudioUrl(url);
    setPlaybackError(false);
    return () => URL.revokeObjectURL(url);
  }, [answers.speakingRecording]);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => {
      setAnswers({ speakingDuration: (answers.speakingDuration ?? 0) + 1 });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recording, answers.speakingDuration, setAnswers]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const startRecording = async () => {
    setError(null);
    if (!supported) {
      setError("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size > 0) setAnswers({ speakingRecording: blob });
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };
      recorder.start();
      setAnswers({ speakingDuration: 0 });
      setRecording(true);
    } catch {
      setError("permission");
    }
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
      setRecording(false);
    }
  };

  const deleteRecording = () => {
    setAnswers({ speakingRecording: undefined, speakingDuration: 0 });
    setAudioUrl(null);
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
      {recording ? (
        <div className="flex items-center gap-3 text-sm font-semibold text-destructive" role="status" aria-live="polite">
          <span className="size-3 animate-pulse rounded-full bg-destructive" />
          {t("speakingActive")} · {t("speakingDuration", { duration: formatDuration(answers.speakingDuration ?? 0) })}
        </div>
      ) : null}

      {error === "permission" ? <p role="alert" className="text-sm text-destructive">{t("speakingPermissionDenied")}</p> : null}
      {error === "unsupported" ? <p role="alert" className="text-sm text-destructive">{t("speakingUnsupported")}</p> : null}

      {!recording && !answers.speakingRecording ? (
        <Button type="button" onClick={startRecording}>
          <Mic />
          {t("speakingStart")}
        </Button>
      ) : null}

      {recording ? (
        <Button type="button" variant="destructive" onClick={stopRecording}>
          <Square />
          {t("speakingStop")}
        </Button>
      ) : null}

      {!recording && answers.speakingRecording && audioUrl ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <audio
            ref={audioRef}
            controls
            preload="metadata"
            src={audioUrl}
            onError={() => setPlaybackError(true)}
            className="min-w-0 flex-1"
            aria-label={t("speakingPlay")}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPlaybackError(false);
                void audioRef.current?.play().catch(() => setPlaybackError(true));
              }}
            >
              <Play />
              {t("speakingPlay")}
            </Button>
            <Button type="button" variant="outline" onClick={startRecording}>
              {t("speakingRecordAgain")}
            </Button>
            <Button type="button" variant="ghost" onClick={deleteRecording} aria-label={t("speakingDelete")}>
              <Trash2 />
              {t("speakingDelete")}
            </Button>
          </div>
          {playbackError ? <p role="alert" className="text-sm text-destructive">{t("speakingPlaybackUnavailable")}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
