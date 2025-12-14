"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="border-b border-gray-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container-custom py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <div className="container-custom py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
                            <Shield size={32} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Privacy <span className="gradient-text">Policy</span>
                        </h1>
                        <p className="text-gray-400">Last updated: December 14, 2024</p>
                    </div>

                    {/* Content */}
                    <div className="glass-card p-8 md:p-12 space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                            <p className="leading-relaxed">
                                Welcome to MD. Shahadot Hossain's portfolio website. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website or use the contact form and AI chat features.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Information I Collect</h2>
                            <h3 className="text-xl font-semibold text-white mb-3">Contact Form</h3>
                            <p className="leading-relaxed mb-4">
                                When you use the contact form, I collect:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Your name</li>
                                <li>Email address</li>
                                <li>Subject and message content</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mb-3 mt-6">AI Chat Assistant</h3>
                            <p className="leading-relaxed mb-4">
                                When you interact with the AI chat:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Chat messages and conversation history (stored temporarily during your session)</li>
                                <li>No personal information is permanently stored</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>IP address (for security purposes)</li>
                                <li>Pages visited and time spent on the site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">How I Use Your Information</h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>To respond to your inquiries via the contact form</li>
                                <li>To provide AI-powered assistance about my portfolio</li>
                                <li>To improve website functionality and user experience</li>
                                <li>To analyze website traffic and usage patterns</li>
                                <li>To prevent fraud and ensure website security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                            <p className="leading-relaxed mb-4">
                                This website uses the following third-party services:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Resend</strong> - Email delivery service for contact form submissions</li>
                                <li><strong>Google Gemini AI</strong> - Powers the AI chat assistant</li>
                                <li><strong>GitHub API</strong> - Displays live repository statistics</li>
                                <li><strong>Vercel</strong> - Website hosting and analytics</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                These services have their own privacy policies governing their use of your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
                            <p className="leading-relaxed mb-4">
                                I implement appropriate security measures to protect your personal information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Contact form data is transmitted securely via HTTPS</li>
                                <li>Email communications are encrypted in transit</li>
                                <li>Chat conversations are not permanently stored</li>
                                <li>No sensitive data is stored in browser cookies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                            <p className="leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Request access to your personal data</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of communications</li>
                                <li>Lodge a complaint with a supervisory authority</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
                            <p className="leading-relaxed">
                                This website uses minimal cookies for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                <li>Caching GitHub statistics (24-hour cache)</li>
                                <li>Maintaining chat session state</li>
                                <li>Analytics and performance monitoring</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                You can disable cookies in your browser settings, though some features may not function properly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                            <p className="leading-relaxed">
                                This website is not intended for children under 13 years of age. I do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                            <p className="leading-relaxed">
                                I may update this Privacy Policy from time to time. The "Last updated" date at the top will reflect the most recent changes. Continued use of the website after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>
                            <p className="leading-relaxed">
                                If you have questions about this Privacy Policy or want to exercise your rights, please contact me:
                            </p>
                            <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                                <p className="mb-2"><strong className="text-white">Email:</strong> shahadotrahat786@gmail.com</p>
                                <p className="mb-2"><strong className="text-white">Phone:</strong> +880-1775-020-582</p>
                                <p><strong className="text-white">Location:</strong> Dhaka, Bangladesh</p>
                            </div>
                        </section>
                    </div>

                    {/* Back Button */}
                    <div className="mt-12 text-center">
                        <Link href="/" className="btn-primary inline-flex items-center space-x-2">
                            <ArrowLeft size={18} />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
