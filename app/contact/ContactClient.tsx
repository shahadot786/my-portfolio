"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Youtube,
    Globe,
    Facebook,
    Instagram,
    Send,
    Loader,
    CheckCircle,
    AlertCircle,
    Copy,
    Check,
    type LucideIcon,
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import type { Profile } from "@/lib/profile";

const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    x: Twitter,
    youtube: Youtube,
    facebook: Facebook,
    instagram: Instagram,
    globe: Globe,
};

function getSocialIcon(icon: string): LucideIcon {
    return SOCIAL_ICON_MAP[icon?.toLowerCase()] || Globe;
}

interface ContactClientProps {
    profile: Profile;
}

export default function ContactClient({ profile }: ContactClientProps) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: profile.email || "shahadot.swe@gmail.com",
            href: `mailto:${profile.email || "shahadot.swe@gmail.com"}`,
        },
        ...(profile.phone
            ? [
                  {
                      icon: Phone,
                      label: "Phone / WhatsApp",
                      value: profile.phone,
                      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
                  },
              ]
            : []),
        {
            icon: MapPin,
            label: "Location",
            value: profile.location || "Dhaka, Bangladesh (Available Worldwide)",
            href: "#",
        },
    ];

    const socialLinks = (profile.socialLinks || []).map((link) => ({
        icon: getSocialIcon(link.icon),
        href: link.url,
        label: link.platform,
    }));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const res = await fetch(`${API_BASE_URL}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info (5 Cols) */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 space-y-6"
            >
                {/* Information Card */}
                <div className="glass-card p-6 sm:p-7 space-y-5">
                    <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
                        Direct Channels
                    </h2>
                    <div className="space-y-3">
                        {contactInfo.map((info) => (
                            <div
                                key={info.label}
                                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border transition-colors group"
                            >
                                <a
                                    href={info.href}
                                    className="flex items-center gap-3.5 min-w-0"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                                        <info.icon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider">{info.label}</p>
                                        <p className="text-foreground font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors truncate">{info.value}</p>
                                    </div>
                                </a>

                                {info.href.startsWith("mailto:") || info.href.startsWith("tel:") ? (
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(info.value, info.label)}
                                        title={`Copy ${info.label}`}
                                        className="p-2 text-muted-foreground hover:text-primary transition-colors shrink-0"
                                    >
                                        {copiedKey === info.label ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                                    </button>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Profiles Card */}
                {socialLinks.length > 0 && (
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-sm font-bold text-foreground border-b border-border pb-3">
                            Social & Professional Profiles
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-muted/40 hover:border-primary/50 text-foreground hover:text-primary transition-all font-mono text-xs shadow-sm hover:scale-105"
                                    aria-label={social.label}
                                >
                                    <social.icon size={15} />
                                    <span>{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Contact Form (7 Cols) */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7"
            >
                <div className="glass-card p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <Send size={18} className="text-primary" />
                        Send a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                                placeholder="Enterprise project inquiry / collaboration..."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                                placeholder="Tell me about your project, timeline, and goals..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-md shadow-primary/20 active:scale-95 py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    <span>Sending Message...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {submitStatus === "success" && (
                            <div className="flex items-center gap-2 text-primary bg-primary/10 border border-primary/30 rounded-xl p-4 font-mono text-xs">
                                <CheckCircle size={18} />
                                <p>Message sent successfully! Shahadot will get back to you soon.</p>
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-xl p-4 font-mono text-xs">
                                <AlertCircle size={18} />
                                <p>Failed to send message. Please try emailing directly at shahadot.swe@gmail.com.</p>
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
