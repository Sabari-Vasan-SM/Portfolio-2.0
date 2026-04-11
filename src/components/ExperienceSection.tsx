import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollFloat from "@/components/ScrollFloat";

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
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Professional Journey
          </ScrollFloat>
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
              <div className={`absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full ${i === 0 ? "bg-terminal-green animate-pulse-glow" : "bg-muted-foreground/40"
                }`} />

              <div className="terminal-border p-5 bg-card hover:bg-secondary/30 transition-colors">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 tracking-widest uppercase ${exp.type === "Full Time" ? "bg-terminal-green/10 text-terminal-green" : "bg-secondary text-muted-foreground"
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
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Education
          </ScrollFloat>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-2 bottom-2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-terminal-green/80 via-terminal-cyan/60 to-terminal-green/50 md:block" />

          <div className="space-y-6 md:space-y-10">
            {education.map((edu, i) => {
              const leftAligned = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6"
                >
                  <div
                    className={`w-full md:max-w-sm ${leftAligned
                        ? "md:col-start-1 md:justify-self-end"
                        : "md:col-start-3 md:justify-self-start"
                      }`}
                  >
                    <div className="terminal-border rounded-xl bg-card p-5 shadow-[0_0_20px_hsl(0_0%_100%_/_0.03)] transition-all hover:border-terminal-green/30">
                      <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="mt-4 text-right text-xs text-terminal-cyan">{edu.score}</p>

                      <div className="mt-3 md:hidden">
                        <span className="inline-flex items-center rounded-full border border-terminal-green/35 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          <span className="mr-1 text-terminal-green">*</span>
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden h-10 w-10 items-center justify-center md:flex md:col-start-2">
                    <span className="h-6 w-6 rounded-full border-2 border-terminal-green bg-background shadow-[0_0_20px_hsl(0_0%_100%_/_0.15)]" />
                    <span className="absolute h-2 w-2 rounded-full bg-terminal-green" />
                  </div>

                  <div
                    className={`hidden md:block ${leftAligned
                        ? "md:col-start-3 md:justify-self-start"
                        : "md:col-start-1 md:justify-self-end"
                      }`}
                  >
                    <span className="inline-flex items-center rounded-full border border-terminal-green/35 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                      <span className="mr-1 text-terminal-green">*</span>
                      {edu.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
