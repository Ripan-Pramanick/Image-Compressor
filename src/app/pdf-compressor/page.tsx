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
import { downloadBlob, formatBytes, calculateCompressionRatio } from '@/lib/utils';
import { FileDown, Download, Zap } from 'lucide-react';

const COMPRESSION_LEVELS = [
        { label: 'Maximum', value: 30, description: 'Smallest file size' },
        { label: 'High', value: 50, description: 'Good compression' },
        { label: 'Medium', value: 70, description: 'Balanced' },
        { label: 'Low', value: 85, description: 'Better quality' },
        { label: 'Minimal', value: 95, description: 'Near original' },
];

export default function PdfCompressorPage() {
        const [quality, setQuality] = useState(70);
        const { addToHistory } = useCompressionHistory();
        const { showSuccess, showError } = useToast();
        const {
                files,
                addFiles,
                removeFile,
                clearFiles,
                updateFile,
                setFileProgress,
                setFileStatus,
                isProcessing,
        } = useFileProcessing({
                maxFiles: 5,
                maxSize: 100 * 1024 * 1024,
                acceptedTypes: ['application/pdf'],
        });

        const handleCompress = useCallback(async () => {
                let totalOriginal = 0;
                let totalProcessed = 0;

                for (const file of files.filter((f) => f.status === 'idle')) {
                        setFileStatus(file.id, 'processing');
                        setFileProgress(file.id, 0);

                        try {
                                const formData = new FormData();
                                formData.append('file', file.file);
                                formData.append('quality', quality.toString());

                                const response = await fetch('/api/compress-pdf', {
                                        method: 'POST',
                                        body: formData,
                                });

                                if (!response.ok) {
                                        throw new Error('Compression failed');
                                }

                                const blob = await response.blob();
                                totalOriginal += file.size;
                                totalProcessed += blob.size;

                                updateFile(file.id, {
                                        processedFile: blob,
                                        processedSize: blob.size,
                                        status: 'completed',
                                        progress: 100,
                                });
                        } catch (error) {
                                setFileStatus(file.id, 'error', 'Compression failed');
                        }
                }

                if (totalProcessed > 0) {
                        addToHistory({
                                toolId: 'pdf-compressor',
                                toolName: 'PDF Compressor',
                                filesProcessed: files.length,
                                spaceSaved: totalOriginal - totalProcessed,
                                timestamp: Date.now(),
                        });
                        showSuccess(`Saved ${formatBytes(totalOriginal - totalProcessed)}`);
                }
        }, [files, quality, updateFile, setFileProgress, setFileStatus, addToHistory, showSuccess]);

        const handleDownloadAll = useCallback(() => {
                files
                        .filter((f) => f.processedFile)
                        .forEach((f) => downloadBlob(f.processedFile!, `compressed_${f.name}`));
                showSuccess('All files downloaded');
        }, [files, showSuccess]);

        const totalOriginal = files.reduce((sum, f) => sum + f.size, 0);
        const totalProcessed = files.reduce((sum, f) => sum + (f.processedSize || 0), 0);

        return (
                <ToolLayout
                        title="PDF Compressor"
                        description="Compress PDF files to reduce file size while maintaining quality"
                >
                        <div className="space-y-6">
                                <Card>
                                        <div className="flex items-center gap-2 mb-4">
                                                <Zap className="w-5 h-5 text-primary-500" />
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        Compression Level
                                                </h3>
                                        </div>

                                        <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Quality: {quality}%
                                                </label>
                                                <input
                                                        type="range"
                                                        min="10"
                                                        max="100"
                                                        value={quality}
                                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                                        className="w-full"
                                                />
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                                {COMPRESSION_LEVELS.map((level) => (
                                                        <Button
                                                                key={level.value}
                                                                variant={quality === level.value ? 'primary' : 'ghost'}
                                                                size="sm"
                                                                onClick={() => setQuality(level.value)}
                                                                title={level.description}
                                                        >
                                                                {level.label}
                                                        </Button>
                                                ))}
                                        </div>
                                </Card>

                                <DropZone
                                        onFilesSelected={addFiles}
                                        acceptedTypes={{ 'application/pdf': ['.pdf'] }}
                                        maxFiles={5}
                                />

                                <FileList
                                        files={files}
                                        onRemove={removeFile}
                                        onClear={clearFiles}
                                        onDownload={(f) => {
                                                if (f.processedFile) {
                                                        downloadBlob(f.processedFile, `compressed_${f.name}`);
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
                                                label="Compressing PDFs..."
                                        />
                                )}

                                {totalProcessed > 0 && (
                                        <Card className="bg-green-50 dark:bg-green-900/20">
                                                <p className="text-sm text-green-700 dark:text-green-300">
                                                        Saved {formatBytes(totalOriginal - totalProcessed)} (
                                                        {calculateCompressionRatio(totalOriginal, totalProcessed)}%)
                                                </p>
                                        </Card>
                                )}

                                {files.length > 0 && (
                                        <div className="flex gap-3 justify-end">
                                                <Button
                                                        onClick={handleCompress}
                                                        disabled={isProcessing}
                                                        loading={isProcessing}
                                                        icon={<FileDown className="w-5 h-5" />}
                                                >
                                                        Compress PDF{files.length !== 1 ? 's' : ''}
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