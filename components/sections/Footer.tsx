"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    return (
        <footer className="bg-slate-950 border-t border-gray-800">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4">Shahadot</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Building innovative mobile solutions with React Native and modern web technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {["Home", "About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:border-blue-400 transition-all hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} className="text-gray-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
                        <span>© {currentYear} MD. Shahadot Hossain. Made with</span>
                        <Heart size={14} className="text-red-400 fill-red-400" />
                        <span>and React</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
