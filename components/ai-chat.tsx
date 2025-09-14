"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const sampleResponses = {
  "nagad pulse":
    "Nagad Pulse was an exciting project! It's an offline-first mobile app I built for field agents. The main challenge was ensuring data reliability in remote areas with poor connectivity. I implemented SQLite for local storage with intelligent background sync, which reduced data loss by 92%. The app was built with React Native and supports offline GPS tracking and multi-language interfaces. It now serves 500K+ active users across 15 countries.",

  projects:
    "I've worked on 35+ impactful projects! My featured ones include:\n\n1. **Nagad Pulse** - Field monitoring app (React Native, SQLite) - 500K+ users\n2. **TaskFlow Pro** - Team productivity suite (Next.js, PostgreSQL) - 40% productivity increase\n3. **EcoTrack** - Carbon footprint tracker with ML (React Native, Firebase) - 25K+ users\n4. **CryptoPortfolio** - Real-time crypto tracker (React, Node.js) - $5M+ tracked\n\nEach project solved real-world problems and achieved measurable impact. Would you like to know more about any specific project?",

  "tech stack":
    "My current tech stack includes:\n\n**Frontend:** React, React Native, Next.js, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Node.js, Python, PostgreSQL, Redis, GraphQL, Microservices\n**Mobile:** React Native, Expo, Native iOS/Android, SQLite, Offline Sync\n**Cloud:** AWS, Docker, Kubernetes, Firebase, Supabase\n**Tools:** Git, VS Code, Figma, Jest, Cypress, Storybook\n\nI specialize in offline-first architecture and performance optimization. What aspect interests you most?",

  experience:
    "I have 5+ years of experience as a full-stack developer, specializing in mobile development. Currently working as a Senior Developer at TechCorp, where I lead a team of 8 developers across 3 time zones. Previously, I was the solo mobile developer at a startup that got acquired for $2M. I've shipped 12+ apps with 1M+ total downloads, mentored 12+ junior developers, and focus on building offline-first, high-performance applications.",

  contact:
    "I'd love to discuss your project! You can reach me through:\n\n📧 Email: shahadot@example.com\n📞 Phone: +1 (555) 012-3456\n🌍 Location: Remote-First, Available Worldwide\n📅 Schedule a call: https://calendly.com/shahadot\n\nI typically respond within 24 hours and offer free 30-minute consultation calls. My services include:\n• Mobile App Development (from $15K)\n• Web Development (from $10K)\n• Technical Consulting ($150/hour)\n• Code Review & Mentoring ($100/hour)",

  github:
    "Check out my GitHub profile! I have 52 public repositories with 1.2K+ total stars. My most popular repos include:\n\n• **nagad-pulse** - 342 stars (React Native)\n• **taskflow-pro** - 289 stars (Next.js)\n• **react-native-performance-kit** - 156 stars (TypeScript)\n\nI'm an active contributor with 2,847+ commits this year. My top languages are TypeScript (45%), JavaScript (35%), and Python (12%). You can find me at github.com/shahadot",

  skills:
    "My core skills include:\n\n**Mobile Development (98%):** React Native, Expo, Native iOS/Android\n**Frontend (95%):** React, Next.js, TypeScript, Tailwind CSS\n**Backend (90%):** Node.js, Python, PostgreSQL, Redis\n**DevOps (85%):** AWS, Docker, Kubernetes, CI/CD\n**AI/ML (75%):** TensorFlow, OpenAI integration, ML model deployment\n\nI've completed 35+ projects with a 98% success rate and 99% client satisfaction. What specific skill would you like to know more about?",

  achievements:
    "Some of my key achievements:\n\n🏆 **Impact:** 1M+ app downloads, 500K+ active users\n📈 **Performance:** Reduced app crash rates by 85%, improved sync speed by 300%\n👥 **Leadership:** Led teams of 8+ developers, mentored 12+ juniors to senior level\n🎤 **Speaking:** Presented at 5+ tech conferences and meetups\n🌟 **Recognition:** AWS Certified Solutions Architect, Google Cloud Professional Developer\n💰 **Business Impact:** Helped startup get acquired for $2M\n\nI'm passionate about building technology that makes a real difference!",

  default:
    'Thanks for your message! I can help answer questions about my projects, technical experience, or discuss potential collaborations. Try asking about:\n\n• "Tell me about Nagad Pulse"\n• "What\'s your tech stack?"\n• "Show me your GitHub stats"\n• "What are your achievements?"\n• "How can we work together?"\n• "What projects have you built?"\n\nWhat would you like to know?',
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm Shahadot's AI assistant. I can answer questions about his 35+ projects, 5+ years of experience, GitHub stats, achievements, and how you can work together. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // Simple keyword matching for demo
    const lowerContent = content.toLowerCase();
    let response = sampleResponses.default;

    for (const [keyword, reply] of Object.entries(sampleResponses)) {
      if (
        keyword !== "default" &&
        (lowerContent.includes(keyword.toLowerCase()) ||
          (keyword === "github" &&
            (lowerContent.includes("git") ||
              lowerContent.includes("repository") ||
              lowerContent.includes("repo") ||
              lowerContent.includes("code"))) ||
          (keyword === "skills" &&
            (lowerContent.includes("skill") ||
              lowerContent.includes("ability") ||
              lowerContent.includes("expertise") ||
              lowerContent.includes("technology"))) ||
          (keyword === "achievements" &&
            (lowerContent.includes("achievement") ||
              lowerContent.includes("accomplishment") ||
              lowerContent.includes("award") ||
              lowerContent.includes("success"))) ||
          (keyword === "experience" &&
            (lowerContent.includes("work") ||
              lowerContent.includes("job") ||
              lowerContent.includes("career") ||
              lowerContent.includes("background"))) ||
          (keyword === "contact" &&
            (lowerContent.includes("hire") ||
              lowerContent.includes("work together") ||
              lowerContent.includes("collaborate") ||
              lowerContent.includes("email") ||
              lowerContent.includes("phone"))))
      ) {
        response = reply;
        break;
      }
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      type: "bot",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 right-6 z-40 p-3 sm:p-4 text-white rounded-full shadow-lg transition-all duration-200"
        style={{
          backgroundColor: "var(--color-primary)",
          boxShadow: isOpen
            ? "0 0 20px var(--color-primary)40"
            : "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-96 h-[70vh] sm:h-[500px] max-h-[600px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Bot className="text-white" size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  Shahadot's AI Assistant
                </h3>
                <p className="text-xs text-green-400">● Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={
                        message.type === "user"
                          ? { backgroundColor: "var(--color-primary)" }
                          : { backgroundColor: "#374151" }
                      }
                    >
                      {message.type === "user" ? (
                        <User size={14} className="text-white" />
                      ) : (
                        <Bot size={14} className="text-gray-300" />
                      )}
                    </div>

                    <div
                      className={`p-2 sm:p-3 rounded-lg whitespace-pre-line text-sm ${
                        message.type === "user"
                          ? "text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}
                      style={
                        message.type === "user"
                          ? { backgroundColor: "var(--color-primary)" }
                          : {}
                      }
                    >
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2"
                >
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <Bot size={14} className="text-gray-300" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 sm:p-3">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 border-t border-gray-700"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-2 sm:px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-transparent text-sm"
                  style={
                    {
                      "--tw-ring-color": "var(--color-primary)",
                      "--tw-ring-opacity": "0.5",
                    } as React.CSSProperties
                  }
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 disabled:opacity-50 text-white rounded-lg transition-all duration-200"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>

            {/* Privacy Note */}
            <div className="px-3 sm:px-4 pb-2">
              <p className="text-xs text-gray-400">
                🔒 Intelligent AI assistant powered by advanced language models.
                All conversations are secure and private.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
