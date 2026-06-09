'use client';

import { useState, useCallback, useRef } from 'react';
import { FileWithMetadata, FileStatus } from '@/types/file';
import { generateId, getFileExtension } from '@/lib/utils';
import { validateFile, sanitizeFilename } from '@/lib/file-validators';

interface UseFileProcessingOptions {
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes: string[];
}

export function useFileProcessing(options: UseFileProcessingOptions) {
  const [files, setFiles] = useState<FileWithMetadata[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const processedFiles = newFiles
        .filter((file) => {
          const validation = validateFile(
            file,
            options.acceptedTypes,
            options.maxSize
          );
          return validation.valid;
        })
        .map((file) => ({
          id: generateId(),
          file,
          name: sanitizeFilename(file.name),
          size: file.size,
          type: file.type,
          extension: getFileExtension(file.name),
          status: 'idle' as FileStatus,
          progress: 0,
        }));

      setFiles((prev) => {
        const maxFiles = options.maxFiles || Infinity;
        const totalFiles = prev.length + processedFiles.length;

        if (totalFiles > maxFiles) {
          return [...prev, ...processedFiles].slice(0, maxFiles);
        }

        return [...prev, ...processedFiles];
      });
    },
    [options.acceptedTypes, options.maxSize, options.maxFiles]
  );

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const updateFile = useCallback(
    (fileId: string, updates: Partial<FileWithMetadata>) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, ...updates } : f))
      );
    },
    []
  );

  const setFileProgress = useCallback(
    (fileId: string, progress: number) => {
      updateFile(fileId, { progress });
    },
    [updateFile]
  );

  const setFileStatus = useCallback(
    (fileId: string, status: FileStatus, error?: string) => {
      updateFile(fileId, { status, error });
    },
    [updateFile]
  );

  const processFiles = useCallback(
    async (processor: (file: FileWithMetadata) => Promise<FileWithMetadata>) => {
      if (processingRef.current) return;

      processingRef.current = true;
      setIsProcessing(true);

      try {
        const updatedFiles = await Promise.all(
          files
            .filter((f) => f.status === 'idle')
            .map(async (file) => {
              setFileStatus(file.id, 'processing');
              try {
                const result = await processor(file);
                setFileStatus(file.id, 'completed');
                return result;
              } catch (error) {
                setFileStatus(
                  file.id,
                  'error',
                  error instanceof Error ? error.message : 'Processing failed'
                );
                return file;
              }
            })
        );

        setFiles((prev) =>
          prev.map((f) => {
            const updated = updatedFiles.find((u) => u.id === f.id);
            return updated || f;
          })
        );
      } finally {
        processingRef.current = false;
        setIsProcessing(false);
      }
    },
    [files, setFileStatus]
  );

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    updateFile,
    setFileProgress,
    setFileStatus,
    processFiles,
    isProcessing,
  };
}