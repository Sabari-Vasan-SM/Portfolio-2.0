import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import Masonry from "@/components/Masonry";

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

  const certificationItems = useMemo(
    () =>
      certifications.map((cert, i) => {
        const createCertImage = () => {
          const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 900'>
            <defs>
              <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stop-color='hsl(0 0% 3%)'/>
                <stop offset='100%' stop-color='hsl(0 0% 8%)'/>
              </linearGradient>
            </defs>
            <rect width='100%' height='100%' fill='url(#g)'/>
            <rect x='28' y='28' width='544' height='844' rx='8' fill='none' stroke='hsl(0 0% 100% / 0.18)' stroke-width='2'/>
            <text x='64' y='130' fill='hsl(0 0% 72%)' font-size='16' font-family='monospace' letter-spacing='3'>CERTIFICATION</text>
            <line x1='64' y1='150' x2='536' y2='150' stroke='hsl(0 0% 100% / 0.22)' />
            <text x='64' y='240' fill='hsl(0 0% 95%)' font-size='40' font-family='monospace' font-weight='700'>${cert.year}</text>
            <text x='64' y='330' fill='hsl(0 0% 92%)' font-size='28' font-family='monospace'>${cert.title}</text>
            <text x='64' y='390' fill='hsl(0 0% 70%)' font-size='20' font-family='monospace'>${cert.org}</text>
            <circle cx='520' cy='100' r='12' fill='hsl(0 0% 100%)'/>
          </svg>`;

          return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
        };

        return {
          id: `cert-${i + 1}`,
          img: createCertImage(),
          url: "",
          height: 220 + (i % 3) * 60,
          title: cert.title,
          subtitle: cert.org,
          year: cert.year,
        };
      }),
    [],
  );

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

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="mb-20"
        >
          <Masonry
            items={certificationItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            colorShiftOnHover={false}
          />
        </motion.div>

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
