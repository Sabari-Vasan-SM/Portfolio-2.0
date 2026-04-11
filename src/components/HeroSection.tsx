import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = ["WebCraftsman", "TechAficionado", "AI-DrivenCoder", "FullStackDev"];

const HeroSection = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 terminal-border rounded-full"
            animate={{ boxShadow: ["0 0 5px hsl(0 0% 100% / 0.1)", "0 0 15px hsl(0 0% 100% / 0.25)", "0 0 5px hsl(0 0% 100% / 0.1)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-blink" />
            <span className="text-xs text-terminal-green tracking-widest uppercase">Available for Hire</span>
          </motion.div>

          {/* Terminal greeting */}
          <div className="text-left max-w-2xl mx-auto mb-6">
            <p className="text-muted-foreground text-sm mb-1">
              <span className="text-terminal-dim">$</span> whoami
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-terminal-green text-glow">SabariVasan</span>
          </h1>

          {/* Typing role */}
          <div className="text-xl md:text-2xl text-muted-foreground mb-2 h-10 flex items-center justify-center">
            <span className="text-terminal-dim mr-2">&gt;</span>
            <span className="text-terminal-cyan text-glow-cyan">{text}</span>
            <span className="text-terminal-green animate-blink ml-0.5">█</span>
          </div>

          <p className="text-muted-foreground text-sm mb-10 tracking-wider">
            Software Developer Intern
          </p>

          {/* Interactive controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
