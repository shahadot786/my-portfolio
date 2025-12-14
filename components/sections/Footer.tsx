"use client";

import { Github, Linkedin, Mail, Heart, MapPin, Phone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const contactInfo = [
        { icon: Mail, text: "shahadotrahat786@gmail.com", href: "mailto:shahadotrahat786@gmail.com" },
        { icon: Phone, text: "+880-1775-020-582", href: "tel:+8801775020582" },
        { icon: MapPin, text: "Dhaka, Bangladesh", href: "#" },
    ];

    return (
        <footer className="relative bg-slate-950 border-t border-gray-800 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-emerald-900/10"></div>

            <div className="container-custom relative z-10">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold gradient-text mb-4">Shahadot</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Building innovative mobile solutions with React Native and modern web technologies.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:border-blue-400 transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center space-x-2 group"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
                        <ul className="space-y-3">
                            {contactInfo.map((info) => (
                                <li key={info.text}>
                                    <a
                                        href={info.href}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-start space-x-2 group"
                                    >
                                        <info.icon size={16} className="mt-0.5 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                                        <span className="break-all">{info.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter/CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="text-white font-semibold mb-4 text-lg">Let's Work Together</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Have a project in mind? Let's create something amazing together.
                        </p>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center space-x-2 btn-primary text-sm"
                        >
                            <span>Get In Touch</span>
                            <ExternalLink size={14} />
                        </a>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 text-sm flex items-center space-x-2"
                        >
                            <span>© {currentYear} MD. Shahadot Hossain.</span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center space-x-1">
                                <span>Made with</span>
                                <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
                                <span>and React</span>
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-4 text-sm text-gray-400"
                        >
                            <a href="/privacy" className="hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </a>
                            <span>•</span>
                            <a href="/terms" className="hover:text-blue-400 transition-colors">
                                Terms of Service
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
