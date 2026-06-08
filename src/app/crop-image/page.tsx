'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/ui/ToolLayout';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { useCompressionHistory } from '@/hooks/useCompressionHistory';
import { createImagePreview } from '@/lib/image-processing';
import { downloadBlob } from '@/lib/utils';
import { Crop, Download, RotateCcw } from 'lucide-react';

const ASPECT_RATIOS = [
  { label: 'Freeform', value: 0 },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
  { label: '2:3', value: 2 / 3 },
  { label: '9:16', value: 9 / 16 },
];

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CropImagePage() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { addToHistory } = useCompressionHistory();
  const { showSuccess, showError } = useToast();

  const handleFileSelect = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    setSourceFile(file);
    const preview = await createImagePreview(file);
    setSourceImage(preview);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: string) => {
      setIsDragging(true);
      setDragHandle(handle);
      e.preventDefault();
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCropArea((prev) => {
        let newArea = { ...prev };

        switch (dragHandle) {
          case 'move':
            newArea.x = Math.max(0, x - prev.width / 2);
            newArea.y = Math.max(0, y - prev.height / 2);
            break;
          case 'se':
            newArea.width = Math.max(50, x - prev.x);
            newArea.height = aspectRatio
              ? newArea.width / aspectRatio
              : Math.max(50, y - prev.y);
            break;
          case 'nw':
            newArea.width = Math.max(50, prev.x + prev.width - x);
            newArea.height = aspectRatio
              ? newArea.width / aspectRatio
              : Math.max(50, prev.y + prev.height - y);
            newArea.x = x;
            newArea.y = y;
            break;
        }

        if (aspectRatio && dragHandle === 'se') {
          newArea.height = newArea.width / aspectRatio;
        }

        return newArea;
      });
    },
    [isDragging, dragHandle, aspectRatio]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragHandle(null);
  }, []);

  const handleCrop = useCallback(async () => {
    if (!sourceFile || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      const img = imgRef.current;
      if (!img) return;

      const canvas = canvasRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = cropArea.width * scaleX;
      canvas.height = cropArea.height * scaleY;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        img,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        cropArea.width * scaleX,
        cropArea.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), sourceFile.type, 0.95);
      });

      const previewUrl = URL.createObjectURL(blob);
      setPreview(previewUrl);

      addToHistory({
        toolId: 'crop-image',
        toolName: 'Crop Image',
        filesProcessed: 1,
        spaceSaved: 0,
        timestamp: Date.now(),
      });

      showSuccess('Image cropped successfully');
    } catch (error) {
      showError('Failed to crop image');
    } finally {
      setIsProcessing(false);
    }
  }, [sourceFile, cropArea, addToHistory, showSuccess, showError]);

  const handleDownload = useCallback(() => {
    if (!preview || !sourceFile) return;
    const link = document.createElement('a');
    link.download = `cropped_${sourceFile.name}`;
    link.href = preview;
    link.click();
    showSuccess('Image downloaded');
  }, [preview, sourceFile, showSuccess]);

  return (
    <ToolLayout
      title="Crop Image"
      description="Crop images with precise control. Choose from preset aspect ratios."
    >
      <div className="space-y-6">
        {!sourceImage ? (
          <DropZone
            onFilesSelected={handleFileSelect}
            acceptedTypes={{
              'image/jpeg': ['.jpg', '.jpeg'],
              'image/png': ['.png'],
              'image/webp': ['.webp'],
            }}
            maxFiles={1}
          />
        ) : (
          <>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Adjust Crop
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSourceImage(null);
                    setSourceFile(null);
                    setPreview(null);
                  }}
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  New Image
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {ASPECT_RATIOS.map((ratio) => (
                  <Button
                    key={ratio.label}
                    variant={aspectRatio === ratio.value ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setAspectRatio(ratio.value)}
                  >
                    {ratio.label}
                  </Button>
                ))}
              </div>

              <div
                ref={containerRef}
                className="relative bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-move select-none"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imgRef}
                  src={sourceImage}
                  alt="Crop source"
                  className="max-w-full h-auto"
                  draggable={false}
                />
                <div
                  className="absolute border-2 border-white shadow-lg cursor-move"
                  style={{
                    left: cropArea.x,
                    top: cropArea.y,
                    width: cropArea.width,
                    height: cropArea.height,
                    background: 'rgba(14, 165, 233, 0.1)',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, 'move')}
                >
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-se-resize translate-x-1/2 translate-y-1/2"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'se');
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-nw-resize -translate-x-1/2 -translate-y-1/2"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'nw');
                    }}
                  />
                </div>
              </div>
            </Card>

            {preview && (
              <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Preview
                </h3>
                <img
                  src={preview}
                  alt="Cropped preview"
                  className="max-w-full rounded-lg"
                />
              </Card>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCrop}
                loading={isProcessing}
                icon={<Crop className="w-5 h-5" />}
              >
                Crop Image
              </Button>
              {preview && (
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  icon={<Download className="w-5 h-5" />}
                >
                  Download
                </Button>
              )}
            </div>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}