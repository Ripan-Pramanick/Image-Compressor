'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { createImagePreview } from '@/lib/image-processing';
import { downloadBlob } from '@/lib/utils';
import { Crop, Download, RotateCcw } from 'lucide-react';

const RATIOS = [
  { label: 'Freeform', value: 0 },
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
];

export function ImageCropper() {
  const [source, setSource] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [ratio, setRatio] = useState(0);
  const [crop, setCrop] = useState({ x: 50, y: 50, w: 200, h: 200 });
  const [preview, setPreview] = useState<string | null>(null);
  const { showSuccess } = useToast();

  const handleFile = useCallback(async (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setSource(await createImagePreview(files[0]));
    }
  }, []);

  const handleCrop = useCallback(async () => {
    if (!file) return;
    const img = new Image();
    img.src = source!;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.w * scaleX;
    canvas.height = crop.h * scaleY;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, crop.x * scaleX, crop.y * scaleY, crop.w * scaleX, crop.h * scaleY, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), file.type, 0.95));
    setPreview(URL.createObjectURL(blob));
    showSuccess('Cropped');
  }, [file, source, crop, showSuccess]);

  if (!source) {
    return <DropZone onFilesSelected={handleFile} acceptedTypes={{ 'image/*': ['.jpg', '.png'] }} maxFiles={1} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex gap-2 mb-4">{RATIOS.map((r) => (
          <Button key={r.label} variant={ratio === r.value ? 'primary' : 'ghost'} size="sm" onClick={() => setRatio(r.value)}>{r.label}</Button>
        ))}</div>
        <div className="relative bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img src={source} alt="Crop" className="max-w-full" />
          <div className="absolute border-2 border-white bg-primary-500/10" style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }} />
        </div>
      </Card>
      {preview && <Card><h3 className="font-semibold mb-4">Preview</h3><img src={preview} alt="Preview" className="max-w-full rounded-lg" /></Card>}
      <div className="flex gap-3 justify-end">
        <Button onClick={handleCrop} icon={<Crop className="w-5 h-5" />}>Crop</Button>
        <Button variant="ghost" onClick={() => { setSource(null); setFile(null); setPreview(null); }} icon={<RotateCcw className="w-4 h-4" />}>New</Button>
        {preview && <Button variant="secondary" onClick={() => { const a = document.createElement('a'); a.href = preview; a.download = `cropped_${file?.name}`; a.click(); }} icon={<Download className="w-5 h-5" />}>Download</Button>}
      </div>
    </div>
  );
}