import { useState, useRef, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { 
  FiBook, 
  FiCodesandbox, 
  FiArrowRight, 
  FiServer, 
  FiGlobe, 
  FiFilter, 
  FiCode, 
  FiUsers,
  FiCpu,
  FiSearch,
  FiChevronDown,
  FiCheck
} from 'react-icons/fi';

interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  level: string;
  tags: string[];
  slug: string;
}

const GuidesPage = () => {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // To close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Guides data
  const guides: GuideItem[] = [
    {
      id: '1',
      title: t('guides.apiIntro.title'),
      description: t('guides.apiIntro.description'),
      icon: FiServer,
      level: t('guides.levels.beginner'),
      tags: [t('guides.tags.api'), t('guides.tags.introduction')],
      slug: 'getting-started'
    },
    {
      id: '2',
      title: t('guides.filtering.title'),
      description: t('guides.filtering.description'),
      icon: FiFilter,
      level: t('guides.levels.beginner'),
      tags: [t('guides.tags.api'), t('guides.tags.filtering')],
      slug: 'filtering-quotes'
    },
    {
      id: '3',
      title: t('guides.jsIntegration.title'),
      description: t('guides.jsIntegration.description'),
      icon: FiCode,
      level: t('guides.levels.intermediate'),
      tags: [t('guides.tags.javascript'), t('guides.tags.integration')],
      slug: 'javascript-integration'
    },
    {
      id: '4',
      title: t('guides.reactIntegration.title'),
      description: t('guides.reactIntegration.description'),
      icon: FiCodesandbox,
      level: t('guides.levels.intermediate'),
      tags: [t('guides.tags.react'), t('guides.tags.integration')],
      slug: 'react-integration'
    },
    {
      id: '5',
      title: t('guides.multiLang.title'),
      description: t('guides.multiLang.description'),
      icon: FiGlobe,
      level: t('guides.levels.intermediate'),
      tags: [t('guides.tags.multiLanguage'), t('guides.tags.integration')],
      slug: 'multi-language-support'
    },
    {
      id: '6',
      title: t('guides.advancedApi.title'),
      description: t('guides.advancedApi.description'),
      icon: FiCpu,
      level: t('guides.levels.advanced'),
      tags: [t('guides.tags.api'), t('guides.tags.advanced')],
      slug: 'advanced-api-usage'
    },
    {
      id: '7',
      title: t('guides.community.title'),
      description: t('guides.community.description'),
      icon: FiUsers,
      level: t('guides.levels.advanced'),
      tags: [t('guides.tags.community'), t('guides.tags.contribution')],
      slug: 'community-contributions'
    }
  ];

  // Collect all tags
  const allTags: string[] = guides.flatMap(guide => guide.tags)
    .filter((tag, index, array) => array.indexOf(tag) === index);

  // Filtering and search function
  const filteredGuides = guides.filter(guide => {
    const matchesFilter = activeFilter === 'all' || guide.tags.includes(activeFilter);
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Level tag color classes
  const levelColorClasses = {
    [t('guides.levels.beginner')]: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
    [t('guides.levels.intermediate')]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    [t('guides.levels.advanced')]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400'
  };

  // Display text for tags
  const getFilterLabel = (value: string) => {
    if (value === 'all') return t('guides.allTags');
    return value;
  };

  return (
    <>
      <Head>
        <title>{t('guides.pageTitle')} | {t('app.title')}</title>
        <meta name="description" content={t('guides.pageDescription')} />
      </Head>

      {/* Hero Section */}
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
                <FiBook className="text-3xl md:text-4xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('guides.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-80">
              {t('guides.subtitle')}
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Search and Filtering Tools */}
            <div className="mb-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={t('guides.searchPlaceholder')}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                      bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 
                      text-gray-900 dark:text-gray-100 transition duration-150"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Custom Tag Dropdown Filter */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full pl-4 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                    bg-gradient-to-r from-primary-50 to-gray-50 dark:from-primary-950/40 dark:to-gray-900 
                    text-gray-900 dark:text-gray-100 font-medium
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                    shadow-sm hover:shadow-md dark:shadow-gray-900/30 
                    transition-all duration-200 cursor-pointer"
                  >
                    <span>{getFilterLabel(activeFilter)}</span>
                    <FiChevronDown className={`w-5 h-5 text-primary-600 dark:text-primary-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                        <button
                          onClick={() => {
                            setActiveFilter('all');
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 ${activeFilter === 'all' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                        >
                          <span>{t('guides.allTags')}</span>
                          {activeFilter === 'all' && <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
                        </button>
                        
                        {allTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => {
                              setActiveFilter(tag);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 ${activeFilter === tag ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                          >
                            <span>{tag}</span>
                            {activeFilter === tag && <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Guides List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 
                    hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400 
                        group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-colors duration-300">
                          <guide.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-md ${levelColorClasses[guide.level]}`}>
                            {guide.level}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {guide.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {guide.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {guide.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 group-hover:border-primary-100 dark:group-hover:border-primary-900 transition-colors">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {t('guides.viewGuide')}
                      </span>
                      <FiArrowRight className="h-4 w-4 text-primary-600 dark:text-primary-400 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <FiSearch className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{t('guides.noResults.title')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    {t('guides.noResults.description')}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('all');
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {t('guides.noResults.clearFilters')}
                  </button>
                </div>
              )}
            </div>
            
            {/* Other Resources */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('guides.otherResources.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/docs"
                  className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl transition-colors group border border-blue-100 dark:border-blue-900/20"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <FiServer className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {t('guides.otherResources.apiDocs.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {t('guides.otherResources.apiDocs.description')}
                    </p>
                  </div>
                </Link>
                
                <a 
                  href="https://github.com/Taiizor/Echoes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl transition-colors group border border-purple-100 dark:border-purple-900/20"
                >
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <FiCode className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {t('guides.otherResources.github.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {t('guides.otherResources.github.description')}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default GuidesPage; 