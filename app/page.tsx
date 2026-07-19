import Link from "next/link";
import { API_BASE_URL } from "@/config/api";
import { IconMap } from "@/lib/icons";
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
  bio: string[];
  socialLinks: SocialLink[];
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

async function getProfile(): Promise<Profile | null> {
  const res = await fetch(`${API_BASE_URL}/profile`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.profile;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE_URL}/testimonials`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.testimonials;
}

export default async function Home() {
  const profile = await getProfile();
  const testimonials = await getTestimonials();

  if (!profile) return <div>Error loading profile...</div>;

  return (
    <div className="container-custom pb-8 space-y-20 relative">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4edea3]/5 blur-[120px] pointer-events-none z-[-1]" />

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium">
              Available for new opportunities
            </span>
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
                    /(React Native|JavaScript|React.js|Next.js|Redux|Expo|Zustand|TypeScript|Node\.js|Next\.js|Redux|MongoDB|PostgreSQL|Unilever|BAT|Nestlé|Nagad|L'Oréal|offline-first architecture|Full-stack developer at heart|10,000\+ users|100,000\+ daily transactions|4\+ years|5\+ years)/g,
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
              className="px-6 py-3 bg-[#4edea3] text-[#0e1511] font-bold text-sm rounded-lg hover:bg-[#6ffbbe] transition-all shadow-[0_0_20px_rgba(78,222,163,0.3)] active:scale-95"
            >
              Get in touch
            </Link>

            <a
              href="https://github.com/shahadot786"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-transparent border border-[#3c4a42] text-[#dde4dd] hover:border-[#4edea3] hover:text-[#4edea3] font-mono text-xs rounded-lg transition-all flex items-center gap-2"
            >
              <IconMap.Github size={16} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/shahadot786"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-transparent border border-[#3c4a42] text-[#dde4dd] hover:border-[#4edea3] hover:text-[#4edea3] font-mono text-xs rounded-lg transition-all flex items-center gap-2"
            >
              <IconMap.Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Profile Image & Floating Tech Badges */}
        <div className="flex-shrink-0 relative w-72 h-72 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
          <div className="absolute inset-0 bg-[#4edea3]/25 rounded-full blur-3xl z-[-1]" />
          
          {/* Glowing Green Marquee Light Border */}
          <div className="glowing-marquee-wrapper w-full h-full">
            <div className="relative w-full h-full rounded-[1.1rem] overflow-hidden bg-[#09100c]">
              <Image
                src={profile.avatar || "/avatar.png"}
                alt={profile.name}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute -bottom-3 -left-3 bg-[#0B0E14] border border-[#3c4a42] rounded-lg p-2.5 shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <div className="font-mono text-xs text-[#dde4dd]">React Native</div>
          </div>
          <div className="absolute -top-3 -right-3 bg-[#0B0E14] border border-[#3c4a42] rounded-lg p-2.5 shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6]" />
            <div className="font-mono text-xs text-[#dde4dd]">TypeScript</div>
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
                <span className="text-[#4edea3] text-xl font-bold font-mono">EA</span>
              </div>
              <h4 className="text-xl font-bold text-[#dde4dd] mb-3">Enterprise Architecture</h4>
              <p className="text-[#bbcabf] text-sm leading-relaxed mb-6">
                Currently working at HawkEyes Digital Monitoring, architecting enterprise mobile applications serving Fortune 500 companies like Unilever, BAT, Nestlé, and L&apos;Oréal. Specializing in taking rough problem statements and turning them into polished, scalable products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#3c4a42] pt-4 mt-auto">
              <div>
                <div className="text-2xl font-extrabold text-[#dde4dd]">10k+</div>
                <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#dde4dd]">100k+</div>
                <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">Daily Txns</div>
              </div>
            </div>
          </div>

          {/* Secondary Bento Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="glass-card p-6">
              <div className="w-10 h-10 bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[#4cd7f6] font-mono font-bold text-xs">OFF</span>
              </div>
              <h4 className="text-base font-bold text-[#dde4dd] mb-1">Offline-First</h4>
              <p className="text-[#bbcabf] text-xs leading-relaxed">
                Designing robust systems that function seamlessly in low-connectivity environments, reducing data loss and improving field efficiency.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-10 h-10 bg-[#bec6e0]/10 border border-[#bec6e0]/30 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[#bec6e0] font-mono font-bold text-xs">RT</span>
              </div>
              <h4 className="text-base font-bold text-[#dde4dd] mb-1">Real-Time Systems</h4>
              <p className="text-[#bbcabf] text-xs leading-relaxed">
                Implementing high-performance tracking and monitoring solutions for enterprise logistics and territory management.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["JavaScript", "TypeScript", "React.js", "Next.js", "React Native", "Redux", "Zustand", "MongoDB"].map((tech) => (
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
