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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20">
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
