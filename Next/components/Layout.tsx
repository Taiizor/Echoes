import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiChevronDown, FiGithub, FiMenu, FiX, FiHeart, FiUser, FiCheck, FiAlertTriangle } from 'react-icons/fi';

// Client-side only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

interface LayoutProps {
  children: React.ReactNode;
}

// Supported languages
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  enabled: boolean; // Whether the language is enabled
}

// Actually supported languages (those defined in Next.js i18n configuration)
const supportedLanguages: Language[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enabled: true },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', enabled: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enabled: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enabled: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', enabled: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', enabled: true },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [showLanguageError, setShowLanguageError] = useState(false);
  
  // Check for saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    // Only change language for supported and enabled languages
    if (savedLanguage && savedLanguage !== router.locale) {
      const isEnabled = supportedLanguages.some(lang => lang.code === savedLanguage && lang.enabled);
      if (isEnabled) {
        router.push(router.pathname, router.asPath, { locale: savedLanguage });
      } else {
        // If it's an unsupported language, remove it from local storage
        localStorage.removeItem('language');
      }
    }
  }, []);
  
  // For style changes in navbar when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-language-menu]')) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide language error notification after 3 seconds
  useEffect(() => {
    if (showLanguageError) {
      const timer = setTimeout(() => {
        setShowLanguageError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLanguageError]);
  
  // Helper function to determine the actual theme value
  const getActualTheme = () => {
    // resolvedTheme is priority, then theme, if neither exists use 'dark'
    return resolvedTheme || theme || 'dark';
  };
  
  const toggleTheme = () => {
    const actualTheme = getActualTheme();
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (locale: string) => {
    // Check if the selected language is enabled
    const selectedLang = supportedLanguages.find(lang => lang.code === locale);
    
    if (selectedLang && selectedLang.enabled) {
      try {
        localStorage.setItem('language', locale);
        router.push(router.pathname, router.asPath, { locale });
        setLanguageMenuOpen(false);
      } catch (error) {
        console.error("Language change error:", error);
        setShowLanguageError(true);
      }
    } else {
      // Show warning that language is disabled or not supported
      setShowLanguageError(true);
    }
  };

  // Get information for current language
  const getCurrentLanguage = () => {
    return supportedLanguages.find(lang => lang.code === router.locale) || supportedLanguages[0];
  };

  // Navbar Links
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/docs', label: t('nav.docs') },
    { href: '/about', label: t('nav.about') }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header 
        className={`sticky top-0 z-20 w-full backdrop-blur transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-900/90 shadow-md' 
            : 'bg-white/60 dark:bg-gray-900/75'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2 group">
              <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">❝</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500">
                Echoes
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`px-4 py-2 rounded-lg transition-colors text-lg ${
                    router.pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Selector Dropdown */}
              <div className="relative" data-language-menu>
                <button 
                  type="button" 
                  className="ml-2 inline-flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  aria-expanded={languageMenuOpen}
                  aria-haspopup="true"
                >
                  <ClientOnly>
                    <span className="mr-1">{getCurrentLanguage().flag}</span>
                    <span className="mx-1">{getCurrentLanguage().nativeName}</span>
                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} />
                  </ClientOnly>
                </button>

                {/* Language Selection Menu */}
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {supportedLanguages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => changeLanguage(language.code)}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                            router.locale === language.code 
                              ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                              : language.enabled 
                                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          }`}
                          role="menuitem"
                          disabled={!language.enabled}
                        >
                          <span className="flex items-center">
                            <span className="mr-2">{language.flag}</span>
                            <span>{language.nativeName}</span>
                          </span>
                          <span className="flex items-center">
                            {router.locale === language.code && (
                              <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            )}
                            {!language.enabled && (
                              <span className="text-xs ml-2 text-gray-400 dark:text-gray-500">{t('language.comingSoon')}</span>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Language error notification */}
                {showLanguageError && (
                  <div className="absolute right-0 mt-2 p-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md shadow-lg w-56 text-sm flex items-center z-40">
                    <FiAlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{t('language.notSupported')}</span>
                  </div>
                )}
              </div>
              
              {/* Theme Switcher */}
              <button 
                onClick={toggleTheme} 
                className="ml-1 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all"
                aria-label="Toggle theme"
              >
                <ClientOnly>
                  {getActualTheme() === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
                </ClientOnly>
              </button>
              
              {/* GitHub Link */}
              <a 
                href="https://github.com/Taiizor/Echoes" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-1 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all"
                aria-label="GitHub"
              >
                <ClientOnly>
                  <FiGithub className="w-5 h-5" />
                </ClientOnly>
              </a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <ClientOnly>
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </ClientOnly>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  router.pathname === link.href
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3">
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('language.select')}</p>
                <div className="grid grid-cols-1 gap-2">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        if (language.enabled) {
                          changeLanguage(language.code);
                          setMobileMenuOpen(false);
                        } else {
                          setShowLanguageError(true);
                        }
                      }}
                      className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                        router.locale === language.code 
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                          : language.enabled
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 opacity-60'
                      }`}
                      disabled={!language.enabled}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{language.flag}</span>
                        <span>{language.nativeName}</span>
                      </span>
                      <span className="flex items-center">
                        {router.locale === language.code && (
                          <FiCheck className="w-4 h-4" />
                        )}
                        {!language.enabled && (
                          <span className="text-xs ml-2 text-gray-400 dark:text-gray-500">{t('language.comingSoon')}</span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile language error notification */}
                {showLanguageError && (
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md text-sm flex items-center">
                    <FiAlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{t('language.notSupported')}</span>
                  </div>
                )}
              </div>
              
              {/* Theme Switcher */}
              <button 
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }} 
                className="w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 flex items-center"
              >
                <ClientOnly>
                  {getActualTheme() === 'light' ? (
                    <>
                      <FiMoon className="mr-2" />
                      {t('theme.dark')}
                    </>
                  ) : (
                    <>
                      <FiSun className="mr-2" />
                      {t('theme.light')}
                    </>
                  )}
                </ClientOnly>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="text-3xl">❝</span>
                  Echoes
                </Link>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  {t('app.description')}
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-4 mb-4">
                  <a 
                    href="https://github.com/Taiizor/Echoes" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <ClientOnly>
                      <FiGithub className="w-5 h-5" />
                    </ClientOnly>
                  </a>
                  <a 
                    href="https://github.com/Taiizor" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label="Author"
                  >
                    <ClientOnly>
                      <FiUser className="w-5 h-5" />
                    </ClientOnly>
                  </a>
                </div>
                
                <p className="flex items-center text-gray-600 dark:text-gray-400">
                  {t('footer.madeWith')} <FiHeart className="mx-1 text-red-500" /> {t('footer.by')} <a href="https://github.com/Taiizor" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary-600 dark:text-primary-400 hover:underline">Taiizor</a>
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-center md:justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  © {new Date().getFullYear()} Echoes. {t('footer.allRightsReserved')}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-sm text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 