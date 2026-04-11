import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import TerminalSection from "@/components/TerminalSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ChatBot from "@/components/ChatBot";
import CustomCursor from "@/components/CustomCursor";
import DotGrid from "@/components/DotGrid";

const Index = () => {
  useEffect(() => {
    const prevScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = prevScrollRestoration;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={4}
          gap={16}
          baseColor="#101010"
          activeColor="#787878"
          proximity={100}
          shockRadius={250}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="fixed inset-0 z-[1] bg-background/85" />

      <div className="relative z-10">
        <CustomCursor />
        <NavBar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <TerminalSection />
        <ContactSection />
        <FooterSection />
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
