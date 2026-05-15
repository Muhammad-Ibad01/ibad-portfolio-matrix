"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTerminalType } from "./useTerminalType";

export type BootLine = {
  text: string;
  msPerChar?: number;
  pauseAfter?: number;
};

type UseBootSequenceOptions = {
  lines: BootLine[];
  lineGapMs?: number;
  instant?: boolean;
};

export function useBootSequence({
  lines,
  lineGapMs = 600,
  instant = false,
}: UseBootSequenceOptions) {
  const [lineIndex, setLineIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const linesRef = useRef(lines);
  const lineIndexRef = useRef(0);
  linesRef.current = lines;
  lineIndexRef.current = lineIndex;

  useEffect(() => {
    if (!instant || !lines.length) return;
    setCompleted(lines.map((l) => l.text));
    setLineIndex(lines.length);
  }, [instant, lines]);

  const current = instant ? undefined : lines[lineIndex];
  const isActive = !instant && lineIndex < lines.length;

  const advance = useCallback(() => {
    const i = lineIndexRef.current;
    const line = linesRef.current[i];
    if (!line) return;
    const pause = line.pauseAfter ?? lineGapMs;
    window.setTimeout(() => {
      setCompleted((c) => [...c, line.text]);
      setLineIndex((j) => j + 1);
    }, pause);
  }, [lineGapMs]);

  const { display: typing, done } = useTerminalType({
    text: current?.text ?? "",
    msPerChar: current?.msPerChar ?? 20,
    enabled: Boolean(isActive && current),
    instant: false,
    onComplete: advance,
  });

  const finished = instant || lineIndex >= lines.length;
  const showCursor = Boolean(isActive && current && !done);

  return {
    completedLines: instant ? lines.map((l) => l.text) : completed,
    activeTyping: instant ? "" : typing,
    finished,
    showCursor,
    activeLineIndex: instant ? lines.length : lineIndex,
  };
}
