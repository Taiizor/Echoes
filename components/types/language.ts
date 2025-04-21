/**
 * Language interface
 */
export interface Language {
  /** Language code (ISO 639-1) */
  code: string;
  /** English name of the language */
  name: string;
  /** Native name of the language */
  nativeName: string;
  /** Language flag (emoji) */
  flag: string;
  /** Whether the language is enabled */
  enabled: boolean;
}

/**
 * Supported languages
 */
export const supportedLanguages: Language[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enabled: true },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', enabled: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enabled: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enabled: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', enabled: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', enabled: true },
]; 