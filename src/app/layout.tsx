import type { Metadata } from "next";
import { DM_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const site = "https://ibaddev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Muhammad Ibad | Frontend Developer — React & Next.js · ibad.dev",
  description:
    "Muhammad Ibad: Frontend Developer with 5+ years in React, Next.js, TypeScript. Built enterprise portals, banking systems, and SaaS. Based in Karachi, Pakistan.",
  keywords: [
    "Frontend Developer",
    "React.js Developer",
    "Next.js Engineer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Engineer Pakistan",
    "Web Developer Karachi",
    "UI Developer",
    "React Component Architecture",
    "Performance Optimization",
    "REST API Integration",
    "Responsive Web Design",
    "Enterprise Frontend Developer",
    "SaaS Web Application",
    "Cross-Browser Development",
  ],
  authors: [{ name: "Muhammad Ibad", url: site }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site,
    siteName: "ibad.dev",
    title: "Muhammad Ibad | Frontend Developer — React & Next.js",
    description:
      "React & Next.js engineer. Enterprise portals, SaaS, and performance-focused UIs. Karachi, Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ibad | Frontend Developer — React & Next.js",
    description:
      "React & Next.js engineer. Enterprise portals, SaaS, and performance-focused UIs.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Ibad",
  email: "mailto:ibadfiction@gmail.com",
  url: site,
  jobTitle: "Frontend Developer",
  description:
    "React.js Developer and Next.js Engineer building enterprise SaaS web applications, banking systems, and responsive interfaces in Karachi, Pakistan.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "REST API Integration",
    "Performance Optimization",
    "Responsive Web Design",
  ],
  sameAs: ["https://github.com/ibadfiction", "https://www.linkedin.com/in/muhammad-ibad"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmMono.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-mono antialiased">{children}</body>
    </html>
  );
}
