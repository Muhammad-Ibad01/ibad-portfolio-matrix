"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { projectLiveUrl, type Project } from "@/lib/projects";
import { TerminalWindow } from "./TerminalWindow";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const live = projectLiveUrl(project);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const readme = `# ${project.title}

## Overview
${project.description}

## Stack
${project.stack.map((s) => `- ${s}`).join("\n")}

## Performance notes
${project.performance}

## Live
${live}
`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-${project.slug}`}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="max-h-[85vh] w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <TerminalWindow title={`cat ${project.host}/README.md`}>
          <div className="flex justify-end gap-2 border-b border-terminal-dim pb-3 mb-3">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-[11px] hover:underline"
            >
              open live →
            </a>
            <button
              type="button"
              onClick={onClose}
              className="text-comment text-[11px] hover:text-terminal"
            >
              [close]
            </button>
          </div>
          <pre
            id={`modal-${project.slug}`}
            className="whitespace-pre-wrap font-mono text-[12px] text-terminal-text/90"
          >
            {readme}
          </pre>
        </TerminalWindow>
      </motion.div>
    </motion.div>
  );
}
