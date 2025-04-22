import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { 
  FiArrowLeft, 
  FiServer, 
  FiFilter, 
  FiCode, 
  FiCodesandbox, 
  FiGlobe, 
  FiCpu, 
  FiUsers,
  FiBook, 
  FiChevronRight,
  FiCopy,
  FiCheck
} from 'react-icons/fi';

// Rehber içerik tipi
interface GuideContent {
  title: string;
  description: string;
  icon: React.ElementType;
  level: 'Başlangıç' | 'Orta' | 'İleri';
  tags: string[];
  content: string;
  relatedGuides: string[];
}

// Rehber verileri (gerçek projede API veya veritabanından alınabilir)
const guides: Record<string, GuideContent> = {
  'baslangic-rehberi': {
    title: 'Echoes API\'ye Başlangıç',
    description: 'Echoes API\'nin temel kullanımını ve kurulumunu öğrenin.',
    icon: FiServer,
    level: 'Başlangıç',
    tags: ['API', 'Giriş'],
    content: `
# Echoes API'ye Başlangıç

Echoes API, dünya çapında farklı dillerden ilham verici alıntılara erişmenizi sağlayan güçlü bir RESTful API'dir. Bu rehber, API'nin temel kullanımını ve projenize nasıl entegre edeceğinizi anlatacaktır.

## API'ye Genel Bakış

Echoes API şu özellikleri sunar:

- Tüm alıntıları listeleme
- Belirli bir alıntıyı ID'ye göre alma
- Rastgele alıntı alma
- Dil veya yazara göre filtreleme

## Temel URL

Tüm API istekleri için temel URL:

\`\`\`
https://echoes.soferity.com/api
\`\`\`

## Kimlik Doğrulama

Echoes API'nin basit kullanımı için kimlik doğrulama gerekmez. Ancak, yüksek hacimli kullanım için API anahtarı edinmeniz gerekebilir.

## İlk İsteğinizi Yapalım

İşte basit bir alıntı almak için JavaScript örneği:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Hata:', error);
  });
\`\`\`

Bu istek, rastgele bir alıntı döndürecektir. Yanıt şuna benzer olacaktır:

\`\`\`JSON
{
  "id": 42,
  "lang": "tr",
  "author": "Mustafa Kemal Atatürk",
  "quote": "Hayatta en hakiki mürşit ilimdir."
}
\`\`\`

## Sonraki Adımlar

Artık temel API kullanımını anladığınıza göre, daha spesifik senaryolar için aşağıdaki rehberlere göz atabilirsiniz:

- [Alıntıları Filtreleme](/guides/alintilari-filtreleme)
- [JavaScript ile Entegrasyon](/guides/javascript-entegrasyonu)
- [React Uygulamanıza Entegrasyon](/guides/react-entegrasyonu)
    `,
    relatedGuides: ['alintilari-filtreleme', 'javascript-entegrasyonu']
  },
  'alintilari-filtreleme': {
    title: 'Alıntıları Filtreleme',
    description: 'API ile alıntıları yazara ve dile göre filtreleme.',
    icon: FiFilter,
    level: 'Başlangıç',
    tags: ['API', 'Filtreleme'],
    content: `
# Alıntıları Filtreleme

Echoes API ile alıntıları çeşitli kriterlere göre filtreleyebilirsiniz. Bu rehber, API'yi kullanarak alıntıları yazar, dil ve diğer parametrelere göre nasıl filtreleyeceğinizi gösterecektir.

## Dile Göre Filtreleme

Belirli bir dildeki alıntıları almak için \`lang\` parametresini kullanabilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=tr')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

Birden fazla dil için virgülle ayırarak belirtebilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=tr,en')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Yazara Göre Filtreleme

Belirli bir yazarın alıntılarını almak için \`author\` parametresini kullanabilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Atatürk')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

Burada yazar adının tam eşleşmesi gerekmez, kısmi eşleşme de çalışır.

Birden fazla yazar için:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Atatürk,Einstein')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Dil ve Yazar Kombinasyonu

Hem dil hem de yazarı filtrelemek için her iki parametreyi de kullanabilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=tr&author=Atatürk')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Sayfalama

Tüm alıntıları listelerken sayfalama parametrelerini kullanabilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?page=2&perPage=20')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

- \`page\`: Sayfa numarası (varsayılan: 1)
- \`perPage\`: Sayfa başına gösterilecek alıntı sayısı (varsayılan: 10, maksimum: 100)

## İleri Filtreleme Senaryoları

Daha karmaşık senaryolar için, bu filtreleri birleştirebilir ve API'yi uygulamanızın özel ihtiyaçlarına göre ayarlayabilirsiniz.

Örneğin, belirli bir dildeki belirli bir yazarın alıntılarını sayfalayarak alabilirsiniz:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?lang=tr&author=Atatürk&page=1&perPage=5')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`
    `,
    relatedGuides: ['baslangic-rehberi', 'javascript-entegrasyonu', 'gelismis-api-kullanimi']
  }
};

const GuideDetail = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Eğer henüz hazır değilse veya rehber bulunamadıysa
  if (router.isFallback || !guides[slug]) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center p-10">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="space-y-3 w-full max-w-2xl">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  const guide = guides[slug];
  
  // Seviye etiketi renk sınıfları
  const levelColorClasses = {
    'Başlangıç': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
    'Orta': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    'İleri': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400'
  };
  
  // İlgili rehberler
  const relatedGuideContent = guide.relatedGuides.map(
    relatedSlug => guides[relatedSlug]
  ).filter(Boolean);
  
  // Markdown içeriğini HTML'e dönüştürme
  // Not: Gerçek projede bir markdown parser kullanılmalıdır
  const createContentFromMarkdown = (markdownContent: string) => {
    // Bu basit bir örnek. Gerçek projede 'react-markdown' gibi bir kütüphane kullanın
    
    // Önce kod bloklarını geçici belirteçlerle değiştir
    let processedContent = markdownContent;
    const codeBlocks: string[] = [];
    const codeBlockRegex = /```([\s\S]*?)```/g;
    
    processedContent = processedContent.replace(codeBlockRegex, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Şimdi başlıkları, alt başlıkları ve paragrafları işle
    let contentWithHeadings = processedContent.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>');
    let contentWithSubHeadings = contentWithHeadings.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">$1</h2>');
    
    // Başında # olmayan ve placeholder olmayan satırları paragraf olarak işle
    let contentWithParagraphs = contentWithSubHeadings.replace(/^(?!(#|__CODE_BLOCK_))(.+)/gm, '<p class="my-4 text-gray-700 dark:text-gray-300">$2</p>');
    
    // Liste öğelerini ekle
    contentWithParagraphs = contentWithParagraphs.replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-700 dark:text-gray-300">• $1</li>');
    
    // Bağlantıları işle
    contentWithParagraphs = contentWithParagraphs.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline">$1</a>');
    
    // Şimdi kod bloklarını işle ve placeholder'ları gerçek HTML ile değiştir
    let finalContent = contentWithParagraphs;
    
    // Benzersiz ID'ler oluşturmak için
    let codeBlockCounter = 0;
    
    for (let i = 0; i < codeBlocks.length; i++) {
      const placeholder = `__CODE_BLOCK_${i}__`;
      const codeBlock = codeBlocks[i];
      const match = codeBlock.match(/```([\s\S]*?)```/);
      
      if (match) {
        const codeContent = match[1];
        const languageLine = codeContent.split('\n')[0].trim();
        const actualCode = codeContent.split('\n').slice(1).join('\n');
        const blockId = `code-block-${codeBlockCounter++}`;
        
        // Güvenli HTML ve sözdizimi renklendirme için gerekli hazırlık
        const escapedCode = actualCode
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
          
        // Programlama dili sınıfları
        const languageClasses = {
          'JavaScript': 'text-yellow-500',
          'TypeScript': 'text-blue-500',
          'JSON': 'text-green-500',
          'HTML': 'text-orange-500',
          'CSS': 'text-pink-500',
          'Bash': 'text-gray-200',
          'SH': 'text-gray-200'
        };
        
        const languageClass = languageClasses[languageLine as keyof typeof languageClasses] || 'text-gray-300';
        
        const htmlCodeBlock = `
          <div class="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/90 shadow-sm">
            <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <span class="mr-2 text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </span>
                <span class="text-sm font-medium ${languageClass}">${languageLine}</span>
              </div>
              <button 
                onclick="
                  const codeBlock = document.getElementById('${blockId}');
                  const code = codeBlock.textContent;
                  navigator.clipboard.writeText(code);
                  
                  // Visual feedback
                  const button = event.currentTarget;
                  const icon = button.querySelector('.copy-icon');
                  const checkIcon = button.querySelector('.check-icon');
                  
                  if (icon && checkIcon) {
                    icon.classList.add('hidden');
                    checkIcon.classList.remove('hidden');
                    
                    setTimeout(() => {
                      icon.classList.remove('hidden');
                      checkIcon.classList.add('hidden');
                    }, 2000);
                  }
                "
                class="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-colors"
                title="Kopyala"
              >
                <span class="copy-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </span>
                <span class="check-icon hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
            </div>
            <div class="relative">
              <pre id="${blockId}" class="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/90"><code>${escapedCode}</code></pre>
            </div>
          </div>
        `;
        
        finalContent = finalContent.replace(placeholder, htmlCodeBlock);
      }
    }
    
    return finalContent;
  };
  
  return (
    <>
      <Head>
        <title>{guide.title} | {t('app.title')}</title>
        <meta name="description" content={guide.description} />
      </Head>

      {/* Üst Gezinme Çubuğu */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/guides" 
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                <span>Tüm Rehberler</span>
              </Link>
              
              <div className="hidden md:flex items-center text-sm">
                <span className="px-2 text-gray-500 dark:text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                  {guide.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Rehber Başlığı */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                    <guide.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${levelColorClasses[guide.level]}`}>
                      {guide.level}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {guide.title}
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {guide.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {guide.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Rehber İçeriği */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6 md:p-8">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary-600 dark:prose-a:text-primary-400" 
                  dangerouslySetInnerHTML={{ __html: createContentFromMarkdown(guide.content) }}
                />
              </div>
            </div>
            
            {/* İlgili Rehberler */}
            {relatedGuideContent.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    İlgili Rehberler
                  </h2>
                  
                  <div className="space-y-4">
                    {relatedGuideContent.map((relatedGuide, index) => (
                      <Link
                        key={index}
                        href={`/guides/${guide.relatedGuides[index]}`}
                        className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <div className="p-2 bg-gray-100 dark:bg-gray-800/70 rounded-lg text-gray-600 dark:text-gray-300 
                        group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          <relatedGuide.icon className="h-5 w-5" />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {relatedGuide.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {relatedGuide.description}
                          </p>
                        </div>
                        <FiChevronRight className="text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(guides).map((slug) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  
  // Eğer rehber bulunamadıysa 404 sayfasına yönlendir
  if (!guides[slug]) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      slug
    },
    // Sayfa her 1 saatte bir yeniden oluşturulur (isteğe bağlı)
    revalidate: 3600
  };
};

export default GuideDetail; 