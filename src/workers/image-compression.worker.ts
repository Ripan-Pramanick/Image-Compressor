import imageCompression from 'browser-image-compression';

self.onmessage = async (e: MessageEvent) => {
  const { file, options, id } = e.data;

    try {
        const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
                    maxWidthOrHeight: options.maxWidth || 1920,
                          useWebWorker: true,
                                quality: options.quality / 100,
                                      fileType: options.fileType || file.type,
                                            onProgress: (progress: number) => {
                                                    self.postMessage({ type: 'progress', id, progress });
                                                          },
                                                              });

                                                                  self.postMessage({
                                                                        type: 'complete',
                                                                              id,
                                                                                    compressedFile,
                                                                                        });
                                                                                          } catch (error) {
                                                                                              self.postMessage({
                                                                                                    type: 'error',
                                                                                                          id,
                                                                                                                error: error instanceof Error ? error.message : 'Compression failed',
                                                                                                                    });
                                                                                                                      }
                                                                                                                      };