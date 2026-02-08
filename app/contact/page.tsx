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
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">{pageContent?.title || 'Get in Touch'}</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        {pageContent?.subtitle || 'Have a project in mind or want to collaborate?'}
      </p>
      <ContactClient />
    </div>
  );
}
