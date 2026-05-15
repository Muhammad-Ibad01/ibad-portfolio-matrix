"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useTerminalType } from "@/hooks/useTerminalType";
import { projects, projectLiveUrl, type Project } from "@/lib/projects";
import { BlinkingCursor } from "./BlinkingCursor";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Project | null>(null);
  const { display, done } = useTerminalType({
    text: "$ ls -la ~/projects",
    msPerChar: 18,
    enabled: true,
    instant: Boolean(reduce),
  });

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-terminal-dim px-4 py-20"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-5xl font-mono text-[13px]">
        <p className="text-comment text-[11px]">
          <span className="text-terminal-text">{display}</span>
          {!done && !reduce ? <BlinkingCursor /> : null}
        </p>
        <h2 id="projects-heading" className="sr-only">
          Selected projects — Web Developer Karachi
        </h2>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {projects.map((p, i) => {
              const live = projectLiveUrl(p);
              return (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.05 }}
                  className="flex flex-col border border-terminal-dim bg-[#0d1117]/70 p-4 transition hover:border-terminal/40 hover:bg-[#0d1117]"
                >
                <div className="mb-1 text-[10px] uppercase tracking-wide text-comment">
                  <span>{p.permissions}</span>
                </div>
                <h3 className="text-[12px] font-normal leading-snug text-terminal-text">
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    {p.title}
                  </a>
                </h3>
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 truncate text-[11px] text-terminal hover:text-link"
                >
                  {p.host} →
                </a>
                {/* <p className="mt-3 line-clamp-2 flex-1 text-[11px] leading-relaxed text-comment">
                  {p.stack.join(" · ")}
                </p> */}
                <div className="mt-4 flex flex-wrap gap-2 border-t border-terminal-dim pt-3 text-[11px]">
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-terminal-dim px-2 py-1 text-terminal transition hover:bg-terminal/10"
                  >
                    [open site]
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(p)}
                    className="border border-terminal-dim px-2 py-1 text-comment transition hover:bg-terminal/5 hover:text-terminal-text"
                  >
                    [cat README]
                  </button>
                </div>
              </motion.article>
              );
            })}
          </motion.div>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? <ProjectModal project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
