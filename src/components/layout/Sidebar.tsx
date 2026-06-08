'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { tools } from '@/config/tools';
import {
  ImageIcon,
    FileText,
      Repeat,
        Scissors,
          Maximize2,
            Crop,
              FileDown,
                Combine,
                  FileUp,
                    FileImage,
                    } from 'lucide-react';

                    const iconMap: Record<string, React.ReactNode> = {
                      ImageIcon: <ImageIcon className="w-5 h-5" />,
                        Repeat: <Repeat className="w-5 h-5" />,
                          Maximize2: <Maximize2 className="w-5 h-5" />,
                            Crop: <Crop className="w-5 h-5" />,
                              FileDown: <FileDown className="w-5 h-5" />,
                                Combine: <Combine className="w-5 h-5" />,
                                  Scissors: <Scissors className="w-5 h-5" />,
                                    FileUp: <FileUp className="w-5 h-5" />,
                                      Image: <ImageIcon className="w-5 h-5" />,
                                      };

                                      const categories = [
                                        { id: 'image', label: 'Image Tools', icon: <ImageIcon className="w-4 h-4" /> },
                                          { id: 'pdf', label: 'PDF Tools', icon: <FileText className="w-4 h-4" /> },
                                            { id: 'converter', label: 'Converters', icon: <Repeat className="w-4 h-4" /> },
                                            ];

                                            export function Sidebar() {
                                              const pathname = usePathname();

                                                return (
                                                    <aside className="w-64 flex-shrink-0 hidden lg:block">
                                                          <nav className="sticky top-24 space-y-6">
                                                                  {categories.map((category) => {
                                                                            const categoryTools = tools.filter((t) => t.category === category.id);
                                                                                      if (categoryTools.length === 0) return null;

                                                                                                return (
                                                                                                            <div key={category.id}>
                                                                                                                          <h3 className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                                                                                                                                          {category.icon}
                                                                                                                                                          {category.label}
                                                                                                                                                                        </h3>
                                                                                                                                                                                      <ul className="space-y-1">
                                                                                                                                                                                                      {categoryTools.map((tool) => (
                                                                                                                                                                                                                        <li key={tool.id}>
                                                                                                                                                                                                                                            <Link
                                                                                                                                                                                                                                                                  href={tool.route}
                                                                                                                                                                                                                                                                                        className={cn(
                                                                                                                                                                                                                                                                                                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                                                                                                                                                                                                                                                                                                                        pathname === tool.route
                                                                                                                                                                                                                                                                                                                                                                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                                                                                                                                                                                                                                                                                                                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                                                                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                            {iconMap[tool.icon]}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {tool.name}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </ul>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    })}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </nav>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </aside>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }