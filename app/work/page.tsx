import Link from "next/link";
import { Award, ExternalLink, ShieldCheck, GraduationCap } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";

export const revalidate = 86400; // Revalidate static cache every 24 hours

interface Experience {
  _id: string;
  company: string;
  companyUrl?: string;
  location: string;
  title: string;
  period: string;
  isCurrent: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

interface Education {
  _id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  highlights: string[];
}

interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  verified: boolean;
}

async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/experiences`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.experiences || [];
  } catch {
    return [];
  }
}

async function getEducation(): Promise<Education[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/education`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.education || [];
  } catch {
    return [];
  }
}

async function getCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.certificates || [];
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const [experiences, education, certificates, pageContent] = await Promise.all([
    getExperiences(),
    getEducation(),
    getCertificates(),
    getPageContent('work')
  ]);

  return (
    <div className="container-custom py-8 space-y-16">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium mb-3">
          Career Timeline & Professional Achievements
        </span>
        <h1 className="text-4xl font-extrabold text-[#dde4dd] tracking-tight">{pageContent?.title || 'Employment History'}</h1>
        <p className="text-[#bbcabf] mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'Over 4+ years building high-impact mobile platforms and scalable systems for global enterprise clients.'}
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp: Experience, index: number) => (
          <div
            key={index}
            className="glass-card p-6 sm:p-8 relative overflow-hidden group"
          >
            {/* Ambient accent bar */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#4edea3] opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">{exp.location}</span>
                <h2 className="text-xl font-bold text-[#dde4dd]">
                  {exp.title}{" "}
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4edea3] hover:text-[#6ffbbe] hover:underline transition-colors inline-flex items-center gap-1"
                    >
                      @ {exp.company}
                      <ExternalLink size={14} className="inline opacity-80" />
                    </a>
                  ) : (
                    <span className="text-[#4edea3]">@ {exp.company}</span>
                  )}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#bbcabf] px-3 py-1 bg-[#1a211d] rounded-lg border border-[#3c4a42]">
                  {exp.period}
                </span>
                {exp.isCurrent && (
                  <span className="px-3 py-1 bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                    Current Role
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[#bbcabf] text-sm mb-5 leading-relaxed">
              {exp.description}
            </p>

            {/* Achievements */}
            <ul className="space-y-2.5 mb-6">
              {exp.achievements.map((achievement: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[#dde4dd] text-xs sm:text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] mt-2 shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#3c4a42]">
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-mono text-[#4edea3] bg-[#10b981]/10 border border-[#4edea3]/30 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Higher Education Section */}
      {education.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#3c4a42]">
          <h2 className="text-xl font-bold text-[#dde4dd] tracking-tight flex items-center gap-2.5">
            <GraduationCap className="text-[#4edea3]" size={22} />
            Higher Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu._id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#dde4dd]">{edu.degree}</h3>
                    <p className="text-[#4edea3] text-sm font-semibold">{edu.institution}</p>
                  </div>
                  <span className="text-[#94A3B8] font-mono text-xs px-2.5 py-1 bg-[#1a211d] rounded-lg border border-[#3c4a42]">{edu.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {edu.highlights.map((h: string, i: number) => (
                    <li key={i} className="text-[#bbcabf] text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-[#4edea3]">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Quick Link Banner */}
      <div className="pt-6 border-t border-[#3c4a42]">
        <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#10b981]/10 via-[#0e1511] to-[#03b5d3]/10 border border-[#4edea3]/30">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium">
              <ShieldCheck size={14} />
              {certificates.length > 0 ? `${certificates.length} Verified Accreditations` : 'Verified Credentials'}
            </div>
            <h2 className="text-2xl font-bold text-[#dde4dd] tracking-tight">Verified Certifications</h2>
            <p className="text-[#bbcabf] text-xs sm:text-sm max-w-xl">
              Explore industry-recognized software architecture, mobile development, and cloud engineering accreditations on the dedicated Certifications page.
            </p>
          </div>

          <Link
            href="/certifications"
            className="px-6 py-3 bg-[#4edea3] text-[#0e1511] font-bold text-sm rounded-xl hover:bg-[#6ffbbe] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#4edea3]/20 flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Award size={18} />
            View Certifications Page
          </Link>
        </div>
      </div>
    </div>
  );
}
