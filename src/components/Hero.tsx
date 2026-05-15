"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { useBootSequence, type BootLine } from "@/hooks/useBootSequence";
import { BlinkingCursor } from "./BlinkingCursor";
import { TerminalWindow } from "./TerminalWindow";

const EXPERTISE =
  "React · Next.js · TypeScript · JavaScript · Tailwind · REST APIs · Performance · Accessibility";

export function Hero() {
  const reduce = useReducedMotion();
  const lines: BootLine[] = useMemo(
    () => [
      { text: "Initializing portfolio v2.0...", msPerChar: 18 },
      { text: "Loading modules: React · Next.js · Tailwind · SCSS ✓", msPerChar: 16 },
      { text: "Connecting to Karachi, Pakistan... ✓", msPerChar: 18 },
      { text: "$ whoami", msPerChar: 22 },
      { text: "Muhammad Ibad", msPerChar: 22, pauseAfter: 400 },
      { text: "Frontend Developer | React & Next.js Engineer", msPerChar: 15 },
      {
        text: "5+ years building enterprise portals, SaaS & banking systems",
        msPerChar: 14,
      },
      { text: "$ ls ./expertise", msPerChar: 20 },
      { text: EXPERTISE, msPerChar: 12 },
    ],
    []
  );

  const { completedLines, activeTyping, finished, showCursor } = useBootSequence({
    lines,
    lineGapMs: 600,
    instant: Boolean(reduce),
  });

  const nameLineIndex = 4;
  const whoamiLine = 3;

  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-24 px-4 pb-24 pt-28 md:pt-32"
      aria-label="Hero — Frontend Developer introduction"
    >
      <h1 className="sr-only">
        Muhammad Ibad — Frontend Developer, React.js Developer, Next.js Engineer, and JavaScript
        TypeScript UI, Scss, Tailwind CSS, and Bootstrap Developer in Karachi, Pakistan. Enterprise SaaS and web applications.
      </h1>
      <div className="mx-auto max-w-4xl">
        <TerminalWindow title="boot.log — zsh" tilt className="font-mono">
          <div className="space-y-3 text-[13px] text-terminal-text">
            {completedLines.map((line, i) => (
              <p
                key={`done-${i}-${line.slice(0, 8)}`}
                className={
                  i === nameLineIndex
                    ? "text-[clamp(2rem,8vw,3.625rem)] font-medium leading-none text-terminal"
                    : i === whoamiLine
                      ? "text-terminal"
                      : ""
                }
              >
                {line}
              </p>
            ))}
            {!finished && (
              <p
                className={
                  completedLines.length === nameLineIndex
                    ? "text-[clamp(2rem,8vw,3.625rem)] font-medium leading-none text-terminal"
                    : completedLines.length === whoamiLine
                      ? "text-terminal"
                      : ""
                }
              >
                {activeTyping}
                {showCursor ? <BlinkingCursor /> : null}
              </p>
            )}
            {finished ? (
              <p className="text-terminal">
                <BlinkingCursor />
              </p>
            ) : null}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 text-[13px]">
            <Link
              href="#projects"
              className="border border-terminal-dim px-4 py-2 text-terminal transition hover:bg-terminal/10"
            >
              [./view-projects.sh]
            </Link>
            <a
              href="/MUHAMMAD_IBAD.pdf"
              download="MUHAMMAD_IBAD.pdf"
              className="border border-terminal-dim px-4 py-2 text-terminal transition hover:bg-terminal/10"
            >
              [./download-cv.sh]
            </a>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
