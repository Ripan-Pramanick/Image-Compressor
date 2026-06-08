'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export function ThemeToggle() {
  const { preferences, setTheme } = useUserPreferences();

    const toggleTheme = useCallback(() => {
        const newTheme = preferences.theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
              }, [preferences.theme, setTheme]);

                const isDark = preferences.theme === 'dark' ||
                    (preferences.theme === 'system' &&
                          typeof window !== 'undefined' &&
                                window.matchMedia('(prefers-color-scheme: dark)').matches);

                                  return (
                                      <motion.button
                                            onClick={toggleTheme}
                                                  className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden"
                                                        whileTap={{ scale: 0.95 }}
                                                              aria-label="Toggle theme"
                                                                  >
                                                                        <motion.div
                                                                                initial={false}
                                                                                        animate={{
                                                                                                  rotate: isDark ? 180 : 0,
                                                                                                            scale: isDark ? 0 : 1,
                                                                                                                    }}
                                                                                                                            transition={{ duration: 0.3 }}
                                                                                                                                    className="absolute"
                                                                                                                                          >
                                                                                                                                                  <Sun className="w-5 h-5 text-yellow-500" />
                                                                                                                                                        </motion.div>
                                                                                                                                                              <motion.div
                                                                                                                                                                      initial={false}
                                                                                                                                                                              animate={{
                                                                                                                                                                                        rotate: isDark ? 0 : -180,
                                                                                                                                                                                                  scale: isDark ? 1 : 0,
                                                                                                                                                                                                          }}
                                                                                                                                                                                                                  transition={{ duration: 0.3 }}
                                                                                                                                                                                                                          className="absolute"
                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                        <Moon className="w-5 h-5 text-blue-400" />
                                                                                                                                                                                                                                              </motion.div>
                                                                                                                                                                                                                                                  </motion.button>
                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                    }