import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const certifications = [
  { title: "MongoDB Associate Developer", org: "MongoDB", year: "2025" },
  { title: "Gemini Certified Student", org: "Google", year: "2024" },
  { title: "React JS Certification", org: "Online Platform", year: "2024" },
  { title: "AWS Essentials", org: "Amazon Web Services", year: "2024" },
  { title: "Prompt Engineering for Developers", org: "Online Platform", year: "2024" },
  { title: "Agile Fundamentals", org: "KEC", year: "2024" },
  { title: "Foundations of Git", org: "Online Platform", year: "2024" },
];

const achievements = [
  {
    title: "International Conference Paper Presentation",
    desc: "Presented research paper on Automated Fault Diagnosis of Gear Tooth Defects Using Deep Learning at ICPCCT '25, Sona College of Technology.",
    year: "2024",
    type: "Presentation",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>credentials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Certifications
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-20">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3, borderColor: "hsl(120 100% 50% / 0.4)" }}
              className="p-5 terminal-border bg-card cursor-none"
            >
              <span className="text-[10px] text-terminal-dim tracking-widest">{cert.year}</span>
              <h3 className="text-sm font-semibold text-foreground mt-2 mb-1">{cert.title}</h3>
              <p className="text-xs text-muted-foreground">{cert.org}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>achievements
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Recognition
          </h2>
        </motion.div>

        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="p-6 terminal-border bg-card border-terminal-amber/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] px-2 py-0.5 bg-terminal-amber/10 text-terminal-amber tracking-widest uppercase">
                {a.type}
              </span>
              <span className="text-[10px] text-muted-foreground">{a.year}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
