'use client';

import toast from 'react-hot-toast';
import { useCallback } from 'react';

export function useToast() {
  const showSuccess = useCallback((message: string) => {
      toast.success(message, {
            duration: 3000,
                  position: 'bottom-right',
                        style: {
                                borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                      },
                                                          });
                                                            }, []);

                                                              const showError = useCallback((message: string) => {
                                                                  toast.error(message, {
                                                                        duration: 4000,
                                                                              position: 'bottom-right',
                                                                                    style: {
                                                                                            borderRadius: '12px',
                                                                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                                                                            backdropFilter: 'blur(10px)',
                                                                                                                  },
                                                                                                                      });
                                                                                                                        }, []);

                                                                                                                          const showInfo = useCallback((message: string) => {
                                                                                                                              toast(message, {
                                                                                                                                    duration: 3000,
                                                                                                                                          position: 'bottom-right',
                                                                                                                                                icon: '🔔',
                                                                                                                                                      style: {
                                                                                                                                                              borderRadius: '12px',
                                                                                                                                                                      background: 'rgba(255, 255, 255, 0.9)',
                                                                                                                                                                              backdropFilter: 'blur(10px)',
                                                                                                                                                                                    },
                                                                                                                                                                                        });
                                                                                                                                                                                          }, []);

                                                                                                                                                                                            const showPromise = useCallback(
                                                                                                                                                                                                <T>(
                                                                                                                                                                                                      promise: Promise<T>,
                                                                                                                                                                                                            messages: {
                                                                                                                                                                                                                    loading: string;
                                                                                                                                                                                                                            success: string;
                                                                                                                                                                                                                                    error: string;
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                              ) => {
                                                                                                                                                                                                                                                    return toast.promise(promise, messages, {
                                                                                                                                                                                                                                                            position: 'bottom-right',
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                                          []
                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                              return {
                                                                                                                                                                                                                                                                                  showSuccess,
                                                                                                                                                                                                                                                                                      showError,
                                                                                                                                                                                                                                                                                          showInfo,
                                                                                                                                                                                                                                                                                              showPromise,
                                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                                }