'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  glass?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({
  glass = true,
  hover = false,
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const glassStyles = glass
    ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl'
    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      className={cn(
        'rounded-2xl transition-all duration-200',
        glassStyles,
        paddings[padding],
        hover && 'cursor-pointer hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}