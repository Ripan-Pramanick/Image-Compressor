export const APP_NAME = 'FileForge';
export const APP_DESCRIPTION = 'Privacy-first file processing toolkit. All processing happens in your browser.';
export const APP_URL = 'https://fileforge.app';

export const STORAGE_KEYS = {
  HISTORY: 'fileforge-history',
  PREFERENCES: 'fileforge-preferences',
  DASHBOARD: 'fileforge-dashboard',
  DAILY_USAGE: 'fileforge-daily-usage',
  FAVORITES: 'fileforge-favorites',
} as const;

export const LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_FILES: 50,
  MAX_HISTORY_ITEMS: 100,
  MAX_FAVORITES: 10,
  MAX_PRESETS: 5,
} as const;

export const COMPRESSION = {
  MIN_QUALITY: 1,
  MAX_QUALITY: 100,
  DEFAULT_QUALITY: 80,
  PRESETS: {
    EXTREME: 20,
    HIGH: 40,
    MEDIUM: 60,
    LOW: 80,
    LOSSLESS: 100,
  },
} as const;

export const IMAGE_DIMENSIONS = {
  MAX_WIDTH: 7680,
  MAX_HEIGHT: 4320,
  MIN_WIDTH: 1,
  MIN_HEIGHT: 1,
} as const;