import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navigation } from '@/components/navigation';
import { AIChat } from '@/components/ai-chat';
import { CommandPalette } from '@/components/command-palette';
import { AchievementSystem } from '@/components/achievement-system';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MD Shahadot Hossain - Full Stack Developer & React Native Expert',
  description: 'Portfolio of MD Shahadot Hossain - Building fast, offline-friendly mobile experiences with React Native & modern web technologies',
  keywords: 'React Native, Full Stack Developer, Mobile Development, Web Development, TypeScript, JavaScript',
  authors: [{ name: 'MD Shahadot Hossain' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shahadot.dev',
    title: 'MD Shahadot Hossain - Full Stack Developer',
    description: 'Building fast, offline-friendly mobile experiences',
    siteName: 'MD Shahadot Hossain Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MD Shahadot Hossain Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Shahadot Hossain - Full Stack Developer',
    description: 'Building fast, offline-friendly mobile experiences',
    images: ['/og-image.png'],
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
          <main className="min-h-screen">
            {children}
          </main>
          <AIChat />
        </ThemeProvider>
      </body>
    </html>
  );
}