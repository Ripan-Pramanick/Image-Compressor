'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
    reset,
    }: {
      error: Error & { digest?: string };
        reset: () => void;
        }) {
          useEffect(() => {
              console.error('Application error:', error);
                }, [error]);

                  return (
                      <div className="min-h-[80vh] flex items-center justify-center px-4">
                            <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                                    className="text-center"
                                                          >
                                                                  <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                                                                          
                                                                                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                                                                            Something Went Wrong
                                                                                                    </h1>
                                                                                                            
                                                                                                                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                                                                                                              An unexpected error occurred. Your files and data are safe since everything
                                                                                                                                        is processed locally in your browser.
                                                                                                                                                </p>
                                                                                                                                                        
                                                                                                                                                                <div className="flex gap-4 justify-center">
                                                                                                                                                                          <Button onClick={reset} icon={<RefreshCcw className="w-5 h-5" />}>
                                                                                                                                                                                      Try Again
                                                                                                                                                                                                </Button>
                                                                                                                                                                                                          <Button variant="secondary" onClick={() => window.location.href = '/'}>
                                                                                                                                                                                                                      Go Home
                                                                                                                                                                                                                                </Button>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                        {error.digest && (
                                                                                                                                                                                                                                                                  <p className="mt-4 text-xs text-gray-400 dark:text-gray-600">
                                                                                                                                                                                                                                                                              Error ID: {error.digest}
                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                      </motion.div>
                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                            }