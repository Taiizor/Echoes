import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 text-center">
      <Head>
        <title>{t('404.title')}</title>
      </Head>
      
      <div className="mx-auto max-w-md px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* 404 Number */}
          <h1 className="text-9xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
            404
          </h1>
          
          {/* Main error text */}
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            {t('404.heading')}
          </h2>
          
          {/* Description text */}
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            {t('404.description')}
          </p>
          
          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('404.backButton')}
            </button>
            
            <Link href="/" className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
              {t('404.homeButton')}
            </Link>
          </div>
        </div>
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