import React, { useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        image: string;
        description: string;
        fullDescription: string;
        technologies: string[];
        features: string[];
        link: string;
        github: string;
        category: string;
    } | null;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ isOpen, onClose, project }) => {
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

    if (!project) return null;

    return (
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
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-background border border-terminal-dim/30 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Header with Close Button */}
                            <div className="sticky top-0 bg-background border-b border-terminal-dim/20 p-6 flex items-start justify-between">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</h2>
                                <button
                                    onClick={onClose}
                                    className="ml-4 p-2 hover:bg-terminal-dim/20 rounded-lg transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={20} className="text-muted-foreground" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Project Image */}
                                <div className="w-full rounded-lg overflow-hidden border border-terminal-dim/20">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* Category Badge */}
                                <div className="flex gap-2 flex-wrap">
                                    <span className="inline-block px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-xs font-semibold">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-terminal-dim/20 text-terminal-dim text-xs rounded hover:bg-terminal-dim/40 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                {project.features && project.features.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-terminal-green mt-1">→</span>
                                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green rounded-lg transition-colors font-medium text-sm md:text-base"
                                    >
                                        <ExternalLink size={16} />
                                        Visit Live Project
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-terminal-dim/20 hover:bg-terminal-dim/40 text-terminal-dim rounded-lg transition-colors font-medium text-sm md:text-base"
                                    >
                                        <Github size={16} />
                                        View Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectPreviewModal;
