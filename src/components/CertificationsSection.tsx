import { motion, useInView, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import ScrollFloat from "@/components/ScrollFloat";
import Stack from "@/components/Stack";
import { X } from "lucide-react";
import CarouselTravelCards from "@/components/CarouselTravelCards";

const certificationsData = [
  {
    id: 'cert-1',
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB',
    year: '2025',
    description: 'The MongoDB Associate Developer Certificate proves your ability to build and manage applications using MongoDB. It highlights your skills in schema design, querying, and performance optimization.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEi2weDcawnTqAAackNyJj0CboNfvXpKDMQT-VksC5C9gmYDfIp8G8NvI3HX2Uzf2EQhMe3JvglRoVbwV4q4UQ1RlWLNmzuH05CMXaVXZOdZhtWPDmYXxDNGwNabSjrlsecsmALm2bbDgxb0UIk-VVZqgD50PG65rx3yW4HYxowZ44c9JSgkWDQz_HkvA0qp',
  },
  {
    id: 'cert-google-gemini',
    title: 'Gemini Certified Student',
    issuer: 'Google for Education',
    year: '2025',
    description: 'Earned the Gemini Certified Student credential for demonstrating the essential knowledge, skills, and foundational competencies required to use Google AI effectively in academic and practical applications. Certification valid through 2028.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEilN7gAIKA-LWoQFPeCgfhCKdSZOK3KtEpC7nimgb1dCXKhkCZ7T0-xSRJwuI2Thrw2XpFhr0v6jtlzU3yCCCPN7n74D0LhPEQ6H93nnGkIC0lSSKLniERw-h5aNHcwwZRvpFt1ugu-dTispgIBTUAp50BfptFbZwFBMe4LliGCk-TC5AlYLASOQWaaq_yB'
  },
  {
    id: 'cert-2',
    title: 'React JS Certification',
    issuer: 'Udemy',
    year: '2025',
    description: 'React.js Beginner to Expert is a journey from understanding basic concepts like components, props, and state to mastering advanced topics such as hooks, context API, routing, performance optimization, and state management with Redux. It equips you to build scalable, dynamic, and production-ready web applications.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEi0NXnHhMWH77au5025-KJxjSJAwz9o7jXwNz8SHuyK0tpPVkeQkPiHTYbQ_KMxq0T7AG2EHVkSruLxc_ZQPHE-qc7XIV-XsIjSiljeANc5x4J2wUJKa6Jpo9w91U_R6wt-EJb7w_wKn4KsvyhDFc9oDDn5tfR3R3d3Vgan9n0rDYy-S5nRTKKnEFiPwM4H',
  },
  {
    id: 'cert-3',
    title: 'AWS Essentials',
    issuer: 'Udemy',
    year: '2025',
    description: 'AWS Essentials covers the core concepts of Amazon Web Services, including cloud computing fundamentals, key services like EC2, S3, and RDS, and basics of security, networking, and pricing. It helps you understand how to deploy and manage scalable cloud solutions on AWS.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEjYCenZQCu1fphUEUmHSOZKM7gtnxhzzdBo6njSWdQWHp6SLJyPT7f2I4Ecl2iDbCjqC5xCqWoWlx4Te9pX_9UNihZobPpjlI2ZXcI4K-7bG1Hwl4sPRuAoqgZp9WhyJkqbQAq8DDAvZo10saqK8RBTqpGWpIS7IBbGsQydQYrohcjUZniHLShCu6L4O2FN',
  },
  {
    id: 'cert-4',
    title: 'Prompt Engineering for Developers',
    issuer: 'Udemy',
    year: '2025',
    description: 'This journey sharpened my skills in crafting killer prompts, leveraging AI models like a pro, and embedding prompt engineering into real-world dev workflows.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgGvVBfR0jCduTYXkHA3puSaa5xD-zlEgcJgWxJilzNjENaIT-cWdZDIzsG7BFRV2rMhw2xYSZx_LzyKabZYNhG9b74v5sR5XC91JtykhRkJpEb-n7oHoI8gzh45WIQPiyQdnDmbQHvKQmwH7Ea4flOyVNlcVaX2N_qul_djSpJmwUe-C-9_MDzrpZFDi4g',
  },
  {
    id: 'cert-5',
    title: 'Foundations of Git',
    issuer: 'GitKraken',
    year: '2024',
    description: 'Successfully completed GitKraken\'s Foundations of Git certification, gaining strong hands-on knowledge of Git version control, including repositories, branching, merging, commits, and real-world collaboration workflows.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEiPug72_GIaoY81oZ5zq8kUkEbwONtx973qLitBD9FFZdRWb8_bztKRMzxz5Xn1lDE1g8gagpIyZRg44tJmocNxib2ak1B30bevRJ8BxqRkDjH9lUsFfYWc331mabD0E7FSTxvh3RdLVaOqaSEprE9UCROeFyL-bv7aYHIZTjPaTcv7HPX2Mmc4gXvVxAGz'
  },
  {
    id: 'cert-6',
    title: 'Agile Fundamentals',
    issuer: 'GUVI | HCL (in collaboration with Google for Education)',
    year: '2024',
    description: 'Successfully completed the Agile Fundamentals course, gaining knowledge of Agile principles, iterative workflows, and team collaboration practices.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgmS4c-Tv6eNa3lFNceCtZupUFy7o-d7GDB4cok6CStdfc6A7PlEmf5er-pEz7OtQULxnp7kDKUAGZ1QQjA9-QjfxvpBHd1yebrKmWpBN9C7pGO9VvNiaKvceRHTxwgkOKLWIgiLJQlQbD0d42z_qiX8PWWfzh94XEC9EV0MyNz4WIeucEZ987Vl2Y8y0KS'
  },
  {
    id: 'cert-7',
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    year: '2026',
    description: 'Covers the foundational concepts of AI, including how modern AI systems work, key terminology, ethical considerations, and practical frameworks for understanding and applying AI in real-world scenarios.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEiM07RoGJZAWmnHB4rA1cHydq190x0Ti08l53KCTxgcYyDWcw0PZwVpJtWbv9sO3DAjQwsZRyXwizxq-ezd3BBjZGLPs4XOTDqdq9k5JY1g2vDk_BZ8_1kbNOBTyJTYEELhwrHQkbBzrlIbmvrkG2U2gKHd5FSQQXaODjjYXRN7sa0nAChq6mHDv1JlWNST',
  },
  {
    id: 'cert-8',
    title: 'Vibe Coding Camp: GitHub Copilot, Cursor, Lovable, Windsurf',
    issuer: 'Udemy',
    year: '2026',
    description: 'Hands-on course exploring modern AI-powered developer tools like GitHub Copilot, Cursor, Lovable, and Windsurf to boost productivity, automate coding tasks, and improve development workflows.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgRHbBsNNDKDptUiONNA17sx0mR1LUW4mR85eOBCZH1HqJbHEcocgm4uDZsItBJ3PMKmWMLnEzWu6jvrYxBowcIqUZv0NOKhTlnMAk4vS-mOJ51PDp3bvb0BK4eWu8Z4WZE1PBM-0hQFpBFQsEqJFozTQ2usm5t8wqUMJro3Tg5tbCEsiJUqcLzIarSf1J6',
  },
  {
    id: 'cert-9',
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    year: '2026',
    description: 'Introduces the Model Context Protocol (MCP), explaining how AI systems manage context, interact with tools, and maintain structured communication between models and external systems.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgoNT2YYp3gGq5aUW8PVck3JQJvv_f8f8h9cjXzr-4ncW746gNZDXwbqz4uwE20fjgghPO_t6qjsA0DrbMF5PFItWhDs7jOp0sV-XUZWBxKHnXb7aeAkprdj70SFUI7-gdmap8I5YuJK4AyDYhivk0f7Hd0TgkxcVntutS_DCDDoJPmIRJ3kHOpFhsC3bs9',
  },
  {
    id: 'cert-10',
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    year: '2026',
    description: 'Designed for students to understand AI basics, practical usage, and responsible adoption. Focuses on real-world applications, productivity, and foundational AI literacy.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgRKiG5TaUcYvwJA2e_1giTogUFjSQgJQTi8cR9ldVVHhn6mgUKh_8H3zni83u80D_JLTPm4XgdII8Y5r61T3FvANd1Yl80_lQw860XPmW2QxmBdWRZyAUu93YFcxu1wz28_X06IoPVcmHi92UxtKD26old-EWHebKb2YdFo-HaUwbyKp1fLF6MS-XSVLsN',
  },
  {
    id: 'cert-11',
    title: 'Flutter Masterclass - Your Complete Guide to App Development',
    issuer: 'Udemy',
    year: '2026',
    description: 'Comprehensive Flutter course covering UI development, state management, API integration, and building cross-platform mobile applications with production-ready practices.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEh7Vm_wy5UlR5ug0mBSQVude9DI2CaMjg9DIIDdFVMhECM57-SfGWNdvZVGklEKgoKJcwl3iDL02DU-JGCCYle_8rMqdsyEOBZCvCLF7KkEwsAkUjMB79Z1g_n4xvFNW0rSH4jpmEcdjWBuuG2wobe_7tMPTt7zG5Gph_MBzCQttkSHUWN31xujUohbrMIH',
  },
  {
    id: 'cert-12',
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    year: '2026',
    description: 'A structured introduction to AI concepts tailored for learners, focusing on practical understanding, safe usage, and how AI tools can enhance learning and productivity.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEjQm0XPF2BI06cOKh5FpQaGf0kPn6sIm4_RlOyYU15zPPmf_wnanFWk1DxIYW6eoaroiOqTAYqinOr5KFV865GlqrUdgXS1BAkT3iQ6xZfxZn8JGLXbdwhx-AZW6dbfz9S-DvSN2vDHkveiaVTCAXL1BpWuIPkr7HIPlepestrFQx4THSsW0fd21N88Eedv',
  },
];

const achievements = [
  {
    title: "International Conference Paper Presentation",
    description: "Presented research paper on Automated Fault Diagnosis of Gear Tooth Defects Using Deep Learning at International Conference on Power Control & Computing Technologies '25, Sona College of Technology",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEjSEXp-IOpTwwLyw9r3i348wREt86-XUE7Fb1pQXJAujs-a1QIw_C3iMuMITFie6xQI9k95R_YfC7ppKbfMwlfIzn7maEVV4vQWZa2A1F6cpix9jPM1BaHiUVCHFCX8n8fA2G9qOJB2IRkT3cnu_J1KVDK3sxngaW6T-CY5NlftXpxKjteNAei70RxpYLTD",
    type: "presentation",
    date: "2024",
  },
  {
    title: "Selected for Hackathon",
    description: "Successfully selected to participate in a prestigious Smart India Hackathon competition, showcasing innovative problem-solving skills and technical expertise.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEjlWLD7CS-1icpArKaIpafXYIyqYhIdNqZHhFnhumN7Bs6GsjVNC8qDPVUDUvH8v0lCOk8GNdMrbT7mWCWHdSXJGjyJ7DvYTPBBY2oh_incFZWbmn60jHKAzh1DuTwN16SCRY8MA--Ei4KI-gG3gyPjgeT7-WVEXLEnKg0AGxbuj9uWmBNcDYXZm-P_5jP-",
    type: "selection",
    date: "2024",
  },
  {
    title: "2nd Prize in Hackathon",
    description: "Achieved second place in a competitive hackathon, demonstrating exceptional coding skills and innovative solution development.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEiYF-9n9ZgwFYNUzkvDRKorPpDAQBLCifbvcL1E6-l6eUywOlV7C-4zz29-5hWHYZti3IEGGdmUocuXRZJ8q5KrSsrmGw1l1E-mzy86l6RkiLmIdrRMWiqM-n9j540fOE5rfnU5-m9K-czZQ9aJpjdKOqD0DFaF-u-FQ5vr6s6OiD64JHn9XQFlIwpL2BPo",
    type: "prize",
    date: "2024",
  },
  {
    title: "MongoDB Certificate",
    description: "Successfully completed MongoDB certification, mastering database design, querying, and advanced database management techniques.",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEi2weDcawnTqAAackNyJj0CboNfvXpKDMQT-VksC5C9gmYDfIp8G8NvI3HX2Uzf2EQhMe3JvglRoVbwV4q4UQ1RlWLNmzuH05CMXaVXZOdZhtWPDmYXxDNGwNabSjrlsecsmALm2bbDgxb0UIk-VVZqgD50PG65rx3yW4HYxowZ44c9JSgkWDQz_HkvA0qp",
    type: "certificate",
    date: "2024",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const certificationCards = useMemo(
    () =>
      certificationsData.map((cert) => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        year: cert.year,
        image: cert.image,
        description: cert.description,
      })),
    [],
  );

  const achievementCards = useMemo(
    () =>
      achievements.map((a, index) => (
        <div key={`${a.title}-${index}`} className="h-full w-full bg-card p-6 md:p-8 flex flex-col relative">
          {/* Small Image - Top Right Corner */}
          <div
            className="absolute top-4 right-4 w-20 h-20 rounded-lg overflow-hidden border border-terminal-dim/20 cursor-pointer hover:border-terminal-green/50 transition-all hover:shadow-lg hover:shadow-terminal-green/20"
            onClick={() => setSelectedImage(a.image)}
          >
            <img
              src={a.image}
              alt={a.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 pr-4">
            <p className="text-[10px] text-terminal-dim tracking-widest uppercase mb-2">Recognition - Year</p>
            <p className="text-2xl font-bold text-terminal-green text-glow">{a.date}</p>

            <p className="text-[10px] px-2 py-1 inline-block bg-terminal-amber/10 text-terminal-amber tracking-widest uppercase font-semibold rounded">
              {a.type}
            </p>

            <h3 className="text-base md:text-lg font-semibold text-foreground">{a.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
          </div>

          <div className="mt-5 pt-3 border-t border-border/60">
            <p className="text-[10px] text-terminal-dim tracking-widest uppercase mb-1">Achievement Type</p>
            <p className="text-xs text-terminal-green font-medium capitalize">{a.type}</p>
          </div>
        </div>
      )),
    [],
  );

  return (
    <section id="certifications" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>credentials
          </p>
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Certifications
          </ScrollFloat>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="mb-20 w-full"
        >
          <CarouselTravelCards items={certificationCards} accentColor="#6b7280" />
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>achievements
          </p>
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Recognition
          </ScrollFloat>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
          className="mx-auto h-[420px] w-full max-w-2xl"
        >
          <Stack
            randomRotation={false}
            sensitivity={200}
            sendToBackOnClick
            cards={achievementCards}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={false}
          />
        </motion.div>

        {/* Image Modal Popup */}
        <AnimatePresence>
          {selectedImage && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setSelectedImage(null)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-3xl w-full max-h-[90vh]">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 p-2 hover:bg-terminal-dim/20 rounded-lg transition-colors z-50"
                    aria-label="Close modal"
                  >
                    <X size={24} className="text-terminal-green" />
                  </motion.button>

                  {/* Image */}
                  <img
                    src={selectedImage}
                    alt="Achievement"
                    className="w-full h-full object-contain rounded-lg border border-terminal-green/30"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificationsSection;
