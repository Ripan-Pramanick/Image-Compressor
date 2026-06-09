import type { Metadata } from 'next';
import { generateMetadata } from '@/config/seo';
import { Shield, Eye, Server, Cookie, Lock } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'compressora privacy policy. Your files never leave your device. No tracking, no accounts, no servers.',
  path: '/privacy',
});

const sections = [
  {
    icon: Shield,
    title: 'Your Files Stay On Your Device',
    content: 'compressora processes all files locally in your browser. Your files are never uploaded to any server. We have no servers to receive your files. Everything happens right on your device.',
  },
  {
    icon: Eye,
    title: 'No Tracking or Analytics',
    content: 'We don\'t use any analytics tools, tracking pixels, or monitoring services. We have no way to know who uses compressora or how they use it. Your activity is completely private.',
  },
  {
    icon: Server,
    title: 'Local Storage Only',
    content: 'The only data we store is in your browser\'s LocalStorage: your theme preference, language preference, and processing history. This data never leaves your device.',
  },
  {
    icon: Cookie,
    title: 'No Cookies (Except Essential)',
    content: 'compressora doesn\'t use tracking cookies or third-party cookies. The only cookie we might use is for storing your theme preference, which is strictly functional.',
  },
  {
    icon: Lock,
    title: 'No Account Required',
    content: 'compressora doesn\'t have user accounts. There\'s no signup, no login, and no personal information collected. You can use all features immediately and anonymously.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <Shield className="w-16 h-16 text-primary-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          compressora is designed from the ground up to protect your privacy.
          Here's exactly how we handle your data.
        </p>
        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            No data collection whatsoever
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <section.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About Privacy?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Since compressora is open source, you can audit our code yourself to verify
          our privacy claims.
        </p>
        {/* <a
          href="https://github.com/compressora/compressora"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          View Source Code
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a> */}
      </div>
    </div>
  );
}