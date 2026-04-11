import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import CircularGallery from "@/components/CircularGallery";
import ScrollFloat from "@/components/ScrollFloat";

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

  const galleryItems = useMemo(
    () =>
      projects.map((project, i) => ({
        image: `https://picsum.photos/seed/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, "-"))}/1000/720?grayscale`,
        text: project.title,
      })),
    [],
  );

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
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-2 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Featured Projects
          </ScrollFloat>
          <p className="text-muted-foreground text-sm mb-10">
            <span className="text-terminal-green">{projects.length}</span> projects — scroll to explore
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="circ-wrap"
        >
          <CircularGallery
            items={galleryItems}
            bend={0}
            textColor="#ffffff"
            borderRadius={0.03}
            scrollSpeed={2.9}
            scrollEase={0.05}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
