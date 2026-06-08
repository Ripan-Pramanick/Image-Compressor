'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/hooks/useToast';
import { pdfToImages } from '@/lib/pdf-processing';
import { downloadBlob } from '@/lib/utils';
import { FileImage, Download } from 'lucide-react';

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<Blob[]>([]);
      const [loading, setLoading] = useState(false);
        const { showSuccess, showError } = useToast();

          const handleConvert = useCallback(async () => {
              if (!file) return;
                  setLoading(true);
                      try {
                            const result = await pdfToImages(file, 'jpeg');
                                  setImages(result);
                                        showSuccess(`Converted ${result.length} page(s)`);
                                            } catch { showError('Failed'); }
                                                finally { setLoading(false); }
                                                  }, [file, showSuccess, showError]);

                                                    return (
                                                        <div className="space-y-6">
                                                              {!file ? <DropZone onFilesSelected={(fs) => { if (fs[0]) { setFile(fs[0]); setImages([]); } }} acceptedTypes={{ 'application/pdf': ['.pdf'] }} maxFiles={1} /> : (
                                                                      <Card>
                                                                                <div className="flex justify-between mb-4"><span>{file.name}</span><Button variant="ghost" size="sm" onClick={() => { setFile(null); setImages([]); }}>Change</Button></div>
                                                                                        </Card>
                                                                                              )}
                                                                                                    {images.length > 0 && (
                                                                                                            <Card>
                                                                                                                      <h3 className="font-semibold mb-4">Images ({images.length})</h3>
                                                                                                                                <div className="grid grid-cols-3 gap-4">
                                                                                                                                            {images.map((b, i) => (
                                                                                                                                                          <div key={i} className="text-center">
                                                                                                                                                                          <img src={URL.createObjectURL(b)} alt={`Page ${i + 1}`} className="w-full rounded-lg mb-2 border" />
                                                                                                                                                                                          <p className="text-xs mb-2">Page {i + 1}</p>
                                                                                                                                                                                                          <Button variant="ghost" size="sm" onClick={() => downloadBlob(b, `page_${i + 1}.jpg`)} icon={<Download className="w-3 h-3" />}>Download</Button>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                        {images.length > 1 && <Button variant="secondary" onClick={() => images.forEach((b, i) => downloadBlob(b, `page_${i + 1}.jpg`))} icon={<Download className="w-5 h-5" />} className="mt-4">Download All</Button>}
                                                                                                                                                                                                                                                                </Card>
                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                            {loading && <ProgressBar indeterminate label="Converting..." />}
                                                                                                                                                                                                                                                                                  {file && <div className="flex justify-end"><Button onClick={handleConvert} loading={loading} icon={<FileImage className="w-5 h-5" />}>Convert to JPG</Button></div>}
                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                        }