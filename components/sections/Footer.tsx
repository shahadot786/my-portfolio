"use client";

import { Github, Linkedin, Mail, Heart, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    const quickLinks = [
        { name: "Concept", href: "#home" },
        { name: "Philosophy", href: "#about" },
        { name: "Journey", href: "#experience" },
        { name: "Ecosystem", href: "#skills" },
        { name: "Architecture", href: "#projects" },
        { name: "Consultation", href: "#contact" },
    ];

    const scrollTo = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="relative bg-background border-t border-border overflow-hidden pt-20">
            <div className="absolute inset-0 mesh-bg opacity-5" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
                    {/* Brand Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h3 className="text-3xl font-black tracking-tighter mb-4">
                                SHAHADOT <span className="text-primary">HOSSAIN</span>
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                Architecting high-performance mobile ecosystems and
                                scalable digital infrastructure for the next generation.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-8">Navigation</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold flex items-center group gap-2"
                                    >
                                        <div className="w-1.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & CTA */}
                    <div className="lg:col-span-4 space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-8">Strategic Reach</h4>
                        <div className="space-y-4">
                            <a href="mailto:shahadotrahat786@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                                <div className="p-2 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-sm font-bold">shahadotrahat786@gmail.com</span>
                            </a>
                            <a href="tel:+8801775020582" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                                <div className="p-2 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-sm font-bold">+880 1775 020 582</span>
                            </a>
                        </div>
                        <button
                            onClick={() => scrollTo("#contact")}
                            className="btn-primary w-full h-14 flex items-center justify-center gap-2 group tracking-widest uppercase font-black text-xs"
                        >
                            Hire for Projects <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* System Stats / Bottom Bar */}
                <div className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        <span>©{currentYear} System Design</span>
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span>All Rights Reserved</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Engineered with <Heart size={10} className="text-primary fill-primary animate-pulse" /> using React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
