'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  show?: boolean;
  children?: React.ReactNode;
}

export function FloatingActionButton({
  icon,
  onClick,
  className,
  show = true,
  children,
}: FloatingActionButtonProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick || scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary-500 text-white rounded-2xl shadow-lg shadow-primary-500/25 flex items-center justify-center',
            'hover:bg-primary-600 transition-colors',
            className
          )}
        >
          {children || icon || <ChevronUp className="w-6 h-6" />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}