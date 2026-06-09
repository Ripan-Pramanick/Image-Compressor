'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  UserPreferences,
  defaultPreferences,
  Theme,
  Language,
} from '@/types/preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'fileforge-preferences',
    defaultPreferences
  );

  const updatePreference = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    },
    [setPreferences]
  );

  const setTheme = useCallback(
    (theme: Theme) => {
      updatePreference('theme', theme);
      applyTheme(theme);
    },
    [updatePreference]
  );

  const setLanguage = useCallback(
    (language: Language) => {
      updatePreference('language', language);
    },
    [updatePreference]
  );

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
    applyTheme(defaultPreferences.theme);
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    setTheme,
    setLanguage,
    resetPreferences,
  };
}

function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDark);
}