import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Great_Vibes } from "next/font/google";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getProfile } from "@/lib/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-signature" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot-hossain.vercel.app";

const FALLBACK_META = {
  title: "MD. Shahadot Hossain - Software Engineer",
  description:
    "Software engineer with 5+ years of experience building mobile and web applications for enterprise clients including Unilever, BAT, Nestlé, and Nagad.",
  keywords: [
    "MD. Shahadot Hossain",
    "Shahadot Hossain",
    "Software Engineer",
    "React Native Expert",
    "Mobile App Architect",
    "Full Stack Developer",
    "TypeScript Developer",
    "Offline-first Architecture",
    "Enterprise Mobile Solutions",
    "Bangladesh Software Engineer",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  let profile;
  try {
    profile = await getProfile();
  } catch {
    profile = null;
  }

  const name = profile?.name || "MD. Shahadot Hossain";
  const title = profile?.seo?.title || `${name} - Software Engineer`;
  const description = profile?.seo?.description || FALLBACK_META.description;
  const keywords = profile?.seo?.keywords?.length
    ? profile.seo.keywords
    : FALLBACK_META.keywords;
  const avatarUrl = profile?.avatar?.startsWith("http")
    ? profile.avatar
    : `${SITE_URL}${profile?.avatar || "/avatar.png"}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    alternates: {
      canonical: `${SITE_URL}/`,
    },
    description,
    keywords,
    authors: [{ name }],
    creator: name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      title,
      description,
      siteName: name,
      images: [
        {
          url: avatarUrl,
          width: 800,
          height: 800,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [avatarUrl],
      creator: profile?.socialLinks?.find(s => s.platform?.toLowerCase() === "twitter")?.url
        ? `@${profile.socialLinks.find(s => s.platform?.toLowerCase() === "twitter")!.url.split("/").pop()}`
        : "@shahadot786",
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile;
  try {
    profile = await getProfile();
  } catch {
    profile = null;
  }

  const name = profile?.name || "MD. Shahadot Hossain";
  const avatarUrl = profile?.avatar?.startsWith("http")
    ? profile.avatar
    : `${SITE_URL}${profile?.avatar || "/avatar.png"}`;

  const socialLinks = profile?.socialLinks || [];
  const sameAs = socialLinks.length
    ? socialLinks.map((l: { url: string }) => l.url)
    : [
        "https://github.com/shahadot786",
        "https://www.linkedin.com/in/shahadot786",
        "https://twitter.com/shahadot786",
        "https://youtube.com/@shahadot786",
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: SITE_URL,
    image: avatarUrl,
    sameAs,
    jobTitle: profile?.title || "Software Engineer",
    ...(profile?.currentCompany
      ? {
          worksFor: {
            "@type": "Organization",
            name: profile.currentCompany,
          },
        }
      : {}),
    description:
      profile?.bio?.[0] ||
      "Software Engineer specializing in React Native and Enterprise Mobile Solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile?.location?.split(",")?.[0] || "Dhaka",
      addressCountry: "BD",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${greatVibes.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary min-h-screen transition-colors duration-200`}>
        <ThemeProvider>
          <ClientLayout profile={profile}>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

