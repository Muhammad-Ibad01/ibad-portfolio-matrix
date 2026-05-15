"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useTerminalType } from "@/hooks/useTerminalType";
import { BlinkingCursor } from "./BlinkingCursor";

type Job = {
  hash: string;
  range: string;
  title: string;
  detail: string;
};

const jobs: Job[] = [
  {
    hash: "a3f92d1",
    range: "2022–present",
    title: "feat: Senior Frontend @ Centric DXB, Dubai",
    detail:
      "Lead and ship React/Next.js interfaces for agency clients: enterprise portals, marketing sites, and SaaS web applications. Own UI developer quality bar: TypeScript, component architecture, REST API integration, performance optimization, and cross-browser development. Collaborate with design and backend for responsive web design and accessible patterns.",
  },
  {
    hash: "7b14c2e",
    range: "2020–2021",
    title: "feat: Frontend Developer @ Viftech Solutions",
    detail:
      "Built and maintained JavaScript-heavy SPAs and dashboards. Focus on React.js developer workflows, state management, and REST consumption. Partnered on UI polish and incremental performance improvements.",
  },
  {
    hash: "3d89a1f",
    range: "2019–2020",
    title: "feat: PHP Developer @ Techriffic",
    detail:
      "PHP and Laravel features, templates, and CMS-driven pages. Transition toward modern frontend stacks and stronger separation of concerns between API and presentation.",
  },
  {
    hash: "c2910ff",
    range: "2017–2019",
    title: "feat: Web Developer @ Casia Apps",
    detail:
      "Full-stack web development foundations: HTML/CSS, JavaScript, PHP, and MySQL. Delivered client websites and internal tools; established base for later specialization as a frontend engineer.",
  },
];

export function Experience() {
  const reduce = useReducedMotion() ?? false;
  const [expanded, setExpanded] = useState<string | null>(null);
  const { display, done } = useTerminalType({
    text: "$ git log --oneline --career",
    msPerChar: 18,
    enabled: true,
    instant: reduce,
  });

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-terminal-dim px-4 py-20"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-4xl font-mono text-[13px]">
        <p className="text-comment text-[11px]">
          <span className="text-terminal-text">{display}</span>
          {!done && !reduce ? <BlinkingCursor /> : null}
        </p>
        <h2 id="experience-heading" className="sr-only">
          Work experience — Enterprise Frontend Developer
        </h2>

        {done ? (
          <ul className="mt-6 space-y-0 border border-terminal-dim bg-[#0d1117]/60">
            {jobs.map((j, i) => {
              const open = expanded === j.hash;
              return (
                <li key={j.hash} className="border-b border-terminal-dim last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : j.hash)}
                    className="flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 text-left text-[12px] text-terminal-text transition hover:bg-terminal/5"
                    aria-expanded={open}
                  >
                    <span className="text-gold">{j.hash}</span>
                    {i === 0 ? (
                      <span className="rounded bg-terminal/15 px-1 text-[10px] text-terminal">
                        HEAD
                      </span>
                    ) : null}
                    <span className="text-comment">{j.range}</span>
                    <span className="min-w-0 flex-1 text-terminal-text/90">{j.title}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.25 }}
                        className="overflow-hidden border-t border-terminal-dim bg-black/25"
                      >
                        <p className="px-4 py-3 text-[12px] leading-relaxed text-comment">
                          {j.detail}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
