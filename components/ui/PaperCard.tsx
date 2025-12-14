"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PaperCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function PaperCard({ children, className = "", hover = true }: PaperCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hover ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
            className={`bg-white rounded-lg shadow-md border border-stone-200 transition-all ${className}`}
        >
            {children}
        </motion.div>
    );
}
