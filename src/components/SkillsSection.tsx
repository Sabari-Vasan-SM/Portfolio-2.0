import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "React Native", "Next.js", "Flutter"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "REST API", "Webhooks", "WebSockets", "Python"],
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "Supabase"],
  },
  {
    name: "DevOps & Cloud",
    skills: ["Git", "GitHub", "Docker", "Nginx", "Jenkins", "GitHub Actions"],
  },
  {
    name: "Deployment",
    skills: ["Vercel", "Netlify", "AWS", "Render"],
  },
  {
    name: "Tools",
    skills: ["VS Code", "Cursor", "Windsurf", "Postman", "Swagger", "Android Studio", "Arduino"],
  },
  {
    name: "AI Tools",
    skills: ["ChatGPT", "Gemini", "Claude", "DeepSeek", "Perplexity"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Technical Expertise
          </h2>
        </motion.div>

        {/* Tab slider */}
        <div className="flex flex-wrap gap-1 mb-8 p-1 bg-secondary/30 rounded-sm terminal-border">
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 text-xs tracking-wider transition-all cursor-none ${
                activeTab === i
                  ? "bg-terminal-green/10 text-terminal-green terminal-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {skillCategories[activeTab].skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "hsl(120 100% 50% / 0.5)" }}
              className="p-4 terminal-border bg-card text-center cursor-none group"
            >
              <span className="text-sm text-muted-foreground group-hover:text-terminal-green transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Workspace */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 terminal-border bg-card"
        >
          <h3 className="text-sm font-semibold text-terminal-dim mb-4 tracking-widest uppercase">
            // Workspace Spec
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Device:</span>
              <p className="text-foreground mt-1">Acer Aspire Lite</p>
            </div>
            <div>
              <span className="text-muted-foreground">Processor:</span>
              <p className="text-foreground mt-1">Intel Core i5 (Iris Xe)</p>
            </div>
            <div>
              <span className="text-muted-foreground">OS:</span>
              <p className="text-foreground mt-1">Windows 11 / Ubuntu 25.10</p>
            </div>
            <div>
              <span className="text-muted-foreground">Editors:</span>
              <p className="text-foreground mt-1">VS Code, Cursor, Windsurf</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
