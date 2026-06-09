'use client';

import { PdfMerger } from '@/components/tools/PdfMerger';

export default function MergePdfPage() {
      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Merge PDF
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Combine multiple PDF files into a single document
                  </p>
                  <PdfMerger />
            </div>
      );
}