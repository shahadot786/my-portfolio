"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader, CheckCircle, AlertCircle, Github, Linkedin } from "lucide-react";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "shahadotrahat786@gmail.com",
            href: "mailto:shahadotrahat786@gmail.com",
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+880-1775-020-582",
            href: "tel:+8801775020582",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Uttara, Dhaka, Bangladesh",
            href: "#",
        },
    ];

    const socialLinks = [
        {
            icon: Github,
            label: "GitHub",
            href: "https://github.com/shahadot786",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/shahadot786",
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const res = await fetch("/api/contact", {
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
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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
                        Inquiries
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Let's Start a <span className="gradient-text">Conversation</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Whether it's a revolutionary app idea or an enterprise-scale challenge,
                        I'm ready to architect the solution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Sidebar */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold tracking-tight">Technical <span className="text-primary">Consultation</span></h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                I provide strategic guidance on mobile architecture,
                                offline-first systems, and large-scale data synchronization.
                                Reach out via the following channels for a swift response.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="futuristic-card p-5 flex items-center gap-5 group hover:border-primary/30 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <info.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{info.label}</p>
                                        <p className="text-base font-bold group-hover:text-primary transition-colors">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-border">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Digital Ecosystem</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7"
                    >
                        <form onSubmit={handleSubmit} className="futuristic-card p-8 md:p-12 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/20 rounded-2xl p-4 text-foreground placeholder:text-muted-foreground/40 transition-all outline-none border active:scale-[0.99]"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">
                                        Identity (Email)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/20 rounded-2xl p-4 text-foreground placeholder:text-muted-foreground/40 transition-all outline-none border active:scale-[0.99]"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">
                                    Strategic Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/20 rounded-2xl p-4 text-foreground placeholder:text-muted-foreground/40 transition-all outline-none border active:scale-[0.99]"
                                    placeholder="What are we architecting?"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">
                                    Detailed Parameters
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/20 rounded-2xl p-4 text-foreground placeholder:text-muted-foreground/40 transition-all outline-none border resize-none active:scale-[0.99]"
                                    placeholder="Provide technical details or business objectives..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group btn-primary h-14 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-base font-black relative overflow-hidden"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader size={20} className="animate-spin" />
                                        <span className="tracking-widest uppercase">Initializing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        <span className="tracking-widest uppercase">Transmit Message</span>
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 text-primary bg-primary/10 border border-primary/20 rounded-2xl p-5"
                                    >
                                        <CheckCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-bold leading-snug">Transmission Successful. I will review the parameters and respond within 24 hours.</p>
                                    </motion.div>
                                )}

                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl p-5"
                                    >
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-bold leading-snug">Transmission Failed. Please verify your connection or attempt direct email via the sidebar.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
