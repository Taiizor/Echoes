import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft, Home } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 dark:text-gray-100 text-center">
      <Head>
        <title>{t('404.title')} | {t('app.title')}</title>
        <meta name="keywords" content={t('404.keywords')} />
        <meta name="language" content={t(`language.${locale}`)} />
        <meta name="description" content={t('404.description')} />
        <meta name="og:description" content={t('404.description')} />
        <meta name="twitter:description" content={t('404.description')} />
      </Head>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-300 dark:bg-purple-900 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-blue-300 dark:bg-blue-800 blur-3xl"></div>
        <div className="absolute top-[40%] right-[20%] h-[200px] w-[200px] rounded-full bg-teal-300 dark:bg-teal-900 blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-lg px-6 py-12 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-3xl border border-white/20 dark:border-gray-800/30 shadow-xl sm:px-10 sm:py-16 z-10">
        {isLoaded && (
          <motion.div 
            className="flex flex-col items-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Number with animated effect */}
            <motion.div 
              className="relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300, 
                damping: 20
              }}
            >
              <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                404
              </h1>
              <div className="absolute inset-0 -z-10 blur-xl opacity-50 bg-blue-300 dark:bg-blue-700 rounded-full scale-50"></div>
            </motion.div>
            
            {/* Main error text */}
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('404.heading')}
            </motion.h2>
            
            {/* Description text */}
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t('404.description')}
            </motion.p>
            
            {/* Divider */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            
            {/* Action buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={() => router.back()}
                className="flex-1 flex items-center justify-center rounded-lg border border-transparent bg-white dark:bg-gray-800 px-5 py-3 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-5 w-5 text-blue-500" />
                {t('404.backButton')}
              </button>
              
              <Link href="/" className="flex-1 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 px-5 py-3 text-base font-medium text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200">
                <Home className="mr-2 h-5 w-5" />
                {t('404.homeButton')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 