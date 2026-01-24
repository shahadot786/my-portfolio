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
  featured: boolean;
}

async function getProfile(): Promise<Profile | null> {
  const res = await fetch(`${API_BASE_URL}/profile`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.profile;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE_URL}/testimonials`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.testimonials;
}

export default async function Home() {
  const profile = await getProfile();
  const testimonials = await getTestimonials();

  if (!profile) return <div>Error loading profile...</div>;

  return (
    <div className="container-custom">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-white mb-2">
          {profile.name}
        </h1>
        <p className="text-zinc-400 mb-8">{profile.title}</p>

        {/* Bio */}
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          {profile.bio.map((para: string, i: number) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: para.replace(/(React Native|TypeScript|Node\.js|Next\.js|Redux|MongoDB|PostgreSQL|Unilever|BAT|Nestlé|Nagad|offline-first architecture|Full-stack developer at heart|10,000\+ users|100,000\+ daily transactions|4\+ years)/g, '<span class="text-primary font-medium">$1</span>')
            }} />
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-8 pt-8 border-t border-zinc-800">
          {profile.socialLinks.map((social: SocialLink) => {
            const Icon = IconMap[social.icon as keyof typeof IconMap] || IconMap.Globe;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link flex items-center gap-2 text-sm"
                aria-label={social.platform}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{social.platform}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial: Testimonial) => (
            <div key={testimonial._id} className="testimonial-card rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                {testimonial.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-medium">
                    {testimonial.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-medium text-sm">
                    {testimonial.name}
                  </h3>
                  <p className="text-zinc-500 text-xs">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-zinc-400 text-sm">
            If you want to get in touch, feel free to{" "}
            <Link
              href="/contact"
              className="link text-primary font-medium"
            >
              email me
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
