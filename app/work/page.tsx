import { ExternalLink, Award, ShieldCheck, Bookmark } from "lucide-react";
import Image from "next/image";

interface Experience {
  company: string;
  location: string;
  title: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "HawkEyes Digital Monitoring",
    location: "Dhaka, Bangladesh",
    title: "Software Engineer",
    period: "Jun 2023 — Present",
    current: true,
    description:
      "HawkEyes is a leading technology company providing mobile solutions for Fortune 500 enterprise clients including Unilever, BAT, and Nestlé. I architect and develop high-performance mobile applications for field operations across Bangladesh.",
    achievements: [
      "Leading deployment for 10K+ territory managers with 100K+ daily transactions",
      "Architected offline-first sync engine reducing data loss incidents by 92%",
      "Implemented liveness detection & biometric verification for secure field login",
      "Refactored legacy systems into high-performance React Native/TypeScript monorepos",
      "Built real-time GPS tracking and asset management systems",
      "Developed display capture prevention and security modules",
    ],
    technologies: [
      "TypeScript",
      "React Native",
      "Redux",
      "Offline-first",
      "Face Detection",
      "GPS",
      "REST API",
    ],
  },
  {
    company: "TFP Solutions Bangladesh",
    location: "Dhaka, Bangladesh",
    title: "Jr. React Native Developer",
    period: "Jan 2023 — May 2023",
    description:
      "TFP Solutions is a technology company focused on social engagement platforms. I developed 'Hello Superstar', a high-traffic application connecting celebrities with global fanbases.",
    achievements: [
      "Implemented user authentication and live session management",
      "Optimized media delivery pipelines via AWS S3 integration",
      "Maintained 99.9% application stability during peak event loads",
      "Built real-time chat and notification systems using WebSockets",
    ],
    technologies: [
      "React Native",
      "AWS S3",
      "WebSockets",
      "Firebase",
      "Real-time Chat",
    ],
  },
  {
    company: "GSDA (Global Skills Development)",
    location: "Dhaka, Bangladesh",
    title: "Frontend Developer",
    period: "Jun 2022 — Dec 2022",
    description:
      "GSDA is an educational technology company providing learning management systems. I engineered responsive web interfaces for institutional learning platforms.",
    achievements: [
      "Increased UX performance score by 25% through codebase modularization",
      "Integrated complex Laravel backend APIs into high-performance Vue.js frontend",
      "Standardized enterprise components using Tailwind CSS and Redux",
      "Implemented responsive designs for cross-device compatibility",
    ],
    technologies: ["Vue.js", "Laravel", "Redux", "Tailwind CSS", "REST API"],
  },
];

const education = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "Green University of Bangladesh",
  location: "Dhaka, Bangladesh",
  period: "Jan 2017 — Apr 2020",
  highlights: [
    "Dean's List Recognition for Academic Excellence",
    "Led multiple cross-platform mobile capstone projects",
    "Specialized in Software Engineering & Mobile Design",
    "Active participant in regional engineering symposiums",
  ],
};

export const metadata = {
  title: "Work - MD. Shahadot Hossain",
  description:
    "Employment history and professional experience of MD. Shahadot Hossain, and his education.",
  keywords: [
    "MD. Shahadot Hossain Work Experience",
    "Software Engineer Portfolio Bangladesh",
    "HawkEyes Digital Monitoring Software Engineer",
    "TFP Solutions Bangladesh Experience",
    "GSDA Frontend Developer Experience",
    "Enterprise Mobile App Development Bangladesh",
    "React Native Developer Resume",
    "DSA Certification Codedamn",
    "HackerRank JavaScript Basic Certificate",
    "MSB Academy Mobile App Marketing",
    "Data Structures and Algorithms Portfolio",
    "Professional Software Engineer Career",
  ],
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/work/",
  },
};

// Certifications Data
const verifiedCertificates = [
  {
    name: "Introduction to Data Structures and Algorithms",
    issuer: "Codedamn",
    date: "Jan 2026",
    image: "/certificates/dsa-codedamn.png",
    href: "https://codedamn.com/certificate/verify/cd937afc8303a2bc4d9730283be5405c02d8007c",
  },
  {
    name: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "May 2023",
    image: "/certificates/hackerrank-js.png",
    href: "https://www.hackerrank.com/certificates/3f3d0b6af6bb",
  },
  {
    name: "Advanced Mobile App Marketing",
    issuer: "MSB Academy",
    date: "Nov 2020",
    image: "/certificates/msb-academy.png",
    href: "https://www.msbacademy.com/certificates/8fb75f39b5d2351e56802bea243fdec5/",
  },
];

const trainingCertificates = [
  "React Native Specialized Development",
  "Advanced Mobile App Architecture",
  "Web Design & Interface Engineering",
  "Enterprise System Security & Auth",
  "JavaScript (Intermediate) - HackerRank",
];

export default function WorkPage() {
  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">Employment History</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        I have been fortunate to work with some amazing teams. I have worked
        mostly with startups but also with some large enterprises. Here is a
        brief overview of my employment history.
      </p>

      {/* Experience Timeline */}
      <div className="space-y-12 mb-16">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border-b border-zinc-800 pb-12 last:border-0"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <p className="text-zinc-500 text-sm">{exp.location}</p>
                <h2 className="text-xl font-semibold text-white">
                  {exp.title} at {exp.company}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm whitespace-nowrap">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="tag-highlight">Currently Working</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {exp.description}
            </p>

            {/* Achievements */}
            <ul className="space-y-2 mb-6">
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-zinc-400 text-sm"
                >
                  <span className="text-zinc-600 mt-1.5">•</span>
                  {achievement}
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="border-t border-zinc-800 pt-12 mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          Education
        </h2>

        <div className="">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <p className="text-zinc-500 text-sm">{education.location}</p>
              <h3 className="text-xl font-semibold text-white">
                {education.degree}
              </h3>
              <p className="text-zinc-400">{education.institution}</p>
            </div>
            <span className="text-zinc-500 text-sm whitespace-nowrap">
              {education.period}
            </span>
          </div>

          <ul className="space-y-2 mt-6">
            {education.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-zinc-400 text-sm"
              >
                <span className="text-zinc-600 mt-1.5">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verified Certifications */}
      <div className="border-t border-zinc-800 pt-12 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          Verified Credentials
          <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
            Live Links
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedCertificates.map((cert) => (
            <a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-primary/50 transition-all overflow-hidden flex flex-col"
            >
              {/* Certificate Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {cert.name}
                  </h3>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-zinc-500 text-xs">
                    {cert.issuer} • {cert.date}
                  </p>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Professional Training Section */}
      <div className="border-t border-zinc-800 pt-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          Professional development
        </h2>
        <div className="flex flex-wrap gap-2">
          {trainingCertificates.map((cert) => (
            <span
              key={cert}
              className="tag py-2 px-3 text-sm border-zinc-800 hover:border-primary/50 hover:text-white transition-all cursor-default flex items-center gap-2"
            >
              <Bookmark size={12} className="text-zinc-600" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}



