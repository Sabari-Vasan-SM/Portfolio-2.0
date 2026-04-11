import { motion } from "framer-motion";
import profileImage from "@/assets/profile.png";
import BlurText from "@/components/BlurText";
import TextType from "@/components/TextType";

const roles = ["WebCraftsman", "TechAficionado", "AI-DrivenCoder", "FullStackDev"];

const HeroSection = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
      
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

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
                onClick={() => scrollTo("projects")}
                className="group relative px-8 py-3 terminal-border text-terminal-green text-sm tracking-widest uppercase overflow-hidden cursor-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-terminal-green/0 group-hover:bg-terminal-green/10 transition-colors duration-300" />
                <span className="relative flex items-center gap-2">
                  <span className="text-terminal-dim">[</span>
                  View Projects
                  <span className="text-terminal-dim">]</span>
                </span>
              </motion.button>

              <motion.button
                onClick={() => scrollTo("terminal")}
                className="group relative px-8 py-3 terminal-border text-muted-foreground text-sm tracking-widest uppercase overflow-hidden cursor-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-terminal-green/0 group-hover:bg-terminal-green/5 transition-colors duration-300" />
                <span className="relative flex items-center gap-2">
                  <span className="text-terminal-dim">~/</span>
                  Open Terminal
                </span>
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center md:justify-end"
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
    </section>
  );
};

export default HeroSection;
