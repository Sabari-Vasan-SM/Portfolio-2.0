import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import profileImage from "@/assets/profile.png";
import resumeFile from "@/assets/resume.pdf";
import BlurText from "@/components/BlurText";
import LanyardCard from "@/components/LanyardCard";
import ScrambledText from "@/components/ScrambledText";
import TextType from "@/components/TextType";

const roles = ["WebCraftsman", "TechAficionado", "AI-DrivenCoder", "FullStackDev"];

const HeroSection = () => {
  const [showLanyardPopup, setShowLanyardPopup] = useState(false);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden noise-bg pt-20 md:pt-0">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-50" />

      <div className="absolute left-1/2 top-6 z-20 hidden w-[min(99vw,1320px)] -translate-x-1/2 whitespace-nowrap border border-white/10 bg-background/35 px-3 py-3 text-center text-[clamp(0.55rem,0.9vw,0.92rem)] leading-relaxed text-muted-foreground backdrop-blur-sm md:block md:top-8">
        <ScrambledText radius={100} duration={1.2} speed={0.5} scrambleChars=".:" className="hero-quote-scramble">
          "Even something is not achieved by fate or divine help,consitancy effort & Hardwork ,will pay you a rightful reward !!"
        </ScrambledText>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <div className="text-left">
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 terminal-border rounded-full"
              animate={{ boxShadow: ["0 0 5px hsl(0 0% 100% / 0.1)", "0 0 15px hsl(0 0% 100% / 0.25)", "0 0 5px hsl(0 0% 100% / 0.1)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-blink" />
              <span className="text-xs text-terminal-green tracking-widest uppercase">Available for Hire</span>
            </motion.div>

            <div className="mb-4">
              <BlurText
                text="Hi, I'm SabariVasan"
                delay={200}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-5xl md:text-7xl font-bold tracking-tight text-terminal-green text-glow justify-start"
              />
            </div>

            {/* Typing role */}
            <div className="text-xl md:text-2xl mb-2 h-10 flex items-center justify-start">
              <TextType
                text={roles}
                typingSpeed={75}
                pauseDuration={1500}
                deletingSpeed={50}
                showCursor
                cursorCharacter="█"
                variableSpeedEnabled={false}
                variableSpeedMin={60}
                variableSpeedMax={120}
                cursorBlinkDuration={0.5}
                className="text-terminal-cyan text-glow-cyan"
              />
            </div>

            <p className="text-muted-foreground text-sm mb-10 tracking-wider">
              Software Developer Intern
            </p>

            {/* Interactive controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center">
              <motion.button
                onClick={() => window.open(resumeFile, "_blank", "noopener,noreferrer")}
                className="group relative px-8 py-3 terminal-border text-terminal-green text-sm tracking-widest uppercase overflow-hidden cursor-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-terminal-green/0 group-hover:bg-terminal-green/10 transition-colors duration-300" />
                <span className="relative flex items-center gap-2">
                  <span className="text-terminal-dim">[</span>
                  <Eye size={16} className="text-terminal-green/90" />
                  View Resume
                  <span className="text-terminal-dim">]</span>
                </span>
              </motion.button>

              <motion.button
                onClick={() => setShowLanyardPopup(true)}
                className="group relative px-8 py-3 terminal-border text-muted-foreground text-sm tracking-widest uppercase overflow-hidden cursor-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-terminal-green/0 group-hover:bg-terminal-green/5 transition-colors duration-300" />
                <span className="relative flex items-center gap-2">
                  <span className="text-terminal-dim">[</span>
                  Full Stack Dev
                  <span className="text-terminal-dim">]</span>
                </span>
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center justify-start gap-5 pt-2 md:items-center md:justify-start"
          >
            <div className="h-72 w-72 md:h-96 md:w-96 overflow-hidden rounded-full border border-terminal-green/40 shadow-[0_0_35px_hsl(145_85%_60%_/_0.2)]">
              <img
                src={profileImage}
                alt="SabariVasan"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-terminal-green/60 to-transparent" />
        </motion.div>
      </div>

      <AnimatePresence>
        {showLanyardPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md"
            onClick={() => setShowLanyardPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24 }}
              className="relative w-full max-w-[640px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowLanyardPopup(false)}
                className="absolute -right-2 -top-3 z-20 h-9 w-9 rounded-full border border-white/30 bg-zinc-900/95 text-zinc-100 shadow-[0_0_16px_rgba(255,255,255,0.2)] transition-colors hover:border-white/70 cursor-none"
                aria-label="Close full stack card"
              >
                x
              </button>

              <LanyardCard />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
