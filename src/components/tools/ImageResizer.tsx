'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { FileList } from '@/components/ui/FileList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useToast } from '@/hooks/useToast';
import { resizeImage, getImageDimensions, createImagePreview } from '@/lib/image-processing';
import { downloadBlob } from '@/lib/utils';
import { Maximize2, Download, Lock } from 'lucide-react';

const PRESETS = [
  { label: 'HD', w: 1280, h: 720 },
  { label: 'Full HD', w: 1920, h: 1080 },
  { label: '4K', w: 3840, h: 2160 },
];

export function ImageResizer() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [lock, setLock] = useState(true);
  const { showSuccess } = useToast();
  const { files, addFiles, removeFile, clearFiles, processFiles, isProcessing } = useFileProcessing({
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  });

  const handleFiles = useCallback(async (newFiles: File[]) => {
    addFiles(newFiles);
    if (newFiles[0] && lock) {
      const dims = await getImageDimensions(newFiles[0]);
      setHeight(Math.round((dims.height * width) / dims.width));
    }
  }, [addFiles, lock, width]);

  const handleResize = useCallback(async () => {
    await processFiles(async (f) => {
      const resized = await resizeImage(f.file, { width, height, maintainAspectRatio: lock });
      const preview = await createImagePreview(new File([resized], f.name));
      return { ...f, processedFile: resized, processedSize: resized.size, preview, status: 'completed' as const };
    });
    showSuccess(`Resized ${files.length} file(s)`);
  }, [files, width, height, lock, processFiles, showSuccess]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="text-sm">Width</label><input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full px-3 py-2 rounded-lg border" /></div>
          <div><label className="text-sm">Height</label><input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full px-3 py-2 rounded-lg border" /></div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} />
          <Lock className="w-3 h-3 inline" /> Lock aspect ratio
        </label>
        <div className="flex gap-2 mt-3">{PRESETS.map((p) => (
          <Button key={p.label} variant="ghost" size="sm" onClick={() => { setWidth(p.w); setHeight(p.h); }}>{p.label}</Button>
        ))}</div>
      </Card>
      <DropZone onFilesSelected={handleFiles} acceptedTypes={{ 'image/*': ['.jpg', '.png', '.webp'] }} maxFiles={10} />
      <FileList files={files} onRemove={removeFile} onClear={clearFiles} />
      {isProcessing && <ProgressBar indeterminate label="Resizing..." />}
      {files.length > 0 && (
        <div className="flex gap-3 justify-end">
          <Button onClick={handleResize} loading={isProcessing} icon={<Maximize2 className="w-5 h-5" />}>Resize All</Button>
          {files.some((f) => f.processedFile) && (
            <Button variant="secondary" onClick={() => files.filter((f) => f.processedFile).forEach((f) => downloadBlob(f.processedFile!, `resized_${f.name}`))} icon={<Download className="w-5 h-5" />}>Download All</Button>
          )}
        </div>
      )}
    </div>
  );
}