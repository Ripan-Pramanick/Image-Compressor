"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800 bg-white dark:bg-[#0F172A] mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Identity */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image 
                src="/logo.png" 
                alt="Compressora Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Compressora
              </span>
            </Link>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium mb-1">
              Compress Files Faster. Save More Space.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-semibold tracking-wide uppercase mt-4">
              A Product of Devora Labs
            </p>
          </div>

          {/* Links - Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/image-compressor"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf-compressor"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/merge-pdf"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/split-pdf"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  Split PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A855F7] transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Compressora. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Ripan-Pramanick/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}