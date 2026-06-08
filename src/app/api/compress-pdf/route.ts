import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const dynamic = 'force-dynamic';

// Increase body size limit for PDF uploads
export const config = {
  api: {
      bodyParser: false,
        },
        };

        export async function POST(request: NextRequest) {
          try {
              const formData = await request.formData();
                  const file = formData.get('file') as File;
                      const quality = parseInt(formData.get('quality') as string) || 80;

                          if (!file) {
                                return NextResponse.json(
                                        { error: 'No file provided' },
                                                { status: 400 }
                                                      );
                                                          }

                                                              // Validate file type
                                                                  if (!file.type.includes('pdf')) {
                                                                        return NextResponse.json(
                                                                                { error: 'Invalid file type. Only PDF files are accepted.' },
                                                                                        { status: 400 }
                                                                                              );
                                                                                                  }

                                                                                                      // Validate file size (max 100MB)
                                                                                                          const maxSize = 100 * 1024 * 1024;
                                                                                                              if (file.size > maxSize) {
                                                                                                                    return NextResponse.json(
                                                                                                                            { error: 'File size exceeds 100MB limit' },
                                                                                                                                    { status: 400 }
                                                                                                                                          );
                                                                                                                                              }

                                                                                                                                                  // Process the PDF
                                                                                                                                                      const arrayBuffer = await file.arrayBuffer();
                                                                                                                                                          const pdfDoc = await PDFDocument.load(arrayBuffer);

                                                                                                                                                              // Apply compression optimizations
                                                                                                                                                                  if (quality < 100) {
                                                                                                                                                                        // Remove metadata to reduce size
                                                                                                                                                                              pdfDoc.setTitle('');
                                                                                                                                                                                    pdfDoc.setAuthor('');
                                                                                                                                                                                          pdfDoc.setSubject('');
                                                                                                                                                                                                pdfDoc.setKeywords([]);
                                                                                                                                                                                                      pdfDoc.setProducer('');
                                                                                                                                                                                                            pdfDoc.setCreator('');
                                                                                                                                                                                                                }

                                                                                                                                                                                                                    // Save with compression
                                                                                                                                                                                                                        const compressedBytes = await pdfDoc.save({
                                                                                                                                                                                                                              useObjectStreams: quality < 80,
                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                      // Create response with the compressed PDF
                                                                                                                                                                                                                                          const response = new NextResponse(new Uint8Array(compressedBytes), {
                                                                                                                                                                                                                                                headers: {
                                                                                                                                                                                                                                                        'Content-Type': 'application/pdf',
                                                                                                                                                                                                                                                                'Content-Disposition': `attachment; filename="compressed_${file.name}"`,
                                                                                                                                                                                                                                                                        'Content-Length': compressedBytes.byteLength.toString(),
                                                                                                                                                                                                                                                                                'Cache-Control': 'no-store, must-revalidate',
                                                                                                                                                                                                                                                                                        'X-Content-Type-Options': 'nosniff',
                                                                                                                                                                                                                                                                                                'X-Frame-Options': 'DENY',
                                                                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                              return response;
                                                                                                                                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                                                                                                                                    console.error('PDF compression error:', error);
                                                                                                                                                                                                                                                                                                                        return NextResponse.json(
                                                                                                                                                                                                                                                                                                                              { error: 'Failed to compress PDF' },
                                                                                                                                                                                                                                                                                                                                    { status: 500 }
                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                          }