import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FiBookOpen, FiFeather, FiGlobe, FiCode, FiHeart, FiGithub } from 'react-icons/fi';

// Client-side only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

// Feature card component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex flex-col h-full">
      <div className="p-3 mb-4 w-14 h-14 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 flex-grow">
        {description}
      </p>
    </div>
  </div>
);

// Technology badge component
const TechBadge: React.FC<{ tech: string }> = ({ tech }) => (
  <span className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-medium transition-transform hover:scale-105">
    {tech}
  </span>
);

export default function AboutPage() {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: <ClientOnly><FiBookOpen className="h-7 w-7" /></ClientOnly>,
      title: t('about.feature1'),
      description: t('about.feature1Description')
    },
    {
      icon: <ClientOnly><FiFeather className="h-7 w-7" /></ClientOnly>,
      title: t('about.feature2'),
      description: t('about.feature2Description')
    },
    {
      icon: <ClientOnly><FiGlobe className="h-7 w-7" /></ClientOnly>,
      title: t('about.feature3'),
      description: t('about.feature3Description')
    },
    {
      icon: <ClientOnly><FiCode className="h-7 w-7" /></ClientOnly>,
      title: t('about.feature4'),
      description: t('about.feature4Description')
    }
  ];

  const technologies = [
    "Next.js", "TypeScript", "Tailwind CSS", "Next-i18next", "Next-Themes", "React"
  ];

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('about.description')} />
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
              <FiHeart className="text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              {t('about.description')}
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          {/* Purpose Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                <div className="bg-primary-600 dark:bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">1</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('about.purpose')}
              </h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                {t('about.purposeText')}
              </p>
              
              <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800/30">
                <div className="flex items-start">
                  <div className="mr-4 text-primary-600 dark:text-primary-400 pt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary-800 dark:text-primary-300 font-medium">
                      {t('about.echoesInfo')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                <div className="bg-primary-600 dark:bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">2</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('about.features')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('about.featuresSubtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          
          {/* Technology Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                <div className="bg-primary-600 dark:bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">3</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('about.technology')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('about.technologySubtitle')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                {t('about.technologyText')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <TechBadge key={index} tech={tech} />
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <a 
                  href="https://github.com/Taiizor/Echoes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl transition-colors duration-300 shadow-lg group"
                >
                  <ClientOnly>
                    <FiGithub className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                  </ClientOnly>
                  <span>{t('about.viewOnGithub')}</span>
                </a>
              </div>
            </div>
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