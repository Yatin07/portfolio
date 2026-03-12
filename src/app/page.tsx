import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Skills } from "@/components/Skills";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Education />
        <Projects />
        <GitHubActivity />
        <Experience />
        <Certifications />
        <Achievements />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
