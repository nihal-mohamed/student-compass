import { Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { Button } from "@/components/ui/button";
import { useAssessment } from "@/lib/assessment/assessment-context";
import { useLanguage } from "@/lib/i18n/language-context";

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 640;

export function DrawingResponse() {
  const { answers, setAnswers } = useAssessment();
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const historyRef = useRef<string[]>([""]);
  const [canUndo, setCanUndo] = useState(false);

  const renderData = (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (!data) return;
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    image.src = data;
  };

  useEffect(() => {
    if (answers.drawingData && historyRef.current.length === 1) {
      historyRef.current.push(answers.drawingData);
      setCanUndo(false);
    }
    if (!answers.drawingData) {
      historyRef.current = [""];
      setCanUndo(false);
    }
    renderData(answers.drawingData ?? "");
  }, [answers.drawingData]);

  const snapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL("image/png");
    historyRef.current.push(data);
    setCanUndo(true);
    setAnswers({ drawingData: data });
  };

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * CANVAS_WIDTH,
      y: ((event.clientY - bounds.top) / bounds.height) * CANVAS_HEIGHT,
    };
  };

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const { x, y } = point(event);
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(x, y);
    context.lineWidth = 6;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#1f2937";
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = point(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    canvasRef.current?.releasePointerCapture(event.pointerId);
    snapshot();
  };

  const clear = () => {
    historyRef.current = [""];
    setCanUndo(false);
    setAnswers({ drawingData: undefined });
    renderData("");
  };

  const undo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const previous = historyRef.current.at(-1) ?? "";
    setCanUndo(historyRef.current.length > 1);
    setAnswers({ drawingData: previous || undefined });
    renderData(previous);
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
      <p className="text-sm font-semibold text-card-foreground sm:text-base">{t("drawingPrompt")}</p>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        aria-label={t("drawingCanvasLabel")}
        className="h-80 w-full touch-none rounded-lg border border-border bg-white"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={undo} disabled={!canUndo}>
          <Undo2 />
          {t("drawingUndo")}
        </Button>
        <Button type="button" variant="ghost" onClick={clear} disabled={!answers.drawingData}>
          {t("drawingClear")}
        </Button>
      </div>
    </div>
  );
}
