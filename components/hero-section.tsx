"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  User,
  FolderOpen,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Play,
  Terminal,
  Zap,
  Star,
  GitBranch,
  Clock,
  MapPin,
  Phone,
  Send,
  Download,
  Award,
  TrendingUp,
  Calendar,
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Loader,
  MessageSquare,
  Target,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Code2Icon,
  Brain,
} from "lucide-react";
import { PlaygroundSection } from "./playground-section";
import { ThemeSelector } from "./theme-selector";
import { GitHubStats } from "./github-stats";
import Image from "next/image";
import { ProblemSolvingSection } from "./problem-solving-section";

interface FileTab {
  id: string;
  name: string;
  icon: React.ElementType;
  content: React.ReactNode;
  language?: string;
}

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: "work" | "education" | "project";
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  metrics: string[];
  color: string;
  github: string;
  demo: string;
  image: string;
}

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("about.md");
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const fullText = `const developer = {
  name: 'MD Shahadot Hossain',
  title: 'React Native Developer',
  specialization: 'React Native & Modern Web',
  experience: '3+ years',
  location: 'Hybrid, Remote, Available Worldwide',
  
  skills: {
    mobile: ['React Native', 'Expo', 'Native iOS/Android'],
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    backend: ['Node.js', 'SQL'],
    cloud: ['Firebase']
  },
  
  achievements: {
    apps_built: 20+,
    total_downloads: '10K+',
    active_users: '5K+',
    team_size_led: 5,
    success_rate: '90%'
  },
  
  passion: 'Test New Technologies & Building Mobile Apps.',
  motto: 'Code with purpose, ship with confidence'
};

// Currently working on revolutionary fintech solutions
console.log('Ready to build something amazing together! 🚀');`;

  const timelineData: TimelineItem[] = [
    {
      date: "June 2023 – Present",
      title: "App Developer",
      company: "HawkEyes Digital Monitoring Ltd",
      description:
        "Developed and maintained multiple React Native mobile applications handling large-scale trade marketing operations for Unilever, BAT, and Nagad, collectively serving 10,000+ TM with 100,000+ daily executions.",
      technologies: [
        "React Native",
        "Redux",
        "TypeScript",
        "REST API",
        "Agile",
      ],
      achievements: [
        "Built cross-platform apps for Android and iOS",
        "Improved app performance and security",
        "Collaborated with cross-functional teams",
        "Expanded mobile app portfolio",
      ],
      type: "work",
    },
    {
      date: "Jan 2023 – May 2023",
      title: "Jr. React Native Developer",
      company: "TFP Solutions Bangladesh Ltd",
      description:
        "Worked on mobile application development using React Native and Redux. Focused on improving user experience, debugging, and implementing new features.",
      technologies: ["React Native", "Redux", "JavaScript", "REST API"],
      achievements: [
        "Built mobile apps with offline-first support",
        "Enhanced product functionality",
        "Performed testing and debugging",
        "Improved app performance",
      ],
      type: "work",
    },
    {
      date: "Jun 2022 – Dec 2022",
      title: "Front-End Developer",
      company: "Global Skills Development Agency",
      description:
        "Developed user-friendly Vue.js and Laravel applications, focusing on clean and modular front-end code bases with scalability in mind.",
      technologies: ["Vue.js", "Laravel", "Tailwind CSS", "Redux", "REST API"],
      achievements: [
        "Created production-ready interfaces",
        "Integrated third-party applications",
        "Enhanced app features and performance",
        "Delivered scalable solutions",
      ],
      type: "work",
    },
    {
      date: "2017 – 2020",
      title: "Bachelor of Science in Computer Science",
      company: "Green University of Bangladesh",
      description:
        "Graduated with a B.Sc. in Computer Science specializing in software engineering and mobile application development.",
      technologies: [
        "Java",
        "Kotlin",
        "JavaScript",
        "Data Structures",
        "Algorithms",
      ],
      achievements: [
        "Graduated with strong academic performance",
        "Led final year projects",
        "Built multiple academic software projects",
        "Participated in hackathons",
      ],
      type: "education",
    },
  ];

  const projects: Project[] = [
    {
      title: "📱 Hello Super Stars",
      description:
        "A global social media app connecting celebrities and fans, offering live learning, auditions, chats, meetups, personalized greetings, and an E-Showcase for autographed items.",
      technologies: ["React Native", "Redux", "Firebase", "REST API"],
      metrics: [
        "100K+ downloads",
        "4.5★+ Play Store rating",
        "Live sessions & fan groups",
        "Exclusive paid content support",
      ],
      color: "blue",
      github: "https://github.com/shahadot786",
      demo: "https://play.google.com/store/apps/details?id=com.hellosuperstars",
      image:
        "https://media.licdn.com/dms/image/v2/D562DAQGRhKyEqPDFqg/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1711869185675?e=1758531600&v=beta&t=uEkGqPWPoi9n0Lw0UppiRfW0K4L-pJ0k5tkT5metlek",
    },
    {
      title: "📊 Unilever TM (M-Lenz & CM Supervisor)",
      description:
        "Multi-role-based mobile apps designed for field operations and supervisory tasks. Features include display capture, asset tracking, and real-time location monitoring.",
      technologies: [
        "React Native",
        "Redux",
        "GPS",
        "Offline-first",
        "TypeScript",
      ],
      metrics: [
        "10,000+ TM users",
        "100,000+ daily executions",
        "Real-time data access",
        "Improved field efficiency",
      ],
      color: "green",
      github: "",
      demo: "",
      image: "https://i.ytimg.com/vi/QYIPSWUTfjM/maxresdefault.jpg",
    },
    {
      title: "⚡ BAT MM Automation (CM Live & MS Live)",
      description:
        "Mobile apps optimized for field operations and supervisory roles in BAT. Supports asset tracking, real-time monitoring, and efficient reporting.",
      technologies: ["React Native", "Redux", "REST API", "Location Tracking"],
      metrics: [
        "Improved operational efficiency",
        "Enhanced supervisor oversight",
        "Real-time data reporting",
        "Scalable mobile architecture",
      ],
      color: "purple",
      github: "",
      demo: "",
      image:
        "https://bl-bucket.sgp1.digitaloceanspaces.com/m-lenz/bat-resources/02-02-2024/Screenshot from 2025-09-15 14-26-11.png-original",
    },
    {
      title: "🚀 Nagad TM Suite (Pulse TMR, TMS, MR, MS)",
      description:
        "Offline-first mobile applications for Nagad trade marketing and reporting. Designed with intelligent data sync, real-time location tracking, and CRUD operations.",
      technologies: [
        "React Native",
        "SQLite",
        "Offline Sync",
        "GPS",
        "TypeScript",
      ],
      metrics: [
        "500K+ active users",
        "15+ countries",
        "92% data loss reduction",
        "4.8★ rating",
      ],
      color: "yellow",
      github: "https://github.com/shahadot786",
      demo: "https://play.google.com/store/apps/details?id=com.nagadtmsapp",
      image:
        "https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1/uploads/dten/2021/07/desi-nagad-a-laav-beshi-image-1-1625147226802.jpg",
    },
  ];

  useEffect(() => {
    if (activeTab === "about.md" && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText, activeTab]);

  useEffect(() => {
    if (activeTab === "about.md") {
      setCurrentIndex(0);
      setDisplayedText("");
    }
  }, [activeTab]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const aboutContent = (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Code Section */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-700 bg-gray-900">
          <div className="p-4 lg:p-6 font-mono text-xs lg:text-sm overflow-y-auto h-full">
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {displayedText}
              {currentIndex < fullText.length && (
                <span className="animate-pulse bg-blue-400 text-blue-400">
                  |
                </span>
              )}
            </pre>
          </div>
        </div>

        {/* Visual About Section */}
        <div className="p-4 lg:p-6 overflow-y-auto bg-gray-800">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="text-center sm:text-left">
              <div className="w-32 h-32 rounded-full mx-auto sm:mx-0 mb-4">
                <Image
                  src="/avatar.png"
                  alt="Picture of the author"
                  width={140}
                  height={140}
                  className="object-cover rounded-full w-full h-full "
                />
              </div>

              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                MD Shahadot Hossain
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4">
                React Native Developer
              </p>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400 mb-4">
                <MapPin size={16} />
                <span className="text-sm">
                  Hybrid, Remote, Available Worldwide
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-gray-900 p-2 sm:p-3 lg:p-4 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">
                  3+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="bg-gray-900 p-2 sm:p-3 lg:p-4 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                  20+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Projects Built
                </div>
              </div>
              <div className="bg-gray-900 p-2 sm:p-3 lg:p-4 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-400">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  App Downloads
                </div>
              </div>
              <div className="bg-gray-900 p-2 sm:p-3 lg:p-4 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400">
                  90%
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Success Rate
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-4">
                Core Skills
              </h3>
              <div className="space-y-4">
                {[
                  {
                    category: "Mobile",
                    skills: ["React Native", "Expo", "Native iOS/Android"],
                    color: "blue",
                    icon: Smartphone,
                  },
                  {
                    category: "Frontend",
                    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
                    color: "green",
                    icon: Globe,
                  },
                  {
                    category: "Backend",
                    skills: ["Node.js", "SQL"],
                    color: "purple",
                    icon: Database,
                  },
                  {
                    category: "Cloud",
                    skills: ["Firebase"],
                    color: "yellow",
                    icon: Cloud,
                  },
                ].map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="bg-gray-900 p-2 sm:p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <skillGroup.icon
                        size={16}
                        className={`text-${skillGroup.color}-400`}
                      />
                      <div className="text-xs sm:text-sm font-medium text-gray-300">
                        {skillGroup.category}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs bg-${skillGroup.color}-900/50 text-${skillGroup.color}-200 border border-${skillGroup.color}-700`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialization */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-3 sm:p-4 rounded-lg border border-blue-700/50">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                <Target size={20} className="text-blue-400" />
                <span>Specialization</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Building offline-first mobile experiences with React Native.
                Expert in creating high-performance apps that work seamlessly
                even without internet connectivity, with intelligent data
                synchronization and optimized user experiences.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("contact.tsx")}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm sm:text-base"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <MessageSquare size={16} />
                <span>Let's Talk</span>
              </motion.button>
              <motion.a
                href="/MD_Shahadot_Hosssain.pdf"
                download="MD_Shahadot_Hosssain.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base"
              >
                <Download size={16} />
                <span>Download CV</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const timelineContent = (
    <div className="h-full p-2 sm:p-4 lg:p-6 overflow-y-auto bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Career Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            My professional timeline and key achievements
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 sm:left-4 lg:left-1/2 lg:transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-600"></div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-start mb-6 sm:mb-8 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-3 sm:left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 z-10 ${
                  item.type === "work"
                    ? "bg-blue-500 border-blue-300"
                    : item.type === "education"
                    ? "bg-green-500 border-green-300"
                    : "bg-purple-500 border-purple-300"
                }`}
              ></div>

              {/* Content */}
              <div
                className={`ml-8 sm:ml-12 lg:ml-0 lg:w-5/12 ${
                  index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-900 p-3 sm:p-4 lg:p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    {item.type === "work" ? (
                      <Briefcase className="text-blue-400" size={16} />
                    ) : item.type === "education" ? (
                      <GraduationCap className="text-green-400" size={16} />
                    ) : (
                      <Award className="text-purple-400" size={16} />
                    )}
                    <span className="text-xs sm:text-sm text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-400 mb-2 sm:mb-3 font-medium text-sm sm:text-base">
                    {item.company}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs sm:text-sm font-medium text-white mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-white mb-2 flex items-center space-x-1">
                      <TrendingUp size={14} className="text-green-400" />
                      <span>Key Achievements:</span>
                    </h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-400 flex items-start"
                        >
                          <CheckCircle
                            size={12}
                            className="text-green-400 mr-2 mt-0.5 flex-shrink-0"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const projectsContent = (
    <div className="h-full p-2 sm:p-4 lg:p-6 overflow-y-auto bg-gray-800">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Showcasing impactful solutions with real-world results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 overflow-hidden shadow-lg"
            >
              {/* Project Image */}
              <div className="h-24 sm:h-32 lg:h-40 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-1 sm:bottom-2 left-2">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6">
                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 bg-${project.color}-900/30 text-${project.color}-200 rounded text-xs border border-${project.color}-700/50`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="text-xs sm:text-sm text-gray-400 flex items-center"
                    >
                      <TrendingUp size={12} className="text-green-400 mr-2" />
                      {metric}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {project.demo !== "" && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      className="flex items-center justify-center space-x-1 text-white transition-colors text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const contactContent = (
    <div className="h-full p-2 sm:p-4 lg:p-6 overflow-y-auto bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Let's Build Something Amazing
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Ready to discuss your next project? Get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-gray-900 p-3 sm:p-6 rounded-lg border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Send size={20} className="text-blue-400" />
              <span>Send a Message</span>
            </h3>

            <form
              onSubmit={handleContactSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  required
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Technical Consulting">
                    Technical Consulting
                  </option>
                  <option value="Code Review">Code Review</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm"
                  placeholder="Tell me about your project, timeline, and requirements..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={16} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-400 text-xs sm:text-sm bg-green-900/20 p-2 sm:p-3 rounded-lg border border-green-700/50"
                >
                  <CheckCircle size={16} />
                  <span>
                    Message sent successfully! I'll get back to you within 24
                    hours.
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400 text-xs sm:text-sm bg-red-900/20 p-2 sm:p-3 rounded-lg border border-red-700/50"
                >
                  <AlertCircle size={16} />
                  <span>
                    Failed to send message. Please try again or use email
                    directly.
                  </span>
                </motion.div>
              )}
            </form>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contact Methods */}
            <div className="bg-gray-900 p-3 sm:p-6 rounded-lg border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Phone size={20} className="text-green-400" />
                <span>Get in Touch</span>
              </h3>
              <div className="space-y-2 sm:space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg"
                >
                  <Mail className="text-blue-400" size={20} />
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">
                      Email
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      shrhossain786@gmail.com
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg"
                >
                  <Phone className="text-green-400" size={20} />
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">
                      Phone
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      +880- 17750-20582
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg"
                >
                  <MapPin className="text-purple-400" size={20} />
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">
                      Location
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      Hybrid, Remote, Available Worldwide
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-800 rounded-lg"
                >
                  <Clock className="text-yellow-400" size={20} />
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">
                      Response Time
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      Usually within 24 hours
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Services & Rates */}
            <div className="bg-gray-900 p-3 sm:p-6 rounded-lg border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Briefcase size={20} className="text-blue-400" />
                <span>Services & Rates</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-800 rounded text-sm">
                  <span className="text-gray-300 text-xs sm:text-sm">
                    Mobile App Development
                  </span>
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">
                    from $10K
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800 rounded text-sm">
                  <span className="text-gray-300 text-xs sm:text-sm">
                    Web Development
                  </span>
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">
                    from $8K
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800 rounded text-sm">
                  <span className="text-gray-300 text-xs sm:text-sm">
                    Technical Consulting
                  </span>
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">
                    $100/hour
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-800 rounded text-sm">
                  <span className="text-gray-300 text-xs sm:text-sm">
                    Code Review & Mentoring
                  </span>
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">
                    $80/hour
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-900 p-3 sm:p-6 rounded-lg border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  href="https://github.com/shahadot786"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github className="text-white" size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  href="https://linkedin.com/in/shahadot786"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Linkedin className="text-white" size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  href="https://leetcode.com/u/shahadot_786/"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Code2Icon className="text-white" size={20} />
                </motion.a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <motion.a
                href="/MD_Shahadot_Hosssain.pdf"
                download="MD_Shahadot_Hosssain.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm sm:text-base"
              >
                <Download size={16} className="text-white" />
                <span className="text-white font-medium">Download CV</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const githubContent = (
    <div className="h-full p-2 sm:p-4 lg:p-6 overflow-y-auto bg-gray-800">
      <GitHubStats />
    </div>
  );

  const tabs: FileTab[] = [
    {
      id: "about.md",
      name: "about.md",
      icon: User,
      content: aboutContent,
    },
    {
      id: "timeline.json",
      name: "timeline.json",
      icon: Clock,
      content: timelineContent,
    },
    {
      id: "projects.json",
      name: "projects.json",
      icon: FolderOpen,
      content: projectsContent,
    },
    {
      id: "github-stats.tsx",
      name: "github-stats.tsx",
      icon: Github,
      content: githubContent,
    },
    // {
    //   id: "problem-solving.tsx",
    //   name: "problem-solving.tsx",
    //   icon: Brain,
    //   content: <ProblemSolvingSection />,
    // },
    {
      id: "contact.tsx",
      name: "contact.tsx",
      icon: Mail,
      content: contactContent,
    },
    {
      id: "playground.js",
      name: "playground.js",
      icon: Play,
      content: <PlaygroundSection />,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-900 text-white mb-16">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h1 className="text-sm sm:text-lg font-semibold">
                <span className="hidden sm:inline">MD Shahadot Hossain</span>
                <span className="sm:hidden">Shahadot</span>
              </h1>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                <GitBranch size={16} />
                <span>master</span>
                <Star size={16} />
                <span>240</span>
              </div>
              <ThemeSelector />
            </div>
          </div>
        </div>
      </header>

      {/* File Tabs */}
      <div className="border-b border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.8)" }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-3 border-r border-gray-700 transition-colors whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white border-b-2"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                style={{
                  borderBottomColor:
                    activeTab === tab.id
                      ? "var(--color-primary)"
                      : "transparent",
                }}
              >
                <tab.icon size={16} />
                <span className="font-medium hidden xs:inline sm:inline">
                  {tab.name}
                </span>
                {activeTab === tab.id && (
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              activeTab === "playground.js" ? "" : "min-h-[600px] bg-gray-900"
            }
          >
            {activeTabData?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 text-white px-2 sm:px-4 py-2 text-xs sm:text-sm z-30"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Terminal size={14} />
              <span className="hidden sm:inline">Ready</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Code size={14} />
              <span className="truncate max-w-20 sm:max-w-none text-xs sm:text-sm">
                {activeTabData?.name}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Code2Icon size={14} />
              <span>Powered by MD. Shahadot Hossain</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Zap size={14} />
              <span className="hidden sm:inline">Building the future</span>
              <span className="sm:hidden">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
