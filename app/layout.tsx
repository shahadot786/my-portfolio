import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AIChat } from "@/components/ai-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MD. Shahadot Hossain - Software Engineer | React & React Native Specialist",
  description:
    "Proficient React Native Developer with 3.7+ years of experience building cross-platform mobile applications for enterprise clients including Unilever, BAT, Nestlé, and Nagad. Specialized in offline-first architecture, real-time tracking, and cutting-edge mobile technologies.",
  keywords:
    "React Native, React, Next.js, TypeScript, JavaScript, Mobile Development, Offline-first, Face Detection, Real-time Tracking, Software Engineer, Full Stack Developer, Unilever, BAT, Nagad",
  authors: [{ name: "MD. Shahadot Hossain" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahadot-hossain.vercel.app",
    title: "MD. Shahadot Hossain - Software Engineer | React & React Native Specialist",
    description: "Building innovative mobile solutions with 3.7+ years of experience serving 10,000+ users with 100,000+ daily transactions",
    siteName: "MD. Shahadot Hossain Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MD. Shahadot Hossain Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. Shahadot Hossain - Software Engineer",
    description: "Building innovative mobile solutions with React Native",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-screen">{children}</main>
          <AIChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
