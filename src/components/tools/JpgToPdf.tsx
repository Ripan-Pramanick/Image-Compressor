'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { FileList } from '@/components/ui/FileList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useToast } from '@/hooks/useToast';
import { imagesToPDF } from '@/lib/pdf-processing';
import { downloadBlob } from '@/lib/utils';
import { FileUp, Download } from 'lucide-react';

export function JpgToPdf() {
      const [pdf, setPdf] = useState<Blob | null>(null);
      const { showSuccess, showError } = useToast();
      const { files, addFiles, removeFile, clearFiles, isProcessing } = useFileProcessing({
            maxFiles: 20,
            maxSize: 50 * 1024 * 1024,
            acceptedTypes: ['image/jpeg', 'image/png'],
      });

      const handleConvert = useCallback(async () => {
            try {
                  const data = await imagesToPDF(files.map((f) => f.file));
                  const blob = new Blob([new Uint8Array(data) as unknown as BlobPart], { type: 'application/pdf' });
                  setPdf(blob);
                  showSuccess('Converted');
            } catch { showError('Failed'); }
      }, [files, showSuccess, showError]);

      return (
            <div className="space-y-6">
                  <DropZone onFilesSelected={addFiles} acceptedTypes={{ 'image/jpeg': ['.jpg'], 'image/png': ['.png'] }} maxFiles={20} />
                  <FileList files={files} onRemove={removeFile} onClear={clearFiles} />
                  {isProcessing && <ProgressBar indeterminate label="Converting..." />}
                  {pdf && <Card className="bg-green-50 dark:bg-green-900/20"><p className="text-green-700 font-medium">PDF ready! ({(pdf.size / 1024 / 1024).toFixed(2)} MB)</p></Card>}
                  {files.length > 0 && (
                        <div className="flex gap-3 justify-end">
                              <Button onClick={handleConvert} loading={isProcessing} icon={<FileUp className="w-5 h-5" />}>Convert to PDF</Button>
                              {pdf && <Button variant="secondary" onClick={() => downloadBlob(pdf, 'converted.pdf')} icon={<Download className="w-5 h-5" />}>Download PDF</Button>}
                        </div>
                  )}
            </div>
      );
}