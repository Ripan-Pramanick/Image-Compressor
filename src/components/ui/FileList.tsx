'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileWithMetadata } from '@/types/file';
import { formatBytes, calculateCompressionRatio } from '@/lib/utils';
import { File, X, Check, AlertCircle, Loader2, Download } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface FileListProps {
  files: FileWithMetadata[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onDownload?: (file: FileWithMetadata) => void;
  showActions?: boolean;
}

export function FileList({
  files,
  onRemove,
  onClear,
  onDownload,
  showActions = true,
}: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </h3>
        {showActions && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                {/* File Icon or Preview */}
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <File className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {file.extension}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatBytes(file.size)}
                    </span>

                    {file.status === 'completed' && file.processedSize && (
                      <>
                        <span className="text-xs text-gray-400">→</span>
                        <span className="text-xs text-green-600 dark:text-green-400">
                          {formatBytes(file.processedSize)}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          -{calculateCompressionRatio(file.size, file.processedSize)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {file.status === 'processing' && (
                    <div className="mt-2">
                      <ProgressBar progress={file.progress} size="sm" />
                    </div>
                  )}

                  {/* Error Message */}
                  {file.status === 'error' && file.error && (
                    <p className="text-xs text-red-500 mt-1">{file.error}</p>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2">
                  {file.status === 'processing' && (
                    <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                  )}
                  {file.status === 'completed' && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}

                  {onDownload && file.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(file)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}