'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Home,
  ImageIcon,
  FileText,
  Info,
  Shield,
} from 'lucide-react';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: '/image-compressor',
    label: 'Images',
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    href: '/pdf-compressor',
    label: 'PDF',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <Info className="w-5 h-5" />,
  },
  {
    href: '/privacy',
    label: 'Privacy',
    icon: <Shield className="w-5 h-5" />,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 relative',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-400 dark:text-gray-500'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}