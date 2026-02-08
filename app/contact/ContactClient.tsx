"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Youtube, Send, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

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
    { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/shahadot786", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@shahadot786", label: "YouTube" },
];

export default function ContactClient() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-4 mb-8">
                    {contactInfo.map((info) => (
                        <a
                            key={info.label}
                            href={info.href}
                            className="card flex items-center gap-4 border-zinc-800 hover:border-primary/50"
                        >
                            <div className="p-3 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-primary transition-colors">
                                <info.icon size={20} />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wide">{info.label}</p>
                                <p className="text-white font-medium">{info.value}</p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Social Links */}
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
                    Social Profiles
                </h3>
                <div className="flex gap-3">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-zinc-800 text-zinc-400 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Contact Form */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-zinc-500 text-xs uppercase tracking-wide mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-zinc-500 text-xs uppercase tracking-wide mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-zinc-500 text-xs uppercase tracking-wide mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                            placeholder="What's this about?"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-zinc-500 text-xs uppercase tracking-wide mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                            placeholder="Your message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Send Message
                            </>
                        )}
                    </button>

                    {submitStatus === "success" && (
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                            <CheckCircle size={18} />
                            <p className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
                        </div>
                    )}

                    {submitStatus === "error" && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <AlertCircle size={18} />
                            <p className="text-sm">Failed to send. Please try emailing directly.</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
