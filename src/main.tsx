import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import introVideo from "./assets/intro.mp4";

const CountdownButton = ({ onComplete }: { onComplete: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }
        
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [timeLeft, onComplete]);

    return (
        <motion.button
            onClick={(e) => {
                e.stopPropagation();
                onComplete();
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-mono text-xl tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/20 uppercase"
        >
            <span className="relative z-10 flex items-center gap-3">
                Open Site 
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-bold">{timeLeft}</span>
            </span>
            <motion.div 
                className="absolute left-0 top-0 bottom-0 z-0 bg-white/20"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
            />
        </motion.button>
    );
};

const VideoIntro = ({ onComplete }: { onComplete: () => void }) => {
    const [videoEnded, setVideoEnded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => {
                setIsPaused(true);
            });
        }
    }, []);

    const handleScreenClick = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().then(() => {
                setIsPaused(false);
            }).catch(() => {});
        }
    };

    return (
        <motion.div
            onClick={handleScreenClick}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black cursor-default"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <video
                ref={videoRef}
                src={introVideo}
                playsInline
                onEnded={() => setVideoEnded(true)}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {!videoEnded && (
                <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 flex items-center pointer-events-none">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onComplete();
                        }}
                        className="pointer-events-auto rounded-full border border-white/20 bg-black/40 px-6 py-2 font-mono text-sm tracking-wider text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white uppercase"
                    >
                        Skip Intro
                    </button>
                </div>
            )}

            <AnimatePresence>
                {isPaused && !videoEnded && (
                    <motion.div
                        className="absolute inset-x-0 bottom-16 z-10 flex justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="rounded-full bg-black/60 px-6 py-3 font-mono text-sm tracking-[0.2em] text-white/90 backdrop-blur-md border border-white/10 uppercase text-center"
                        >
                            Click anywhere to continue
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {videoEnded && (
                    <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CountdownButton onComplete={onComplete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Root = () => {
    const [isBooting, setIsBooting] = useState(true);

    const handleIntroComplete = () => {
        setIsBooting(false);
        window.dispatchEvent(new Event("app-booted"));
    };

    return (
        <>
            <AnimatePresence>{isBooting && <VideoIntro onComplete={handleIntroComplete} />}</AnimatePresence>
            <div className={isBooting ? "pointer-events-none fixed inset-0 opacity-0 overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
                <App />
            </div>
        </>
    );
};

createRoot(document.getElementById("root")!).render(<Root />);
