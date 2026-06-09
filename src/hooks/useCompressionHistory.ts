'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ProcessingActivity } from '@/types/dashboard';
import { generateId } from '@/lib/utils';

const MAX_HISTORY_ITEMS = 100;

export function useCompressionHistory() {
  const [history, setHistory] = useLocalStorage<ProcessingActivity[]>(
    'fileforge-history',
    []
  );

  const addToHistory = useCallback(
    (activity: Omit<ProcessingActivity, 'id'>) => {
      setHistory((prev) => {
        const newActivity: ProcessingActivity = {
          ...activity,
          id: generateId(),
        };
        const updated = [newActivity, ...prev].slice(0, MAX_HISTORY_ITEMS);
        return updated;
      });
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const getToolHistory = useCallback(
    (toolId: string) => {
      return history.filter((activity) => activity.toolId === toolId);
    },
    [history]
  );

  const getRecentActivity = useCallback(
    (limit = 10) => {
      return history.slice(0, limit);
    },
    [history]
  );

  return {
    history,
    addToHistory,
    clearHistory,
    getToolHistory,
    getRecentActivity,
  };
}