import { Bookmark, Check, Award, ExternalLink, ShieldCheck, GraduationCap } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";

export const revalidate = 86400; // Revalidate static cache every 24 hours

interface Experience {
  _id: string;
  company: string;
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

  const verifiedCertificates = certificates.filter(c => c.verified);
  const otherCertificates = certificates.filter(c => !c.verified);

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
                  {exp.title} <span className="text-[#4edea3]">@ {exp.company}</span>
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

      {/* Verified Certifications Section (Stitch Theme Redesign) */}
      {verifiedCertificates.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#3c4a42]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#dde4dd] tracking-tight flex items-center gap-2.5">
              <Award className="text-[#4edea3]" size={22} />
              Verified Credentials & Certifications
            </h2>
            <span className="font-mono text-xs text-[#4cd7f6] bg-[#03b5d3]/10 border border-[#4cd7f6]/30 px-3 py-1 rounded-full">
              {verifiedCertificates.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedCertificates.map((cert) => (
              <a
                key={cert._id}
                href={cert.url || '#'}
                target={cert.url ? "_blank" : undefined}
                rel="noreferrer"
                className={`glass-card p-6 flex flex-col justify-between group hover:border-[#4edea3] transition-all relative overflow-hidden ${!cert.url && 'cursor-default'}`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-[#4cd7f6] bg-[#03b5d3]/10 border border-[#4cd7f6]/30 px-2.5 py-1 rounded-md">
                      {cert.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#4edea3] bg-[#10b981]/10 border border-[#4edea3]/30 px-2.5 py-1 rounded-full">
                      <ShieldCheck size={13} />
                      Verified
                    </span>
                  </div>

                  <h3 className="text-[#dde4dd] font-bold text-lg leading-snug group-hover:text-[#4edea3] transition-colors mb-2">
                    {cert.name}
                  </h3>
                </div>

                {/* Certificate Preview / Image Banner if available */}
                {cert.image && (
                  <div className="my-4 relative w-full h-36 rounded-xl overflow-hidden border border-[#3c4a42] bg-[#09100c]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Footer Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-[#3c4a42] mt-4 text-xs font-mono text-[#94A3B8]">
                  <span>Issued: {cert.date}</span>
                  {cert.url && (
                    <span className="inline-flex items-center gap-1 text-[#4edea3] group-hover:translate-x-1 transition-transform">
                      View Credential <ExternalLink size={12} />
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Professional Development */}
      {otherCertificates.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#3c4a42]">
          <h2 className="text-xl font-bold text-[#dde4dd] tracking-tight flex items-center gap-2">
            <Bookmark size={18} className="text-[#4edea3]" />
            Professional Development
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {otherCertificates.map((cert) => (
              <span
                key={cert._id}
                className="px-3.5 py-2 text-xs font-mono text-[#dde4dd] bg-[#1a211d] border border-[#3c4a42] rounded-xl flex items-center gap-2"
              >
                <Check size={13} className="text-[#4edea3]" />
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
