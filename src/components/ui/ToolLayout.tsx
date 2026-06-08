'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { generateToolSchema } from '@/config/seo';

interface ToolLayoutProps {
  title: string;
    description: string;
      children: React.ReactNode;
        className?: string;
          sidebar?: React.ReactNode;
          }

          export function ToolLayout({
            title,
              description,
                children,
                  className,
                    sidebar,
                    }: ToolLayoutProps) {
                      return (
                          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                {/* Tool Header */}
                                      <motion.div
                                              initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                              className="mb-8"
                                                                    >
                                                                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                                                                      {title}
                                                                                              </h1>
                                                                                                      <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                                                                                                                {description}
                                                                                                                        </p>
                                                                                                                              </motion.div>

                                                                                                                                    {/* Tool Content */}
                                                                                                                                          <div className={cn('grid grid-cols-1 gap-8', sidebar && 'lg:grid-cols-3')}>
                                                                                                                                                  <div className={cn(sidebar && 'lg:col-span-2', className)}>
                                                                                                                                                            {children}
                                                                                                                                                                    </div>
                                                                                                                                                                            {sidebar && (
                                                                                                                                                                                      <div className="lg:col-span-1">
                                                                                                                                                                                                  <div className="sticky top-24">
                                                                                                                                                                                                                {sidebar}
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                          }