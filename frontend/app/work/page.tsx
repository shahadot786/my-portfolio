import { Bookmark } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

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

async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${API_BASE_URL}/experiences`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.experiences;
}

export default async function WorkPage() {
  const experiences = await getExperiences();
  // Using seed data or fallback
  const trainingCertificates = [
    "React Native Specialized Development",
    "Advanced Mobile App Architecture",
    "Web Design & Interface Engineering",
    "Enterprise System Security & Auth",
    "JavaScript (Intermediate) - HackerRank",
  ];

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
