import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        terminal: "#00ff88",
        "terminal-dim": "rgba(0,255,136,0.2)",
        comment: "rgba(0,255,136,0.4)",
        gold: "#ffd700",
        link: "#58a6ff",
        "terminal-text": "rgba(255,255,255,0.85)",
      },
      fontFamily: {
        mono: ["var(--font-dm-mono)", "var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
