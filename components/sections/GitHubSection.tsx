"use client";

import { motion } from "framer-motion";
import { GitHubStats } from "@/components/github-stats";

export function GitHubSection() {
    return (
        <section id="github" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block"
                    >
                        Activity
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        GitHub <span className="gradient-text">Ecosystem</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real-time visualization of architectural contributions and
                        open-source laboratory activity.
                    </p>
                </motion.div>

                <div className="futuristic-card p-4 sm:p-8 bg-secondary/20 border-dashed border-primary/20">
                    <GitHubStats />
                </div>
            </div>
        </section>
    );
}
