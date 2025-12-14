"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader, Bot, User, Sparkles } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const PORTFOLIO_CONTEXT = `
You are an AI assistant for MD. Shahadot Hossain's portfolio. Here's information about him:

**Professional Summary:**
- Proficient React Native Developer with 3.7+ years of experience
- Specialized in building cross-platform mobile applications for enterprise clients
- Worked with major companies: Unilever, BAT, Nestlé, and Nagad
- Expert in offline-first architecture, real-time tracking, face detection, and liveness verification
- Serving 10,000+ users with 100,000+ daily transactions

**Current Position:**
- Mobile Application Developer at HawkEyes Digital Monitoring Limited (July 2024 – Present)
- Leading development of React Native applications for enterprise clients
- Architected offline-first mobile solutions improving reliability by 40%

**Technical Skills:**
- Languages: JavaScript, TypeScript
- Frontend: React Native, Expo, Next.js, React.js
- Backend: Node.js, Express.js, Nest.js
- Architecture: Microservices, Clean Architecture, MVVM, MVC, Repository Pattern, Monorepo (Nx)
- Databases: MongoDB, MySQL, Prisma ORM
- State Management: Redux, Redux Toolkit, React Query
- Specialized: Offline-first Architecture, Face Detection, Liveness Detection, Object Detection, CI/CD

**Key Projects:**
1. Unilever TM (M-Lens & CM Supervisor) - 10,000+ users, 100,000+ daily executions
2. BAT MM Automation (CM Live & MS Live) - Optimized for 1000+ concurrent users
3. Nagad TM Suite - 10K+ downloads, 4.8★ rating
4. Hello Superstar - 50K+ downloads, 4.4★+ rating
5. Shopora Multi-Vendor eCommerce SaaS - Full-stack platform with microservices
6. HawkEyes Universe (HE Universe) - AI-powered application with multiple modules

**Education:**
- B.Sc. in Computer Science & Engineering from Green University of Bangladesh (2017-2020)

**Certifications:**
- JavaScript Basic Certification
- Web Design (Creative IT)
- React Specialist
- Complete Android App Development Masterclass
- Advanced Mobile App Marketing

**Contact:**
- Email: shahadotrahat786@gmail.com
- Phone: +880-1775-020-582
- Location: Uttara Sector 4, Dhaka, Bangladesh
- GitHub: github.com/shahadot786
- LinkedIn: linkedin.com/in/shahadot786

Answer questions about Shahadot's experience, skills, projects, and availability. Be helpful, professional, and concise.
`;

const SAMPLE_QUESTIONS = [
    "What are your technical skills?",
    "Tell me about your recent projects",
    "What's your experience with React Native?",
    "How can I contact you?",
    "What companies have you worked with?",
    "Show me your GitHub activity",
];

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Shahadot's AI assistant. Ask me anything about his experience, skills, or projects!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (question?: string) => {
        const messageText = question || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: messageText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setShowSuggestions(false);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    context: PORTFOLIO_CONTEXT,
                }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();

            const assistantMessage: Message = {
                role: "assistant",
                content: data.message,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: "assistant",
                content: "Sorry, I'm having trouble responding right now. Please try again or contact Shahadot directly at shahadotrahat786@gmail.com",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (question: string) => {
        handleSend(question);
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center animate-glow"
                    >
                        <MessageSquare size={24} className="text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-primary p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">AI Assistant</h3>
                                    <p className="text-white/80 text-xs">Ask about Shahadot</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === "user"
                                                ? "bg-gradient-primary text-white"
                                                : "bg-white/10 text-gray-200"
                                            }`}
                                    >
                                        <div className="flex items-start space-x-2">
                                            {message.role === "assistant" && (
                                                <Bot size={16} className="mt-1 flex-shrink-0" />
                                            )}
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            {message.role === "user" && (
                                                <User size={16} className="mt-1 flex-shrink-0" />
                                            )}
                                        </div>
                                        <span className="text-xs opacity-60 mt-1 block">
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Sample Questions */}
                            {showSuggestions && messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center space-x-2 text-gray-400 text-xs mb-2">
                                        <Sparkles size={14} />
                                        <span>Try asking:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {SAMPLE_QUESTIONS.map((question, index) => (
                                            <motion.button
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleSuggestionClick(question)}
                                                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-blue-400 rounded-lg text-xs text-gray-300 hover:text-white transition-all"
                                            >
                                                {question}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 rounded-2xl px-4 py-2 flex items-center space-x-2">
                                        <Loader size={16} className="animate-spin" />
                                        <span className="text-sm text-gray-300">Thinking...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-end space-x-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    rows={1}
                                    className="flex-1 bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                                    style={{ minHeight: "40px", maxHeight: "120px" }}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
