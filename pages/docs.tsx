import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FiCopy, FiCode, FiArrowRight, FiCheck, FiBookOpen, FiLayers } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Client-side only component to avoid hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

interface ApiEndpoint {
  path: string;
  method: string;
  description: string;
  params?: { name: string; type: string; description: string; required: boolean }[];
  response: string;
}

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

// API page content
const DocsPageContent = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  const apiEndpoints: ApiEndpoint[] = [
    {
      path: '/api/quotes',
      method: 'GET',
      description: t('docs.getAllQuotes'),
      params: [
        {
          name: 'page',
          type: 'number',
          description: t('docs.pageParamDescription'),
          required: false,
        },
        {
          name: 'perPage',
          type: 'number',
          description: t('docs.perPageParamDescription'),
          required: false,
        },
      ],
      response: `{
  "data": [
    {
      "id": 1,
      "lang": "en",
      "author": "Albert Einstein",
      "quote": "Imagination is more important than knowledge."
    },
    // ...
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "perPage": 10,
    "totalPages": 10
  }
}`,
    },
    {
      path: '/api/quotes/:id',
      method: 'GET',
      description: t('docs.getQuoteById'),
      params: [
        {
          name: 'id',
          type: 'number',
          description: 'Quote ID',
          required: true,
        },
      ],
      response: `{
  "id": 1,
  "lang": "en",
  "author": "Albert Einstein",
  "quote": "Imagination is more important than knowledge."
}`,
    },
    {
      path: '/api/quotes/random',
      method: 'GET',
      description: t('docs.getRandomQuote'),
      params: [
        {
          name: 'lang',
          type: 'string',
          description: t('docs.langParamDescription'),
          required: false,
        },
        {
          name: 'author',
          type: 'string',
          description: t('docs.authorParamDescription'),
          required: false,
        },
      ],
      response: `{
  "id": 3,
  "lang": "en",
  "author": "Mahatma Gandhi",
  "quote": "Be the change that you wish to see in the world."
}`,
    },
  ];

  // Example usage codes
  const codeExamples = [
    {
      key: 'fetchAllQuotesPaginated',
      code: `fetch('https://echoes.soferity.com/api/quotes')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchQuotesWithPagination',
      code: `fetch('https://echoes.soferity.com/api/quotes?page=2&perPage=20')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchRandomQuote',
      code: `fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchRandomQuoteByAuthor',
      code: `fetch('https://echoes.soferity.com/api/quotes/random?author=Einstein')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchRandomQuoteByMultipleAuthors',
      code: `fetch('https://echoes.soferity.com/api/quotes/random?author=Einstein,Atatürk')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchRandomQuoteByMultipleLanguages',
      code: `fetch('https://echoes.soferity.com/api/quotes/random?lang=en,tr')
  .then(response => response.json())
  .then(data => console.log(data));`
    },
    {
      key: 'fetchRandomQuoteByMultipleAuthorsAndLanguages',
      code: `fetch('https://echoes.soferity.com/api/quotes/random?author=Einstein,Atatürk&lang=en,tr')
  .then(response => response.json())
  .then(data => console.log(data));`
    }
  ];

  // Combine all code examples (for copy button)
  const allCodeExamples = codeExamples.map(ex => `// ${t(`docs.${ex.key}`)}
${ex.code}`).join('\n\n');

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={`API documentation for ${t('app.title')}`} />
      </Head>

      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-600 to-primary-900 dark:from-primary-800 dark:to-primary-950 text-white">
        <div className="absolute top-0 left-0 right-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-300 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-primary-400 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
                <FiBookOpen className="text-3xl md:text-4xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('docs.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-80">
              {t('docs.subtitle')}
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      <div className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Base URL Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-500 hover:shadow-2xl">
              <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                    <FiLayers className="text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {t('docs.baseUrl')}
                  </h2>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('docs.baseUrlDescription')}
                </p>
                
                <div className="flex items-center justify-between mt-3 p-4 bg-gray-50 dark:bg-gray-900/80 rounded-xl border border-gray-100 dark:border-gray-700">
                  <code className="text-primary-600 dark:text-primary-400 font-mono text-base sm:text-lg break-all overflow-x-auto">
                    https://echoes.soferity.com/api/quotes
                  </code>
                  <div className="flex-shrink-0 ml-2">
                    <CopyButton text="https://echoes.soferity.com/api/quotes" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Endpoints Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                {t('docs.endpoints')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('docs.endpointsDescription')}
              </p>
            </div>

            <div className="space-y-10">
              {apiEndpoints.map((endpoint, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center flex-wrap gap-3 mb-3">
                      <span className="inline-block px-3 py-1 font-mono text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 rounded-full">
                        {endpoint.method}
                      </span>
                      <code className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-mono">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {endpoint.description}
                    </p>

                    {endpoint.params && endpoint.params.length > 0 && (
                      <div className="mt-6 mb-8">
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                          <FiCode className="text-primary-500" />
                          {t('docs.parameters')}
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {t('docs.paramName')}
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {t('docs.paramType')}
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {t('docs.paramRequired')}
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {t('docs.paramDescription')}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {endpoint.params.map((param, paramIndex) => (
                                  <tr key={paramIndex} className="hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap text-primary-600 dark:text-primary-400 font-mono">
                                      {param.name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800">
                                        {param.type}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {param.required ? (
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                          {t('docs.yes')}
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                                          {t('docs.no')}
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                        <FiArrowRight className="text-primary-500" />
                        {t('docs.response')}
                      </h3>
                      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="absolute top-3 right-3">
                          <CopyButton text={endpoint.response} />
                        </div>
                        <pre className="p-4 pt-12 text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto">
                          {endpoint.response}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Usage Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="p-1.5 bg-primary-100 dark:bg-primary-900/50 rounded-md text-primary-600 dark:text-primary-400">
                    <FiCode />
                  </span>
                  {t('docs.exampleUsage')}
                </h2>
                
                <div className="relative mt-8 overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="absolute top-3 right-3">
                    <CopyButton text={allCodeExamples} />
                  </div>
                  <pre className="p-4 pt-12 text-gray-700 dark:text-gray-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {codeExamples.map((example, index) => (
                      <div key={example.key} className={index > 0 ? 'mt-6' : ''}>
                        {`// ${t(`docs.${example.key}`)}`}
                        <div className="mt-1">{example.code}</div>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Component to be loaded only on client-side
const DocsPageWithNoSSR = dynamic(() => Promise.resolve(DocsPageContent), { 
  ssr: false 
});

// Main page component - shows a simple loading screen and loads the client-side page
export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <DocsPageWithNoSSR />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}; 