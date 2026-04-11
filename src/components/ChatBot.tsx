import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CopilotIcon } from "@primer/octicons-react";

type Msg = { role: "user" | "bot"; text: string };

const botResponses: Record<string, string> = {
  hi: "Hey! I'm Sabari's assistant. Ask me about skills, projects, experience, education, social links, or contact.",
  hello: "Hello! I can help you explore Sabari's portfolio. Try: skills, projects, experience, education, social, or contact.",
  skills: "Sabari works with React, Next.js, TypeScript, Node.js, Express, MongoDB, Docker, AWS, and modern DevOps workflows.",
  projects: "Sabari has built 8 featured projects including Bike Buddy, Billventory, Air Quality Monitor (IoT), Password Saver, and a YOLOv8 gear fault detection system.",
  contact: "Reach Sabari at sabarivasan1239@gmail.com or +91 9677465071. Location: Erode, Tamil Nadu, India.",
  social: "GitHub: https://github.com/Sabari-Vasan-SM | LinkedIn: https://www.linkedin.com/in/sabarivasan-s-m-b10229255/",
  experience: "Sabari is currently a Software Developer at Harvee Designs and previously interned at InternPe and Nxt Gen Instruments.",
  education: "Sabari is pursuing B.Tech in Information Technology at Kongu Engineering College.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key)) return val;
  }
  return "I can help with: skills, projects, experience, education, social, or contact.";
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Sabari's portfolio assistant. Ask me about skills, projects, social links, or contact." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    const botMsg: Msg = { role: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 terminal-border bg-card flex items-center justify-center cursor-none hover:border-terminal-green/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: open ? "none" : "0 0 15px hsl(0 0% 100% / 0.1)" }}
        aria-label="Toggle assistant"
      >
        {open ? (
          <span className="text-terminal-green text-lg">×</span>
        ) : (
          <CopilotIcon size={20} className="text-terminal-green" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-80 max-h-96 terminal-border bg-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <CopilotIcon size={14} className="text-terminal-green" />
              <span className="text-xs text-terminal-green tracking-widest">ASSISTANT</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-60">
              {messages.map((msg, i) => (
                <div key={i} className={`text-xs leading-relaxed ${msg.role === "user" ? "text-terminal-cyan text-right" : "text-foreground"
                  }`}>
                  <span className="text-muted-foreground mr-1">
                    {msg.role === "user" ? "you>" : "bot>"}
                  </span>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t border-border">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask something..."
                className="flex-1 px-4 py-3 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/40 cursor-none"
              />
              <button
                onClick={send}
                className="px-4 text-terminal-green text-xs tracking-wider hover:bg-terminal-green/5 transition-colors cursor-none"
              >
                SEND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
