import { ResumeLayout } from "@/components/layout/ResumeLayout";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { AIChat } from "@/components/sections/AIChat";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <ResumeLayout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <GitHubSection />
      <Education />
      <Contact />
      <AIChat />
      <BackToTop />
    </ResumeLayout>
  );
}
