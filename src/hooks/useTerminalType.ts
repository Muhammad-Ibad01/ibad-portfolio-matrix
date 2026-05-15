"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  text: string;
  msPerChar?: number;
  enabled?: boolean;
  /** When true, show full text immediately */
  instant?: boolean;
  onComplete?: () => void;
};

export function useTerminalType({
  text,
  msPerChar = 20,
  enabled = true,
  instant = false,
  onComplete,
}: Options) {
  const [display, setDisplay] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    setDisplay(instant ? text : "");
    setDone(instant);
  }, [instant, text]);

  useEffect(() => {
    if (!enabled) return;
    if (instant) {
      setDisplay(text);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    setDisplay("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }
      timer = window.setTimeout(tick, msPerChar);
    };
    let timer = window.setTimeout(tick, msPerChar);
    return () => window.clearTimeout(timer);
  }, [text, msPerChar, enabled, instant]);

  return { display, done, reset };
}
