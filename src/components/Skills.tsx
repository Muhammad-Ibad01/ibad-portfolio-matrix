"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTerminalType } from "@/hooks/useTerminalType";
import { BlinkingCursor } from "./BlinkingCursor";

type Skill = { label: string; pct: number };

const categories: { title: string; items: Skill[] }[] = [
  {
    title: "Frontend",
    items: [
      { label: "React / component architecture", pct: 75 },
      { label: "Next.js (App Router & Pages)", pct: 62 },
      { label: "TypeScript", pct: 60 },
      { label: "JavaScript (ESNext)", pct: 63 },
      { label: "HTML / CSS / responsive layouts", pct: 94 },
      { label: "Scss / responsive layouts", pct: 94 },
      { label: "Tailwind CSS / utility-first UI", pct: 90 },
      { label: "State (Context, Redux patterns, hooks)", pct: 88 },
      { label: "Booststrap (CSS framework)", pct: 88 },
      { label: "Material UI (CSS framework)", pct: 68 },
      { label: "Chakra UI (CSS framework)", pct: 68 },
      { label: "Chad UI (CSS framework)", pct: 78 },
      { label: "Shadcn UI (CSS framework)", pct: 68 },
      { label: "Headless UI (CSS framework)", pct: 48 },
      
    ],
  },
  {
    title: "Backend & CMS",
    items: [
    
      { label: "Laravel / PHP", pct: 44 },
      { label: "Umbraco CMS", pct: 46 },
      { label: "WordPress / headless patterns", pct: 68 },
      { label: "Shopify ", pct: 45 },
    ],
  },
  {
    title: "UI / UX & design handoff",
    items: [
      { label: "Figma → production UI", pct: 84 },
      { label: "Design systems & spacing / type scale", pct: 86 },
      { label: "Accessibility (a11y) basics", pct: 82 },
    ],
  },
  {
    title: "Performance & SEO",
    items: [
      { label: "Core Web Vitals & Lighthouse", pct: 86 },
      { label: "Performance optimization (bundle, images)", pct: 89 },
      { label: "Semantic HTML & metadata", pct: 83 },
    ],
  },
  {
    title: "Tooling & delivery",
    items: [
      { label: "Git / GitHub workflows", pct: 92 },
      { label: "npm / pnpm / bundlers (Vite, Webpack)", pct: 85 },
      { label: "CI-friendly builds & env config", pct: 80 },
      { label: "Jest / React Testing Library (basics)", pct: 72 },
    ],
  },
];

function asciiBar(pct: number, width = 16): string {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
}

function Bar({ pct, label, reduce }: { pct: number; label: string; reduce: boolean }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[12px] text-terminal-text/90">
        <span className="min-w-0 flex-1">{label}</span>
        <span className="shrink-0 font-mono text-[11px] text-comment">
          <span className="text-terminal/90">{asciiBar(pct)}</span> {pct}%
        </span>
      </div>
      <div className="h-2 w-full border border-terminal-dim bg-black/40">
        <motion.div
          className="h-full bg-terminal/80"
          initial={{ width: reduce ? `${pct}%` : 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion() ?? false;
  const { display, done } = useTerminalType({
    text: "$ skill --list --verbose",
    msPerChar: 16,
    enabled: true,
    instant: reduce,
  });

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-terminal-dim px-4 py-20"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-5xl font-mono text-[13px]">
        <p className="text-comment text-[11px]">
          <span className="text-terminal-text">{display}</span>
          {!done && !reduce ? <BlinkingCursor /> : null}
        </p>

        <h2
          id="skills-heading"
          className="mt-4 text-[11px] font-normal uppercase tracking-[0.2em] text-comment"
        >
          <span className="text-gold">##</span> skills —{" "}
          <span className="text-terminal-text/90 normal-case tracking-normal">
            React · Next.js · TypeScript · JavaScript · UI · performance
          </span>
        </h2>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            className="mt-6 space-y-10 border border-terminal-dim bg-[#0d1117]/60 p-6 md:p-8"
          >
            {categories.map((cat) => (
              <div key={cat.title}>
                <h3 className="mb-4 border-b border-terminal-dim pb-2 text-[12px] font-normal uppercase tracking-wider text-gold">
                  # {cat.title}
                </h3>
                {cat.items.map((s) => (
                  <Bar key={s.label} pct={s.pct} label={s.label} reduce={reduce} />
                ))}
              </div>
            ))}
            <p className="border-t border-terminal-dim pt-4 text-[11px] leading-relaxed text-comment">
              Keywords for search: Frontend Developer, React.js Developer, Next.js Engineer,
              JavaScript Developer, TypeScript Developer, UI Developer, REST API integration,
              responsive web design, performance optimization, enterprise frontend.
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
