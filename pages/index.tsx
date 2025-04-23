import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiRefreshCw, FiExternalLink, FiCode, FiArrowRight, FiCheckCircle, FiGithub, FiBookOpen, FiCopy, FiCheck } from 'react-icons/fi';
import useQuotes, { Quote } from '@/hooks/useQuotes';

// Client-side only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

// Copy button component
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation('common');
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={() => handleCopy(text)}
      className="p-2 rounded-md transition-all duration-300 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:shadow-md"
      aria-label={t('docs.copy')}
    >
      <ClientOnly>
        {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
      </ClientOnly>
    </button>
  );
};

// Button component
interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  primary = false, 
  children, 
  onClick, 
  href, 
  external = false,
  className = "",
  disabled = false
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
  const primaryClasses = "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg transform hover:-translate-y-0.5";
  const secondaryClasses = "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 hover:shadow-md";
  const disabledClasses = "opacity-60 cursor-not-allowed";
  
  const classes = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${disabled ? disabledClasses : ""} ${className}`;
  
  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
          <FiExternalLink className="ml-2" />
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';
  const { getRandomQuote } = useQuotes();
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshRandomQuote = async () => {
    setIsLoading(true);
    
    // Small delay effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setRandomQuote(getRandomQuote());
    setIsLoading(false);
  };

  // Load a quote automatically when the page loads
  useEffect(() => {
    // Get a quote when the page first loads
    refreshRandomQuote();
  }, []); // Empty dependency array means it only runs once

  // API features
  const apiFeatures = [
    {
      title: t('docs.getAllQuotes'),
      description: t('docs.getAllQuotesDescription'),
      endpoint: "/api/quotes"
    },
    {
      title: t('docs.getAllQuotesWithPagination'),
      description: t('docs.getAllQuotesWithPaginationDescription'),
      endpoint: "/api/quotes?page=2&perPage=20"
    },
    {
      title: t('docs.getRandomQuote'),
      description: t('docs.getRandomQuoteDescription'),
      endpoint: "/api/quotes/random"
    },
    {
      title: t('docs.getRandomQuoteByLang'),
      description: t('docs.getRandomQuoteByLangDescription'),
      endpoint: "/api/quotes/random?lang=en"
    },
    {
      title: t('docs.getRandomQuoteByAuthor'),
      description: t('docs.getRandomQuoteByAuthorDescription'),
      endpoint: "/api/quotes/random?author=Einstein"
    },
    {
      title: t('docs.getRandomQuoteByAuthorAndLang'),
      description: t('docs.getRandomQuoteByAuthorAndLangDescription'),
      endpoint: "/api/quotes/random?author=Einstein,Atatürk&lang=en,tr"
    }
  ];

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Head>

      <div>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-tr from-primary-700 via-primary-600 to-primary-800 dark:from-primary-900 dark:via-primary-800 dark:to-primary-950 text-white">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-primary-300 opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-primary-400 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {t('app.title')}
                </h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10">
                  {t('app.description')}
                </p>
              </div>
              
              {/* Random Quote Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 transform transition duration-500 hover:shadow-2xl">
                <blockquote className="text-center">
                  {isLoading ? (
                    <div className="flex justify-center my-10 py-10">
                      <ClientOnly>
                        <FiRefreshCw className="animate-spin text-4xl text-white" />
                      </ClientOnly>
                    </div>
                  ) : randomQuote ? (
                    <>
                      <div className="mb-4 flex justify-center">
                        <span className="inline-block text-5xl opacity-60">"</span>
                      </div>
                      <p className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
                        {randomQuote.quote}
                      </p>
                      <footer className="text-white/80">
                        <span className="block mt-4 font-medium text-xl">— {randomQuote.author}</span>
                        <span className="text-sm opacity-75 mt-1 block">
                          {t(`language.${randomQuote.lang}`, { defaultValue: randomQuote.lang.toUpperCase() })}
                        </span>
                      </footer>
                    </>
                  ) : null}
                </blockquote>
                
                <div className="mt-8 flex justify-center">
                  <Button 
                    primary 
                    onClick={refreshRandomQuote} 
                    disabled={isLoading}
                    className="px-8 py-4"
                  >
                    <ClientOnly>
                      <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    </ClientOnly>
                    {t('home.newQuote')}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center mt-10">
                <Button href="/docs">
                  {t('nav.docs')}
                  <FiCode className="ml-2" />
                </Button>
                <Button href="/guides">
                  {t('nav.guides')}
                  <FiBookOpen className="ml-2" />
                </Button>
                <Button href="https://github.com/Taiizor/Echoes">
                  GitHub
                  <FiGithub className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>
        
        {/* API Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('api.title')}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  {t('api.subtitle')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {apiFeatures.map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mb-5 mx-auto">
                      <span className="text-lg font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-5">
                      {feature.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm text-primary-700 dark:text-primary-400 overflow-x-auto relative">
                      <div className="flex items-center justify-between">
                        <span className="mr-2 overflow-x-auto break-all">
                          {feature.endpoint}
                        </span>
                        <div className="flex-shrink-0 ml-2">
                          <CopyButton text={`https://echoes.soferity.com${feature.endpoint}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <Button href="/docs" primary>
                  {t('api.viewDocs')}
                  <FiArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Information Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                      <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                        {t('home.whyEchoes')}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                        {t('home.echoesDescription')}
                      </p>
                      
                      <ul className="space-y-3">
                        {[
                          t('home.feature1'),
                          t('home.feature2'),
                          t('home.feature3'),
                          t('home.feature4')
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ClientOnly>
                              <FiCheckCircle className="mt-1 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                            </ClientOnly>
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8">
                        <Button href="/about">
                          {t('home.moreInfo')}
                          <FiArrowRight className="ml-2" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center p-8 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <div className="relative w-full max-w-xs aspect-[3/4] bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-900 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-6">
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-xl"></div>
                          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-300 blur-xl"></div>
                        </div>
                        
                        <div className="relative z-10 text-white text-center">
                          <div className="text-5xl mb-3 font-serif">"</div>
                          <p className="text-lg italic mb-4">{t('home.sampleQuote')}</p>
                          <div className="h-px w-12 bg-white/40 mx-auto mb-4"></div>
                          <p className="font-medium">{t('home.sampleAuthor')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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