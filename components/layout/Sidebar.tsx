"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
    const navItems = [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Education", href: "#education" },
        { label: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-stone-200 overflow-y-auto shadow-xl z-50">
            <div className="p-8 space-y-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full blur-md opacity-30"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src="/avatar.png"
                                alt="MD. Shahadot Hossain"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-2xl font-bold text-stone-900 mb-1">
                        MD. Shahadot Hossain
                    </h1>
                    <p className="text-sm font-medium text-blue-600 mb-3">
                        React & React Native Specialist
                    </p>
                    <p className="text-xs text-stone-600">
                        Mobile Application Developer
                    </p>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-3 text-sm"
                >
                    <div className="flex items-center space-x-3 text-stone-700">
                        <Mail size={16} className="text-blue-600 flex-shrink-0" />
                        <a href="mailto:shahadotrahat786@gmail.com" className="hover:text-blue-600 transition-colors truncate">
                            shahadotrahat786@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-700">
                        <Phone size={16} className="text-blue-600 flex-shrink-0" />
                        <span>+880-1775-020-582</span>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-700">
                        <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                        <span>Dhaka, Bangladesh</span>
                    </div>
                </motion.div>

                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-1"
                >
                    {navItems.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-blue-600 rounded-lg transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </motion.nav>

                {/* Download CV Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <a
                        href="/MD_Shahadot_Hosssain.pdf"
                        download
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        <Download size={18} />
                        <span>Download CV</span>
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center space-x-4"
                >
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-stone-600 hover:text-blue-600 hover:bg-stone-100 rounded-lg transition-all"
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </motion.div>

                {/* Legal Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-500"
                >
                    <Link href="/privacy" className="block hover:text-blue-600 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="block hover:text-blue-600 transition-colors">
                        Terms of Service
                    </Link>
                </motion.div>
            </div>
        </aside>
    );
}
