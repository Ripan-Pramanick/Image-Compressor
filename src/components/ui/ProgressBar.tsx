'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress?: number;
    label?: string;
      size?: 'sm' | 'md' | 'lg';
        showPercentage?: boolean;
          className?: string;
            indeterminate?: boolean;
            }

            export function ProgressBar({
              progress = 0,
                label,
                  size = 'md',
                    showPercentage = true,
                      className,
                        indeterminate = false,
                        }: ProgressBarProps) {
                          const sizes = {
                              sm: 'h-1.5',
                                  md: 'h-2.5',
                                      lg: 'h-4',
                                        };

                                          const clampedProgress = Math.min(100, Math.max(0, progress));
                                          const showPercentageLabel = showPercentage && !indeterminate;

                                            return (
                                                <div className={cn('w-full', className)}>
                                                      {(label || showPercentageLabel) && (
                                                              <div className="flex justify-between items-center mb-1.5">
                                                                        {label && (
                                                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                                                  {label}
                                                                                                              </span>
                                                                                                                        )}
                                                                                                                                  {showPercentageLabel && (
                                                                                                                                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                                                                                                            {Math.round(clampedProgress)}%
                                                                                                                                                                        </span>
                                                                                                                                                                                  )}
                                                                                                                                                                                          </div>
                                                                                                                                                                                                )}
                                                                                                                                                                                                      <div
                                                                                                                                                                                                              className={cn(
                                                                                                                                                                                                                        'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
                                                                                                                                                                                                                                  sizes[size]
                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                        <motion.div
                                                                                                                                                                                                                                                                  className={cn(
                                                                                                                                                                                                                                                                              'h-full rounded-full',
                                                                                                                                                                                                                                                                                          indeterminate
                                                                                                                                                                                                                                                                                                        ? 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-pulse'
                                                                                                                                                                                                                                                                                                                      : 'bg-primary-500'
                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                          initial={{ width: 0 }}
                                                                                                                                                                                                                                                                                                                                                    animate={{
                                                                                                                                                                                                                                                                                                                                                                width: indeterminate ? '100%' : `${clampedProgress}%`,
                                                                                                                                                                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                                                                                                                                                                                    transition={{
                                                                                                                                                                                                                                                                                                                                                                                                duration: indeterminate ? 2 : 0.3,
                                                                                                                                                                                                                                                                                                                                                                                                            repeat: indeterminate ? Infinity : 0,
                                                                                                                                                                                                                                                                                                                                                                                                                        ease: 'easeInOut',
                                                                                                                                                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                                      }