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
    <div className="container-custom py-4 space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Selected Projects
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{profile.name}</h1>
            <p className="text-lg text-emerald-400 font-medium mt-1">{profile.title}</p>
          </div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 flex-shrink-0">
            <Image
              src="/avatar.png"
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Bio Paragraphs */}
        <div className="glass-card p-6 sm:p-8 space-y-4 text-zinc-300 leading-relaxed text-base">
          {profile.bio.map((para: string, i: number) => (
            <p
              key={i}
              dangerouslySetInnerHTML={{
                __html: para.replace(
                  /(React Native|JavaScript|React.js|Next.js|Redux|Expo|Zustand|TypeScript|Node\.js|Next\.js|Redux|MongoDB|PostgreSQL|Unilever|BAT|Nestlé|Nagad|L'Oréal|offline-first architecture|Full-stack developer at heart|10,000\+ users|100,000\+ daily transactions|4\+ years|5\+ years)/g,
                  '<span class="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">$1</span>',
                ),
              }}
            />
          ))}
        </div>

        {/* CTA & Social Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-emerald-500 text-zinc-950 font-bold text-sm rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold text-sm rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all"
            >
              Get in Touch
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {profile.socialLinks.map((social: SocialLink) => {
              const Icon =
                IconMap[social.icon as keyof typeof IconMap] || IconMap.Globe;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-emerald-500" />
          Endorsements & Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((testimonial: Testimonial) => (
            <div
              key={testimonial._id}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                {testimonial.url ? (
                  <a
                    href={testimonial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-500/30 hover:ring-emerald-400 transition-all flex-shrink-0"
                  >
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                        {testimonial.name[0]}
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-800 flex-shrink-0">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center text-sm">
                        {testimonial.name[0]}
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h3>
                  <p className="text-zinc-500 text-xs">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
