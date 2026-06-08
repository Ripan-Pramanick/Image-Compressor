'use client';

import React, { useMemo } from 'react';
import { useCompressionHistory } from '@/hooks/useCompressionHistory';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { FavoriteTools } from './FavoriteTools';
import { DashboardStats } from '@/types/dashboard';
import { formatBytes } from '@/lib/utils';
import { FileCheck, HardDrive, Activity, Star } from 'lucide-react';

export function Dashboard() {
  const { history } = useCompressionHistory();
    const [favorites] = useLocalStorage('fileforge-favorites', []);

      const stats = useMemo(() => {
          const totalFiles = history.reduce(
                (sum, activity) => sum + activity.filesProcessed,
                      0
                          );
                              const totalSpaceSaved = history.reduce(
                                    (sum, activity) => sum + activity.spaceSaved,
                                          0
                                              );

                                                  return {
                                                        totalFilesProcessed: totalFiles,
                                                              totalSpaceSaved,
                                                                    totalActivities: history.length,
                                                                          favoriteToolsCount: favorites.length,
                                                                              };
                                                                                }, [history, favorites]);

                                                                                  return (
                                                                                      <div className="space-y-6">
                                                                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                                                                    <StatsCard
                                                                                                              title="Files Processed"
                                                                                                                        value={stats.totalFilesProcessed.toLocaleString()}
                                                                                                                                  icon={<FileCheck className="w-5 h-5" />}
                                                                                                                                            color="blue"
                                                                                                                                                    />
                                                                                                                                                            <StatsCard
                                                                                                                                                                      title="Space Saved"
                                                                                                                                                                                value={formatBytes(stats.totalSpaceSaved)}
                                                                                                                                                                                          icon={<HardDrive className="w-5 h-5" />}
                                                                                                                                                                                                    color="green"
                                                                                                                                                                                                            />
                                                                                                                                                                                                                    <StatsCard
                                                                                                                                                                                                                              title="Activities"
                                                                                                                                                                                                                                        value={stats.totalActivities.toString()}
                                                                                                                                                                                                                                                  icon={<Activity className="w-5 h-5" />}
                                                                                                                                                                                                                                                            color="purple"
                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                            <StatsCard
                                                                                                                                                                                                                                                                                      title="Favorites"
                                                                                                                                                                                                                                                                                                value={stats.favoriteToolsCount.toString()}
                                                                                                                                                                                                                                                                                                          icon={<Star className="w-5 h-5" />}
                                                                                                                                                                                                                                                                                                                    color="yellow"
                                                                                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                                                                                                                                                                                                                                                                                                                <RecentActivity activities={history.slice(0, 5)} />
                                                                                                                                                                                                                                                                                                                                                        <FavoriteTools />
                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                    }