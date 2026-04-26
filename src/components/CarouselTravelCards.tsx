import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CertificateItem {
    id: string;
    image: string;
    title: string;
    issuer: string;
    year: string;
    description?: string;
}

interface CarouselTravelCardsProps {
    items: CertificateItem[];
    defaultActive?: number;
    accentColor?: string;
}

const getCardProps = (distance: number, isMobile: boolean) => {
    const sideOffset = isMobile ? 190 : 330;
    const farOffset = isMobile ? 240 : 430;

    if (distance === 0) {
        return {
            scale: 1.05,
            x: 0,
            opacity: 1,
            zIndex: 20,
            boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
        };
    }
    if (Math.abs(distance) === 1) {
        return {
            scale: 0.86,
            x: distance * sideOffset,
            opacity: 0.85,
            zIndex: 10,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
        };
    }
    return { scale: 0.7, x: distance * farOffset, opacity: 0, zIndex: 0, boxShadow: "none" };
};

export const CarouselTravelCards: React.FC<CarouselTravelCardsProps> = ({
    items,
    defaultActive = 0,
    accentColor = "#6b7280",
}) => {
    const [active, setActive] = useState(defaultActive);
    const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const total = items.length;

    const goNext = () => setActive((prev) => (prev + 1) % total);
    const goPrev = () => setActive((prev) => (prev - 1 + total) % total);

    useEffect(() => {
        if (total <= 1 || selectedCertificate) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActive((prev) => (prev + 1) % total);
        }, 2000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [total, selectedCertificate]);

    useEffect(() => {
        const updateViewport = () => {
            setIsMobile(window.innerWidth < 768);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);

        return () => {
            window.removeEventListener("resize", updateViewport);
        };
    }, []);

    if (!items.length) {
        return null;
    }

    const cardWidth = isMobile ? 320 : 520;
    const cardHeight = isMobile ? 220 : 350;
    const carouselHeight = isMobile ? 390 : 600;

    return (
        <div className="relative w-full flex flex-col items-center justify-center select-none" style={{ padding: "48px 0 48px" }}>
            <div className="relative flex items-center justify-center w-full" style={{ height: carouselHeight, overflow: "visible" }}>
                {items.map((item, index) => {
                    const distance = ((index - active + total) % total + total) % total;
                    const normalizedDistance = distance > total / 2 ? distance - total : distance;
                    const props = getCardProps(normalizedDistance, isMobile);

                    if (Math.abs(normalizedDistance) > 1) {
                        return null;
                    }

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute overflow-hidden"
                            animate={{
                                scale: props.scale,
                                x: props.x,
                                opacity: props.opacity,
                                zIndex: props.zIndex,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 32 }}
                            onClick={() => setSelectedCertificate(item)}
                            style={{
                                width: cardWidth,
                                height: cardHeight,
                                borderRadius: 14,
                                cursor: "pointer",
                                boxShadow: props.boxShadow,
                                border:
                                    normalizedDistance === 0
                                        ? `2.5px solid ${accentColor}`
                                        : "1.5px solid rgba(148,163,184,0.45)",
                                background: "#f8fafc",
                            }}
                        >
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain bg-white" draggable={false} />

                            <div
                                className="absolute inset-0 flex flex-col justify-end"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 55%, transparent 80%)",
                                    padding: "16px 14px",
                                }}
                            >
                                <p className="text-white font-bold text-lg md:text-xl leading-tight mb-2 line-clamp-2">{item.title}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs md:text-sm text-white/90 font-medium">{item.year}</span>
                                    <span className="text-xs md:text-sm text-white/80">{item.issuer}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex items-center gap-6 mt-8">
                <button
                    onClick={goPrev}
                    className="flex items-center justify-center rounded-full transition-all"
                    style={{
                        width: 42,
                        height: 42,
                        background: "#ffffff",
                        border: "1.5px solid #d1d5db",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                    aria-label="Previous certificate"
                >
                    <ChevronLeft size={20} color="#374151" />
                </button>

                <div className="flex items-center gap-2">
                    {items.map((item, index) => (
                        <motion.button
                            key={item.id}
                            onClick={() => setActive(index)}
                            className="rounded-full"
                            animate={{
                                width: index === active ? 20 : 7,
                                height: 7,
                                backgroundColor: index === active ? accentColor : "#d1d5db",
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            aria-label={`Go to certificate ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goNext}
                    className="flex items-center justify-center rounded-full transition-all"
                    style={{
                        width: 42,
                        height: 42,
                        background: "#ffffff",
                        border: "1.5px solid #d1d5db",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                    aria-label="Next certificate"
                >
                    <ChevronRight size={20} color="#374151" />
                </button>
            </div>

            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCertificate(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ duration: 0.22 }}
                            className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-700 overflow-hidden"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="bg-white p-4 md:p-6 flex items-center justify-center">
                                    <img
                                        src={selectedCertificate.image}
                                        alt={selectedCertificate.title}
                                        className="w-full h-[280px] md:h-[320px] object-contain rounded-md bg-white"
                                    />
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-400 mb-3">
                                        {selectedCertificate.year} • {selectedCertificate.issuer}
                                    </p>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                        {selectedCertificate.title}
                                    </h3>
                                    {selectedCertificate.description ? (
                                        <p className="text-zinc-300 text-base md:text-lg mt-5 leading-relaxed">
                                            {selectedCertificate.description}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                                aria-label="Close certificate details"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarouselTravelCards;
