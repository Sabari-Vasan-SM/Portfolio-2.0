import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const interests = [
  { title: "Web Development (MEAN Stack)", desc: "Crafting smooth, responsive, and interactive user interfaces using modern web technologies." },
  { title: "Cloud Computing", desc: "Leveraging cloud platforms to build scalable and efficient solutions." },
  { title: "DevOps", desc: "Implementing CI/CD pipelines, automation, and monitoring for seamless workflows." },
];

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

const stats: StatItem[] = [
  { label: "Technologies Used", value: 20, suffix: "+" },
  { label: "Projects Completed", value: 25, suffix: "+" },
  { label: "GitHub Repos", value: 85, suffix: "+" },
  { label: "Contributions", value: 940, suffix: "+" },
  { label: "Lines of Code Changed", value: 20.6, suffix: "M+", decimals: 1 },
];

const AnimatedCounter = ({
  target,
  inView,
  decimals = 0,
  suffix = "+",
}: {
  target: number;
  inView: boolean;
  decimals?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    let frameId = 0;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const factor = 10 ** decimals;
      setCount(Math.floor(progress * target * factor) / factor);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [inView, target, decimals]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [activeInterest, setActiveInterest] = useState(0);

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>about
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Career Objective
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mb-12 leading-relaxed">
            A motivated and detail-oriented individual pursuing Information Technology, passionate about applying technical expertise and problem-solving skills to craft innovative web development and IT solutions.
          </p>
        </motion.div>

        {/* Interest cards as toggles */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {interests.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              onClick={() => setActiveInterest(i)}
              className={`relative p-6 terminal-border cursor-none transition-all duration-300 ${
                activeInterest === i
                  ? "bg-terminal-green/5 border-terminal-green/40"
                  : "bg-card hover:bg-secondary/50"
              }`}
            >
              {/* Toggle indicator */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  activeInterest === i ? "bg-terminal-green animate-pulse-glow" : "bg-muted-foreground/30"
                }`} />
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  0{i + 1}
                </span>
              </div>
              <h3 className={`text-sm font-semibold mb-2 transition-colors ${
                activeInterest === i ? "text-terminal-green" : "text-foreground"
              }`}>
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-5 terminal-border text-center bg-card"
            >
              <div className="text-3xl font-bold text-terminal-green text-glow mb-1">
                <AnimatedCounter target={s.value} inView={inView} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <p className="text-xs text-muted-foreground tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
