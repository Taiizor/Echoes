import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FiGithub, FiUser, FiHeart } from 'react-icons/fi';
import ClientOnly from './ui/ClientOnly';

interface FooterProps {
  // Props definition
}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation('common');
  
  // Navbar Links
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/docs', label: t('nav.docs') },
    { href: '/about', label: t('nav.about') }
  ];

  return (
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
  );
};

export default Footer; 