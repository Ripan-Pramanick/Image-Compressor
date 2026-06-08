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
import { resizeImage, getImageDimensions, createImagePreview } from '@/lib/image-processing';
import { downloadBlob, formatBytes } from '@/lib/utils';
import { Maximize2, Download, Lock } from 'lucide-react';

const PRESETS = [
  { label: 'HD (1280×720)', width: 1280, height: 720 },
  { label: 'Full HD (1920×1080)', width: 1920, height: 1080 },
  { label: 'Instagram (1080×1080)', width: 1080, height: 1080 },
  { label: 'Twitter (1200×675)', width: 1200, height: 675 },
  { label: '4K (3840×2160)', width: 3840, height: 2160 },
];

export default function ResizeImagePage() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

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
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  });

  const handleAddFiles = useCallback(
    async (newFiles: File[]) => {
      addFiles(newFiles);
      if (newFiles.length > 0) {
        const dims = await getImageDimensions(newFiles[0]);
        setOriginalDimensions(dims);
        if (maintainAspectRatio) {
          setHeight(Math.round((dims.height * width) / dims.width));
        }
      }
    },
    [addFiles, maintainAspectRatio, width]
  );

  const handleWidthChange = useCallback(
    (newWidth: number) => {
      setWidth(newWidth);
      if (maintainAspectRatio && originalDimensions) {
        setHeight(Math.round((originalDimensions.height * newWidth) / originalDimensions.width));
      }
    },
    [maintainAspectRatio, originalDimensions]
  );

  const handleHeightChange = useCallback(
    (newHeight: number) => {
      setHeight(newHeight);
      if (maintainAspectRatio && originalDimensions) {
        setWidth(Math.round((originalDimensions.width * newHeight) / originalDimensions.height));
      }
    },
    [maintainAspectRatio, originalDimensions]
  );

  const handleResize = useCallback(async () => {
    const resize = async (fileWithMeta: typeof files[0]) => {
      try {
        const resized = await resizeImage(fileWithMeta.file, {
          width,
          height,
          maintainAspectRatio,
        });

        const preview = await createImagePreview(new File([resized], fileWithMeta.name));
        const blobUrl = URL.createObjectURL(resized);

        return {
          ...fileWithMeta,
          processedFile: resized,
          processedSize: resized.size,
          preview,
          status: 'completed' as const,
        };
      } catch (error) {
        return {
          ...fileWithMeta,
          status: 'error' as const,
          error: error instanceof Error ? error.message : 'Resize failed',
        };
      }
    };

    await processFiles(resize);

    addToHistory({
      toolId: 'resize-image',
      toolName: 'Resize Image',
      filesProcessed: files.length,
      spaceSaved: 0,
      timestamp: Date.now(),
    });

    showSuccess(`Resized ${files.length} file(s) to ${width}×${height}`);
  }, [files, width, height, maintainAspectRatio, processFiles, addToHistory, showSuccess]);

  const handleDownloadAll = useCallback(() => {
    files
      .filter((f) => f.processedFile)
      .forEach((f) => downloadBlob(f.processedFile!, `resized_${f.name}`));
    showSuccess('All files downloaded');
  }, [files, showSuccess]);

  return (
    <ToolLayout
      title="Resize Image"
      description="Resize images to exact dimensions or choose from common presets"
    >
      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Maximize2 className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Resize Settings
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Width (px)
              </label>
              <input
                type="number"
                min="1"
                max="7680"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Height (px)
              </label>
              <input
                type="number"
                min="1"
                max="4320"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspectRatio}
              onChange={(e) => setMaintainAspectRatio(e.target.checked)}
              className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <Lock className="w-3 h-3 inline mr-1" />
              Maintain aspect ratio
            </span>
          </label>

          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Preset Sizes
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleWidthChange(preset.width);
                    if (!maintainAspectRatio) {
                      setHeight(preset.height);
                    }
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <DropZone
          onFilesSelected={handleAddFiles}
          acceptedTypes={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
            'image/avif': ['.avif'],
          }}
          maxFiles={10}
        />

        <FileList
          files={files}
          onRemove={removeFile}
          onClear={clearFiles}
          onDownload={(f) => {
            if (f.processedFile) {
              downloadBlob(f.processedFile, `resized_${f.name}`);
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
            label="Resizing images..."
          />
        )}

        {files.length > 0 && (
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleResize}
              disabled={isProcessing}
              loading={isProcessing}
              icon={<Maximize2 className="w-5 h-5" />}
            >
              Resize {files.length} File{files.length !== 1 ? 's' : ''}
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