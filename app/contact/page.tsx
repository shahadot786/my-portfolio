import ContactClient from "./ContactClient";

export const metadata = {
    title: "Contact - MD. Shahadot Hossain",
    description: "Get in touch with MD. Shahadot Hossain for software development projects, collaborations, or inquiries.",
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

export default function ContactPage() {
    return (
        <div className="container-custom">
            <h1 className="text-3xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-zinc-400 mb-12 leading-relaxed">
                Have a project in mind or want to collaborate? Feel free to reach out
                through any of the channels below or use the contact form.
            </p>
            <ContactClient />
        </div>
    );
}
