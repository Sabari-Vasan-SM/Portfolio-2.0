import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  { role: "Software Developer", company: "Harvee Designs", location: "Coimbatore", duration: "Currently", type: "Full Time" },
  { role: "Web Developer Intern", company: "InternPe", location: "Remote", duration: "1 Month", type: "Internship" },
  { role: "Internet Of Things", company: "Nxt Gen Instruments", location: "Erode", duration: "1 Month", type: "Internship" },
];

const education = [
  { degree: "B.Tech - IT", institution: "Kongu Engineering College", score: "6.81 CGPA", year: "2025" },
  { degree: "Diploma - Mechanical", institution: "Sakthi Institute Of Technology", score: "85%", year: "2023" },
  { degree: "HSLC", institution: "SVV Hr. Sec. School", score: "85%", year: "2021" },
  { degree: "SSLC", institution: "Govt Boys Hr. Sec. School", score: "68%", year: "2019" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Experience */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Professional Journey
          </h2>
        </motion.div>

        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative pl-12 pb-10 last:pb-0"
            >
              {/* Dot */}
              <div className={`absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full ${
                i === 0 ? "bg-terminal-green animate-pulse-glow" : "bg-muted-foreground/40"
              }`} />
              
              <div className="terminal-border p-5 bg-card hover:bg-secondary/30 transition-colors">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 tracking-widest uppercase ${
                    exp.type === "Full Time" ? "bg-terminal-green/10 text-terminal-green" : "bg-secondary text-muted-foreground"
                  }`}>
                    {exp.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{exp.duration}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground mt-1">{exp.company} · {exp.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>education
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Education
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-5 terminal-border bg-card group hover:border-terminal-green/30 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xl font-bold text-terminal-green text-glow">{edu.year}</span>
                <span className="text-xs text-terminal-cyan">{edu.score}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-xs text-muted-foreground mt-1">{edu.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
