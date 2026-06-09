import { PDFDocument } from 'pdf-lib';

self.onmessage = async (e: MessageEvent) => {
        const { type, data, id } = e.data;

        try {
                switch (type) {
                        case 'merge': {
                                const mergedPdf = await PDFDocument.create();

                                for (const fileData of data.files) {
                                        const pdf = await PDFDocument.load(fileData);
                                        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                                        copiedPages.forEach((page) => mergedPdf.addPage(page));
                                }

                                const result = await mergedPdf.save();
                                self.postMessage({
                                        type: 'complete',
                                        id,
                                        result: result.buffer,
                                }, [result.buffer]);
                                break;
                        }

                        case 'compress': {
                                const pdf = await PDFDocument.load(data.file);

                                // Remove metadata
                                pdf.setTitle('');
                                pdf.setAuthor('');
                                pdf.setSubject('');
                                pdf.setKeywords([]);
                                pdf.setProducer('');
                                pdf.setCreator('');

                                const compressed = await pdf.save({
                                        useObjectStreams: true,
                                });

                                self.postMessage({
                                        type: 'complete',
                                        id,
                                        result: compressed.buffer,
                                }, [compressed.buffer]);
                                break;
                        }

                        default:
                                throw new Error(`Unknown operation type: ${type}`);
                }
        } catch (error) {
                self.postMessage({
                        type: 'error',
                        id,
                        error: error instanceof Error ? error.message : 'PDF processing failed',
                });
        }
};