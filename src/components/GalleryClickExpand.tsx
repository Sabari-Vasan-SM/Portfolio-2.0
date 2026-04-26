import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryItem {
    id: string;
    title: string;
    issuer: string;
    year: string;
    description: string;
    col?: string;
    img: string;
}

interface GalleryClickExpandProps {
    items: GalleryItem[];
    backgroundColor?: string;
    emptySlotText?: string;
}

const GalleryClickExpand: React.FC<GalleryClickExpandProps> = ({
    items,
    backgroundColor = "#18181b",
    emptySlotText = "Empty",
}) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedItem = items.find((item) => item.id === selectedId);

    return (
        <div className="w-full rounded-2xl p-3 md:p-6" style={{ backgroundColor }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full h-[620px] md:h-[700px] auto-rows-[150px] overflow-y-auto pr-1">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => item.img && setSelectedId(item.id)}
                        className={`relative rounded-2xl overflow-hidden ${item.img ? "cursor-pointer group" : ""} ${item.col ?? "col-span-1 row-span-1"}`}
                        style={{
                            backgroundColor: item.img ? "transparent" : "#27272a",
                            border: item.img ? "none" : "1px solid rgba(255,255,255,0.05)",
                        }}
                        whileHover={item.img ? { scale: 1.015 } : undefined}
                        transition={{ type: "spring", stiffness: 360, damping: 36 }}
                    >
                        {item.img ? (
                            <>
                                <motion.img
                                    src={item.img}
                                    className="w-full h-full object-cover"
                                    style={{ filter: "brightness(0.72)" }}
                                    alt={item.title}
                                />

                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

                                <div
                                    className="absolute bottom-0 left-0 right-0 h-24"
                                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
                                />

                                <motion.div layout="position" className="absolute bottom-4 left-4 md:left-5 right-4">
                                    <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 mb-1">
                                        {String(index + 1).padStart(2, "0")} • {item.year}
                                    </p>
                                    <h3
                                        className="font-bold text-white text-sm md:text-lg leading-tight line-clamp-2"
                                        style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
                                    >
                                        {item.title}
                                    </h3>
                                </motion.div>

                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                        <path
                                            d="M1.5,1.5 L9.5,1.5 L9.5,9.5 M9.5,1.5 L1.5,9.5"
                                            stroke="white"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-zinc-600 text-sm font-mono">{emptySlotText}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedItem && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={selectedId}
                            initial={{ opacity: 0, y: 18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                <div className="h-[260px] md:h-full">
                                    <img
                                        src={selectedItem.img}
                                        className="w-full h-full object-cover"
                                        style={{ filter: "brightness(0.72)" }}
                                        alt={selectedItem.title}
                                    />
                                </div>

                                <div className="p-6 md:p-8 overflow-y-auto">
                                    <p className="text-xs font-mono tracking-[0.18em] uppercase text-white/50 mb-3">
                                        {selectedItem.year} • {selectedItem.issuer}
                                    </p>
                                    <h2
                                        className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight"
                                        style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
                                    >
                                        {selectedItem.title}
                                    </h2>
                                    <p className="text-white/75 text-base md:text-lg mt-5 leading-relaxed">
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
                                aria-label="Close certificate preview"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1,1 L11,11 M11,1 L1,11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryClickExpand;
