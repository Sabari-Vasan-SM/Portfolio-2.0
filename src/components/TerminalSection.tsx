import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

type Line = { type: "input" | "output" | "error"; text: string };

const commandResponses: Record<string, string> = {
  help: `Available commands:
  about      — Quick intro
  skills     — Technical stack
  projects   — Featured projects
  experience — Career journey
  education  — Academic background
  contact    — Contact details
  social     — GitHub + LinkedIn
  clear      — Clear terminal`,
  about: `> SabariVasan
  Role: Full Stack Developer
  Focus: Web Development, Cloud, DevOps, AI Integration
  Location: Erode, Tamil Nadu, India
  Status: Open to full-time opportunities`,
  skills: `> Technical Skills:
  Frontend:  React, Next.js, TypeScript, Tailwind CSS
  Backend:   Node.js, Express, FastAPI, Python
  Database:  MongoDB, PostgreSQL, Supabase
  DevOps:    Docker, Jenkins, GitHub Actions
  Cloud:     AWS, Vercel, Netlify, Render`,
  projects: `> 8 Featured Projects:
  01. Bike Buddy — Bike service platform
  02. Password Saver — React Native password manager
  03. Air Quality Monitor — IoT dashboard
  04. Billventory — Retail management
  05. E-Learning Platform — Online courses
  06. Sport-Connect — Sports social network
  07. Gear Fault Detection — YOLOv8 CV system
  08. Admission Management — Student enrollment`,
  experience: `> Professional Experience:
  ● Software Developer @ Harvee Designs (Current)
  ● Web Developer Intern @ InternPe (1 month)
  ● IoT Intern @ Nxt Gen Instruments (1 month)`,
  education: `> Education:
  ● B.Tech IT — Kongu Engineering College (6.81 CGPA)
  ● Diploma Mechanical — Sakthi Inst. (85%)
  ● HSLC — SVV Hr. Sec. School (85%)
  ● SSLC — Govt Boys Hr. Sec. School (68%)`,
  contact: `> Contact Info:
  Email: sabarivasan1239@gmail.com
  Phone: +91 9677465071
  Location: Erode, Tamil Nadu, India`,
  social: `> Social Links:
  GitHub:   https://github.com/Sabari-Vasan-SM
  LinkedIn: https://www.linkedin.com/in/sabarivasan-s-m-b10229255/`,
};

const TerminalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: '> Welcome to SabariVasan\'s terminal. Type "help" for commands.' },
  ]);
  const [typingQueue, setTypingQueue] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = terminalBodyRef.current;
    if (!body) return;

    body.scrollTo({
      top: body.scrollHeight,
      behavior: "auto",
    });
  }, [lines]);

  useEffect(() => {
    if (!typingQueue.length) return;

    const current = typingQueue[0];
    let charIndex = 0;

    setLines((prev) => [...prev, { type: current.type, text: "" }]);

    const timer = window.setInterval(() => {
      charIndex += 1;

      setLines((prev) => {
        if (!prev.length) return prev;

        const next = [...prev];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, text: current.text.slice(0, charIndex) };
        return next;
      });

      if (charIndex >= current.text.length) {
        window.clearInterval(timer);
        setTypingQueue((prev) => prev.slice(1));
      }
    }, 12);

    return () => window.clearInterval(timer);
  }, [typingQueue]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) {
      setInput("");
      return;
    }

    setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);

    if (trimmed === "clear") {
      setTypingQueue([]);
      setLines([{ type: "output", text: '> Terminal cleared. Type "help" for commands.' }]);
    } else if (commandResponses[trimmed]) {
      setTypingQueue((prev) => [...prev, { type: "output", text: commandResponses[trimmed] }]);
    } else {
      setTypingQueue((prev) => [...prev, { type: "error", text: `command not found: ${trimmed}. Try "help".` }]);
    }

    setInput("");
  };

  return (
    <section id="terminal" className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>terminal
          </p>
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-6 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Interactive Terminal
          </ScrollFloat>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="terminal-border bg-card overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/60" />
            <span className="text-[10px] text-muted-foreground ml-2">sabari@portfolio:~</span>
          </div>

          {/* Terminal body */}
          <div ref={terminalBodyRef} className="p-4 h-80 overflow-y-auto text-sm">
            {lines.map((line, i) => (
              <div key={i} className={`mb-1 whitespace-pre-wrap ${line.type === "input" ? "text-terminal-cyan" :
                line.type === "error" ? "text-terminal-red" :
                  "text-foreground"
                }`}>
                {line.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
            <span className="text-terminal-green text-sm">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
              placeholder="type a command..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40 cursor-none"
              autoFocus={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
