"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Mail, 
  CheckCircle, 
  ArrowRight,
  MessageSquare
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What is Shahadot's experience with React Native?",
  "Has he built offline-first mobile systems?",
  "Which Fortune 500 clients has he worked with?",
  "Is Shahadot available for hire or contract?"
];

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! 👋 I'm Shahadot's AI Assistant powered by Groq. Ask me anything about his enterprise mobile architecture, projects, skills, or how to work with him!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  
  // Lead state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm ready to answer any questions about Shahadot's portfolio."
      };
      setMessages(prev => [...prev, botReply]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't connect right now. Please feel free to reach out directly via the Contact page!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadMessage || leadSubmitting) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            name: leadName || "Visitor",
            email: leadEmail,
            message: leadMessage,
            subject: "AI Assistant Portfolio Inquiry"
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setLeadSubmitted(true);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Thank you, ${leadName || 'friend'}! Your message has been sent directly to Shahadot. He will follow up via ${leadEmail} shortly.`
          }
        ]);
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSubmitted(false);
          setLeadName("");
          setLeadEmail("");
          setLeadMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-card/90 border border-primary/40 hover:border-primary text-foreground rounded-full shadow-2xl backdrop-blur-xl transition-all hover:shadow-[0_0_25px_rgba(78,222,163,0.3)]"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5 text-foreground">
                Ask AI Assistant <Sparkles className="w-3 h-3 text-primary" />
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">Instant answers via Groq</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-card/95 border border-border rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-foreground"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/80 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                    Shahadot&apos;s AI Assistant
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-primary/10 text-primary rounded border border-primary/20">
                      Groq
                    </span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Trained on live portfolio data
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowLeadModal(prev => !prev)}
                  title="Leave a message for Shahadot"
                  className={`p-2 rounded-xl transition-colors ${showLeadModal ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMessages([
                    {
                      id: "welcome",
                      role: "assistant",
                      content: "Chat cleared. What else would you like to know about Shahadot?"
                    }
                  ])}
                  title="Clear chat"
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inline Lead Capture Form */}
            {showLeadModal ? (
              <div className="flex-1 p-5 overflow-y-auto bg-muted/20">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-primary" /> Leave a Message for Shahadot
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Have an enterprise project or opportunity? Send your details directly to his inbox.
                    </p>
                  </div>

                  {leadSubmitted ? (
                    <div className="py-8 text-center space-y-2">
                      <CheckCircle className="w-10 h-10 text-primary mx-auto animate-bounce" />
                      <p className="font-bold text-sm text-foreground">Message Dispatched!</p>
                      <p className="text-xs text-muted-foreground">Shahadot will reply directly to your email.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs font-mono text-muted-foreground block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-muted-foreground block mb-1">Your Email *</label>
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-muted-foreground block mb-1">Your Inquiry / Project Scope *</label>
                        <textarea
                          required
                          rows={3}
                          value={leadMessage}
                          onChange={(e) => setLeadMessage(e.target.value)}
                          placeholder="We're looking for an enterprise mobile engineer for..."
                          className="w-full text-xs px-3 py-2 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowLeadModal(false)}
                          className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Back to Chat
                        </button>
                        <button
                          type="submit"
                          disabled={leadSubmitting}
                          className="px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                        >
                          {leadSubmitting ? "Sending..." : "Send Inquiry"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-muted border border-border text-primary"
                      }`}
                    >
                      {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                          : "bg-muted/70 dark:bg-card/70 border border-border text-foreground rounded-tl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-muted border border-border text-primary flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-muted/70 dark:bg-card/70 border border-border px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-300" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Quick Starter Suggestions (shown when conversation is short) */}
            {!showLeadModal && messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-card border border-border hover:border-primary/40 hover:text-primary transition-colors line-clamp-1"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            {!showLeadModal && (
              <div className="p-3 border-t border-border bg-card/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about Shahadot..."
                    disabled={isLoading}
                    className="flex-1 bg-muted/50 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                    className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground px-1">
                  <span>Press Enter to send</span>
                  <button
                    onClick={() => setShowLeadModal(true)}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-2.5 h-2.5" /> Connect directly
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
