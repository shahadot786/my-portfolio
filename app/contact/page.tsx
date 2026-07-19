import ContactClient from "./ContactClient";
import { getPageContent } from "@/lib/pages";

export const metadata = {
  title: "Contact - MD. Shahadot Hossain",
  description:
    "Get in touch with MD. Shahadot Hossain for software development projects, collaborations, or inquiries.",
  keywords: [
    "Contact Shahadot Hossain",
    "Hire React Native Developer",
    "Software Engineer Bangladesh Contact",
    "Freelance Mobile Developer",
    "Project Collaboration",
    "Enterprise Software Inquiry",
    "Tech Consultant Bangladesh",
    "Professional Software Services",
  ],
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/contact/",
  },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const pageContent = await getPageContent('contact');
  return (
    <div className="container-custom py-8 space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium mb-3">
          Communication Channels & Collaboration
        </span>
        <h1 className="text-4xl font-extrabold text-[#dde4dd] tracking-tight">{pageContent?.title || 'Get in Touch'}</h1>
        <p className="text-[#bbcabf] mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'Have a project in mind, need technical advisory, or want to collaborate? Reach out directly.'}
        </p>
      </div>

      <ContactClient />
    </div>
  );
}
