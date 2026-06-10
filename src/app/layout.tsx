import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import ToasterClient from '@/components/ui/ToasterClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Compressora - Free Image Compressor & PDF Tools',
    template: '%s | compressora',
  },
  description: 'Free image compressor, PDF compressor, JPG to PDF, Merge PDF and more. Fast, secure and privacy-friendly.',
  keywords: ['file processing', 'image compression', 'pdf compression', 'privacy', 'browser tools'],
  authors: [{ name: 'compressora' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'compressora',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'compressora',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Privacy-first file processing toolkit. All processing happens locally in your browser.',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={schema} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                                                                                                                                                                                                  try {
                                                                                                                                                                                                                  if (localStorage.getItem('compressora-preferences')) {
                                                                                                                                                                                                                                    const prefs = JSON.parse(localStorage.getItem('compressora-preferences'));
                                                                                                                                                                                                                                                      if (prefs.theme === 'dark' || (prefs.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                                                                                                                                                                                                                                                          document.documentElement.classList.add('dark');
                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                document.documentElement.classList.remove('dark');
                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                                                                                                                                                                                                                                                                                                                                                    document.documentElement.classList.add('dark');
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                  } catch (e) {}
                                                                                                                                                                                                                                                                                                                                                                                                              `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ToasterClient />
      </body>
    </html>
  );
}