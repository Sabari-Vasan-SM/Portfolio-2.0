import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const MIN_BOOT_DURATION = 3000;

const BootLoader = ({ progress }: { progress: number }) => {
    return (
        <motion.div
            aria-live="polite"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="absolute inset-0 scanline opacity-60" />
            <div className="absolute inset-0 noise-bg opacity-80" />

            <div className="absolute left-4 top-4 max-w-[min(92vw,420px)] font-mono text-[clamp(0.46rem,0.95vw,0.72rem)] leading-relaxed tracking-[0.14em] text-[#d6d6d6] sm:left-6 sm:top-6 md:max-w-[460px]">
                <div className="space-y-2">
                    {[
                        ">01  INITIALIZING NEURAL NET ...",
                        ">02  LOADING PROTOCOL: GHOST",
                        ">03  MEMORY CHECK: 128PB OK",
                        ">04  SECURITY: BYPASSED",
                        ">05  LOCATING TARGET ...",
                        ">06  TARGET LOCKED",
                        ">07  MODE: STEALTH",
                        ">08  ACCESS GRANTED // ENTER",
                    ].map((line, index) => (
                        <motion.p
                            key={line}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                            className="whitespace-pre text-shadow-[0_0_6px_rgba(255,255,255,0.14)]"
                        >
                            <span className="text-[#7a7a7a]">&gt;</span>
                            <span className="text-[#9f9f9f]">{String(index + 1).padStart(2, "0")}</span>
                            <span className="ml-3 sm:ml-4">{line.slice(4)}</span>
                        </motion.p>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <div className="h-0.5 flex-1 overflow-hidden bg-white/10">
                        <motion.div
                            className="h-full bg-white/75"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.12, ease: "linear" }}
                        />
                    </div>
                    <span className="min-w-10 text-right text-[0.62rem] tracking-[0.22em] text-white/70">{Math.round(progress)}%</span>
                </div>
            </div>

            <motion.div
                className="relative w-full max-w-md px-6 text-center"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
            >
                <div className="mb-8 inline-flex items-center gap-3 terminal-border bg-card/70 px-5 py-3 text-xs uppercase tracking-[0.35em] text-terminal-green backdrop-blur-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-terminal-green shadow-[0_0_12px_hsl(0_0%_100%_/_0.35)] animate-pulse" />
                    Booting portfolio
                </div>

                <div className="terminal-border bg-black/40 p-6 backdrop-blur-sm">
                    <p className="mb-2 text-xs tracking-[0.4em] text-terminal-dim">LOADING EXPERIENCE</p>
                    <p className="text-2xl font-bold text-terminal-green text-glow">SabariVasan</p>
                    <p className="mt-3 text-sm text-terminal-cyan">Preparing interface, assets, and interactions...</p>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {[0, 1, 2, 3].map((index) => (
                            <motion.span
                                key={index}
                                className="h-2.5 w-8 border border-terminal-green/40 bg-terminal-green/10"
                                animate={{ opacity: [0.25, 1, 0.25], scaleY: [0.85, 1.15, 0.85] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.15,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <p className="mt-4 text-[0.7rem] tracking-[0.3em] text-terminal-dim">PLEASE WAIT</p>
            </motion.div>
        </motion.div>
    );
};

const Root = () => {
    const [isBooting, setIsBooting] = useState(true);
    const [progress, setProgress] = useState(0);
    const [pageReady, setPageReady] = useState(document.readyState === "complete");
    const [minimumElapsed, setMinimumElapsed] = useState(false);

    useEffect(() => {
        const startTime = window.performance.now();
        let frameId = 0;

        const updateProgress = () => {
            const elapsed = window.performance.now() - startTime;
            const nextProgress = Math.min(100, (elapsed / MIN_BOOT_DURATION) * 100);
            setProgress(nextProgress);

            if (elapsed >= MIN_BOOT_DURATION) {
                setMinimumElapsed(true);
                setProgress(100);
                return;
            }

            frameId = window.requestAnimationFrame(updateProgress);
        };

        frameId = window.requestAnimationFrame(updateProgress);

        const onLoad = () => {
            setPageReady(true);
        };

        if (document.readyState === "complete") {
            setPageReady(true);
        } else {
            window.addEventListener("load", onLoad);
        }

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("load", onLoad);
        };
    }, []);

    useEffect(() => {
        if (pageReady && minimumElapsed) {
            setIsBooting(false);
            window.dispatchEvent(new Event("app-booted"));
        }
    }, [minimumElapsed, pageReady]);

    return (
        <>
            <AnimatePresence>{isBooting && <BootLoader progress={progress} />}</AnimatePresence>
            <div className={isBooting ? "pointer-events-none opacity-0" : "opacity-100 transition-opacity duration-300"}>
                <App />
            </div>
        </>
    );
};

createRoot(document.getElementById("root")!).render(<Root />);
