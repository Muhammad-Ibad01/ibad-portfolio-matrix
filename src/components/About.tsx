"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useTerminalType } from "@/hooks/useTerminalType";
import { BlinkingCursor } from "./BlinkingCursor";

const facts = [
  ["name", "Muhammad Ibad"],
  ["role", "Frontend Developer · React.js Developer · Next.js Engineer"],
  ["experience", "5+ years (enterprise portals, SaaS, banking systems)"],
  ["location", "Karachi, Pakistan (remote / Dubai-aligned teams)"],
  ["email", "ibadfiction@gmail.com"],
  [
    "specialization",
    "React component architecture · TypeScript · Performance optimization · REST API integration",
  ],
  ["current_employer", "Centric DXB — Dubai-based digital agency (Senior Frontend)"],
  ["keywords", "JavaScript Developer · UI Developer · Responsive web design · Cross-browser development"],
] as const;

export function About() {
  const reduce = useReducedMotion();
  const { display, done } = useTerminalType({
    text: "$ cat about.txt",
    msPerChar: 20,
    enabled: true,
    instant: Boolean(reduce),
  });

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-terminal-dim px-4 py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-4xl font-mono text-[13px]">
        <p className="text-comment text-[11px]">
          <span className="text-terminal-text">{display}</span>
          {!done && !reduce ? <BlinkingCursor /> : null}
        </p>

        {done ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduce ? 0 : 0.05 },
              },
            }}
            className="mt-6 space-y-4 border border-terminal-dim bg-[#0d1117]/60 p-6 text-terminal-text"
          >
            <h2 id="about-heading" className="sr-only">
              About — Frontend Engineer Pakistan
            </h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-terminal-text/90"
            >
              Senior-oriented{" "}
              <strong className="font-normal text-terminal">Frontend Developer</strong> and{" "}
              <strong className="font-normal text-terminal">React &amp; Next.js Engineer</strong>{" "}
              shipping accessible, performant interfaces for{" "}
              <abbr title="Software as a Service" className="no-underline">
                SaaS
              </abbr>{" "}
              and enterprise web applications.  Experience with{" "}
              <span className="text-gold">JavaScript</span>,{" "}
              <span className="text-gold">TypeScript</span>, and{" "}
              <span className="text-gold">React</span> ecosystems,{" "}
              <span className="text-link">REST API integration</span>, and{" "}
              <span className="text-link">performance optimization</span> (Core Web Vitals, bundle
              strategy, rendering patterns).
            </motion.p>
            <div className="space-y-2 border-l border-terminal-dim pl-4">
              {facts.map(([k, v]) => (
                <motion.div
                  key={k}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="grid gap-1 sm:grid-cols-[140px_1fr]"
                >
                  <span className="text-gold">{k}:</span>
                  <span className="text-comment break-words">{v}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
