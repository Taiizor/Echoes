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
  level: 'Başlangıç' | 'Orta' | 'İleri';
  tags: string[];
  slug: string;
}

const GuidesPage = () => {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown dışına tıklandığında kapanması için
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

  // Rehberler verisi
  const guides: GuideItem[] = [
    {
      id: '1',
      title: 'Echoes API\'ye Başlangıç',
      description: 'Echoes API\'nin temel kullanımını ve kurulumunu öğrenin.',
      icon: FiServer,
      level: 'Başlangıç',
      tags: ['API', 'Giriş'],
      slug: 'baslangic-rehberi'
    },
    {
      id: '2',
      title: 'Alıntıları Filtreleme',
      description: 'API ile alıntıları yazara ve dile göre filtreleme.',
      icon: FiFilter,
      level: 'Başlangıç',
      tags: ['API', 'Filtreleme'],
      slug: 'alintilari-filtreleme'
    },
    {
      id: '3',
      title: 'JavaScript ile Entegrasyon',
      description: 'JavaScript projelerinize Echoes API\'yi entegre etme.',
      icon: FiCode,
      level: 'Orta',
      tags: ['JavaScript', 'Entegrasyon'],
      slug: 'javascript-entegrasyonu'
    },
    {
      id: '4',
      title: 'React Uygulamanıza Entegrasyon',
      description: 'React uygulamanıza alıntı bileşenlerini ekleme.',
      icon: FiCodesandbox,
      level: 'Orta',
      tags: ['React', 'Entegrasyon'],
      slug: 'react-entegrasyonu'
    },
    {
      id: '5',
      title: 'Çoklu Dil Desteği',
      description: 'Farklı dillerde alıntıları uygulamanıza entegre etme.',
      icon: FiGlobe,
      level: 'Orta',
      tags: ['Çoklu Dil', 'Entegrasyon'],
      slug: 'coklu-dil-destegi'
    },
    {
      id: '6',
      title: 'Gelişmiş API Kullanımı',
      description: 'API ile gelişmiş sorgulama ve optimizasyon teknikleri.',
      icon: FiCpu,
      level: 'İleri',
      tags: ['API', 'Gelişmiş'],
      slug: 'gelismis-api-kullanimi'
    },
    {
      id: '7',
      title: 'Topluluk Katkıları',
      description: 'Echoes projesine nasıl katkıda bulunabileceğinizi öğrenin.',
      icon: FiUsers,
      level: 'İleri',
      tags: ['Topluluk', 'Katkı'],
      slug: 'topluluk-katkilari'
    }
  ];

  // Tüm etiketleri topla
  const allTags: string[] = guides.flatMap(guide => guide.tags)
    .filter((tag, index, array) => array.indexOf(tag) === index);

  // Filtreleme ve arama fonksiyonu
  const filteredGuides = guides.filter(guide => {
    const matchesFilter = activeFilter === 'all' || guide.tags.includes(activeFilter);
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Seviye etiketi renk sınıfları
  const levelColorClasses = {
    'Başlangıç': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
    'Orta': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    'İleri': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400'
  };

  // Etiketlerin görüntü metni
  const getFilterLabel = (value: string) => {
    if (value === 'all') return 'Tüm Etiketler';
    return value;
  };

  return (
    <>
      <Head>
        <title>Rehberler | {t('app.title')}</title>
        <meta name="description" content="Echoes API ve entegrasyonu hakkında rehberler" />
      </Head>

      {/* Hero Bölümü */}
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
              Rehberler
            </h1>
            <p className="text-xl md:text-2xl opacity-80">
              Echoes API'sini kullanmaya başlamak ve uygulamanıza entegre etmek için adım adım rehberler
            </p>
          </div>
        </div>
        
        <div className="w-full h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
      </div>

      {/* Ana İçerik */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Arama ve Filtreleme Araçları */}
            <div className="mb-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Arama */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rehberlerde ara..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                      bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 
                      text-gray-900 dark:text-gray-100 transition duration-150"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Özel Etiket Dropdown Filtresi */}
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
                          <span>Tüm Etiketler</span>
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
            
            {/* Rehberler Listesi */}
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
                        Rehberi Görüntüle
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
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Rehber Bulunamadı</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Arama kriterlerinize uygun rehber bulunamadı. Lütfen farklı bir arama terimi deneyin veya filtreleri temizleyin.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('all');
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
            
            {/* Diğer Kaynaklar */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Diğer Kaynaklar
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
                      API Dokümantasyonu
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Echoes API'sinin kapsamlı teknik dokümantasyonu
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
                      GitHub Deposu
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Kaynak kodunu inceleyin ve projeye katkıda bulunun
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