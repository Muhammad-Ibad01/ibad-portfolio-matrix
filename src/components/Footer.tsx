"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useTerminalType } from "@/hooks/useTerminalType";
import { BlinkingCursor } from "./BlinkingCursor";

const gh = "https://github.com/ibadfiction";
const li = "https://www.linkedin.com/in/muhammad-ibad-776a51123";

export function Footer() {
  const reduce = useReducedMotion() ?? false;
  const { display, done } = useTerminalType({
    text: "$ exit",
    msPerChar: 22,
    enabled: true,
    instant: reduce,
  });

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-terminal-dim px-4 py-16 font-mono text-[12px] text-comment">
      <div className="mx-auto max-w-4xl">
        <p>
          <span className="text-terminal-text">{display}</span>
          {!done && !reduce ? <BlinkingCursor /> : null}
        </p>
        {done ? (
          <div className="mt-6 space-y-6">
            <p className="text-terminal-text/80">
              Session ended. © {year} Muhammad Ibad. Built with Next.js, React, and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-10 text-[11px]">
              {/* <div>
                <pre className="mb-2 text-terminal/80" aria-hidden>
                  {`┌─[ github ]──\n└────────────`}
                </pre>
                <Link href={gh} className="text-link hover:underline" target="_blank" rel="noreferrer">
                  {gh.replace(/^https?:\/\//, "")}
                </Link>
              </div> */}
              <div>
                <pre className="mb-2 text-terminal/80" aria-hidden>
                  {`┌─[ linkedin ]\n└─────────────`}
                </pre>
                <Link href={li} className="text-link hover:underline" target="_blank" rel="noreferrer">
                  {li.replace(/^https?:\/\//, "")}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
