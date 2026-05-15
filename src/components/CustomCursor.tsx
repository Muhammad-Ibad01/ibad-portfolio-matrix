"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setOn(true);
    };
    const leave = () => setOn(false);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    document.documentElement.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!on) return null;

  return (
    <div
      className="pointer-events-none fixed z-[200] hidden md:block h-5 w-3 -translate-x-0.5 -translate-y-0.5 border border-terminal bg-terminal/20 cursor-blink"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    />
  );
}
