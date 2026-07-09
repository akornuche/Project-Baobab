import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WebVitalsMonitor } from '@/components/Analytics/WebVitalsMonitor';
import { GA4Tracker } from '@/components/Analytics/GA4Tracker';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Baobab - Get Things Done in Nigeria',
    template: '%s | Baobab Nigeria',
  },
  description: 'Step-by-step guides, interactive tools, and verified professionals to help Nigerians accomplish administrative, business, and life tasks with confidence.',
  keywords: ['Nigeria', 'guides', 'how to', 'business', 'government', 'education', 'administrative tasks'],
  authors: [{ name: 'Baobab' }],
  creator: 'Baobab',
  publisher: 'Baobab',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: 'Baobab - Get Things Done in Nigeria',
    description: 'Step-by-step guides, interactive tools, and verified professionals to help you accomplish tasks.',
    url: 'https://baobab.ng',
    siteName: 'Baobab Nigeria',
    images: [
      {
        url: 'https://baobab.ng/og-images/baobab-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Baobab - Task Completion Platform for Nigeria',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baobab - Get Things Done in Nigeria',
    description: 'Step-by-step guides and tools to accomplish tasks in Nigeria',
    creator: '@baobab_ng',
    images: ['https://baobab.ng/og-images/baobab-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://baobab.ng',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Baobab',
              url: 'https://baobab.ng',
              logo: 'https://baobab.ng/logo.png',
              description: 'Task-completion platform for Nigeria',
              sameAs: [
                'https://twitter.com/baobab_ng',
                'https://www.instagram.com/baobab_ng',
                'https://www.linkedin.com/company/baobab-ng',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'support@baobab.ng',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <WebVitalsMonitor />
        <GA4Tracker />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-4">© 2024 Baobab Nigeria. All rights reserved.</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <a href="/about" className="hover:text-white">About</a>
              <a href="/contact" className="hover:text-white">Contact</a>
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}