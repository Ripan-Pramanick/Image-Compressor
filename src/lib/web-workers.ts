export function createImageCompressionWorker(): Worker {
      return new Worker(
          new URL('../workers/image-compression.worker.ts', import.meta.url)
            );
            }

            export function createPDFProcessingWorker(): Worker {
              return new Worker(
                  new URL('../workers/pdf-processing.worker.ts', import.meta.url)
                    );
                    }

                    export class WorkerPool {
                      private workers: Worker[] = [];
                        private queue: Array<{
                            worker: Worker;
                                resolve: (value: unknown) => void;
                                    reject: (reason?: unknown) => void;
                                      }> = [];
                                        private maxWorkers: number;

                                          constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
                                              this.maxWorkers = maxWorkers;
                                                }

                                                  async execute<T>(
                                                      workerCreator: () => Worker,
                                                          data: unknown
                                                            ): Promise<T> {
                                                                const worker = this.getWorker(workerCreator);

                                                                    return new Promise((resolve, reject) => {
                                                                          worker.onmessage = (e: MessageEvent) => {
                                                                                  if (e.data.type === 'complete') {
                                                                                            this.releaseWorker(worker);
                                                                                                      resolve(e.data.result);
                                                                                                              } else if (e.data.type === 'error') {
                                                                                                                        this.releaseWorker(worker);
                                                                                                                                  reject(new Error(e.data.error));
                                                                                                                                          }
                                                                                                                                                };

                                                                                                                                                      worker.onerror = (error) => {
                                                                                                                                                              this.releaseWorker(worker);
                                                                                                                                                                      reject(error);
                                                                                                                                                                            };

                                                                                                                                                                                  worker.postMessage(data);
                                                                                                                                                                                      });
                                                                                                                                                                                        }

                                                                                                                                                                                          private getWorker(creator: () => Worker): Worker {
                                                                                                                                                                                              if (this.workers.length > 0) {
                                                                                                                                                                                                    return this.workers.pop()!;
                                                                                                                                                                                                        }
                                                                                                                                                                                                            return creator();
                                                                                                                                                                                                              }

                                                                                                                                                                                                                private releaseWorker(worker: Worker): void {
                                                                                                                                                                                                                    this.workers.push(worker);
                                                                                                                                                                                                                      }

                                                                                                                                                                                                                        destroy(): void {
                                                                                                                                                                                                                            this.workers.forEach((w) => w.terminate());
                                                                                                                                                                                                                                this.workers = [];
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  }
}