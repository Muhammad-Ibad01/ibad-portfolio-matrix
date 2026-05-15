import { projects } from "./projects";

const aboutBlock = `Muhammad Ibad — Frontend Developer & Next.js Engineer (Karachi, Pakistan).
5+ years delivering enterprise portals, SaaS web applications, and banking-adjacent systems with React.js, Next.js, TypeScript, and JavaScript.

Core strengths: React component architecture, performance optimization, REST API integration, responsive web design, and cross-browser development.

Open to remote-friendly roles and Dubai-aligned teams (experience with Centric DXB agency).`;

const skillsBlock = `Frontend · React · Next.js · TypeScript · JavaScript · HTML/CSS · Tailwind
Backend & CMS · Node basics · REST · Laravel · Umbraco
UI/UX · Figma · Design systems · Accessibility-minded UI
Performance & SEO · Core Web Vitals · Lighthouse · Semantic HTML`;

const contactBlock = `Email: ibadfiction@gmail.com
Use the contact form below for project inquiries or collaboration.`;

export function runPortfolioCommand(input: string): string {
  const cmd = input.trim().toLowerCase().split(/\s+/)[0] ?? "";

  switch (cmd) {
    case "help":
      return `Available commands:
  help       Show this message
  about      Professional summary
  projects   List featured work (same as ls)
  skills     Skill categories overview
  contact    Contact & email info
  experience Career timeline (git log)
  clear      Clear terminal output`;
    case "about":
      return aboutBlock;
    case "projects":
    case "ls":
      return projects.map((p) => `${p.permissions}  ${p.host}`).join("\n");
    case "skills":
      return skillsBlock;
    case "contact":
      return contactBlock;
    case "experience":
    case "git":
      return `a3f92d1  2022–present  Senior Frontend @ Centric DXB
7b14c2e  2020–2021  Frontend Dev @ Viftech Solutions
3d89a1f  2019–2020  PHP Dev @ Techriffic
c2910ff  2017–2019  Web Dev @ Casia Apps`;
    case "clear":
      return "__CLEAR__";
    case "":
      return "";
    default:
      return `command not found: ${input.trim()}\nType 'help' for available commands.`;
  }
}
