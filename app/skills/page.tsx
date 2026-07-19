import { API_BASE_URL } from "@/config/api";
import { IconMap } from "@/lib/icons";
import { getPageContent } from "@/lib/pages";

export const dynamic = "force-dynamic";

interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.skills || [];
  } catch {
    return [];
  }
}

export default async function SkillsPage() {
  const [skillCategories, pageContent] = await Promise.all([
    getSkillCategories(),
    getPageContent('skills')
  ]);

  return (
    <div className="container-custom py-8 space-y-12">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium mb-3">
          Technical Expertise & Core Stack
        </span>
        <h1 className="text-4xl font-extrabold text-[#dde4dd] tracking-tight">{pageContent?.title || 'Technical Skills'}</h1>
        <p className="text-[#bbcabf] mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'A comprehensive overview of technologies, frameworks, and architecture principles I work with daily.'}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillCategories.map((category: SkillCategory, index: number) => {
          const Icon = IconMap[category.icon] || IconMap.Code2;
          return (
            <div key={index} className="glass-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#dde4dd]">
                  {category.title}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(category.skills || []).map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs rounded-lg hover:border-[#4edea3] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-[#3c4a42] pt-8">
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold text-[#dde4dd] mb-3">Engineering Philosophy</h3>
          <p className="text-[#bbcabf] text-sm leading-relaxed">
            I prioritize <span className="text-[#4edea3] font-semibold">clean architecture</span>,
            <span className="text-[#4edea3] font-semibold"> offline resilience</span>, and
            <span className="text-[#4edea3] font-semibold"> user performance</span>.
            Every system decision is engineered for extreme scalability, data integrity, and high operational reliability.
          </p>
        </div>
      </div>
    </div>
  );
}
