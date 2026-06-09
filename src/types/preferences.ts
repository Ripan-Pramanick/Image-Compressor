export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

export interface UserPreferences {
  theme: Theme;
  language: Language;
  defaultCompressionQuality: number;
  defaultImageFormat: string;
  autoDownload: boolean;
  preserveMetadata: boolean;
  showTooltips: boolean;
  animationsEnabled: boolean;
}

export const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  defaultCompressionQuality: 80,
  defaultImageFormat: 'webp',
  autoDownload: false,
  preserveMetadata: true,
  showTooltips: true,
  animationsEnabled: true,
};