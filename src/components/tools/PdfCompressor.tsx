'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { FileList } from '@/components/ui/FileList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useToast } from '@/hooks/useToast';
import { downloadBlob, formatBytes, calculateCompressionRatio } from '@/lib/utils';
import { FileDown, Download } from 'lucide-react';

export function PdfCompressor() {
  const [quality, setQuality] = useState(70);
    const { showSuccess, showError } = useToast();
      const { files, addFiles, removeFile, clearFiles, updateFile, isProcessing, setFileProgress } = useFileProcessing({
          maxFiles: 5,
              maxSize: 100 * 1024 * 1024,
                  acceptedTypes: ['application/pdf'],
                    });

                      const handleCompress = useCallback(async () => {
                          for (const file of files.filter((f) => f.status === 'idle')) {
                                try {
                                        const formData = new FormData();
                                                formData.append('file', file.file);
                                                        formData.append('quality', quality.toString());
                                                                const res = await fetch('/api/compress-pdf', { method: 'POST', body: formData });
                                                                        const blob = await res.blob();
                                                                                updateFile(file.id, { processedFile: blob, processedSize: blob.size, status: 'completed', progress: 100 });
                                                                                      } catch {
                                                                                              updateFile(file.id, { status: 'error', error: 'Failed' });
                                                                                                    }
                                                                                                        }
                                                                                                            showSuccess('Compressed');
                                                                                                              }, [files, quality, updateFile, showSuccess]);

                                                                                                                const totalO = files.reduce((s, f) => s + f.size, 0);
                                                                                                                  const totalP = files.reduce((s, f) => s + (f.processedSize || 0), 0);

                                                                                                                    return (
                                                                                                                        <div className="space-y-6">
                                                                                                                              <Card>
                                                                                                                                      <label className="text-sm">Quality: {quality}%</label>
                                                                                                                                              <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" />
                                                                                                                                                    </Card>
                                                                                                                                                          <DropZone onFilesSelected={addFiles} acceptedTypes={{ 'application/pdf': ['.pdf'] }} maxFiles={5} />
                                                                                                                                                                <FileList files={files} onRemove={removeFile} onClear={clearFiles} onDownload={(f) => f.processedFile && downloadBlob(f.processedFile, `compressed_${f.name}`)} />
                                                                                                                                                                      {isProcessing && <ProgressBar indeterminate label="Compressing..." />}
                                                                                                                                                                            {totalP > 0 && <Card className="bg-green-50 dark:bg-green-900/20"><p>Saved {formatBytes(totalO - totalP)} ({calculateCompressionRatio(totalO, totalP)}%)</p></Card>}
                                                                                                                                                                                  {files.length > 0 && (
                                                                                                                                                                                          <div className="flex gap-3 justify-end">
                                                                                                                                                                                                    <Button onClick={handleCompress} loading={isProcessing} icon={<FileDown className="w-5 h-5" />}>Compress</Button>
                                                                                                                                                                                                              {files.some((f) => f.processedFile) && <Button variant="secondary" onClick={() => files.filter((f) => f.processedFile).forEach((f) => downloadBlob(f.processedFile!, `compressed_${f.name}`))} icon={<Download className="w-5 h-5" />}>Download All</Button>}
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                  }