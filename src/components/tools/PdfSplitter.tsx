'use client';

import React, { useState, useCallback } from 'react';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/hooks/useToast';
import { splitPDF, extractPDFPages, deletePDFPages } from '@/lib/pdf-processing';
import { downloadBlob } from '@/lib/utils';
import { Scissors, Download, Copy, Trash2 } from 'lucide-react';

export function PdfSplitter() {
        const [file, setFile] = useState<File | null>(null);
        const [mode, setMode] = useState<'split' | 'extract' | 'delete'>('split');
        const [input, setInput] = useState('');
        const [results, setResults] = useState<{ name: string; blob: Blob }[]>([]);
        const [loading, setLoading] = useState(false);
        const { showSuccess, showError } = useToast();

        const handleProcess = useCallback(async () => {
                if (!file) return;
                setLoading(true);
                try {
                        let res: { name: string; blob: Blob }[] = [];
                        if (mode === 'split') {
                                const ranges = input.split(',').map((r) => r.trim()).filter(Boolean).map((r) => {
                                        const [s, e] = r.split('-').map(Number);
                                        return { start: s, end: e || s };
                                });
                                const data = await splitPDF(file, ranges);
                                res = data.map((d) => ({ name: d.filename, blob: new Blob([new Uint8Array(d.data) as unknown as BlobPart], { type: 'application/pdf' }) }));
                        } else if (mode === 'extract') {
                                const pages = input.split(',').map(Number).filter((p) => !isNaN(p));
                                const data = await extractPDFPages(file, pages);
                                res = [{ name: 'extracted.pdf', blob: new Blob([new Uint8Array(data) as unknown as BlobPart], { type: 'application/pdf' }) }];
                        } else if (mode === 'delete') {
                                const pages = input.split(',').map(Number).filter((p) => !isNaN(p));
                                const data = await deletePDFPages(file, pages);
                                res = [{ name: `cleaned_${file.name}`, blob: new Blob([new Uint8Array(data) as unknown as BlobPart], { type: 'application/pdf' }) }];
                        }
                        setResults(res);
                        showSuccess('Done');
                } catch { showError('Failed'); }
                finally { setLoading(false); }
        }, [file, mode, input, showSuccess, showError]);

        return (
                <div className="space-y-6">
                        <Card>
                                <div className="flex gap-2 mb-4">
                                        {[{ v: 'split', l: 'Split', i: <Scissors className="w-4 h-4" /> }, { v: 'extract', l: 'Extract', i: <Copy className="w-4 h-4" /> }, { v: 'delete', l: 'Delete', i: <Trash2 className="w-4 h-4" /> }].map((m) => (
                                                <Button key={m.v} variant={mode === m.v ? 'primary' : 'ghost'} size="sm" onClick={() => setMode(m.v as typeof mode)} icon={m.i}>{m.l}</Button>
                                        ))}
                                </div>
                                <label className="text-sm">Pages (e.g., 1-3, 5)</label>
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 rounded-lg border" />
                        </Card>
                        {!file ? <DropZone onFilesSelected={(fs) => { if (fs[0]) { setFile(fs[0]); setResults([]); } }} acceptedTypes={{ 'application/pdf': ['.pdf'] }} maxFiles={1} /> : (
                                <Card><div className="flex justify-between"><span>{file.name}</span><Button variant="ghost" size="sm" onClick={() => { setFile(null); setResults([]); }}>Change</Button></div></Card>
                        )}
                        {results.length > 0 && (
                                <Card>
                                        <h3 className="font-semibold mb-4">Results ({results.length})</h3>
                                        {results.map((r, i) => (
                                                <div key={i} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
                                                        <span className="text-sm">{r.name}</span>
                                                        <Button variant="ghost" size="sm" onClick={() => downloadBlob(r.blob, r.name)} icon={<Download className="w-4 h-4" />}>Download</Button>
                                                </div>
                                        ))}
                                        {results.length > 1 && <Button variant="secondary" onClick={() => results.forEach((r) => downloadBlob(r.blob, r.name))} icon={<Download className="w-5 h-5" />}>Download All</Button>}
                                </Card>
                        )}
                        {loading && <ProgressBar indeterminate label="Processing..." />}
                        {file && <div className="flex justify-end"><Button onClick={handleProcess} loading={loading} icon={<Scissors className="w-5 h-5" />}>Process</Button></div>}
                </div>
        );
}