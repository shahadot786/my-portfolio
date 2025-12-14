"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
    title?: string;
}

export function SectionDivider({ title }: SectionDividerProps) {
    return (
        <div className="relative my-12">
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"
            />
            {title && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-4"
                >
                    <span className="text-sm font-medium text-stone-500">{title}</span>
                </motion.div>
            )}
        </div>
    );
}
