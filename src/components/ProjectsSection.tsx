import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import ChromaGrid from "@/components/ChromaGrid";
import ProjectPreviewModal from "@/components/ProjectPreviewModal";
import ScrollFloat from "@/components/ScrollFloat";

const projects = [
  {
    title: "Bike Buddy",
    description:
      "A comprehensive bike service management platform that connects customers with service providers, enabling easy booking, tracking, and management of bike services.",
    fullDescription:
      "A comprehensive bike service management platform that connects customers with service providers, enabling easy booking, tracking, and management of bike services.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiEFN58SIYnhmUikihfqiHk0YXN7WIhMLDG8YqT717374dasIArE5vTkxuDNnNa9kbNmUBDxVrg2QwAUTRd28NKw6TFLlBp1rUCpb13j6CxHZTdDYYQIEyXscHWzNhSYj6YChBqeQm3jcPxFr2USeubFDWmky9iOIRcdpZmURXnd_NWrdRb5LljU92tLRVq",
    link: "https://cartrabbit-alpha.vercel.app/",
    github: "https://github.com/Sabari-Vasan-SM/Bike-Buddy.git",
    technologies: ["React", "Node.js", "MongoDB Atlas", "Express", "Nodemailer"],
    features: [
      "Customer booking flow (select service, date/time, pickup or drop-off option)",
      "Service provider onboarding and profile management",
      "Real-time booking status & progress tracking",
      "Technician assignment and schedule management",
      "In-app messaging between customer and provider",
      "Push & email notifications (booking confirmations, reminders, status updates)",
    ],
    category: "Web",
  },
  {
    title: "Password Saver",
    description:
      "A secure and user-friendly React Native application for storing and managing all your passwords with ease.",
    fullDescription:
      "Password Saver is a mobile app built with React Native and Expo, designed to simplify password management while ensuring strong security. It provides secure authentication, PIN protection, and user-specific data isolation. Users can add, manage, and search their saved credentials, copy passwords to the clipboard with a single tap, and delete entries when no longer needed. With a modern UI/UX built using React Navigation, AsyncStorage, and Expo’s ecosystem, the app delivers a smooth, minimal, and reliable experience for both Android and iOS.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEiH79fRiTQuxfmc_wJKqPuP1sIVE8LqaxEzd1RU-_z724BilPItz0eU2EUCVUWmFwzLkACnT4lfPCYYypppIi3yCCQAUqbZqqjy7F_N_WIptzft6dm91zN9HjGrEC0MF6mEubHKzRkqiebd1Haavh08Z8Yli-7tqt0BSf3pTmsdRldNob7JKZ-7w9OdEBay",
    link: "https://github.com/Sabari-Vasan-SM/PasswordSaver",
    github: "https://github.com/Sabari-Vasan-SM/PasswordSaver.git",
    technologies: ["React Native", "Expo", "React Navigation", "AsyncStorage", "expo-clipboard", "@expo/vector-icons"],
    features: [
      "Secure user authentication (sign-up & login)",
      "PIN-based quick access with added security",
      "User-specific data isolation (auto wipe on logout)",
      "Add, view, search, and manage saved credentials",
      "One-tap password copy to clipboard",
      "Delete individual or all saved passwords",
      "Modern minimal UI/UX with smooth navigation",
      "Cross-platform support (Android & iOS)",
    ],
    category: "Mobile App",
  },
  {
    title: "Air-Quality-Monitor-With-NODE-MCU",
    description:
      "An IoT-based air quality monitoring system using ESP32 and real-time dashboards built with React and TailwindCSS.",
    fullDescription:
      "An advanced air quality monitoring system leveraging ESP32 microcontroller and multiple sensors (MQ-6, MQ-135, DHT11) to detect gas concentrations, temperature, and humidity. Real-time data is visualized through a dynamic dashboard built in React with TailwindCSS, while alerts are sent via Twilio SMS when thresholds are crossed. Sensor data is also logged to the cloud using ThingSpeak for historical analysis and tracking.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjpTHAvwiWZJqFFsG1sh3RvTkswRq3a7vE0KO_9UhuallyZzdZahPiu50EEvhmqhHuJcRVG_ma2M3AC8I73BFgtaAFAvrqof6X-YnVxXqE-UstKUSH25rcDT9YDgxA4j9sJ3_U9vhIij5DSxc8hNhzkw4HgrAwSMFOH5t-H9JVcIqmsTMUsuKit1IsPob1x",
    link: "https://airqualitymonitor1.netlify.app/",
    github: "https://github.com/Sabari-Vasan-SM/Air-Quality-Monitor-With-NODE-MCU.git",
    technologies: ["ESP32", "MQ-6", "MQ-135", "DHT11", "React", "TailwindCSS", "Twilio", "ThingSpeak"],
    features: [
      "Real-time sensor data updates",
      "Gas, temperature, and humidity monitoring",
      "Dynamic React + TailwindCSS dashboard",
      "Twilio SMS alert system",
      "ThingSpeak cloud data logging",
      "Responsive UI for desktop and mobile",
    ],
    category: "IoT & Web",
  },
  {
    title: "Billventory",
    description:
      "An all-in-one digital solution that streamlines the retail experience by integrating inventory control, billing, and sales management into a single platform.",
    fullDescription:
      "An all-in-one digital solution that streamlines the retail experience by integrating inventory control, billing, and sales management into a single platform.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEhKRda2HFZa7Yrx4eh5zykeFT8lItcpot7XfApvo5VHgdHjKtUULEI3FqvHx8nIAHYfKDC_z5Z2jDbLjGsTIdjOXnqlYmffrj7_BcXRE2BarBQ0CpvDD0jDjVwaU-rxfZFuJA17Rr8DZtKzWs1EJLksHJX70-i2pJfseRS3B8wKF-y41PHf84bZcRzjmA33",
    link: "https://billventory.vasan.tech/",
    github: "https://github.com/Sabari-Vasan-SM/Billventory.git",
    technologies: ["React", "Node.js", "SupaBase", "PDF Generation"],
    features: [
      "Real-time inventory tracking",
      "Automated billing and invoicing",
      "Sales analytics and reporting",
      "Multi-location support",
      "Barcode scanning integration",
      "Customer and supplier management",
    ],
    category: "Web",
  },
  {
    title: "E-Learning Platform",
    description:
      "A comprehensive online learning platform with course management, video streaming, and progress tracking.",
    fullDescription:
      "A full-featured e-learning platform built with modern web technologies. Features include user authentication, course creation and management, video streaming, progress tracking, quizzes, and certificates. The platform supports multiple user roles including students, instructors, and administrators.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEhsYfdOfo0jMiCfm8_nap0hQ34TcC-1WX5oNnwHy1RapXuI9o5jZqhusjMJG7h_YtBPYJEA7PuCX0KwODBQKdHy6Wn59-jonbJ9Yg-2I3bXMW2At680inPPO77vZplzTuqI5r76eeVMH5VE-_48s9_djmxr2QGPKMYiPe-pZ5EMmyo3J4AHsOD1ox4DMznz",
    link: "https://github.com/Sabari-Vasan-SM/E-learning-Platform",
    github: "https://github.com/Sabari-Vasan-SM/E-learning-Platform.git",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Video.js"],
    features: [
      "User authentication and authorization",
      "Course creation and management",
      "Video streaming and playback",
      "Progress tracking and analytics",
      "Quiz and assessment system",
      "Certificate generation",
    ],
    category: "Web",
  },
  {
    title: "Sport-Connect",
    description:
      "A social platform connecting sports enthusiasts, organizing events, and building communities around sports.",
    fullDescription:
      "Sport-Connect is a comprehensive social platform designed to bring sports enthusiasts together. Users can create profiles, join sports communities, organize events, find playing partners, and track their sports activities. The platform includes real-time messaging, event management, and location-based features.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjeS-5K7mj-AKhlX3nqXZXUdvbgZOz9mESOPz2sGrD2-gIOQSdegdHHHqpyIdZQvJKyH1pIFStddUKFs2bTdp5vVAXl90T_hpkPMq_OLwR07Y-ML-zHqSTWi9I-8_V6_7dlicXodvSXEfbSvgbZQMYKWxSMXUcpL9QadTCE6dAy_JjCPghkOrweLHdVY8uv",
    link: "https://github.com/Sabari-Vasan-SM/Sport-Connect-SIH-",
    github: "https://github.com/Sabari-Vasan-SM/Sport-Connect-SIH-.git",
    technologies: ["HTML", "CSS", "JavaScript", "MongoDB"],
    features: [
      "User profiles and social networking",
      "Event creation and management",
      "Real-time messaging",
      "Sports activity tracking",
    ],
    category: "Web",
  },
  {
    title: "Gear Fault Detection System",
    description:
      "An intelligent computer vision system for detecting and localizing gear defects using YOLOv8 Oriented Object Detection (OBB).",
    fullDescription:
      "A deep learning–based gear fault detection system that uses YOLOv8 with oriented bounding boxes to accurately identify, localize, and visualize multiple types of gear defects. The system supports rotated defect detection, real-time inference, overlay visualization, and performance analysis using metrics such as precision, recall, F1-score, and mAP.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEgKmFwmaA9c6OsRvYIp8Bo6wdK9XYMeNaCT4q1fmbvBHwVSocYXkayYi7bfnVzUG_XjUaZE0yuFsURNP7DIsQXydBSV3qdCCBe6u333xWg-V6JS8BnRoqCmljnKu9EMrXQjCSpzaX2GdGpN1AqvrViGa52MooQRf30oi5Eg0vYoVKK2BrLQmWIdsajbsFp0",
    link:
      "https://github.com/Final-Year-Projects-KEC/Final-Code-With-Accuray-And-Graph-Metrics",
    github:
      "https://github.com/Final-Year-Projects-KEC/Final-Code-With-Accuray-And-Graph-Metrics",
    technologies: ["Python", "YOLOv8", "Ultralytics", "OpenCV", "Deep Learning", "Computer Vision"],
    features: [
      "Oriented object detection using YOLOv8-OBB",
      "Detection of multiple gear defect types (hp_cd, hp_cm, kp)",
      "Rotated bounding box and polygon-based visualization",
      "Real-time defect prediction on test images",
      "Training and validation with precision, recall, F1-score, and mAP analysis",
      "Automated overlay generation for defect localization",
    ],
    category: "Computer Vision / Deep Learning",
  },
  {
    title: "Admission Management System",
    description: "A comprehensive system for managing student admissions, applications, and enrollment processes.",
    fullDescription:
      "A complete admission management system designed for educational institutions. The system handles the entire admission lifecycle from application submission to enrollment. Features include online applications, document management, payment processing, and administrative dashboards.",
    image:
      "https://blogger.googleusercontent.com/img/a/AVvXsEjtwp3qDUzFmk7FxCk22es1XudU5gXTfo83pE-roIOFeOAkaNpPwGxXcK8bj3CCDuxu_VUJAXV61SPxIeqD2wnHgWNapuVDT1Oktqv8hYZYO6--zgmpOG1i_W2SD7rPVAFh5DEgVeJOzVrL1i3hDPznz-S-C0d9x-015t73uoHN3_jPXAQMhDgCzfClEYc6",
    link: "https://admissionmanagement.netlify.app/",
    github: "https://github.com/Sabari-Vasan-SM/Admisssion-management.git",
    technologies: ["React", "Node.js", "Express", "Payment Gateway", "PDF Generation"],
    features: [
      "Online application forms",
      "Document upload and verification",
      "Payment processing integration",
      "Application status tracking",
      "Administrative dashboards",
      "Automated notifications and emails",
    ],
    category: "Web",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const chromaItems = useMemo(
    () =>
      projects.map((project, index) => ({
        image: project.image,
        title: project.title,
        subtitle: project.description,
        handle: project.technologies.slice(0, 3).join(" • "),
        borderColor:
          ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#D97706", "#14B8A6"][index % 8],
        gradient:
          [
            "linear-gradient(145deg, #3B82F6, #000)",
            "linear-gradient(180deg, #10B981, #000)",
            "linear-gradient(165deg, #F59E0B, #000)",
            "linear-gradient(195deg, #EF4444, #000)",
            "linear-gradient(225deg, #8B5CF6, #000)",
            "linear-gradient(135deg, #06B6D4, #000)",
            "linear-gradient(145deg, #D97706, #000)",
            "linear-gradient(160deg, #14B8A6, #000)",
          ][index % 8],
        url: project.link,
        projectData: project,
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
          className="relative h-[430px] md:h-[460px]"
        >
          <ChromaGrid
            items={chromaItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            onCardClick={(project) => setSelectedProject(project)}
          />
        </motion.div>
      </div>

      <ProjectPreviewModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default ProjectsSection;
