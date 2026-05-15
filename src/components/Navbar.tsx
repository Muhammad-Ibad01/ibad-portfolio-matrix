"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const tabs = [
  { href: "#home", label: "~/home" },
  { href: "#projects", label: "~/projects" },
  { href: "#skills", label: "~/skills" },
  { href: "#about", label: "~/about" },
  { href: "#experience", label: "~/experience" },
  { href: "#contact", label: "~/contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "projects", "about", "skills", "experience", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-terminal-dim bg-[#0d1117]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 text-[11px] text-comment">
        <div className="flex items-center gap-2 font-mono text-terminal-text">
          <span className="h-2 w-2 rounded-full bg-terminal shadow-[0_0_8px_#00ff88]" aria-hidden />
          <span>muhammad-ibad — portfolio — zsh</span>
        </div>
        <p className="flex items-center gap-1 font-mono text-terminal">
          <span className="animate-pulse">●</span>
          <span className="hidden sm:inline">OPEN TO WORK</span>
          <span className="sm:hidden">OPEN</span>
        </p>
      </div>
      <nav
        className="mx-auto flex max-w-5xl flex-wrap gap-1 border-t border-terminal-dim px-2 py-1 text-[11px] font-mono"
        aria-label="Primary"
      >
        {tabs.map((t) => {
          const id = t.href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`rounded px-3 py-1.5 transition-colors ${
                isActive
                  ? "border-b-2 border-terminal text-terminal"
                  : "text-comment hover:text-terminal-text"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
