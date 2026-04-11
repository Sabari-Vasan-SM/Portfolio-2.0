import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type Line = { type: "input" | "output" | "error"; text: string };

const commandResponses: Record<string, string> = {
  help: `Available commands:
  about      — Who is SabariVasan?
  skills     — Technical expertise
  projects   — Featured projects
  experience — Work history
  education  — Academic background
  contact    — Get in touch
  clear      — Clear terminal
  social     — Social links`,
  about: `> SabariVasan
  Role: Software Developer
  Focus: Web Development, Cloud, DevOps
  Location: Tamil Nadu, India
  Status: Available for hire`,
  skills: `> Technical Skills:
  Frontend:  React, Next.js, TypeScript, Flutter
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
  Location: Tamil Nadu, India`,
  social: `> Social Links:
  GitHub:   github.com/SabariVasan
  LinkedIn: linkedin.com/in/sabarivasan`,
};

const TerminalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: '> Welcome to SabariVasan\'s terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: "input", text: `$ ${cmd}` }];

    if (trimmed === "clear") {
      setLines([{ type: "output", text: '> Terminal cleared. Type "help" for commands.' }]);
    } else if (commandResponses[trimmed]) {
      newLines.push({ type: "output", text: commandResponses[trimmed] });
      setLines(newLines);
    } else if (trimmed) {
      newLines.push({ type: "error", text: `command not found: ${trimmed}. Try "help".` });
      setLines(newLines);
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Interactive Terminal
          </h2>
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
          <div className="p-4 h-80 overflow-y-auto text-sm">
            {lines.map((line, i) => (
              <div key={i} className={`mb-1 whitespace-pre-wrap ${
                line.type === "input" ? "text-terminal-cyan" :
                line.type === "error" ? "text-terminal-red" :
                "text-foreground"
              }`}>
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
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
