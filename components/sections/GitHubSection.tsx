"use client";

import { motion } from "framer-motion";
import { GitHubStats } from "@/components/github-stats";

export function GitHubSection() {
    return (
        <section id="github" className="section-padding bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        GitHub <span className="gradient-text">Activity</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Live statistics and contributions from my GitHub profile
                    </p>
                </motion.div>

                <GitHubStats />
            </div>
        </section>
    );
}
