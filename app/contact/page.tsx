import ContactClient from "./ContactClient";
import { getPageContent } from "@/lib/pages";
import { getProfile } from "@/lib/profile";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400; // Revalidate static cache every 24 hours

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("contact");
  const title = pageContent?.title || "Get in Touch";
  const description =
    pageContent?.subtitle ||
    "Get in touch with MD. Shahadot Hossain for software development projects, collaborations, or inquiries.";

  return {
    title,
    description,
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
      canonical: `${SITE_URL}/contact/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/contact/`,
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const [pageContent, profile] = await Promise.all([
    getPageContent('contact'),
    getProfile(),
  ]);
  return (
    <div className="container-custom py-8 space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium mb-3">
          {pageContent?.badge || 'Communication Channels & Collaboration'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">{pageContent?.title || 'Get in Touch'}</h1>
        <p className="text-muted-foreground mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'Have a project in mind, need technical advisory, or want to collaborate? Reach out directly.'}
        </p>
      </div>

      <ContactClient profile={profile} />
    </div>
  );
}
