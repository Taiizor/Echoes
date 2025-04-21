import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FiShield, FiInfo, FiDatabase, FiLock, FiPieChart, FiExternalLink, FiUserCheck, FiMail, FiAlertTriangle } from 'react-icons/fi';

// Client-only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

// Privacy section component
interface PrivacySectionProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ icon, title, content, className }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8 ${className}`}>
    <div className="flex items-start">
      <div className="p-3 mr-4 w-14 h-14 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {title}
        </h3>
        {content}
      </div>
    </div>
  </div>
);

// List item component for policies
const PrivacyListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="mb-2 flex items-start">
    <span className="mr-2 mt-1 text-primary-500 dark:text-primary-400">•</span>
    <span>{children}</span>
  </li>
);

export default function PrivacyPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('privacy.title')} - {t('app.title')}</title>
        <meta name="description" content={t('privacy.description')} />
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-800 dark:via-primary-700/70 dark:to-primary-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-56 h-56 rounded-full bg-primary-300 blur-3xl"></div>
        </div>
        
        <div className="container px-4 py-24 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <ClientOnly>
                <FiShield className="text-3xl" />
              </ClientOnly>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              {t('privacy.description')}
            </p>
            <p className="mt-8 text-md text-white/70">
              {t('privacy.lastUpdated')}
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            
            {/* Introduction */}
            <PrivacySection
              icon={<ClientOnly><FiInfo className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.introduction')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('privacy.introductionText')}
                </p>
              }
            />
            
            {/* Information Collected */}
            <PrivacySection
              icon={<ClientOnly><FiDatabase className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.informationCollected')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('privacy.informationCollectedText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <PrivacyListItem>{t('privacy.informationPoint1')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.informationPoint2')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.informationPoint3')}</PrivacyListItem>
                  </ul>
                </div>
              }
            />
            
            {/* How We Use */}
            <PrivacySection
              icon={<ClientOnly><FiLock className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.howWeUse')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('privacy.howWeUseText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <PrivacyListItem>{t('privacy.usePoint1')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.usePoint2')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.usePoint3')}</PrivacyListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Data Protection */}
            <PrivacySection
              icon={<ClientOnly><FiLock className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.dataProtection')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('privacy.dataProtectionText')}
                </p>
              }
            />
            
            {/* Cookies */}
            <PrivacySection
              icon={<ClientOnly><FiPieChart className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.cookies')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('privacy.cookiesText')}
                </p>
              }
            />
            
            {/* Third Party */}
            <PrivacySection
              icon={<ClientOnly><FiExternalLink className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.thirdParty')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('privacy.thirdPartyText')}
                </p>
              }
            />
            
            {/* User Rights */}
            <PrivacySection
              icon={<ClientOnly><FiUserCheck className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.userRights')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('privacy.userRightsText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <PrivacyListItem>{t('privacy.rightsPoint1')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.rightsPoint2')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.rightsPoint3')}</PrivacyListItem>
                    <PrivacyListItem>{t('privacy.rightsPoint4')}</PrivacyListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Contact Us */}
            <PrivacySection
              icon={<ClientOnly><FiMail className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.contactUs')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('privacy.contactUsText')}
                  </p>
                  <a 
                    href={`mailto:${t('privacy.contactEmail')}`}
                    className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    {t('privacy.contactEmail')}
                  </a>
                </div>
              }
            />
            
            {/* Changes */}
            <PrivacySection
              icon={<ClientOnly><FiAlertTriangle className="h-7 w-7" /></ClientOnly>}
              title={t('privacy.changes')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('privacy.changesText')}
                </p>
              }
            />
            
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}; 