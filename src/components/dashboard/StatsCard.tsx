'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
    value: string;
      icon: React.ReactNode;
        color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
          trend?: {
              value: number;
                  isPositive: boolean;
                    };
                    }

                    const colorClasses = {
                      blue: {
                          bg: 'bg-blue-100 dark:bg-blue-900/30',
                              text: 'text-blue-600 dark:text-blue-400',
                                  icon: 'text-blue-500',
                                    },
                                      green: {
                                          bg: 'bg-green-100 dark:bg-green-900/30',
                                              text: 'text-green-600 dark:text-green-400',
                                                  icon: 'text-green-500',
                                                    },
                                                      purple: {
                                                          bg: 'bg-purple-100 dark:bg-purple-900/30',
                                                              text: 'text-purple-600 dark:text-purple-400',
                                                                  icon: 'text-purple-500',
                                                                    },
                                                                      yellow: {
                                                                          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                                                                              text: 'text-yellow-600 dark:text-yellow-400',
                                                                                  icon: 'text-yellow-500',
                                                                                    },
                                                                                      red: {
                                                                                          bg: 'bg-red-100 dark:bg-red-900/30',
                                                                                              text: 'text-red-600 dark:text-red-400',
                                                                                                  icon: 'text-red-500',
                                                                                                    },
                                                                                                    };

                                                                                                    export function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
                                                                                                      const colors = colorClasses[color];

                                                                                                        return (
                                                                                                            <motion.div
                                                                                                                  initial={{ opacity: 0, scale: 0.95 }}
                                                                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                                                                              whileHover={{ y: -2 }}
                                                                                                                                  >
                                                                                                                                        <Card className="h-full">
                                                                                                                                                <div className="flex items-start justify-between mb-3">
                                                                                                                                                          <div className={cn('p-2 rounded-lg', colors.bg)}>
                                                                                                                                                                      <span className={colors.icon}>{icon}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                                          {trend && (
                                                                                                                                                                                                      <span
                                                                                                                                                                                                                    className={cn(
                                                                                                                                                                                                                                    'text-xs font-medium px-2 py-1 rounded-full',
                                                                                                                                                                                                                                                    trend.isPositive
                                                                                                                                                                                                                                                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                                                                                                                                                                                                                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                {trend.isPositive ? '+' : ''}{trend.value}%
                                                                                                                                                                                                                                                                                                                                            </span>
                                                                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                                                                                                                                                                                                                                                                                                                                                {value}
                                                                                                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                                                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                                                                                                                                                                                                                                                                                                                                                                                                      </Card>
                                                                                                                                                                                                                                                                                                                                                                                                          </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                            }