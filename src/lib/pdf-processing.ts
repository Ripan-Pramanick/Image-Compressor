import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
// pdfjs-dist imports can cause build-time issues when pulled into server code.
// Import it dynamically inside client-only functions to avoid bundling on the server.
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();

      for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
              const pdf = await PDFDocument.load(arrayBuffer);
                  const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                      copiedPages.forEach((page) => mergedPdf.addPage(page));
                        }

                          return await mergedPdf.save();
                          }

                          export async function splitPDF(
                            file: File,
                              ranges: { start: number; end: number }[]
                              ): Promise<{ filename: string; data: Uint8Array }[]> {
                                const arrayBuffer = await file.arrayBuffer();
                                  const pdf = await PDFDocument.load(arrayBuffer);
                                    const results = [];

                                      for (const range of ranges) {
                                          const newPdf = await PDFDocument.create();
                                              const pages = await newPdf.copyPages(
                                                    pdf,
                                                          Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i - 1)
                                                              );
                                                                  pages.forEach((page) => newPdf.addPage(page));
                                                                      
                                                                          const data = await newPdf.save();
                                                                              results.push({
                                                                                    filename: `split_${range.start}-${range.end}.pdf`,
                                                                                          data,
                                                                                              });
                                                                                                }

                                                                                                  return results;
                                                                                                  }

                                                                                                  export async function extractPDFPages(
                                                                                                    file: File,
                                                                                                      pages: number[]
                                                                                                      ): Promise<Uint8Array> {
                                                                                                        const arrayBuffer = await file.arrayBuffer();
                                                                                                          const pdf = await PDFDocument.load(arrayBuffer);
                                                                                                            const newPdf = await PDFDocument.create();
                                                                                                              
                                                                                                                const copiedPages = await newPdf.copyPages(pdf, pages.map(p => p - 1));
                                                                                                                  copiedPages.forEach((page) => newPdf.addPage(page));

                                                                                                                    return await newPdf.save();
                                                                                                                    }

                                                                                                                    export async function deletePDFPages(
                                                                                                                      file: File,
                                                                                                                        pagesToDelete: number[]
                                                                                                                        ): Promise<Uint8Array> {
                                                                                                                          const arrayBuffer = await file.arrayBuffer();
                                                                                                                            const pdf = await PDFDocument.load(arrayBuffer);
                                                                                                                              const newPdf = await PDFDocument.create();
                                                                                                                                
                                                                                                                                  const pagesToKeep = Array.from(
                                                                                                                                      { length: pdf.getPageCount() },
                                                                                                                                          (_, i) => i + 1
                                                                                                                                            ).filter(page => !pagesToDelete.includes(page));

                                                                                                                                              const copiedPages = await newPdf.copyPages(pdf, pagesToKeep.map(p => p - 1));
                                                                                                                                                copiedPages.forEach((page) => newPdf.addPage(page));

                                                                                                                                                  return await newPdf.save();
                                                                                                                                                  }

                                                                                                                                                  export async function rotatePDF(
  file: File,
  rotation: 0 | 90 | 180 | 270
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  const pages = pdf.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(page.getRotation().angle + rotation));
  });

  return await pdf.save();
}
                                                                                                                                                                        export async function pdfToImages(
                                                                                                                                                                          file: File,
                                                                                                                                                                            format: 'jpeg' | 'png' = 'png'
                                                                                                                                                                            ): Promise<Blob[]> {
                                                                                                                                                                            const arrayBuffer = await file.arrayBuffer();
                                                                                                                                                                              // Dynamically import the legacy pdf.js build on the client only.
                                                                                                                                                                              const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
                                                                                                                                                                              if (typeof window !== 'undefined') {
                                                                                                                                                                                // configure worker
                                                                                                                                                                                pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
                                                                                                                                                                              }

                                                                                                                                                                              const loadingTask = pdfjsLib.getDocument(arrayBuffer);
                                                                                                                                                                              const pdf = await loadingTask.promise;
                                                                                                                                                                                  const images: Blob[] = [];

                                                                                                                                                                                    for (let i = 1; i <= pdf.numPages; i++) {
                                                                                                                                                                                        const page = await pdf.getPage(i);
                                                                                                                                                                                            const viewport = page.getViewport({ scale: 2.0 });
                                                                                                                                                                                                
                                                                                                                                                                                                    const canvas = document.createElement('canvas');
                                                                                                                                                                                                        canvas.width = viewport.width;
                                                                                                                                                                                                            canvas.height = viewport.height;
                                                                                                                                                                                                                
                                                                                                                                                                                                                    const context = canvas.getContext('2d');
                                                                                                                                                                                                                        if (context) {
                                                                                                                                                                                                                              await page.render({
                                                                                                                                                                                                                                      canvasContext: context,
                                                                                                                                                                                                                                              viewport: viewport,
                                                                                                                                                                                                                                                    }).promise;

                                                                                                                                                                                                                                                          const blob = await new Promise<Blob>((resolve) => {
                                                                                                                                                                                                                                                                  canvas.toBlob(
                                                                                                                                                                                                                                                                            (blob) => resolve(blob!),
                                                                                                                                                                                                                                                                                      `image/${format}`,
                                                                                                                                                                                                                                                                                                0.95
                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                                                    images.push(blob);
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                            return images;
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                            export async function imagesToPDF(files: File[]): Promise<Uint8Array> {
                                                                                                                                                                                                                                                                                                                              const pdf = await PDFDocument.create();

                                                                                                                                                                                                                                                                                                                                for (const file of files) {
                                                                                                                                                                                                                                                                                                                                    const imageBytes = await file.arrayBuffer();
                                                                                                                                                                                                                                                                                                                                        let image;
                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                if (file.type === 'image/jpeg') {
                                                                                                                                                                                                                                                                                                                                                      image = await pdf.embedJpg(imageBytes);
                                                                                                                                                                                                                                                                                                                                                          } else if (file.type === 'image/png') {
                                                                                                                                                                                                                                                                                                                                                                image = await pdf.embedPng(imageBytes);
                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                          continue;
                                                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                                                                  const page = pdf.addPage([image.width, image.height]);
                                                                                                                                                                                                                                                                                                                                                                                      page.drawImage(image, {
                                                                                                                                                                                                                                                                                                                                                                                            x: 0,
                                                                                                                                                                                                                                                                                                                                                                                                  y: 0,
                                                                                                                                                                                                                                                                                                                                                                                                        width: image.width,
                                                                                                                                                                                                                                                                                                                                                                                                              height: image.height,
                                                                                                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                      return await pdf.save();
                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                      export async function downloadAsZip(
                                                                                                                                                                                                                                                                                                                                                                                                                        files: { filename: string; blob: Blob }[]
                                                                                                                                                                                                                                                                                                                                                                                                                        ): Promise<void> {
                                                                                                                                                                                                                                                                                                                                                                                                                          const zip = new JSZip();

                                                                                                                                                                                                                                                                                                                                                                                                                            files.forEach(({ filename, blob }) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                zip.file(filename, blob);
                                                                                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                                                                                    const zipBlob = await zip.generateAsync({ type: 'blob' });
                                                                                                                                                                                                                                                                                                                                                                                                                                      saveAs(zipBlob, 'processed_files.zip');
                                                                                                                                                                                                                                                                                                                                                                                                                                      }