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
    <div className="relative min-h-screen bg-background overflow-x-hidden">
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
  );
};

export default Index;
