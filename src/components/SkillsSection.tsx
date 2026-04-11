import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ScrollFloat from "@/components/ScrollFloat";
import { AnimatedCarousel } from "@/components/AnimatedCarousel";

type SkillBadge = {
  name: string;
  src: string;
};

type SkillCategory = {
  name: string;
  badges: SkillBadge[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    badges: [
      { name: "HTML5", src: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" },
      { name: "CSS3", src: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" },
      { name: "JavaScript", src: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" },
      { name: "TypeScript", src: "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" },
      { name: "React", src: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
      { name: "React Native", src: "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
      { name: "Next.js", src: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" },
      { name: "Flutter", src: "https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" },
    ],
  },
  {
    name: "Backend",
    badges: [
      { name: "Node.js", src: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" },
      { name: "Express.js", src: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" },
      { name: "FastAPI", src: "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" },
      { name: "REST API", src: "https://img.shields.io/badge/REST_API-023047?style=for-the-badge&logo=openapi&logoColor=white" },
      { name: "Webhooks", src: "https://img.shields.io/badge/Webhooks-FF4F8B?style=for-the-badge&logo=webhooks&logoColor=white" },
      { name: "WebSockets", src: "https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio&logoColor=white" },
      { name: "Python", src: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" },
    ],
  },
  {
    name: "Database",
    badges: [
      { name: "MongoDB", src: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" },
      { name: "PostgreSQL", src: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" },
      { name: "Supabase", src: "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" },
    ],
  },
  {
    name: "DevOps & Cloud",
    badges: [
      { name: "Git", src: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" },
      { name: "GitHub", src: "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" },
      { name: "Docker", src: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" },
      { name: "Nginx", src: "https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" },
      { name: "Jenkins", src: "https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" },
      { name: "GitHub Actions", src: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" },
    ],
  },
  {
    name: "Deployment",
    badges: [
      { name: "Vercel", src: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" },
      { name: "Netlify", src: "https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" },
      { name: "AWS", src: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" },
      { name: "Render", src: "https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" },
    ],
  },
  {
    name: "Design Tools",
    badges: [
      { name: "Miro", src: "https://img.shields.io/badge/Miro-050038?style=for-the-badge&logo=miro&logoColor=white" },
      { name: "Canva", src: "https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white" },
    ],
  },
  {
    name: "AI Tools",
    badges: [
      { name: "ChatGPT", src: "https://img.shields.io/badge/ChatGPT-10A37F?style=for-the-badge&logo=openai&logoColor=white" },
      { name: "Gemini", src: "https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" },
      { name: "Claude", src: "https://img.shields.io/badge/Claude-111111?style=for-the-badge&logo=anthropic&logoColor=white" },
      { name: "DeepSeek", src: "https://img.shields.io/badge/DeepSeek-000000?style=for-the-badge" },
      { name: "Perplexity", src: "https://img.shields.io/badge/Perplexity-1FB6FF?style=for-the-badge" },
    ],
  },
  {
    name: "Others",
    badges: [
      { name: "VS Code", src: "https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" },
      { name: "Antigravity", src: "https://img.shields.io/badge/Antigravity-000000?style=for-the-badge" },
      { name: "Cursor", src: "https://img.shields.io/badge/Cursor-000000?style=for-the-badge" },
      { name: "Windsurf", src: "https://img.shields.io/badge/Windsurf-0055FF?style=for-the-badge" },
      { name: "Android Studio", src: "https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=white" },
      { name: "FileZilla", src: "https://img.shields.io/badge/FileZilla-BF0000?style=for-the-badge&logo=filezilla&logoColor=white" },
      { name: "PuTTY", src: "https://img.shields.io/badge/PuTTY-FFCC00?style=for-the-badge&logo=putty&logoColor=black" },
      { name: "Stitch", src: "https://img.shields.io/badge/Stitch-000000?style=for-the-badge" },
      { name: "Swagger", src: "https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" },
      { name: "Postman", src: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" },
      { name: "Arduino", src: "https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white" },
    ],
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
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Technical Expertise
          </ScrollFloat>

          <AnimatedCarousel
            title="Core Technologies"
            autoPlay
            autoPlayInterval={1200}
            itemsPerViewMobile={3}
            itemsPerViewDesktop={7}
            spacing="gap-4"
            padding="py-0"
            logoContainerWidth="w-24"
            logoContainerHeight="h-14"
            containerClassName="mb-8"
          />
        </motion.div>

        {/* Tab slider */}
        <div className="flex flex-wrap gap-1 mb-8 p-1 bg-secondary/30 rounded-sm terminal-border">
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 text-xs tracking-wider transition-all cursor-none ${activeTab === i
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
          {skillCategories[activeTab].badges.map((badge, i) => (
            <motion.div
              key={`${badge.name}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "hsl(120 100% 50% / 0.5)" }}
              className="terminal-border group flex min-h-[108px] flex-col items-center justify-center gap-3 bg-card p-4 text-center cursor-none"
            >
              <img
                src={badge.src}
                alt={badge.name}
                loading="lazy"
                className="h-8 w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
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
