import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TextRollProps = {
    children: ReactNode;
};

export const TextRoll = ({ children }: TextRollProps) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-block"
        >
            {children}
        </motion.span>
    );
};
