import { Metadata } from 'next';

const SITE_URL = 'https://compressora.vercel.app/';
const SITE_NAME = 'Compressora'; // টাইটেলের জন্য নাম আপডেট করা হয়েছে

export function generateMetadata({
  title,
  description,
  path = '',
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    // Favicon এখানে অ্যাড করা হলো
    icons: {
      icon: '/logo.png', 
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: images.length > 0 ? images : [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images : ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateToolSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${name} - ${SITE_NAME}`,
    description,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}