import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiChevronDown, FiGithub, FiMenu, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import ClientOnly from './ui/ClientOnly';
import { supportedLanguages } from './types/language';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  // Props definition
}

const Header: React.FC<HeaderProps> = () => {
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
    { href: '/guides', label: t('nav.guides') },
    { href: '/docs', label: t('nav.docs') },
    { href: '/about', label: t('nav.about') }
  ];

  // Animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <header 
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-gray-200/20 dark:shadow-black/10' 
          : 'bg-white/60 dark:bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2 group relative overflow-hidden">
            <span className="text-3xl transition-all duration-500 group-hover:rotate-12 transform origin-bottom-left">❝</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 dark:from-primary-400 dark:via-primary-300 dark:to-primary-400 bg-size-200 group-hover:bg-pos-100 transition-all duration-500">
              Echoes
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 group-hover:w-full transition-all duration-500"></span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-lg relative group overflow-hidden ${
                  router.pathname === link.href
                    ? 'text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 origin-left ${
                  router.pathname === link.href 
                    ? 'bg-primary-500 dark:bg-primary-400 scale-x-100'
                    : 'bg-primary-500/70 dark:bg-primary-400/70 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            
            {/* Language Selector Dropdown */}
            <div className="relative ml-2" data-language-menu>
              <button 
                type="button" 
                className="inline-flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                aria-expanded={languageMenuOpen}
                aria-haspopup="true"
              >
                <ClientOnly>
                  <span className="mr-1 text-lg">{getCurrentLanguage().flag}</span>
                  <span className="mx-1 font-medium">{getCurrentLanguage().nativeName}</span>
                  <FiChevronDown className={`ml-1 transition-transform duration-300 ${languageMenuOpen ? 'rotate-180' : ''}`} />
                </ClientOnly>
              </button>

              {/* Language Selection Menu */}
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-30 overflow-hidden"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {supportedLanguages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => changeLanguage(language.code)}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors duration-200 ${
                            router.locale === language.code 
                              ? 'bg-primary-50/80 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                              : language.enabled 
                                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          }`}
                          role="menuitem"
                          disabled={!language.enabled}
                        >
                          <span className="flex items-center">
                            <span className="mr-2 text-lg">{language.flag}</span>
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Language error notification */}
              <AnimatePresence>
                {showLanguageError && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={notificationVariants}
                    className="absolute right-0 mt-2 p-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300 rounded-lg shadow-lg w-60 text-sm flex items-center z-40"
                  >
                    <FiAlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span>{t('language.notSupported')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme Switcher */}
            <button 
              onClick={toggleTheme} 
              className="ml-1 p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <ClientOnly>
                {getActualTheme() === 'light' ? (
                  <motion.div
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMoon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiSun className="w-5 h-5" />
                  </motion.div>
                )}
              </ClientOnly>
            </button>
            
            {/* GitHub Link */}
            <a 
              href="https://github.com/Taiizor/Echoes" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-1 p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-all duration-200 group"
              aria-label="GitHub"
            >
              <ClientOnly>
                <FiGithub className="w-5 h-5 transform group-hover:rotate-[-8deg] transition-transform duration-300" />
              </ClientOnly>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <ClientOnly>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </ClientOnly>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className={`block px-4 py-3 rounded-xl transition-colors ${
                      router.pathname === link.href
                        ? 'bg-primary-50/80 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                className="border-t border-gray-100 dark:border-gray-800/50 pt-3 space-y-3"
              >
                {/* Mobile Language Selector */}
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2.5">{t('language.select')}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {supportedLanguages.map((language, index) => (
                      <motion.div
                        key={language.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => {
                            if (language.enabled) {
                              changeLanguage(language.code);
                              setMobileMenuOpen(false);
                            } else {
                              setShowLanguageError(true);
                            }
                          }}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                            router.locale === language.code 
                              ? 'bg-primary-50/80 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium shadow-sm'
                              : language.enabled
                                ? 'bg-gray-50/80 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/40'
                                : 'bg-gray-50/50 dark:bg-gray-800/30 text-gray-400 dark:text-gray-500 opacity-70'
                          }`}
                          disabled={!language.enabled}
                        >
                          <span className="flex items-center">
                            <span className="mr-2 text-lg">{language.flag}</span>
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
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile language error notification */}
                  <AnimatePresence>
                    {showLanguageError && (
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={notificationVariants}
                        className="mt-3 p-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300 rounded-lg text-sm flex items-center"
                      >
                        <FiAlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500 dark:text-red-400" />
                        <span>{t('language.notSupported')}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Theme Switcher */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: (navLinks.length + supportedLanguages.length) * 0.05 }}
                >
                  <button 
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }} 
                    className="w-full px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 flex items-center justify-between bg-gray-50/80 dark:bg-gray-800/50 transition-all"
                  >
                    <ClientOnly>
                      <span className="flex items-center">
                        {getActualTheme() === 'light' ? (
                          <>
                            <FiMoon className="mr-3 text-primary-500 dark:text-primary-400" />
                            {t('theme.dark')}
                          </>
                        ) : (
                          <>
                            <FiSun className="mr-3 text-primary-500 dark:text-primary-400" />
                            {t('theme.light')}
                          </>
                        )}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-200/70 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                        {getActualTheme() === 'light' ? t('theme.switchDark') : t('theme.switchLight')}
                      </span>
                    </ClientOnly>
                  </button>
                </motion.div>

                {/* GitHub Link in mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: (navLinks.length + supportedLanguages.length + 1) * 0.05 }}
                >
                  <a 
                    href="https://github.com/Taiizor/Echoes" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 flex items-center bg-gray-50/80 dark:bg-gray-800/50 group transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiGithub className="mr-3 text-primary-500 dark:text-primary-400 transform group-hover:rotate-[-8deg] transition-transform duration-300" />
                    GitHub
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 