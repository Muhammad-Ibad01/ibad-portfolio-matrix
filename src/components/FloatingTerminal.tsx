"use client";

import { useCallback, useRef, useState } from "react";
import { runPortfolioCommand } from "@/lib/commands";

export function FloatingTerminal() {
  const [open, setOpen] = useState(true);
  const [lines, setLines] = useState<string[]>([
    "Portfolio shell — type `help` for navigation commands.",
  ]);
  const [input, setInput] = useState("");
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const drag = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
  } | null>(null);

  const run = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;
    const out = runPortfolioCommand(raw);
    setLines((prev) => {
      if (out === "__CLEAR__") return [];
      const next = [...prev, `$ ${raw}`];
      if (out) next.push(out);
      return next;
    });
    setInput("");
  }, [input]);

  const onPointerDownBar = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget.parentElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left = pos?.left ?? rect.left;
    const top = pos?.top ?? rect.top;
    if (pos === null) setPos({ left, top });
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originLeft: left,
      originTop: top,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d?.active) return;
    const nx = d.originLeft + (e.clientX - d.startX);
    const ny = d.originTop + (e.clientY - d.startY);
    const maxL = window.innerWidth - 120;
    const maxT = window.innerHeight - 80;
    setPos({
      left: Math.min(Math.max(8, nx), maxL),
      top: Math.min(Math.max(8, ny), maxT),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current?.active) {
      drag.current.active = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        className="fixed bottom-4 right-4 z-[110] border border-terminal-dim bg-[#0d1117] px-3 py-2 font-mono text-[11px] text-terminal shadow-lg"
        onClick={() => setOpen(true)}
      >
        [terminal]
      </button>
    );
  }

  return (
    <div
      className="fixed z-[110] w-[min(100%-24px,420px)] font-mono text-[11px] text-terminal-text shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
      style={
        pos
          ? { left: pos.left, top: pos.top, right: "auto", bottom: "auto" }
          : { right: 16, bottom: 16, left: "auto", top: "auto" }
      }
    >
      <div
        onPointerDown={onPointerDownBar}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex cursor-grab items-center justify-between border border-b-0 border-terminal-dim bg-[#0d1117] px-2 py-1.5 active:cursor-grabbing"
      >
        <span className="flex items-center gap-2 text-comment">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
          interactive — ~/ibad.dev
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-comment hover:text-terminal"
          aria-label="Minimize terminal"
        >
          ─
        </button>
      </div>
      <div className="max-h-[220px] overflow-y-auto border border-terminal-dim bg-[#0d1117]/98 p-2 text-[11px] leading-relaxed">
        {lines.map((l, i) => (
          <pre key={`${i}-${l.slice(0, 12)}`} className="mb-1 whitespace-pre-wrap font-mono text-comment">
            {l}
          </pre>
        ))}
        <form
          className="mt-2 flex gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <span className="shrink-0 text-terminal">$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-terminal-text outline-none"
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
