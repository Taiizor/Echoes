import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FiGithub, FiHeart, FiTwitter, FiLinkedin } from 'react-icons/fi';
import ClientOnly from './ui/ClientOnly';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation('common');
  
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/docs', label: t('nav.docs') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') }
  ];
  
  const socialLinks = [
    { href: 'https://github.com/Taiizor', icon: FiGithub, label: 'GitHub' },
    { href: 'https://x.com/iTaiizor', icon: FiTwitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/taiizor', icon: FiLinkedin, label: 'LinkedIn' }
  ];

  return (
    <footer className={`relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 
      border-t border-gray-200/80 dark:border-gray-800/40 pt-16 pb-8 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-6">
              <Link href="/" 
                className="group inline-flex items-center gap-1.5 text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300"
                aria-label="Echoes Home"
              >
                <span className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 transition-all duration-300 transform group-hover:scale-110">❝</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 group-hover:from-primary-500 group-hover:to-primary-700 dark:group-hover:from-primary-400 dark:group-hover:to-primary-600 transition-all duration-300">
                  Echoes
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 md:text-lg md:pr-4 leading-relaxed">
                {t('app.description')}
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-primary-500 dark:hover:ring-primary-500 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <ClientOnly>
                      <link.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </ClientOnly>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links Grid */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                    {t('footer.explore')}
                  </h3>
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="group text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                    {t('footer.resources')}
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        href="/blog" 
                        className="group text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          Blog
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/docs/guides" 
                        className="group text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          {t('footer.guides')}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                    {t('footer.legal')}
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        href="/privacy" 
                        className="group text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          {t('footer.privacy')}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/terms" 
                        className="group text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          {t('footer.terms')}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200/60 dark:border-gray-800/40">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <span className="inline-flex items-center">
                  {t('footer.madeWith')} 
                  <ClientOnly>
                    <FiHeart className="mx-1.5 text-red-500 animate-pulse" />
                  </ClientOnly>  
                  {t('footer.by')} 
                </span>
                <a 
                  href="https://github.com/Taiizor" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-1.5 font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Taiizor
                </a>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center sm:text-right">
                © {new Date().getFullYear()} Echoes. {t('footer.allRightsReserved')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300/0 via-primary-500/40 to-primary-300/0 dark:from-primary-900/0 dark:via-primary-700/30 dark:to-primary-900/0"></div>
    </footer>
  );
};

export default Footer; 