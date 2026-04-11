import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Bike Buddy",
    desc: "A comprehensive bike service management platform connecting customers with service providers.",
    tech: ["React", "Node.js", "MongoDB Atlas", "Express"],
    category: "Web",
  },
  {
    title: "Password Saver",
    desc: "A secure React Native application for storing and managing passwords with ease.",
    tech: ["React Native", "Expo", "React Navigation", "AsyncStorage"],
    category: "Mobile App",
  },
  {
    title: "Air Quality Monitor",
    desc: "IoT-based air quality monitoring system using ESP32 and real-time dashboards.",
    tech: ["ESP32", "MQ-6", "MQ-135", "DHT11", "React"],
    category: "IoT & Web",
  },
  {
    title: "Billventory",
    desc: "All-in-one digital solution integrating inventory control, billing, and sales management.",
    tech: ["React", "Node.js", "SupaBase", "PDF Generation"],
    category: "Web",
  },
  {
    title: "E-Learning Platform",
    desc: "Comprehensive online learning platform with course management and video streaming.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "Web",
  },
  {
    title: "Sport-Connect",
    desc: "Social platform connecting sports enthusiasts, organizing events and communities.",
    tech: ["HTML", "CSS", "JavaScript", "MongoDB"],
    category: "Web",
  },
  {
    title: "Gear Fault Detection",
    desc: "Intelligent computer vision system for detecting gear defects using YOLOv8 OBB.",
    tech: ["Python", "YOLOv8", "Ultralytics", "OpenCV"],
    category: "Deep Learning",
  },
  {
    title: "Admission Management",
    desc: "System for managing student admissions, applications, and enrollment processes.",
    tech: ["React", "Node.js", "Express", "Payment Gateway"],
    category: "Web",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            <span className="text-terminal-green">{projects.length}</span> projects — click to expand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`group p-6 terminal-border bg-card cursor-none transition-all duration-300 ${
                expanded === i ? "border-terminal-green/40 bg-terminal-green/5" : "hover:border-muted-foreground/30"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] text-terminal-dim tracking-widest uppercase block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-terminal-green transition-colors">
                    {project.title}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  className="text-terminal-green text-xl leading-none mt-1"
                >
                  +
                </motion.span>
              </div>

              {/* Expandable content */}
              <motion.div
                initial={false}
                animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {project.desc}
                </p>
              </motion.div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
