import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FiFileText, FiInfo, FiUsers, FiUserCheck, FiActivity, FiSlash, FiCopy, FiUser, FiAlertCircle, FiAlertTriangle, FiXOctagon, FiGlobe, FiMail } from 'react-icons/fi';

// Client-only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

// Terms section component
interface TermsSectionProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
}

const TermsSection: React.FC<TermsSectionProps> = ({ icon, title, content, className }) => (
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

// List item component for terms
const TermsListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="mb-2 flex items-start">
    <span className="mr-2 mt-1 text-primary-500 dark:text-primary-400">•</span>
    <span>{children}</span>
  </li>
);

export default function TermsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('terms.title')} - {t('app.title')}</title>
        <meta name="description" content={t('terms.description')} />
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
                <FiFileText className="text-3xl" />
              </ClientOnly>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              {t('terms.description')}
            </p>
            <p className="mt-8 text-md text-white/70">
              {t('terms.lastUpdated')}
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            
            {/* Introduction */}
            <TermsSection
              icon={<ClientOnly><FiInfo className="h-7 w-7" /></ClientOnly>}
              title={t('terms.introduction')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.introductionText')}
                </p>
              }
            />
            
            {/* Acceptance */}
            <TermsSection
              icon={<ClientOnly><FiUserCheck className="h-7 w-7" /></ClientOnly>}
              title={t('terms.acceptance')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.acceptanceText')}
                </p>
              }
            />
            
            {/* Changes */}
            <TermsSection
              icon={<ClientOnly><FiAlertTriangle className="h-7 w-7" /></ClientOnly>}
              title={t('terms.changes')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.changesText')}
                </p>
              }
            />
            
            {/* Eligibility */}
            <TermsSection
              icon={<ClientOnly><FiUsers className="h-7 w-7" /></ClientOnly>}
              title={t('terms.eligibility')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('terms.eligibilityText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <TermsListItem>{t('terms.eligibilityPoint1')}</TermsListItem>
                    <TermsListItem>{t('terms.eligibilityPoint2')}</TermsListItem>
                    <TermsListItem>{t('terms.eligibilityPoint3')}</TermsListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Account Responsibilities */}
            <TermsSection
              icon={<ClientOnly><FiUser className="h-7 w-7" /></ClientOnly>}
              title={t('terms.accountResponsibilities')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('terms.accountResponsibilitiesText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <TermsListItem>{t('terms.accountPoint1')}</TermsListItem>
                    <TermsListItem>{t('terms.accountPoint2')}</TermsListItem>
                    <TermsListItem>{t('terms.accountPoint3')}</TermsListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Prohibited Activities */}
            <TermsSection
              icon={<ClientOnly><FiSlash className="h-7 w-7" /></ClientOnly>}
              title={t('terms.prohibitedActivities')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('terms.prohibitedActivitiesText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <TermsListItem>{t('terms.prohibitedPoint1')}</TermsListItem>
                    <TermsListItem>{t('terms.prohibitedPoint2')}</TermsListItem>
                    <TermsListItem>{t('terms.prohibitedPoint3')}</TermsListItem>
                    <TermsListItem>{t('terms.prohibitedPoint4')}</TermsListItem>
                    <TermsListItem>{t('terms.prohibitedPoint5')}</TermsListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Intellectual Property */}
            <TermsSection
              icon={<ClientOnly><FiCopy className="h-7 w-7" /></ClientOnly>}
              title={t('terms.intellectualProperty')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.intellectualPropertyText')}
                </p>
              }
            />
            
            {/* User Content */}
            <TermsSection
              icon={<ClientOnly><FiActivity className="h-7 w-7" /></ClientOnly>}
              title={t('terms.userContent')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('terms.userContentText')}
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 ml-2">
                    <TermsListItem>{t('terms.userContentPoint1')}</TermsListItem>
                    <TermsListItem>{t('terms.userContentPoint2')}</TermsListItem>
                    <TermsListItem>{t('terms.userContentPoint3')}</TermsListItem>
                  </ul>
                </div>
              }
            />
            
            {/* Disclaimer */}
            <TermsSection
              icon={<ClientOnly><FiAlertCircle className="h-7 w-7" /></ClientOnly>}
              title={t('terms.disclaimer')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.disclaimerText')}
                </p>
              }
            />
            
            {/* Limitation */}
            <TermsSection
              icon={<ClientOnly><FiAlertTriangle className="h-7 w-7" /></ClientOnly>}
              title={t('terms.limitation')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.limitationText')}
                </p>
              }
            />
            
            {/* Termination */}
            <TermsSection
              icon={<ClientOnly><FiXOctagon className="h-7 w-7" /></ClientOnly>}
              title={t('terms.termination')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.terminationText')}
                </p>
              }
            />
            
            {/* Jurisdiction */}
            <TermsSection
              icon={<ClientOnly><FiGlobe className="h-7 w-7" /></ClientOnly>}
              title={t('terms.jurisdiction')}
              content={
                <p className="text-gray-600 dark:text-gray-400">
                  {t('terms.jurisdictionText')}
                </p>
              }
            />
            
            {/* Contact Us */}
            <TermsSection
              icon={<ClientOnly><FiMail className="h-7 w-7" /></ClientOnly>}
              title={t('terms.contactUs')}
              content={
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('terms.contactUsText')}
                  </p>
                  <a 
                    href={`mailto:${t('terms.contactEmail')}`}
                    className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    {t('terms.contactEmail')}
                  </a>
                </div>
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