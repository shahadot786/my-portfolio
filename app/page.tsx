import { Github, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MD. Shahadot Hossain - Software Engineer",
  description:
    "Software Engineer specializing in React Native and Enterprise Mobile Solutions with 4+ years of experience.",
};

// Your data - preserved from original portfolio
const socialLinks = [

  { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/shahadot786",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com/shahadot786", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@shahadot786", label: "YouTube" },
  { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
];

const testimonials = [
  {
    name: "Saif Uddin",
    title: "Project Manager at Unilever",
    content:
      "Shahadot delivered exceptional mobile solutions for our field operations. His offline-first architecture reduced data loss by 92% and improved our territory management efficiency significantly. The app now serves 10,000+ users with 100,000+ daily transactions.",
  },
  {
    name: "Arifur Rahman Munna",
    title: "Sr. Engineer at HawkEyes",
    content:
      "Working with Shahadot has been a great experience. His expertise in React Native and TypeScript, combined with his deep understanding of enterprise-scale mobile applications, makes him an invaluable team member. He consistently delivers high-quality code.",
  },
];

export default function Home() {
  return (
    <div className="container-custom">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-white mb-2">
          MD. Shahadot Hossain
        </h1>
        <p className="text-zinc-400 mb-8">Software Engineer</p>

        {/* Bio */}
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>
            I am a software engineer based in Bangladesh 🇧🇩. I have{" "}
            <span className=" font-medium text-primary">4+ years</span> of
            experience building mobile and web applications for enterprise
            clients. I have worked with companies like{" "}
            <span className="text-primary font-medium">Unilever</span>,{" "}
            <span className="text-primary font-medium">BAT</span>,{" "}
            <span className="text-primary font-medium">Nestlé</span>, and{" "}
            <span className="text-primary font-medium">Nagad</span>.

          </p>

          <p>
            Over the years, I have worked with a variety of technologies
            including{" "}
            <span className="text-primary font-medium">
              React Native, TypeScript, Node.js, Next.js, Redux, MongoDB,
              PostgreSQL
            </span>
            , and many others. I specialize in{" "}
            <span className="text-primary font-medium">
              offline-first architecture
            </span>
            , real-time tracking systems, and building scalable mobile
            ecosystems.
          </p>

          <p>
            I am a{" "}
            <span className="text-primary font-medium">
              Full-stack developer at heart
            </span>{" "}
            with expertise in all parts of the stack including the frontend,
            backend, databases, and cloud. Taking rough problem statements and
            turning them into polished products is my specialty.
          </p>

          <p>
            Currently, I work at{" "}
            <Link href="/work" className="link text-primary font-medium">
              HawkEyes Digital Monitoring
            </Link>{" "}
            where I architect and develop enterprise mobile applications serving
            Fortune 500 companies. My work has impacted{" "}
            <span className="text-primary font-medium">10,000+ users</span>{" "}
            with{" "}
            <span className="text-primary font-medium">
              100,000+ daily transactions
            </span>
            .
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-8 pt-8 border-t border-zinc-800">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link flex items-center gap-2 text-sm"
              aria-label={social.label}
            >
              <social.icon size={18} />
              <span className="hidden sm:inline">{social.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-medium">
                  {testimonial.name[0]}
                </div>
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
            <a
              href="mailto:shahadotrahat786@gmail.com"
              className="link text-primary font-medium"
            >
              email me
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
