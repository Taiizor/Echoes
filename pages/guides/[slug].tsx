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
  level: string;
  tags: string[];
  content: string;
  relatedGuides: string[];
}

// Tüm diller için rehber içerikleri
interface MultiLanguageGuides {
  [slug: string]: {
    [locale: string]: GuideContent;
  };
}

const GuideDetail = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Dile göre rehber verilerini oluştur
  const getGuideDataForLocale = () => {
    const currentLocale = i18n.language;
    return guides[slug][currentLocale] || guides[slug]['en']; // Dil yoksa İngilizce'ye geri dön
  };
  
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
  
  const guide = getGuideDataForLocale();
  
  // Seviye etiketi renk sınıfları
  const levelColorClasses = {
    [t('guides.levels.beginner')]: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
    [t('guides.levels.intermediate')]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    [t('guides.levels.advanced')]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400'
  };
  
  // İlgili rehberler
  const relatedGuideContent = guide.relatedGuides
    .map(relatedSlug => {
      if (guides[relatedSlug]) {
        return guides[relatedSlug][i18n.language] || guides[relatedSlug]['en'];
      }
      return null;
    })
    .filter((guide): guide is GuideContent => Boolean(guide)); // TypeScript'e null olmadığını belirtmek için tip koruyucu
  
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
                title="${t('guides.codeBlock.copy')}"
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
                <span>{t('guides.backToGuides')}</span>
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
                    {t('guides.relatedGuides')}
                  </h2>
                  
                  <div className="space-y-4">
                    {relatedGuideContent.map((relatedGuide, index) => {
                      // İlgili rehberin slug'ını mevcut bağlantılı rehberlerden al
                      // Eğer index sınırlar dışındaysa veya rehber bulunamazsa boş string dön
                      const relatedSlug = index < guide.relatedGuides.length ? guide.relatedGuides[index] : '';
                      
                      return (
                        <Link
                          key={index}
                          href={`/guides/${relatedSlug}`}
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
                      );
                    })}
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

// Çoklu dil destekli rehber verileri
const guides: MultiLanguageGuides = {
  'baslangic-rehberi': {
    'tr': {
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
    'en': {
      title: 'Getting Started with Echoes API',
      description: 'Learn the basic usage and setup of the Echoes API.',
      icon: FiServer,
      level: 'Beginner',
      tags: ['API', 'Introduction'],
      content: `
# Getting Started with Echoes API

Echoes API is a powerful RESTful API that allows you to access inspiring quotes from different languages around the world. This guide will show you the basic usage of the API and how to integrate it into your project.

## API Overview

Echoes API offers the following features:

- List all quotes
- Get a specific quote by ID
- Get a random quote
- Filter by language or author

## Base URL

The base URL for all API requests:

\`\`\`
https://echoes.soferity.com/api
\`\`\`

## Authentication

Simple usage of the Echoes API doesn't require authentication. However, for high-volume usage, you may need to obtain an API key.

## Make Your First Request

Here's a JavaScript example to get a simple quote:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
\`\`\`

This request will return a random quote. The response will look something like this:

\`\`\`JSON
{
  "id": 42,
  "lang": "en",
  "author": "Albert Einstein",
  "quote": "Imagination is more important than knowledge."
}
\`\`\`

## Next Steps

Now that you understand the basic API usage, you can check out the following guides for more specific scenarios:

- [Filtering Quotes](/guides/alintilari-filtreleme)
- [Integration with JavaScript](/guides/javascript-entegrasyonu)
- [Integration with Your React Application](/guides/react-entegrasyonu)
    `,
      relatedGuides: ['alintilari-filtreleme', 'javascript-entegrasyonu']
    },
    'fr': {
      title: 'Premiers pas avec l\'API Echoes',
      description: 'Apprenez l\'utilisation de base et la configuration de l\'API Echoes.',
      icon: FiServer,
      level: 'Débutant',
      tags: ['API', 'Introduction'],
      content: `
# Premiers pas avec l'API Echoes

L'API Echoes est une API RESTful puissante qui vous permet d'accéder à des citations inspirantes de différentes langues du monde entier. Ce guide vous montrera l'utilisation de base de l'API et comment l'intégrer dans votre projet.

## Aperçu de l'API

L'API Echoes offre les fonctionnalités suivantes:

- Lister toutes les citations
- Obtenir une citation spécifique par ID
- Obtenir une citation aléatoire
- Filtrer par langue ou auteur

## URL de base

L'URL de base pour toutes les requêtes API:

\`\`\`
https://echoes.soferity.com/api
\`\`\`

## Authentification

L'utilisation simple de l'API Echoes ne nécessite pas d'authentification. Cependant, pour une utilisation à volume élevé, vous devrez peut-être obtenir une clé API.

## Effectuez votre première requête

Voici un exemple JavaScript pour obtenir une citation simple:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
\`\`\`

Cette requête retournera une citation aléatoire. La réponse ressemblera à ceci:

\`\`\`JSON
{
  "id": 42,
  "lang": "fr",
  "author": "Albert Camus",
  "quote": "La liberté n'est rien d'autre que la chance d'être meilleur."
}
\`\`\`

## Prochaines étapes

Maintenant que vous comprenez l'utilisation de base de l'API, vous pouvez consulter les guides suivants pour des scénarios plus spécifiques:

- [Filtrage des citations](/guides/alintilari-filtreleme)
- [Intégration avec JavaScript](/guides/javascript-entegrasyonu)
- [Intégration avec votre application React](/guides/react-entegrasyonu)
    `,
      relatedGuides: ['alintilari-filtreleme', 'javascript-entegrasyonu']
    }
  },
  'alintilari-filtreleme': {
    'tr': {
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
    },
    'en': {
      title: 'Filtering Quotes',
      description: 'Filter quotes by author and language using the API.',
      icon: FiFilter,
      level: 'Beginner',
      tags: ['API', 'Filtering'],
      content: `
# Filtering Quotes

With Echoes API, you can filter quotes based on various criteria. This guide will show you how to filter quotes by author, language, and other parameters using the API.

## Filtering by Language

To get quotes in a specific language, you can use the \`lang\` parameter:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=en')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

For multiple languages, specify them as comma-separated:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=en,fr')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Filtering by Author

To get quotes from a specific author, you can use the \`author\` parameter:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Einstein')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

Author name doesn't need an exact match; partial matching works too.

For multiple authors:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Einstein,Gandhi')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Combining Language and Author

To filter by both language and author, use both parameters:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=en&author=Einstein')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Pagination

When listing all quotes, you can use pagination parameters:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?page=2&perPage=20')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

- \`page\`: Page number (default: 1)
- \`perPage\`: Number of quotes per page (default: 10, maximum: 100)

## Advanced Filtering Scenarios

For more complex scenarios, you can combine these filters and tailor the API to your application's specific needs.

For example, you can get paginated quotes from a specific author in a specific language:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?lang=en&author=Einstein&page=1&perPage=5')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`
    `,
      relatedGuides: ['baslangic-rehberi', 'javascript-entegrasyonu', 'gelismis-api-kullanimi']
    },
    'fr': {
      title: 'Filtrage des citations',
      description: 'Filtrez les citations par auteur et langue en utilisant l\'API.',
      icon: FiFilter,
      level: 'Débutant',
      tags: ['API', 'Filtrage'],
      content: `
# Filtrage des citations

Avec l'API Echoes, vous pouvez filtrer les citations en fonction de divers critères. Ce guide vous montrera comment filtrer les citations par auteur, langue et autres paramètres à l'aide de l'API.

## Filtrage par langue

Pour obtenir des citations dans une langue spécifique, vous pouvez utiliser le paramètre \`lang\`:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=fr')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

Pour plusieurs langues, spécifiez-les séparées par des virgules:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=fr,en')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Filtrage par auteur

Pour obtenir des citations d'un auteur spécifique, vous pouvez utiliser le paramètre \`author\`:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Camus')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

Le nom de l'auteur n'a pas besoin d'une correspondance exacte; la correspondance partielle fonctionne également.

Pour plusieurs auteurs:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?author=Camus,Hugo')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Combinaison de langue et d'auteur

Pour filtrer par langue et auteur, utilisez les deux paramètres:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes/random?lang=fr&author=Camus')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Pagination

Lors de la liste de toutes les citations, vous pouvez utiliser les paramètres de pagination:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?page=2&perPage=20')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

- \`page\`: Numéro de page (par défaut: 1)
- \`perPage\`: Nombre de citations par page (par défaut: 10, maximum: 100)

## Scénarios de filtrage avancés

Pour des scénarios plus complexes, vous pouvez combiner ces filtres et adapter l'API aux besoins spécifiques de votre application.

Par exemple, vous pouvez obtenir des citations paginées d'un auteur spécifique dans une langue spécifique:

\`\`\`JavaScript
fetch('https://echoes.soferity.com/api/quotes?lang=fr&author=Camus&page=1&perPage=5')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`
    `,
      relatedGuides: ['baslangic-rehberi', 'javascript-entegrasyonu', 'gelismis-api-kullanimi']
    }
  },
  'javascript-entegrasyonu': {
    'tr': {
      title: 'JavaScript ile Entegrasyon',
      description: 'JavaScript projelerinize Echoes API\'yi entegre etme.',
      icon: FiCode,
      level: 'Orta',
      tags: ['JavaScript', 'Entegrasyon'],
      content: `
# JavaScript ile Entegrasyon

Bu rehber, Echoes API'yi JavaScript projelerinize nasıl entegre edeceğinizi adım adım gösterecektir. Web uygulamalarınızda, Node.js projelerinizde veya diğer JavaScript ortamlarında API'yi kullanmak için temel teknikleri öğreneceksiniz.

## Temel Fetch İsteği

JavaScript'te API ile etkileşim kurmanın en basit yolu \`fetch\` API'sini kullanmaktır:

\`\`\`JavaScript
// Rastgele bir alıntı almak için basit bir fetch isteği
fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ağ yanıtı başarısız oldu');
    }
    return response.json();
  })
  .then(data => {
    console.log('Alıntı:', data.quote);
    console.log('Yazar:', data.author);
  })
  .catch(error => {
    console.error('API isteğinde hata oluştu:', error);
  });
\`\`\`

## Async/Await Kullanımı

Modern JavaScript'te, \`async/await\` sözdizimi kullanarak istekleri daha temiz ve okunabilir hale getirebilirsiniz:

\`\`\`JavaScript
async function getRandomQuote() {
  try {
    const response = await fetch('https://echoes.soferity.com/api/quotes/random');
    
    if (!response.ok) {
      throw new Error('Ağ yanıtı başarısız oldu');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Alıntı alınırken hata oluştu:', error);
    return null;
  }
}

// Fonksiyonu kullanma
getRandomQuote()
  .then(quote => {
    if (quote) {
      console.log('Alıntı:', quote.quote);
      console.log('Yazar:', quote.author);
    }
  });
\`\`\`

## HTML Sayfasına Entegrasyon

İşte API'den rastgele alıntılar görüntüleyen basit bir HTML sayfası örneği:

\`\`\`HTML
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Echoes Alıntı Görüntüleyici</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .quote-container {
      background-color: #f5f5f5;
      border-left: 4px solid #333;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .quote-text {
      font-size: 18px;
      font-style: italic;
      margin-bottom: 10px;
    }
    .quote-author {
      font-weight: bold;
      text-align: right;
    }
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>Günün Alıntısı</h1>
  
  <div class="quote-container">
    <div id="quote-text" class="quote-text">Alıntı yükleniyor...</div>
    <div id="quote-author" class="quote-author"></div>
  </div>
  
  <button id="new-quote-btn">Yeni Alıntı</button>
  
  <script>
    // DOM öğelerini seçme
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const newQuoteButton = document.getElementById('new-quote-btn');
    
    // Rastgele alıntı alma fonksiyonu
    async function fetchRandomQuote() {
      try {
        // Öğeleri yükleniyor durumuna ayarla
        quoteTextElement.textContent = 'Alıntı yükleniyor...';
        quoteAuthorElement.textContent = '';
        
        // API'den veri alma
        const response = await fetch('https://echoes.soferity.com/api/quotes/random');
        
        if (!response.ok) {
          throw new Error('Ağ yanıtı başarısız oldu');
        }
        
        const data = await response.json();
        
        // Alıntıyı gösterme
        quoteTextElement.textContent = data.quote;
        quoteAuthorElement.textContent = '— ' + data.author;
      } catch (error) {
        console.error('Alıntı alınırken hata oluştu:', error);
        quoteTextElement.textContent = 'Alıntı yüklenirken bir hata oluştu. Lütfen tekrar deneyin.';
      }
    }
    
    // Sayfa yüklendiğinde ilk alıntıyı getir
    fetchRandomQuote();
    
    // Düğme tıklandığında yeni alıntı getir
    newQuoteButton.addEventListener('click', fetchRandomQuote);
  </script>
</body>
</html>
\`\`\`

## Parametrelerle Çalışma

API'ye özel parametrelerle istekler göndermek için URL parametrelerini şu şekilde ekleyebilirsiniz:

\`\`\`JavaScript
// Belirli bir dildeki rastgele alıntıyı alma
async function getRandomQuoteByLanguage(lang) {
  try {
    const url = \`https://echoes.soferity.com/api/quotes/random?lang=\${lang}\`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Ağ yanıtı başarısız oldu');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Alıntı alınırken hata oluştu:', error);
    return null;
  }
}

// Türkçe alıntı alma
getRandomQuoteByLanguage('tr')
  .then(quote => {
    if (quote) {
      console.log('Türkçe Alıntı:', quote.quote);
      console.log('Yazar:', quote.author);
    }
  });
\`\`\`

## Hata İşleme ve Yeniden Deneme Mekanizması

Güçlü bir uygulama için, API isteklerinde hata işleme ve yeniden deneme mekanizması eklemek önemlidir:

\`\`\`JavaScript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      return await response.json();
    }
    
    if (retries > 0) {
      console.log(\`Yeniden deneniyor... Kalan deneme: \${retries}\`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    throw new Error(\`HTTP Hatası: \${response.status}\`);
    
  } catch (error) {
    if (retries > 0) {
      console.log(\`Bağlantı hatası, yeniden deneniyor... Kalan deneme: \${retries}\`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

// Yeniden deneme mekanizması ile kullanım
fetchWithRetry('https://echoes.soferity.com/api/quotes/random')
  .then(data => console.log('Başarıyla alındı:', data))
  .catch(error => console.error('Tüm denemeler başarısız oldu:', error));
\`\`\`

## İleri Düzey: Özel Alıntı İstemcisi

Büyük uygulamalar için, Echoes API'yi saran bir sınıf oluşturmak yararlı olabilir:

\`\`\`JavaScript
class EchoesClient {
  constructor(baseUrl = 'https://echoes.soferity.com/api') {
    this.baseUrl = baseUrl;
  }
  
  async getRandomQuote(params = {}) {
    return this._fetch('/quotes/random', params);
  }
  
  async getQuoteById(id) {
    return this._fetch(\`/quotes/\${id}\`);
  }
  
  async getAllQuotes(page = 1, perPage = 10) {
    return this._fetch('/quotes', { page, perPage });
  }
  
  async getQuotesByLanguage(lang, page = 1, perPage = 10) {
    return this._fetch('/quotes', { lang, page, perPage });
  }
  
  async getQuotesByAuthor(author, page = 1, perPage = 10) {
    return this._fetch('/quotes', { author, page, perPage });
  }
  
  async _fetch(endpoint, params = {}) {
    const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
    
    // URL'ye parametreleri ekle
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP Hatası: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API isteği başarısız oldu:', error);
      throw error;
    }
  }
}

// İstemciyi kullanma
const echoesClient = new EchoesClient();

// Rastgele bir alıntı al
echoesClient.getRandomQuote()
  .then(quote => console.log('Rastgele Alıntı:', quote))
  .catch(error => console.error('Hata:', error));

// Belirli bir dildeki alıntıları al
echoesClient.getQuotesByLanguage('tr')
  .then(quotes => console.log('Türkçe Alıntılar:', quotes))
  .catch(error => console.error('Hata:', error));
\`\`\`

## Sonraki Adımlar

Bu rehberde JavaScript'te Echoes API kullanımının temellerini öğrendiniz. Daha ileri gitmek için şu rehberlere göz atabilirsiniz:

- [React Uygulamanıza Entegrasyon](/guides/react-entegrasyonu)
- [Çoklu Dil Desteği](/guides/coklu-dil-destegi)
- [Gelişmiş API Kullanımı](/guides/gelismis-api-kullanimi)
      `,
      relatedGuides: ['baslangic-rehberi', 'react-entegrasyonu', 'gelismis-api-kullanimi']
    },
    'en': {
      title: 'JavaScript Integration',
      description: 'Integrate Echoes API into your JavaScript projects.',
      icon: FiCode,
      level: 'Intermediate',
      tags: ['JavaScript', 'Integration'],
      content: `
# JavaScript Integration

This guide will show you step-by-step how to integrate the Echoes API into your JavaScript projects. You'll learn the fundamental techniques for using the API in your web applications, Node.js projects, or other JavaScript environments.

## Basic Fetch Request

The simplest way to interact with the API in JavaScript is using the \`fetch\` API:

\`\`\`JavaScript
// Simple fetch request to get a random quote
fetch('https://echoes.soferity.com/api/quotes/random')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Quote:', data.quote);
    console.log('Author:', data.author);
  })
  .catch(error => {
    console.error('Error fetching API:', error);
  });
\`\`\`

## Using Async/Await

In modern JavaScript, you can make requests cleaner and more readable using the \`async/await\` syntax:

\`\`\`JavaScript
async function getRandomQuote() {
  try {
    const response = await fetch('https://echoes.soferity.com/api/quotes/random');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

// Using the function
getRandomQuote()
  .then(quote => {
    if (quote) {
      console.log('Quote:', quote.quote);
      console.log('Author:', quote.author);
    }
  });
\`\`\`

## Integration with HTML Page

Here's an example of a simple HTML page that displays random quotes from the API:

\`\`\`HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Echoes Quote Viewer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .quote-container {
      background-color: #f5f5f5;
      border-left: 4px solid #333;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .quote-text {
      font-size: 18px;
      font-style: italic;
      margin-bottom: 10px;
    }
    .quote-author {
      font-weight: bold;
      text-align: right;
    }
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>Quote of the Day</h1>
  
  <div class="quote-container">
    <div id="quote-text" class="quote-text">Loading quote...</div>
    <div id="quote-author" class="quote-author"></div>
  </div>
  
  <button id="new-quote-btn">New Quote</button>
  
  <script>
    // Select DOM elements
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const newQuoteButton = document.getElementById('new-quote-btn');
    
    // Function to fetch a random quote
    async function fetchRandomQuote() {
      try {
        // Set elements to loading state
        quoteTextElement.textContent = 'Loading quote...';
        quoteAuthorElement.textContent = '';
        
        // Fetch data from API
        const response = await fetch('https://echoes.soferity.com/api/quotes/random');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Display the quote
        quoteTextElement.textContent = data.quote;
        quoteAuthorElement.textContent = '— ' + data.author;
      } catch (error) {
        console.error('Error fetching quote:', error);
        quoteTextElement.textContent = 'An error occurred while loading the quote. Please try again.';
      }
    }
    
    // Fetch initial quote when page loads
    fetchRandomQuote();
    
    // Fetch new quote when button is clicked
    newQuoteButton.addEventListener('click', fetchRandomQuote);
  </script>
</body>
</html>
\`\`\`

## Working with Parameters

To send requests to the API with specific parameters, you can append URL parameters like this:

\`\`\`JavaScript
// Get a random quote in a specific language
async function getRandomQuoteByLanguage(lang) {
  try {
    const url = \`https://echoes.soferity.com/api/quotes/random?lang=\${lang}\`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

// Get an English quote
getRandomQuoteByLanguage('en')
  .then(quote => {
    if (quote) {
      console.log('English Quote:', quote.quote);
      console.log('Author:', quote.author);
    }
  });
\`\`\`

## Error Handling and Retry Mechanism

For a robust application, it's important to add error handling and retry mechanisms to API requests:

\`\`\`JavaScript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      return await response.json();
    }
    
    if (retries > 0) {
      console.log(\`Retrying... Attempts left: \${retries}\`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    throw new Error(\`HTTP Error: \${response.status}\`);
    
  } catch (error) {
    if (retries > 0) {
      console.log(\`Connection error, retrying... Attempts left: \${retries}\`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

// Use with retry mechanism
fetchWithRetry('https://echoes.soferity.com/api/quotes/random')
  .then(data => console.log('Successfully fetched:', data))
  .catch(error => console.error('All retries failed:', error));
\`\`\`

## Advanced: Custom Quote Client

For larger applications, it's useful to create a class that wraps the Echoes API:

\`\`\`JavaScript
class EchoesClient {
  constructor(baseUrl = 'https://echoes.soferity.com/api') {
    this.baseUrl = baseUrl;
  }
  
  async getRandomQuote(params = {}) {
    return this._fetch('/quotes/random', params);
  }
  
  async getQuoteById(id) {
    return this._fetch(\`/quotes/\${id}\`);
  }
  
  async getAllQuotes(page = 1, perPage = 10) {
    return this._fetch('/quotes', { page, perPage });
  }
  
  async getQuotesByLanguage(lang, page = 1, perPage = 10) {
    return this._fetch('/quotes', { lang, page, perPage });
  }
  
  async getQuotesByAuthor(author, page = 1, perPage = 10) {
    return this._fetch('/quotes', { author, page, perPage });
  }
  
  async _fetch(endpoint, params = {}) {
    const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
    
    // Add parameters to URL
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP Error: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// Using the client
const echoesClient = new EchoesClient();

// Get a random quote
echoesClient.getRandomQuote()
  .then(quote => console.log('Random Quote:', quote))
  .catch(error => console.error('Error:', error));

// Get quotes in a specific language
echoesClient.getQuotesByLanguage('en')
  .then(quotes => console.log('English Quotes:', quotes))
  .catch(error => console.error('Error:', error));
\`\`\`

## Next Steps

In this guide, you've learned the basics of using the Echoes API in JavaScript. To go further, check out these guides:

- [React Integration](/guides/react-entegrasyonu)
- [Multi-language Support](/guides/coklu-dil-destegi)
- [Advanced API Usage](/guides/gelismis-api-kullanimi)
      `,
      relatedGuides: ['baslangic-rehberi', 'react-entegrasyonu', 'gelismis-api-kullanimi']
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(guides).flatMap((slug) => {
      return Object.keys(guides[slug]).map((locale) => ({
        params: { slug },
        locale
      }));
    }),
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
  
  // Eğer mevcut dilde rehber içeriği yoksa ama İngilizce varsa, dil dosyaları ile İngilizce göster
  if (!guides[slug][locale as string] && guides[slug]['en']) {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        slug
      },
      revalidate: 3600
    };
  }
  
  // Eğer o dilde içerik yoksa 404
  if (!guides[slug][locale as string]) {
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