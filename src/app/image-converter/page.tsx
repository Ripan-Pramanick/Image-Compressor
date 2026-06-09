'use client';

import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/ui/ToolLayout';
import { DropZone } from '@/components/ui/DropZone';
import { FileList } from '@/components/ui/FileList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useCompressionHistory } from '@/hooks/useCompressionHistory';
import { useToast } from '@/hooks/useToast';
import { convertImage, createImagePreview } from '@/lib/image-processing';
import { downloadBlob, formatBytes } from '@/lib/utils';
import { Repeat, Download, ImageIcon, FileImage } from 'lucide-react';

const FORMATS = [
  { value: 'jpeg', label: 'JPG', extension: 'jpg', mime: 'image/jpeg' },
  { value: 'png', label: 'PNG', extension: 'png', mime: 'image/png' },
  { value: 'webp', label: 'WebP', extension: 'webp', mime: 'image/webp' },
  { value: 'avif', label: 'AVIF', extension: 'avif', mime: 'image/avif' },
] as const;

export default function ImageConverterPage() {
  const [targetFormat, setTargetFormat] = useState<string>('webp');
  const [quality, setQuality] = useState(90);
  const { addToHistory } = useCompressionHistory();
  const { showSuccess, showError } = useToast();
  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
    processFiles,
    isProcessing,
  } = useFileProcessing({
    maxFiles: 20,
    maxSize: 50 * 1024 * 1024,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  });

  const handleConvert = useCallback(async () => {
    const convert = async (fileWithMeta: typeof files[0]) => {
      try {
        const converted = await convertImage(fileWithMeta.file, {
          targetFormat: targetFormat as 'jpeg' | 'png' | 'webp' | 'avif',
          quality,
        });

        const ext = FORMATS.find((f) => f.value === targetFormat)?.extension || 'jpg';
        const newName = fileWithMeta.name.replace(/\.[^.]+$/, `.${ext}`);
        const preview = await createImagePreview(new File([converted], newName));

        return {
          ...fileWithMeta,
          processedFile: converted,
          processedSize: converted.size,
          preview,
          status: 'completed' as const,
        };
      } catch (error) {
        return {
          ...fileWithMeta,
          status: 'error' as const,
          error: error instanceof Error ? error.message : 'Conversion failed',
        };
      }
    };

    await processFiles(convert);

    addToHistory({
      toolId: 'image-converter',
      toolName: 'Image Converter',
      filesProcessed: files.length,
      spaceSaved: 0,
      timestamp: Date.now(),
    });

    showSuccess(`Converted ${files.length} file(s) to ${targetFormat.toUpperCase()}`);
  }, [files, targetFormat, quality, processFiles, addToHistory, showSuccess]);

  const handleDownloadAll = useCallback(() => {
    const ext = FORMATS.find((f) => f.value === targetFormat)?.extension || 'jpg';
    files
      .filter((f) => f.processedFile)
      .forEach((f) => {
        const newName = f.name.replace(/\.[^.]+$/, `.${ext}`);
        downloadBlob(f.processedFile!, newName);
      });
    showSuccess('All files downloaded');
  }, [files, targetFormat, showSuccess]);

  return (
    <ToolLayout
      title="Image Converter"
      description="Convert images between JPG, PNG, WebP, and AVIF formats"
    >
      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Repeat className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Conversion Settings
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FORMATS.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setTargetFormat(format.value)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${targetFormat === format.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    <span className="block text-sm font-medium">{format.label}</span>
                    <span className="block text-xs text-gray-500">.{format.extension}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        <DropZone
          onFilesSelected={addFiles}
          acceptedTypes={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
            'image/avif': ['.avif'],
          }}
          maxFiles={20}
        />

        <FileList
          files={files}
          onRemove={removeFile}
          onClear={clearFiles}
          onDownload={(f) => {
            if (f.processedFile) {
              const ext = FORMATS.find((fmt) => fmt.value === targetFormat)?.extension || 'jpg';
              downloadBlob(f.processedFile, f.name.replace(/\.[^.]+$/, `.${ext}`));
            }
          }}
        />

        {isProcessing && (
          <ProgressBar
            progress={
              files.length > 0
                ? (files.filter((f) => f.status === 'completed').length / files.length) * 100
                : 0
            }
            label="Converting images..."
          />
        )}

        {files.length > 0 && (
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleConvert}
              disabled={isProcessing}
              loading={isProcessing}
              icon={<Repeat className="w-5 h-5" />}
            >
              Convert {files.length} File{files.length !== 1 ? 's' : ''}
            </Button>
            {files.some((f) => f.processedFile) && (
              <Button
                variant="secondary"
                onClick={handleDownloadAll}
                icon={<Download className="w-5 h-5" />}
              >
                Download All
              </Button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}