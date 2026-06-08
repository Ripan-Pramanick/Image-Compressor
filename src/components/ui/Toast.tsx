'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
    type: ToastType;
      message: string;
        duration?: number;
        }

        interface ToastContextType {
          addToast: (type: ToastType, message: string, duration?: number) => void;
          }

          const ToastContext = createContext<ToastContextType | null>(null);

          export function useToastContext() {
            const context = useContext(ToastContext);
              if (!context) {
                  throw new Error('useToastContext must be used within a ToastProvider');
                    }
                      return context;
                      }

                      export function ToastProvider({ children }: { children: React.ReactNode }) {
                        const [toasts, setToasts] = useState<Toast[]>([]);

                          const addToast = useCallback(
                              (type: ToastType, message: string, duration = 4000) => {
                                    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
                                          setToasts((prev) => [...prev, { id, type, message, duration }]);

                                                if (duration > 0) {
                                                        setTimeout(() => {
                                                                  setToasts((prev) => prev.filter((t) => t.id !== id));
                                                                          }, duration);
                                                                                }
                                                                                    },
                                                                                        []
                                                                                          );

                                                                                            const removeToast = useCallback((id: string) => {
                                                                                                setToasts((prev) => prev.filter((t) => t.id !== id));
                                                                                                  }, []);

                                                                                                    const icons = {
                                                                                                        success: <CheckCircle className="w-5 h-5 text-green-500" />,
                                                                                                            error: <XCircle className="w-5 h-5 text-red-500" />,
                                                                                                                info: <Info className="w-5 h-5 text-blue-500" />,
                                                                                                                  };

                                                                                                                    const styles = {
                                                                                                                        success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30',
                                                                                                                            error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30',
                                                                                                                                info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30',
                                                                                                                                  };

                                                                                                                                    return (
                                                                                                                                        <ToastContext.Provider value={{ addToast }}>
                                                                                                                                              {children}
                                                                                                                                                    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                                                                                                                                                            <AnimatePresence>
                                                                                                                                                                      {toasts.map((toast) => (
                                                                                                                                                                                  <motion.div
                                                                                                                                                                                                key={toast.id}
                                                                                                                                                                                                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                                                                                                                                                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                                                                                                                                                                                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                                                                                                                                                                                                                        className={cn(
                                                                                                                                                                                                                                                                        'pointer-events-auto border rounded-xl p-4 shadow-lg backdrop-blur-lg',
                                                                                                                                                                                                                                                                                        styles[toast.type]
                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                <div className="flex items-start gap-3">
                                                                                                                                                                                                                                                                                                                                                {icons[toast.type]}
                                                                                                                                                                                                                                                                                                                                                                <p className="text-sm font-medium text-gray-900 dark:text-white flex-1">
                                                                                                                                                                                                                                                                                                                                                                                  {toast.message}
                                                                                                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                                                                                                                  <button
                                                                                                                                                                                                                                                                                                                                                                                                                                    onClick={() => removeToast(toast.id)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <X className="w-4 h-4" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </AnimatePresence>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </ToastContext.Provider>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }