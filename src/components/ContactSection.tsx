import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import { toast } from "@/components/ui/sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gmailComposeBase = "https://mail.google.com/mail/?view=cm&fs=1&to=sabarivasan1239@gmail.com";
  const formspreeEndpoint = "https://formspree.io/f/xjkrokoj";

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/Sabari-Vasan-SM", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sabarivasan-s-m-b10229255/", icon: Linkedin },
    { label: "Email", href: gmailComposeBase, icon: Mail },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Hola, your message has been sent to Sabarivasan. Kindly wait for his response.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-terminal-dim text-xs tracking-widest mb-2">
            <span className="text-terminal-green">~/</span>contact
          </p>
          <ScrollFloat
            containerClassName="text-3xl md:text-4xl font-bold mb-10 text-foreground"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Get In Touch
          </ScrollFloat>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>

            {[
              { label: "Email", value: "sabarivasan1239@gmail.com", href: gmailComposeBase, newTab: true },
              { label: "Phone", value: "+91 9677465071", href: "tel:+919677465071" },
              { label: "Location", value: "Erode, Tamil Nadu, India", href: undefined },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-4 terminal-border bg-card group hover:border-terminal-green/30 transition-all"
              >
                <span className="text-[10px] text-terminal-dim tracking-widest uppercase block mb-1">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-terminal-green hover:text-glow transition-all cursor-none"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm text-foreground">{item.value}</span>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-1"
            >
              <p className="text-[10px] text-terminal-dim tracking-widest uppercase mb-3">
                Connect
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 terminal-border bg-card hover:border-terminal-green/40 hover:bg-terminal-green/5 transition-all cursor-none"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center border border-terminal-green/35 bg-background text-terminal-green">
                        <Icon size={14} />
                      </span>
                      <span className="text-xs text-muted-foreground">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Terminal-style form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="p-6 terminal-border bg-card"
          >
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/60" />
              <span className="text-[10px] text-muted-foreground ml-2">send_message.sh</span>
            </div>

            {["name", "email", "message"].map((field) => (
              <div key={field} className="mb-4">
                <label className="text-[10px] text-terminal-dim tracking-widest uppercase block mb-2">
                  <span className="text-terminal-green">$</span> {field}
                </label>
                {field === "message" ? (
                  <textarea
                    rows={4}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-background p-3 text-sm text-foreground outline-none transition-all cursor-none resize-none ${focused === field ? "terminal-border border-terminal-green/40" : "terminal-border"
                      }`}
                    required
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-background p-3 text-sm text-foreground outline-none transition-all cursor-none ${focused === field ? "terminal-border border-terminal-green/40" : "terminal-border"
                      }`}
                    required
                  />
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className="w-full py-3 bg-terminal-green/10 text-terminal-green terminal-border text-sm tracking-widest uppercase hover:bg-terminal-green/20 transition-colors cursor-none"
            >
              <span className="text-terminal-dim">[</span> {isSubmitting ? "Sending..." : "Execute Send"} <span className="text-terminal-dim">]</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
