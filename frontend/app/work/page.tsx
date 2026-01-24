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
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">{pageContent?.title || 'Employment History'}</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        {pageContent?.subtitle || 'Here is a brief overview of my employment history.'}
      </p>

      {/* Experience Timeline */}
      <div className="space-y-12 mb-20">
        {experiences.map((exp: Experience, index: number) => (
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
                {exp.isCurrent && (
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
              {exp.achievements.map((achievement: string, i: number) => (
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
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Higher Education Section */}
      <div className="border-t border-zinc-800 pt-16 mb-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Bookmark className="text-primary" size={20} />
          Higher Education
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu._id} className="bg-zinc-950/20 p-8 rounded-3xl border border-zinc-900">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-zinc-500">{edu.institution}</p>
                </div>
                <span className="text-zinc-600 text-sm font-medium">{edu.period}</span>
              </div>
              <ul className="space-y-1.5">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="text-zinc-500 text-sm flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Credentials */}
      {verifiedCertificates.length > 0 && (
        <div className="border-t border-zinc-800 pt-16 mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Bookmark className="text-emerald-500" size={20} />
            Verified Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedCertificates.map((cert) => (
              <a
                key={cert._id}
                href={cert.url || '#'}
                target={cert.url ? "_blank" : undefined}
                rel="noreferrer"
                className={`group relative flex flex-col overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/50 hover:border-zinc-700 transition-all ${!cert.url && 'cursor-default'}`}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[1.58/1] bg-white text-black flex items-center justify-center overflow-hidden">
                  {cert.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-50 p-6 text-center">
                      <Bookmark size={32} />
                      <span className="text-xs font-bold uppercase tracking-widest">Certificate Preview</span>
                    </div>
                  )}

                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-1 border-t border-zinc-900 bg-zinc-900/30">
                  <h3 className="text-white font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {cert.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-zinc-500 text-xs font-medium">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.verified && (
                      <Check size={16} className="text-emerald-500" />
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
        <div className="border-t border-zinc-800 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            Professional development
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCertificates.map((cert) => (
              <span
                key={cert._id}
                className="tag py-2 px-3 text-sm border-zinc-800 hover:text-white transition-all cursor-default flex items-center gap-2"
              >
                <Bookmark size={12} className="text-zinc-600" />
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
