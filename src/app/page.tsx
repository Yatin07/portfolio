import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Achievements } from "@/components/Achievements";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#E0E7FF] selection:text-[#1E3A8A] overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Education />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
