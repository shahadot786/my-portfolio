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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
                {/* Information Card */}
                <div className="glass-card p-6 space-y-5">
                    <h2 className="text-xl font-bold text-[#dde4dd] border-b border-[#3c4a42] pb-3 mb-2">
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        {contactInfo.map((info) => (
                            <a
                                key={info.label}
                                href={info.href}
                                className="flex items-center gap-4 group p-2 rounded-lg hover:bg-[#1a211d] transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#10b981]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3] group-hover:scale-105 transition-transform shrink-0">
                                    <info.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-[#94A3B8] font-mono text-[11px] uppercase tracking-wider">{info.label}</p>
                                    <p className="text-[#dde4dd] font-semibold text-sm group-hover:text-[#4edea3] transition-colors">{info.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Social Profiles Card */}
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-base font-bold text-[#dde4dd] border-b border-[#3c4a42] pb-3">
                        Social Profiles
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#3c4a42] bg-[#1a211d] hover:border-[#4edea3] text-[#dde4dd] hover:text-[#4edea3] transition-all font-mono text-xs"
                                aria-label={social.label}
                            >
                                <social.icon size={16} />
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
                <div className="glass-card p-8 bg-[#09100c] border-[#3c4a42]">
                    <h2 className="text-xl font-bold text-[#dde4dd] mb-6 flex items-center gap-2">
                        <Send size={18} className="text-[#4edea3]" />
                        Send a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-[#bbcabf] mb-1.5">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1a211d] border border-[#3c4a42] rounded-lg text-[#dde4dd] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4edea3] transition-all text-sm"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-[#bbcabf] mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1a211d] border border-[#3c4a42] rounded-lg text-[#dde4dd] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4edea3] transition-all text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-[#bbcabf] mb-1.5">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#1a211d] border border-[#3c4a42] rounded-lg text-[#dde4dd] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4edea3] transition-all text-sm"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-[#bbcabf] mb-1.5">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-3 bg-[#1a211d] border border-[#3c4a42] rounded-lg text-[#dde4dd] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4edea3] transition-all text-sm resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#4edea3] text-[#0e1511] font-bold text-sm rounded-lg hover:bg-[#6ffbbe] transition-all shadow-[0_0_20px_rgba(78,222,163,0.3)] active:scale-95 py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div className="flex items-center gap-2 text-[#4edea3] bg-[#10b981]/10 border border-[#4edea3]/30 rounded-lg p-4 font-mono text-xs">
                                <CheckCircle size={18} />
                                <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4 font-mono text-xs">
                                <AlertCircle size={18} />
                                <p>Failed to send. Please try emailing directly.</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
