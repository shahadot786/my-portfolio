import Link from "next/link";
import { API_BASE_URL } from "@/config/api";
import Image from "next/image";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Profile {
  name: string;
  title: string;
  avatar?: string;
  availabilityBadge?: string;
  isAvailable?: boolean;
  bio: string[];
  socialLinks: SocialLink[];
}

interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  badge?: string;
  description?: string;
  skills: string[];
  order: number;
}

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  content: string;
  image?: string;
  url?: string;
  featured: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: "MD. Shahadot Hossain",
  title: "Enterprise Mobile Architect & Full Stack Engineer",
  avatar: "/avatar.png",
  availabilityBadge: "Available for new opportunities",
  isAvailable: true,
  bio: [
    "Software Engineer with 4+ years of experience specializing in React Native, TypeScript, and enterprise mobile solutions.",
    "Proven track record of building offline-first applications serving 10,000+ users and 100,000+ daily transactions for Fortune 500 clients like Unilever, BAT, Nestlé, and Nagad."
  ],
  socialLinks: []
};

const DEFAULT_SKILL_CATEGORIES: SkillCategory[] = [
  {
    _id: "1",
    title: "Enterprise Architecture",
    badge: "EA",
    icon: "Code2",
    description: "Currently working at HawkEyes Digital Monitoring, architecting enterprise mobile applications serving Fortune 500 companies like Unilever, BAT, Nestlé, and L'Oréal. Specializing in taking rough problem statements and turning them into polished, scalable products.",
    skills: ["React Native", "TypeScript", "Enterprise Architecture", "10k+ Active Users", "100k+ Daily Txns"],
    order: 0
  },
  {
    _id: "2",
    title: "Offline-First",
    badge: "OFF",
    icon: "Smartphone",
    description: "Designing robust systems that function seamlessly in low-connectivity environments, reducing data loss and improving field efficiency.",
    skills: ["Offline Architecture", "SQLite", "Data Sync"],
    order: 1
  },
  {
    _id: "3",
    title: "Real-Time Systems",
    badge: "RT",
    icon: "Server",
    description: "Implementing high-performance tracking and monitoring solutions for enterprise logistics and territory management.",
    skills: ["Node.js", "Next.js", "MongoDB", "Real-time Tracking"],
    order: 2
  }
];

export const revalidate = 86400; // Revalidate static cache every 24 hours

async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { next: { revalidate: 86400 } });
    if (!res.ok) return DEFAULT_PROFILE;
    const data = await res.json();
    return data.profile || DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`, { next: { revalidate: 86400 } });
    if (!res.ok) return DEFAULT_SKILL_CATEGORIES;
    const data = await res.json();
    return data.skills?.length > 0 ? data.skills : DEFAULT_SKILL_CATEGORIES;
  } catch {
    return DEFAULT_SKILL_CATEGORIES;
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.testimonials || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [profile, testimonials, skillCategories] = await Promise.all([
    getProfile(),
    getTestimonials(),
    getSkillCategories()
  ]);

  const featuredCategory = skillCategories[0] || DEFAULT_SKILL_CATEGORIES[0];
  const secondaryCategories = skillCategories.length > 1 ? skillCategories.slice(1) : DEFAULT_SKILL_CATEGORIES.slice(1);
  const allSkills = Array.from(
    new Set(
      skillCategories.flatMap((c) => c.skills || [])
    )
  );
  const displayTechStack = allSkills.length > 0
    ? allSkills
    : ["JavaScript", "TypeScript", "React.js", "Next.js", "React Native", "Redux", "Zustand", "MongoDB"];

  return (
    <div className="container-custom pb-8 space-y-20 relative">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4edea3]/5 blur-[120px] pointer-events-none z-[-1]" />

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            {profile.isAvailable !== false && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium">
                {profile.availabilityBadge || "Available for new opportunities"}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#dde4dd] tracking-tight leading-tight">
              {profile.name}
            </h1>
            <h2 className="text-xl sm:text-2xl text-[#94A3B8] font-semibold">
              {profile.title}
            </h2>
          </div>

          <div className="space-y-3 text-[#bbcabf] leading-relaxed text-base">
            {profile.bio.map((para: string, i: number) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /(React Native|JavaScript|React.js|Next.js|Redux|Expo|Zustand|TypeScript|Node\.js|Next\.js|Redux|MongoDB|PostgreSQL|Unilever|BAT|Nestlé|Nagad|L'Oréal|iBox Lab Limited|iBox Lab|offline-first architecture|Full-stack developer at heart|10,000\+ users|100,000\+ daily transactions|4\+ years|5\+ years)/g,
                    '<span class="text-[#4edea3] font-semibold bg-[#4edea3]/10 px-1.5 py-0.5 rounded border border-[#4edea3]/20">$1</span>',
                  ),
                }}
              />
            ))}
          </div>

          {/* CTA & Social Links (Hero section: Get in touch, GitHub, LinkedIn) */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#4edea3] text-[#0e1511] font-bold text-sm rounded-xl hover:bg-[#6ffbbe] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#4edea3]/20"
            >
              Get in Touch
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-[#1a211d] border border-[#3c4a42] text-[#dde4dd] font-semibold text-sm rounded-xl hover:border-[#4edea3] hover:text-[#4edea3] transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Hero Photo / Avatar */}
        <div className="relative group/avatar shrink-0">
          <div className="glowing-marquee-wrapper p-1 rounded-3xl overflow-hidden shadow-2xl shadow-[#4edea3]/10">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[22px] overflow-hidden bg-[#09100c]">
              <Image
                src={profile.avatar || "/avatar.png"}
                alt={profile.name}
                fill
                className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Overview (Stitch Bento Grid) */}
      <section className="space-y-6 pt-4 border-t border-[#3c4a42]/60">
        <div>
          <h3 className="text-2xl font-bold text-[#dde4dd] tracking-tight">Technical Expertise</h3>
          <div className="w-12 h-1 bg-[#4edea3] rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enterprise Architecture Bento Card */}
          <div className="lg:col-span-2 glass-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#4edea3]/10 border border-[#4edea3]/30 rounded-xl flex items-center justify-center mb-6">
                <span className="text-[#4edea3] text-xl font-bold font-mono">
                  {featuredCategory.badge || featuredCategory.icon || "EA"}
                </span>
              </div>
              <h4 className="text-xl font-bold text-[#dde4dd] mb-3">{featuredCategory.title}</h4>
              <p className="text-[#bbcabf] text-sm leading-relaxed mb-6">
                {featuredCategory.description || "Architecting enterprise mobile applications serving Fortune 500 companies and building offline-first systems."}
              </p>
            </div>

            {featuredCategory.skills && featuredCategory.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-[#3c4a42] pt-4 mt-auto">
                {featuredCategory.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Secondary Bento Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            {secondaryCategories.map((cat, idx) => (
              <div key={cat._id || idx} className="glass-card p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-[#4cd7f6] font-mono font-bold text-xs">
                      {cat.badge || cat.icon || `0${idx + 1}`}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#dde4dd] mb-1">{cat.title}</h4>
                  {cat.description && (
                    <p className="text-[#bbcabf] text-xs leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                </div>
                {cat.skills && cat.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-[#3c4a42]/40">
                    {cat.skills.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-[#10b981]/10 border border-[#4edea3]/20 text-[#4edea3] font-mono text-[10px] rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {displayTechStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs rounded-lg">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-6 pt-4 border-t border-[#3c4a42]/60">
        <div>
          <h3 className="text-2xl font-bold text-[#dde4dd] tracking-tight">Professional Recommendations</h3>
          <div className="w-12 h-1 bg-[#4edea3] rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial: Testimonial) => (
            <div
              key={testimonial._id}
              className="glass-card p-6 flex flex-col justify-between relative"
            >
              <p className="text-[#bbcabf] text-xs sm:text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#3c4a42]">
                {testimonial.url ? (
                  <a
                    href={testimonial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-10 h-10 rounded-full overflow-hidden border border-[#4edea3]/40 hover:border-[#4edea3] transition-all flex-shrink-0"
                  >
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#4edea3]/20 text-[#4edea3] font-bold flex items-center justify-center text-sm">
                        {testimonial.name[0]}
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#3c4a42] flex-shrink-0">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a211d] text-[#dde4dd] font-bold flex items-center justify-center text-sm">
                        {testimonial.name[0]}
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <h4 className="text-[#dde4dd] font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#94A3B8] text-xs font-mono">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
