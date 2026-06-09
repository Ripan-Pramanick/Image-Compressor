import type { Metadata } from 'next';
import { generateMetadata } from '@/config/seo';
import { Shield, Zap, Globe, Lock, Cpu, Code2 } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'About compressora',
  description: 'Learn about compressora - the privacy-first file processing toolkit that runs entirely in your browser.',
  path: '/about',
});

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files never leave your device. All processing happens locally in your browser.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Web Workers for background processing without blocking the UI.',
  },
  {
    icon: Globe,
    title: 'Works Offline',
    description: 'Install as a PWA and use compressora even without an internet connection.',
  },
  {
    icon: Lock,
    title: 'No Accounts',
    description: 'No signup, no login, no tracking. Just tools that work.',
  },
  {
    icon: Cpu,
    title: 'Browser-Native',
    description: 'Leverages modern browser APIs for maximum performance and security.',
  },
  {
    icon: Code2,
    title: 'Open Source',
    description: 'Free and open-source software. Audit the code, trust the process.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About <span className="gradient-text">compressora</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          compressora was born from the frustration of having to upload files to sketchy
          online tools just to compress an image or merge a PDF. We believe your files
          should never leave your device.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="glass rounded-2xl p-6 glass-hover"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="glass rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Philosophy
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400">
            compressora is built on three core principles:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Privacy is a right, not a feature.</strong> Your files contain
              sensitive information. They should stay on your device unless you
              explicitly choose otherwise.
            </li>
            <li>
              <strong>Tools should be accessible.</strong> No accounts, no payments,
              no barriers. Just open the website and start working.
            </li>
            <li>
              <strong>The browser is powerful enough.</strong> Modern browsers can
              handle complex file operations. We harness that power.
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Built With Modern Technology
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'Next.js 15',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'PDF.js',
            'PDF-lib',
            'JSZip',
            'Web Workers',
            'PWA',
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}