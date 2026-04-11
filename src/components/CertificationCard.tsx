import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CertificationCardProps {
    cert: {
        id: string;
        title: string;
        issuer: string;
        year: string;
        description: string;
        image: string;
    };
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Card */}
            <motion.div
                className="terminal-border bg-card p-6 h-full cursor-pointer transition-all"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(true)}
            >
                <p className="text-[11px] tracking-widest text-terminal-dim mb-3">{cert.year}</p>
                <h3 className="text-xl font-bold text-foreground leading-tight mb-3">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>

                {/* Hover Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="flex items-center gap-2 text-terminal-green text-xs mt-auto pt-4 border-t border-border/50"
                >
                    <span>View Details</span>
                    <span>→</span>
                </motion.div>
            </motion.div>

            {/* Centered Modal Popup */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
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
                            <div className="bg-background border border-terminal-dim/30 rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
                                {/* Header */}
                                <div className="sticky top-0 bg-background border-b border-terminal-dim/20 p-6 flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-xs text-terminal-dim tracking-widest mb-2">CERTIFICATE</p>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{cert.title}</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="ml-4 p-2 hover:bg-terminal-dim/20 rounded-lg transition-colors flex-shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <X size={20} className="text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {/* Certificate Image */}
                                    <div className="w-full rounded-lg overflow-hidden border border-terminal-dim/20">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-auto object-cover max-h-96"
                                        />
                                    </div>

                                    {/* Issuer and Year Badge */}
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-block px-3 py-1.5 bg-terminal-green/20 text-terminal-green rounded text-xs font-semibold">
                                            {cert.issuer}
                                        </span>
                                        <span className="inline-block px-3 py-1.5 bg-terminal-dim/20 text-terminal-dim rounded text-xs font-semibold">
                                            {cert.year}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">About this Certification</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                            {cert.description}
                                        </p>
                                    </div>

                                    {/* Certificate Details Footer */}
                                    <div className="pt-4 border-t border-border/30">
                                        <p className="text-xs text-terminal-dim tracking-widest uppercase mb-2">Credential Details</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-terminal-dim mb-1">Issuer</p>
                                                <p className="text-sm font-medium text-foreground">{cert.issuer}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-terminal-dim mb-1">Year Earned</p>
                                                <p className="text-sm font-medium text-foreground">{cert.year}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CertificationCard;
