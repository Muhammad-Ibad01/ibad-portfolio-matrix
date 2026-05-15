"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTerminalType } from "@/hooks/useTerminalType";
import { BlinkingCursor } from "./BlinkingCursor";

export function Contact() {
  const reduce = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<"cmd" | "form" | "done">("cmd");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { display, done } = useTerminalType({
    text: "$ contact --interactive",
    msPerChar: 16,
    enabled: phase === "cmd",
    instant: reduce,
    onComplete: () => setPhase("form"),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:ibadfiction@gmail.com?subject=Portfolio%20inquiry%20from%20${encodeURIComponent(
      name
    )}&body=${body}`;
    setPhase("done");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-terminal-dim px-4 py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-4xl font-mono text-[13px]">
        <p className="text-comment text-[11px]">
          <span className="text-terminal-text">{display}</span>
          {phase === "cmd" && !done && !reduce ? <BlinkingCursor /> : null}
        </p>
        <h2 id="contact-heading" className="sr-only">
          Contact — Web Developer Karachi
        </h2>

        {(phase === "form" || phase === "done") && (
          <div className="mt-6 space-y-6 border border-terminal-dim bg-[#0d1117]/60 p-6">
            <p className="text-comment">
              <span className="text-terminal-text">echo $EMAIL</span>{" "}
              <span className="text-gold">ibadfiction@gmail.com</span>
            </p>

            {phase === "done" ? (
              <p className="text-terminal">Message sent! Redirecting... ✓</p>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <label className="block text-terminal-text">
                  <span className="text-comment">Enter your name: </span>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ml-1 inline-block min-w-[12rem] border-b border-terminal-dim bg-transparent text-terminal outline-none focus:border-terminal"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block text-terminal-text">
                  <span className="text-comment">Enter your email: </span>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ml-1 inline-block min-w-[14rem] border-b border-terminal-dim bg-transparent text-terminal outline-none focus:border-terminal"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="block text-terminal-text">
                  <span className="text-comment block mb-1">Enter your message: </span>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full border border-terminal-dim bg-black/30 p-3 text-terminal-text outline-none focus:border-terminal"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="border border-terminal px-4 py-2 text-terminal transition hover:bg-terminal/10"
                >
                  [./send-message.sh]
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
