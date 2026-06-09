"use client";

import Link from "next/link";
import { Heart, Github, Shield, Coffee } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                DEVORA LABS
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Privacy-first file processing toolkit. Your files stay on your
              device.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/image-compressor"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf-compressor"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/merge-pdf"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Merge PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear} DEVORA LABS</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500" /> for privacy
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ripan-Pramanick/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Shield className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
