import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/sections/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://shahadot-hossain.vercel.app"),
  title: {
    default: "MD. Shahadot Hossain - Software Engineer",
    template: "%s | MD. Shahadot Hossain",
  },
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/",
  },
  description:
    "I am a software engineer based in Bangladesh with 4+ years of experience building mobile and web applications for enterprise clients including Unilever, BAT, Nestlé, and Nagad.",
  keywords: [
    "MD. Shahadot Hossain",
    "Shahadot Hossain",
    "Software Engineer",
    "React Native Expert",
    "Mobile App Architect",
    "Full Stack Developer",
    "TypeScript Developer",
    "React Native Portfolio",
    "Offline-first Architecture",
    "Enterprise Mobile Solutions",
    "Node.js Backend Engineer",
    "Bangladesh Software Engineer",
    "Next.js Developer",
    "iOS and Android Development",
    "Scalable Web Applications",
    "Real-time Tracking Systems",
    "Redux Toolkit",
    "JavaScript Specialist",
    "GraphQL APIs",
    "Unilever Tech Partner",
  ],
  authors: [{ name: "MD. Shahadot Hossain" }],
  creator: "MD. Shahadot Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahadot-hossain.vercel.app",
    title: "MD. Shahadot Hossain - Software Engineer",
    description:
      "Building innovative mobile solutions with 4+ years of experience serving 10,000+ users",
    siteName: "MD. Shahadot Hossain",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "MD. Shahadot Hossain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. Shahadot Hossain - Software Engineer",
    description: "Building innovative mobile solutions with React Native",
    images: ["/avatar.png"],
    creator: "@shahadot786",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "a-5BJSKJLu9OAQmVs_PhfvWCYxISpzm2IeOnCywvN_0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MD. Shahadot Hossain",
    url: "https://shahadot-hossain.vercel.app",
    image: "https://shahadot-hossain.vercel.app/avatar.png",
    sameAs: [
      "https://github.com/shahadot786",
      "https://www.linkedin.com/in/shahadot786",
      "https://twitter.com/shahadot786",
      "https://youtube.com/@shahadot786",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "HawkEyes Digital Monitoring",
    },
    description: "Software Engineer specializing in React Native and Enterprise Mobile Solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-24 pb-24 md:pb-16">{children}</main>
      </body>
    </html>
  );
}
