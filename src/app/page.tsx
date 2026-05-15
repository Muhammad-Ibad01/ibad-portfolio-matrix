import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Experience } from "@/components/Experience";
import { FloatingTerminal } from "@/components/FloatingTerminal";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Scanlines } from "@/components/Scanlines";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Scanlines />
      <Navbar />
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingTerminal />
    </>
  );
}
