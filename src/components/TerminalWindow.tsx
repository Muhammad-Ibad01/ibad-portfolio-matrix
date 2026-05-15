"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

export function TerminalWindow({
  title = "zsh",
  children,
  className = "",
  tilt = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const rotateX = useTransform(smooth, [0, 0.5, 1], [6, 0, -4]);
  const rotateY = useTransform(smooth, [0, 1], [-2, 2]);

  return (
    <div ref={ref} className={`perspective-wrap ${className}`}>
      <motion.div
        className="rounded-md border border-terminal-dim bg-[#0d1117]/95 shadow-[0_0_40px_rgba(0,255,136,0.06)]"
        style={
          tilt
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
      >
        <div className="flex items-center gap-2 border-b border-terminal-dim px-3 py-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-comment text-[11px] tracking-tight">{title}</span>
        </div>
        <div className="p-4 text-[13px] leading-relaxed text-terminal-text">{children}</div>
      </motion.div>
    </div>
  );
}
