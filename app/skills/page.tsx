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
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">{pageContent?.title || 'Technical Skills'}</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        {pageContent?.subtitle || 'A comprehensive overview of technologies and tools I work with.'}
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {skillCategories.map((category: SkillCategory, index: number) => {
          const Icon = IconMap[category.icon] || IconMap.Code2;
          return (
            <div key={index} className="card group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  {category.title}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(category.skills || []).map((skill: string) => (
                  <span key={skill} className="tag hover:border-primary/50 hover:text-white transition-all cursor-default text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-zinc-800 pt-8">
        <div className="card bg-zinc-900/50">
          <h3 className="text-lg font-semibold text-white mb-3">Professional Philosophy</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            I prioritize <span className="text-primary font-medium">clean code</span>,
            <span className="text-primary font-medium">performance</span>, and
            <span className="text-primary font-medium"> user experience</span>.
            My technical decisions are driven by the goals of high scalability,
            maintainability, and providing tangible value to stakeholders.
          </p>
        </div>
      </div>
    </div>
  );
}
