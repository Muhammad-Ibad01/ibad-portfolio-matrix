export type Project = {
  slug: string;
  /** Short label for listings (hostname or path) */
  host: string;
  name: string;
  permissions: string;
  title: string;
  stack: string[];
  /** Live site URL — used for all outbound links (http or https preserved). */
  url: string;
  description: string;
  performance: string;
};

/** Normalizes outbound links: keeps full http(s) URLs; otherwise prefixes https://host */
export function projectLiveUrl(p: Pick<Project, "url" | "host">): string {
  const raw = (p.url ?? "").trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const host = p.host.replace(/^\/+/, "").replace(/\/+$/, "");
  return `https://${host}`;
}

export const projects: Project[] = [
  {
    slug: "goodyco",
    host: "goodyco.com",
    name: "goodyco",
    permissions: "drwxr-xr-x",
    title: "Goodyco",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E‑commerce"],
    url: "https://goodyco.com/",
    description:
      "Commercial web experience with responsive web design, product storytelling, and performance-minded frontend delivery.",
    performance: "Component-driven UI, image and script budgeting, SEO-friendly structure.",
  },
  {
    slug: "goodycs",
    host: "goodycs.com/en",
    name: "goodycs",
    permissions: "drwxr-xr-x",
    title: "Goodycs",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
    url: "https://goodycs.com/en",
    description:
      "E‑commerce and catalog flows with internationalized routing, reusable React component architecture, and REST API integration.",
    performance: "Route-based code splitting, lazy media, semantic HTML for discoverability.",
  },
  {
    slug: "sharbatlyfruit",
    host: "sharbatlyfruit.com",
    name: "sharbatlyfruit",
    permissions: "drwxr-xr-x",
    title: "Sharbatly Fruit",
    stack: ["React", "JavaScript", "Responsive UI", "CMS"],
    url: "https://sharbatlyfruit.com/",
    description:
      "Brand and product-focused marketing site with clear content hierarchy, mobile-first layouts, and cross-browser development.",
    performance: "Optimized assets, accessible navigation, fast first paint.",
  },
  {
    slug: "bigtexstorage",
    host: "bigtexstorage.com",
    name: "bigtexstorage",
    permissions: "drwxr-xr-x",
    title: "Big Tex Storage",
    stack: ["React", "JavaScript", "Maps / locators", "Enterprise UI"],
    url: "https://www.bigtexstorage.com/",
    description:
      "Self-storage customer journey: location finders, pricing cues, and conversion-oriented landing patterns.",
    performance: "Stable third-party embeds, CLS-aware layout, form validation UX.",
  },
  {
    slug: "basamhgroup",
    host: "basamhgroup.com",
    name: "basamhgroup",
    permissions: "drwxr-xr-x",
    title: "Basamh Group",
    stack: ["React", "Next.js", "Corporate site", "Multilingual"],
    url: "https://basamhgroup.com/",
    description:
      "Corporate group presence with structured storytelling, news or segments modules, and polished UI developer finish.",
    performance: "Predictable layout system, typography scale, performance optimization on media-heavy pages.",
  },
  {
    slug: "battleground-materials",
    host: "battlegroundmaterials.com",
    name: "battleground-materials",
    permissions: "drwxr-xr-x",
    title: "Battleground Materials",
    stack: ["React", "JavaScript", "Umbraco CMS", "REST API"],
    url: "https://battlegroundmaterials.com/",
    description:
      "Construction and materials industry portal patterns: listings, resources, and CMS-managed content with React integration.",
    performance: "Memoized tables, pagination, resilient loading states.",
  },
  {
    slug: "yasmall",
    host: "yasmall.ae/en/home",
    name: "yasmall",
    permissions: "drwxr-xr-x",
    title: "Yasmall",
    stack: ["Next.js", "React", "Tailwind CSS", "RTL / Arabic"],
    url: "https://www.yasmall.ae/en/home",
    description:
      "Retail experience with RTL layout, localized catalog, and Next.js engineer patterns for SEO-friendly pages.",
    performance: "i18n routing, font handling for Arabic, static segments where possible.",
  },
  {
    slug: "cima-energy",
    host: "cima-energy.com",
    name: "cima-energy",
    permissions: "drwxr-xr-x",
    title: "CIMA Energy",
    stack: ["React", "JavaScript", "Corporate", "Data visualization"],
    url: "https://www.cima-energy.com/",
    description:
      "Energy sector web presence with trust-building layouts, service modules, and emphasis on clarity and performance.",
    performance: "Lean JS bundles, accessible color contrast, structured sections.",
  },
  {
    slug: "mufap",
    host: "mufap.com.pk",
    name: "mufap",
    permissions: "drwxr-xr-x",
    title: "MUFAP",
    stack: ["React", "TypeScript", "REST API", "Dashboards"],
    url: "https://www.mufap.com.pk/",
    description:
      "Mutual funds and analytics-oriented dashboard UI: filters, dense tables, and chart-friendly layouts.",
    performance: "Debounced filters, virtualization where needed, skeleton loading.",
  },
  {
    slug: "sterling",
    host: "sterling.edu",
    name: "sterling",
    permissions: "drwxr-xr-x",
    title: "Sterling College",
    stack: ["React", "JavaScript", "Education", "Accessibility"],
    url: "https://www.sterling.edu/",
    description:
      "Higher-education site patterns: programs, admissions paths, and content-heavy pages with accessible navigation.",
    performance: "Predictable heading hierarchy, keyboard-friendly menus, optimized hero media.",
  },
  {
    slug: "designstallion",
    host: "designstallion.com",
    name: "designstallion",
    permissions: "drwxr-xr-x",
    title: "Design Stallion",
    stack: ["Laravel", "PHP", "Bootstrap", "MySQL", "SaaS UI"],
    url: "https://designstallion.com/",
    description:
      "Agency and SaaS-style platform work: onboarding flows, dashboards, and Laravel-backed views with polished Bootstrap UI.",
    performance: "Server-rendered dashboards, pragmatic caching on reports, form UX.",
  },
  {
    slug: "onyxbpo",
    host: "onyxbpo.co",
    name: "onyxbpo",
    permissions: "drwxr-xr-x",
    title: "Onyx BPO",
    stack: ["React", "JavaScript", "Landing", "Lead gen"],
    url: "https://onyxbpo.co/",
    description:
      "BPO service positioning with conversion-focused sections, trust signals, and responsive web design.",
    performance: "Lightweight animations, fast LCP on hero, clear CTAs.",
  },
  {
    slug: "urduinc-uat",
    host: "uat.urduinc.com",
    name: "urduinc-uat",
    permissions: "drwxr-xr-x",
    title: "Urdu Inc (UAT)",
    stack: ["React", "Next.js", "TypeScript", "Staging / QA"],
    url: "https://uat.urduinc.com/",
    description:
      "Pre-production environment for editorial or media product flows; feature validation and UI regression ahead of release.",
    performance: "Environment-tuned builds, feature flags, smoke-test friendly navigation.",
  },
  {
    slug: "safeguard-medical-hr",
    host: "safeguardmedicalhr.codecreators.io",
    name: "safeguard-medical-hr",
    permissions: "drwxr-xr-x",
    title: "Safeguard Medical HR",
    stack: ["React", "JavaScript", "HR portal", "Forms"],
    url: "http://safeguardmedicalhr.codecreators.io/",
    description:
      "HR-focused internal or partner portal patterns: structured forms, role-based views, and practical data entry UX.",
    performance: "Client-side validation, optimistic feedback, reduced layout shift on dynamic fields.",
  },
  {
    slug: "techfrific",
    host: "techfrific.com",
    name: "techfrific",
    permissions: "drwxr-xr-x",
    title: "Techfrific",
    stack: ["PHP", "JavaScript", "WordPress / CMS", "Corporate"],
    url: "https://www.techfrific.com/",
    description:
      "Technology services company site with service grids, case-style blocks, and maintainable CMS-driven updates.",
    performance: "Template hygiene, cache-friendly assets, mobile navigation patterns.",
  },
  {
    slug: "techlanesolution",
    host: "techlanesolution.com",
    name: "techlanesolution",
    permissions: "drwxr-xr-x",
    title: "Tech Lane Solution",
    stack: ["React", "JavaScript", "Corporate", "UI polish"],
    url: "https://techlanesolution.com/",
    description:
      "Solutions partner web presence with clear service mapping, credibility sections, and UI developer polish.",
    performance: "Consistent spacing system, fast scroll performance, accessible links.",
  },
  {
    slug: "ingenicotribe",
    host: "ingenicotribe.com",
    name: "ingenicotribe",
    permissions: "drwxr-xr-x",
    title: "Ingenico Tribe",
    stack: ["React", "JavaScript", "Product marketing", "Animations"],
    url: "https://www.ingenicotribe.com/",
    description:
      "Product-led marketing experience with interactive sections, narrative flow, and performance-conscious motion.",
    performance: "GPU-friendly transforms, reduced main-thread work on scroll.",
  },
  {
    slug: "itgsgroup",
    host: "itgsgroup.com",
    name: "itgsgroup",
    permissions: "drwxr-xr-x",
    title: "ITGS Group",
    stack: ["React", "Next.js", "Corporate", "Multipage"],
    url: "https://itgsgroup.com/",
    description:
      "Group corporate site with multi-section storytelling, services architecture, and enterprise frontend developer standards.",
    performance: "Shared layout primitives, predictable routing, SEO metadata patterns.",
  },
];
