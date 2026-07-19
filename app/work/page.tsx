import { Bookmark, Check } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";

export const dynamic = "force-dynamic";

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
  const res = await fetch(`${API_BASE_URL}/experiences`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.experiences;
}

async function getEducation(): Promise<Education[]> {
  const res = await fetch(`${API_BASE_URL}/education`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.education;
}

async function getCertificates(): Promise<Certificate[]> {
  const res = await fetch(`${API_BASE_URL}/certificates`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.certificates;
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
    <div className="container-custom py-4 space-y-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Career & Impact
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">{pageContent?.title || 'Employment History'}</h1>
        <p className="text-zinc-400 mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'Over 4+ years building high-impact mobile platforms and scalable systems for global enterprise clients.'}
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp: Experience, index: number) => (
          <div
            key={index}
            className="glass-card p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{exp.location}</span>
                <h2 className="text-xl font-bold text-white">
                  {exp.title} <span className="text-emerald-400">@ {exp.company}</span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-semibold px-3 py-1 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
                  {exp.period}
                </span>
                {exp.isCurrent && (
                  <span className="badge-primary">Current Role</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm mb-5 leading-relaxed">
              {exp.description}
            </p>

            {/* Achievements */}
            <ul className="space-y-2 mb-6">
              {exp.achievements.map((achievement: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-zinc-300 text-xs sm:text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-medium text-zinc-300 bg-zinc-950/60 border border-zinc-800 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Higher Education Section */}
      {education.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-zinc-800/80">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="text-emerald-400" size={18} />
            Higher Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu._id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                    <p className="text-emerald-400 text-sm font-semibold">{edu.institution}</p>
                  </div>
                  <span className="text-zinc-500 text-xs font-semibold px-2.5 py-1 bg-zinc-950/60 rounded-lg border border-zinc-800/80">{edu.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="text-zinc-400 text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Credentials */}
      {verifiedCertificates.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-zinc-800/80">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="text-emerald-400" size={18} />
            Verified Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedCertificates.map((cert) => (
              <a
                key={cert._id}
                href={cert.url || '#'}
                target={cert.url ? "_blank" : undefined}
                rel="noreferrer"
                className={`glass-card overflow-hidden flex flex-col group ${!cert.url && 'cursor-default'}`}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[1.58/1] bg-zinc-950 flex items-center justify-center overflow-hidden">
                  {cert.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-50 p-6 text-center text-zinc-400">
                      <Bookmark size={32} />
                      <span className="text-xs font-bold uppercase tracking-widest">Certificate Preview</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-1 bg-zinc-900/40 border-t border-zinc-800/60">
                  <h3 className="text-white font-bold text-sm leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {cert.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-zinc-500 text-xs font-medium">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.verified && (
                      <Check size={16} className="text-emerald-400" />
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Professional Development */}
      {otherCertificates.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-800/80">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Professional Development
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCertificates.map((cert) => (
              <span
                key={cert._id}
                className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-2"
              >
                <Bookmark size={12} className="text-emerald-400" />
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
