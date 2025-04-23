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
  FiChevronRight,
} from 'react-icons/fi';

// Guide content type
interface GuideContent {
  title: string;
  description: string;
  icon: React.ElementType;
  level: string;
  tags: string[];
  content: string;
  relatedGuides: string[];
}

// Guide contents for all languages
interface MultiLanguageGuides {
  [slug: string]: {
    [locale: string]: GuideContent;
  };
}

const GuideDetail = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t, i18n } = useTranslation('common');
  
  // Create guide data according to language
  const getGuideDataForLocale = () => {
    const currentLocale = i18n.language;
    const guideData = guides[slug][currentLocale] || guides[slug]['en']; // Fallback to English if language not available
    
    // If content is in a language other than the current one, try to translate title and description
    if (!guides[slug][currentLocale] && guides[slug]['en']) {
      // If there are translation keys for this guide, use them
      const translationKeys = getTranslationKeysForGuide(slug);
      
      if (translationKeys) {
        return {
          ...guideData,
          title: t(translationKeys.title) || guideData.title,
          description: t(translationKeys.description) || guideData.description
        };
      }
    }
    
    return guideData;
  };
  
  // Get translation keys for guide
  const getTranslationKeysForGuide = (slug: string) => {
    const translationMap: Record<string, { title: string, description: string }> = {
      'getting-started': {
        title: 'guides.apiIntro.title',
        description: 'guides.apiIntro.description'
      },
      'filtering-quotes': {
        title: 'guides.filtering.title',
        description: 'guides.filtering.description'
      },
      'javascript-integration': {
        title: 'guides.jsIntegration.title',
        description: 'guides.jsIntegration.description'
      },
      'react-integration': {
        title: 'guides.reactIntegration.title',
        description: 'guides.reactIntegration.description'
      },
      'multi-language-support': {
        title: 'guides.multiLang.title',
        description: 'guides.multiLang.description'
      },
      'advanced-api-usage': {
        title: 'guides.advancedApi.title',
        description: 'guides.advancedApi.description'
      },
      'community-contributions': {
        title: 'guides.community.title',
        description: 'guides.community.description'
      }
    };
    
    return translationMap[slug] || null;
  };
  
  // If not ready yet or guide not found
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
  
  // Level tag color classes
  const levelColorClasses = {
    [t('guides.levels.beginner')]: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400',
    [t('guides.levels.intermediate')]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    [t('guides.levels.advanced')]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400'
  };
  
  // Translate level names
  const getTranslatedLevel = (level: string) => {
    const levelMap: Record<string, string> = {
      'Beginner': t('guides.levels.beginner'),
      'Intermediate': t('guides.levels.intermediate'),
      'Advanced': t('guides.levels.advanced')
    };
    
    return levelMap[level] || level;
  };
  
  // Translate tags
  const getTranslatedTag = (tag: string) => {
    // Example API tag mapping
    const tagMap: Record<string, string> = {
      'API': t('guides.tags.api'),
      'Introduction': t('guides.tags.introduction'),
      'Filtering': t('guides.tags.filtering'),
      'JavaScript': t('guides.tags.javascript'),
      'Integration': t('guides.tags.integration'),
      'React': t('guides.tags.react'),
      'Multi-language': t('guides.tags.multiLanguage'),
      'Advanced': t('guides.tags.advanced'),
      'Community': t('guides.tags.community'),
      'Contribution': t('guides.tags.contribution')
    };
    
    return tagMap[tag] || tag;
  };
  
  // Related guides
  const relatedGuideContent = guide.relatedGuides
    .map(relatedSlug => {
      if (guides[relatedSlug]) {
        const relatedGuideData = guides[relatedSlug][i18n.language] || guides[relatedSlug]['en'];
        
        // If content is in a language other than the current one, try to translate title and description
        if (!guides[relatedSlug][i18n.language] && guides[relatedSlug]['en']) {
          const translationKeys = getTranslationKeysForGuide(relatedSlug);
          
          if (translationKeys) {
            return {
              ...relatedGuideData,
              title: t(translationKeys.title) || relatedGuideData.title,
              description: t(translationKeys.description) || relatedGuideData.description
            };
          }
        }
        
        return relatedGuideData;
      }
      return null;
    })
    .filter((guide): guide is GuideContent => Boolean(guide)); // Type guard to inform TypeScript it's not null
  
  // Convert markdown content to HTML
  // Note: A markdown parser should be used in a real project
  const createContentFromMarkdown = (markdownContent: string) => {
    // This is a simple example. Use a library like 'react-markdown' in a real project
    
    // First replace code blocks with temporary markers
    let processedContent = markdownContent;
    const codeBlocks: string[] = [];
    const codeBlockRegex = /```([\s\S]*?)```/g;
    
    processedContent = processedContent.replace(codeBlockRegex, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Now process headings, subheadings, and paragraphs
    let contentWithHeadings = processedContent.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>');
    let contentWithSubHeadings = contentWithHeadings.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">$1</h2>');
    contentWithSubHeadings = contentWithSubHeadings.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-200">$1</h3>');
    
    // Process lines that don't start with # and aren't placeholders as paragraphs
    let contentWithParagraphs = contentWithSubHeadings.replace(/^(?!(#|__CODE_BLOCK_))(.+)/gm, '<p class="my-4 text-gray-700 dark:text-gray-300">$2</p>');
    
    // Add list items
    contentWithParagraphs = contentWithParagraphs.replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-700 dark:text-gray-300">• $1</li>');
    
    // Process links
    contentWithParagraphs = contentWithParagraphs.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline">$1</a>');
    
    // Now process code blocks and replace placeholders with actual HTML
    let finalContent = contentWithParagraphs;
    
    // For creating unique IDs
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
        
        // Prepare for safe HTML and syntax highlighting
        const escapedCode = actualCode
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
          
        // Programming language classes
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
        <meta name="description" content={guide.description} />
        <meta name="keywords" content={t('guides.keywords')} />
        <meta name="language" content={t(`language.${locale}`)} />
        <meta name="og:description" content={guide.description} />
        <meta name="twitter:description" content={guide.description} />
        <title>{guide.title} - {t('guides.title')} | {t('app.title')}</title>
      </Head>

      {/* Top Navigation Bar */}
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
            
            {/* Guide Title */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                    <guide.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${levelColorClasses[getTranslatedLevel(guide.level)]}`}>
                      {getTranslatedLevel(guide.level)}
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
                      {getTranslatedTag(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Guide Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
              <div className="p-6 md:p-8">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary-600 dark:prose-a:text-primary-400" 
                  dangerouslySetInnerHTML={{ __html: createContentFromMarkdown(guide.content) }}
                />
              </div>
            </div>
            
            {/* Related Guides */}
            {relatedGuideContent.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('guides.relatedGuides')}
                  </h2>
                  
                  <div className="space-y-4">
                    {relatedGuideContent.map((relatedGuide, index) => {
                      // Get the slug of the related guide from the current linked guides
                      // Return empty string if index is out of bounds or guide not found
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

// Multi-language guide data
const guides: MultiLanguageGuides = {
  'getting-started': {
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
      `,
      relatedGuides: ['filtering-quotes', 'javascript-integration', 'advanced-api-usage']
    }
  },
  'filtering-quotes': {
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

- <strong>page</strong>: Page number (default: 1)
- <strong>perPage</strong>: Number of quotes per page (default: 10, maximum: 100)
      `,
      relatedGuides: ['getting-started', 'javascript-integration', 'advanced-api-usage']
    }
  },
  'javascript-integration': {
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
  
  async getRandomQuoteByLanguage(lang) {
    return this._fetch('/quotes/random', { lang });
  }
  
  async getRandomQuoteByAuthor(author) {
    return this._fetch('/quotes/random', { author });
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

// Get a random quote in a specific language
echoesClient.getRandomQuoteByLanguage('en')
  .then(quotes => console.log('English Quotes:', quotes))
  .catch(error => console.error('Error:', error));
\`\`\`
      `,
      relatedGuides: ['multi-language-support', 'advanced-api-usage', 'react-integration']
    }
  },
  'react-integration': {
    'en': {
      title: 'React Integration',
      description: 'Add quote components to your React application.',
      icon: FiCodesandbox,
      level: 'Intermediate',
      tags: ['React', 'Integration'],
      content: `
# React Integration

This guide will show you how to integrate Echoes API into your React application. You'll learn how to create React components that display quotes and handle API interactions with proper state management and error handling.

## Setting Up Your React Project

First, make sure you have a React project set up. You can use Create React App or Next.js:

\`\`\`Bash
# Using Create React App
npx create-react-app echoes-quotes-app
cd echoes-quotes-app

# Or with Next.js
npx create-next-app echoes-quotes-app
cd echoes-quotes-app
\`\`\`

## Creating a Quote Component

Let's create a simple Quote component that displays a single quote:

\`\`\`JavaScript
// components/Quote.jsx
import React from 'react';

const Quote = ({ quote }) => {
  if (!quote) return null;
  
  return (
    <div className="quote-card">
      <blockquote className="quote-text">
        {quote.quote}
      </blockquote>
      <div className="quote-author">
        — {quote.author}
      </div>
      <div className="quote-language">
        Language: {quote.lang}
      </div>
    </div>
  );
};

export default Quote;
\`\`\`

## Creating a Quotes Container

Now, let's create a container component that fetches quotes from the Echoes API:

\`\`\`JavaScript
// components/QuotesContainer.jsx
import React, { useState, useEffect } from 'react';
import Quote from './Quote';

const QuotesContainer = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://echoes.soferity.com/api/quotes/random');
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('Failed to fetch quote. Please try again later.');
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchRandomQuote();
  }, []);
  
  return (
    <div className="quotes-container">
      <h2>Quote of the Day</h2>
      
      {loading && <p className="loading">Loading quote...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && quote && <Quote quote={quote} />}
      
      <button 
        onClick={fetchRandomQuote}
        disabled={loading}
        className="new-quote-btn"
      >
        Get New Quote
      </button>
    </div>
  );
};

export default QuotesContainer;
\`\`\`

## Adding Filtering Capabilities

Let's enhance our components to allow filtering by language and author:

\`\`\`JavaScript
// components/QuoteFilter.jsx
import React, { useState } from 'react';

const QuoteFilter = ({ onFilterChange }) => {
  const [language, setLanguage] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ language, author });
  };
  
  return (
    <form onSubmit={handleSubmit} className="quote-filter">
      <div className="filter-group">
        <label htmlFor="language">Language:</label>
        <select 
          id="language" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Any Language</option>
          <option value="en">English</option>
          <option value="tr">Turkish</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="author">Author:</label>
        <input 
          type="text" 
          id="author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name" 
        />
      </div>
      
      <button type="submit" className="filter-btn">Apply Filters</button>
    </form>
  );
};

export default QuoteFilter;
\`\`\`

Now let's update our QuotesContainer to include filtering:

\`\`\`JavaScript
// Updated QuotesContainer.jsx
import React, { useState, useEffect } from 'react';
import Quote from './Quote';
import QuoteFilter from './QuoteFilter';

const QuotesContainer = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ language: '', author: '' });
  
  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build the URL with filters
      let url = 'https://echoes.soferity.com/api/quotes/random';
      const params = new URLSearchParams();
      
      if (filters.language) {
        params.append('lang', filters.language);
      }
      
      if (filters.author) {
        params.append('author', filters.author);
      }
      
      // Add query string if we have parameters
      if (params.toString()) {
        url += \`?\${params.toString()}\`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('Failed to fetch quote. Please try again later.');
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Fetch a quote when filters change
  useEffect(() => {
    fetchRandomQuote();
  }, [filters]);
  
  return (
    <div className="quotes-container">
      <h2>Quote of the Day</h2>
      
      <QuoteFilter onFilterChange={handleFilterChange} />
      
      {loading && <p className="loading">Loading quote...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && quote && <Quote quote={quote} />}
      
      <button 
        onClick={fetchRandomQuote}
        disabled={loading}
        className="new-quote-btn"
      >
        Get New Quote
      </button>
    </div>
  );
};

export default QuotesContainer;
\`\`\`

## Multi-language Support

To support displaying quotes in multiple languages with proper translations for UI elements, you can use libraries like <strong>react-i18next</strong>. Here's a basic setup:

\`\`\`Bash
npm install react-i18next i18next
\`\`\`

\`\`\`JavaScript
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      quoteOfTheDay: 'Quote of the Day',
      loading: 'Loading quote...',
      getNewQuote: 'Get New Quote',
      language: 'Language',
      author: 'Author',
      applyFilters: 'Apply Filters',
      anyLanguage: 'Any Language'
    }
  },
  tr: {
    translation: {
      quoteOfTheDay: 'Günün Sözü',
      loading: 'Alıntı yükleniyor...',
      getNewQuote: 'Yeni Alıntı Getir',
      language: 'Dil',
      author: 'Yazar',
      applyFilters: 'Filtreleri Uygula',
      anyLanguage: 'Herhangi Bir Dil'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
\`\`\`

Now we can update our components to use translations:

\`\`\`JavaScript
// Updated QuotesContainer.jsx with i18n
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Quote from './Quote';
import QuoteFilter from './QuoteFilter';

const QuotesContainer = () => {
  const { t } = useTranslation();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ language: '', author: '' });
  
  // ... rest of the component remains the same
  
  return (
    <div className="quotes-container">
      <h2>{t('quoteOfTheDay')}</h2>
      
      <QuoteFilter onFilterChange={handleFilterChange} />
      
      {loading && <p className="loading">{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && quote && <Quote quote={quote} />}
      
      <button 
        onClick={fetchRandomQuote}
        disabled={loading}
        className="new-quote-btn"
      >
        {t('getNewQuote')}
      </button>
    </div>
  );
};

export default QuotesContainer;
\`\`\`

## Implementing a Quote Collection Page

Let's create a page that displays multiple quotes with pagination:

\`\`\`JavaScript
// components/QuoteCollection.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Quote from './Quote';

const QuoteCollection = () => {
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchQuotes = async (pageNum) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`https://echoes.soferity.com/api/quotes?page=\${pageNum}&perPage=10\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      setQuotes(data.quotes);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch quotes when page changes
  useEffect(() => {
    fetchQuotes(page);
  }, [page]);
  
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  
  return (
    <div className="quotes-collection">
      <h2>{t('quoteCollection')}</h2>
      
      {loading && <p className="loading">{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && quotes.length === 0 && (
        <p>No quotes found. Try changing filters or page.</p>
      )}
      
      {!loading && !error && quotes.length > 0 && (
        <>
          <div className="quotes-grid">
            {quotes.map(quote => (
              <Quote key={quote.id} quote={quote} />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              onClick={handlePrevPage} 
              disabled={page === 1 || loading}
              className="pagination-btn"
            >
              {t('prevPage')}
            </button>
            
            <span className="page-indicator">
              {t('pageIndicator', { current: page, total: totalPages })}
            </span>
            
            <button 
              onClick={handleNextPage} 
              disabled={page === totalPages || loading}
              className="pagination-btn"
            >
              {t('nextPage')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteCollection;
\`\`\`

## Using React Context for Global State

For more complex applications, you might want to use React Context to manage global state:

\`\`\`JavaScript
// context/QuoteContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [quote, setQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ language: '', author: '' });
  
  const fetchRandomQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build the URL with filters
      let url = 'https://echoes.soferity.com/api/quotes/random';
      const params = new URLSearchParams();
      
      if (filters.language) {
        params.append('lang', filters.language);
      }
      
      if (filters.author) {
        params.append('author', filters.author);
      }
      
      // Add query string if we have parameters
      if (params.toString()) {
        url += \`?\${params.toString()}\`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('Failed to fetch quote. Please try again later.');
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  const fetchQuotes = useCallback(async (page = 1, perPage = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build the URL with filters
      let url = \`https://echoes.soferity.com/api/quotes?page=\${page}&perPage=\${perPage}\`;
      const params = new URLSearchParams();
      
      if (filters.language) {
        params.append('lang', filters.language);
      }
      
      if (filters.author) {
        params.append('author', filters.author);
      }
      
      // Add query string if we have parameters
      if (params.toString()) {
        url += \`&\${params.toString()}\`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      setQuotes(data.quotes || []);
      return data;
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      console.error('Error fetching quotes:', err);
      return { quotes: [] };
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);
  
  return (
    <QuoteContext.Provider value={{
      quote,
      quotes,
      loading,
      error,
      filters,
      fetchRandomQuote,
      fetchQuotes,
      updateFilters
    }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
\`\`\`

## Full App Example

Now you can assemble everything into a complete app:

\`\`\`JavaScript
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QuoteProvider } from './context/QuoteContext';
import QuotesContainer from './components/QuotesContainer';
import QuoteCollection from './components/QuoteCollection';
import './i18n';
import './styles/quotes.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('tr')}>Türkçe</button>
    </div>
  );
};

function App() {
  const { t } = useTranslation();
  
  return (
    <QuoteProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>{t('appTitle')}</h1>
            <LanguageSwitcher />
            <nav>
              <Link to="/">{t('randomQuote')}</Link>
              <Link to="/collection">{t('quoteCollection')}</Link>
            </nav>
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<QuotesContainer />} />
              <Route path="/collection" element={<QuoteCollection />} />
            </Routes>
          </main>
          
          <footer>
            <p>
              {t('poweredBy')} <a href="https://github.com/Taiizor/Echoes" target="_blank" rel="noopener noreferrer">Echoes API</a>
            </p>
          </footer>
        </div>
      </Router>
    </QuoteProvider>
  );
}

export default App;
\`\`\`

## Conclusion

You now have all the components needed to build a full-featured React application using the Echoes API. This guide covered:

- Basic quote display components
- Fetching and displaying random quotes
- Filtering quotes by language and author
- Multi-language support with react-i18next
- Pagination for browsing multiple quotes
- Global state management with React Context

Feel free to expand on these examples by adding features like:

- Favorite quotes functionality
- Share quotes on social media
- Dark/light theme support
- Advanced filtering and search options

Remember to handle error cases gracefully and provide proper loading states to ensure a good user experience.
      `,
      relatedGuides: ['getting-started', 'javascript-integration', 'advanced-api-usage']
    }
  },
  'multi-language-support': {
    'en': {
      title: 'Multi-language Support',
      description: 'Implement quotes in different languages in your application.',
      icon: FiGlobe,
      level: 'Intermediate',
      tags: ['Multi-language', 'Integration'],
      content: `
# Multi-language Support

This guide will show you how to implement multi-language quote support in your application using the Echoes API.

## Understanding Multi-language Support

The Echoes API offers robust multi-language support, allowing you to retrieve quotes in various languages. This feature enables you to create applications that can serve users worldwide in their preferred languages, enriching your user experience and broadening your application's reach.

## Key Benefits of Multi-language Support

- <strong>Global Accessibility</strong>: Reach users from different linguistic backgrounds
- <strong>Enhanced User Experience</strong>: Allow users to interact with content in their native language
- <strong>Market Expansion</strong>: Make your application relevant to international markets
- <strong>Cultural Inclusivity</strong>: Acknowledge and respect cultural diversity through language accommodation

## How Language Support Works in Echoes API

The Echoes API recognizes language through the \`language\` parameter, which accepts standard language codes (ISO 639-1). When you request quotes, you can specify which language you want the quotes to be in.

### Supported Languages

Echoes currently supports the following languages:

<div class="overflow-x-auto my-6">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Language Code</th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Language Name</th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">en</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">English</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">tr</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Turkish</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">es</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Spanish</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">fr</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">French</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">de</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">German</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">it</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Italian</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">pt</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Portuguese</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">ru</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Russian</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">zh</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Chinese</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">ja</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Japanese</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">ar</td>
        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Arabic</td>
      </tr>
    </tbody>
  </table>
</div>

<strong>More languages are being added regularly. Check the API documentation for the most up-to-date list.</strong>

## Retrieving Quotes in Different Languages

### Basic Language Query

To retrieve quotes in a specific language, simply add the \`lang\` parameter to your API request:

\`\`\`JavaScript
// Fetching a random quote in Turkish
fetch('https://echoes.soferity.com/api/quotes/random?lang=tr')
  .then(response => response.json())
  .then(data => {
    console.log(data.quote); // Quote in Turkish
    console.log(data.author); // Author name 
  });
\`\`\`

## Implementing Multi-language Support in Your Application

### Language Detection

You can automatically detect a user's preferred language using browser settings:

\`\`\`JavaScript
// Get user's browser language
const userLanguage = navigator.language || navigator.userLanguage;
const languageCode = userLanguage.split('-')[0]; // Extract primary language code

// Use this code in your API requests
fetch(\`https://echoes.soferity.com/api/quotes/random?lang=\${languageCode}\`)
  .then(response => response.json())
  .then(data => {
    // Display the quote in user's language
    displayQuote(data);
  });
\`\`\`

### Language Switcher Component

Allow users to manually select their preferred language with a language switcher:

\`\`\`JavaScript
import React, { useState, useEffect } from 'react';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    // Add more languages as needed
  ];
  
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setCurrentLanguage(newLanguage);
    onLanguageChange(newLanguage);
    
    // Optional: save preference to localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
  };
  
  useEffect(() => {
    // Load saved preference on component mount
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, []);
  
  return (
    <div className="language-switcher">
      <select value={currentLanguage} onChange={handleLanguageChange}>
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
\`\`\`

### Creating a Complete Multi-language Quote Application

Here's a complete example of a React application with multi-language support:

\`\`\`JavaScript
import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function MultiLanguageQuoteApp() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  
  const fetchQuote = async (lang) => {
    setLoading(true);
    try {
      const response = await fetch(\`https://echoes.soferity.com/api/quotes/random?lang=\${lang}\`);
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch a new quote when language changes
  useEffect(() => {
    fetchQuote(language);
  }, [language]);
  
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };
  
  const handleNewQuote = () => {
    fetchQuote(language);
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="quote-app">
      <header>
        <h1>Inspirational Quotes</h1>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      </header>
      
      {quote && (
        <div className="quote-container">
          <blockquote>
            <p className="quote-text">{quote.content}</p>
            <footer className="quote-author">— {quote.author}</footer>
          </blockquote>
        </div>
      )}
      
      <button onClick={handleNewQuote} className="new-quote-btn">
        New Quote
      </button>
    </div>
  );
}

export default MultiLanguageQuoteApp;
\`\`\`

## Dynamic Content Translation

For applications that need to translate more than just quotes, consider implementing a complete translation solution using libraries like i18next:

\`\`\`JavaScript
// Install i18next
// npm install i18next react-i18next i18next-http-backend

// Create translation files in public/locales/[language]/translation.json
// Then implement in your app:

import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // Your i18n configuration

function App() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Also update your Echoes API calls with the new language
    fetchQuotesInLanguage(lng);
  };
  
  return (
    <div className="app">
      <div className="language-buttons">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('tr')}>Türkçe</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
      </div>
      
      <h1>{t('welcome')}</h1>
      <p>{t('intro')}</p>
      
      {/* Your Echoes quote component */}
      <QuoteComponent language={i18n.language} />
    </div>
  );
}

// Wrap your app with Suspense for translation loading
export default function AppWithSuspense() {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  );
}
\`\`\`

## Best Practices for Multi-language Applications

1. <strong>Use Standard Language Codes</strong>: Always use ISO 639-1 language codes for consistency.
2. <strong>Remember Text Direction</strong>: Some languages like Arabic and Hebrew are right-to-left (RTL).
3. <strong>Consider Language-Specific Formatting</strong>: Dates, numbers, and currencies should be formatted according to locale.
4. <strong>Test with Native Speakers</strong>: Ensure translations make sense contextually.
5. <strong>Cache Language Preferences</strong>: Store user language preferences to provide a consistent experience.
6. <strong>Allow Manual Override</strong>: Users should always be able to select their preferred language.

## Testing Multi-language Support

Make sure to test your application with different languages to ensure everything displays correctly:

\`\`\`JavaScript
// Test function to verify different languages work
async function testLanguageSupport() {
  const languages = ['en', 'tr', 'es', 'fr', 'de'];
  
  for (const lang of languages) {
    console.log(\`Testing language: \${lang}\`);
    try {
      const response = await fetch(\`https://echoes.soferity.com/api/quotes/random?lang=\${lang}\`);
      const data = await response.json();
      console.log(\`Quote in \${lang}:\`, data.content);
    } catch (error) {
      console.error(\`Error with \${lang}:\`, error);
    }
  }
}
\`\`\`
      `,
      relatedGuides: ['getting-started', 'javascript-integration', 'advanced-api-usage']
    }
  },
  'advanced-api-usage': {
    'en': {
      title: 'Advanced API Usage',
      description: 'Advanced techniques and optimizations with the Echoes API.',
      icon: FiCpu,
      level: 'Advanced',
      tags: ['API', 'Advanced'],
      content: `
# Advanced API Usage

This guide covers advanced techniques for using the Echoes API, including caching, rate limiting, and optimization strategies.

## API Endpoints Overview

The Echoes API provides three main endpoints:

1. <strong>GET /api/quotes</strong> - Retrieve all quotes with pagination support
2. <strong>GET /api/quotes/:id</strong> - Retrieve a specific quote by its ID
3. <strong>GET /api/quotes/random</strong> - Retrieve a random quote, with optional filtering

## Advanced Query Techniques

You can create more complex queries with the Echoes API by combining the available parameters:

\`\`\`JavaScript
// Get a random quote in Turkish by a specific author
fetch('https://echoes.soferity.com/api/quotes/random?lang=tr&author=Atatürk')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

### Using URL Construction

For more dynamic queries, it's better to construct URLs programmatically:

\`\`\`JavaScript
// Dynamically build query parameters
const url = new URL('https://echoes.soferity.com/api/quotes/random');
url.searchParams.append('lang', 'en');
url.searchParams.append('author', 'Einstein');

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Pagination Strategies

When working with the full quotes collection, you should implement effective pagination:

\`\`\`JavaScript
// Fetch quotes with pagination
async function fetchQuotesPaginated(page = 1, perPage = 10) {
  try {
    const response = await fetch(
      \`https://echoes.soferity.com/api/quotes?page=\${page}&perPage=\${perPage}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
}

// Example usage with pagination controls
let currentPage = 1;
const itemsPerPage = 20;

async function loadCurrentPage() {
  try {
    const data = await fetchQuotesPaginated(currentPage, itemsPerPage);
    displayQuotes(data.data);
    updatePaginationControls(data.pagination);
  } catch (error) {
    showErrorMessage('Failed to load quotes. Please try again.');
  }
}

function updatePaginationControls(pagination) {
  // Update UI pagination controls
  document.getElementById('current-page').textContent = pagination.page;
  document.getElementById('total-pages').textContent = pagination.totalPages;
  
  // Enable/disable previous/next buttons
  document.getElementById('prev-button').disabled = pagination.page <= 1;
  document.getElementById('next-button').disabled = pagination.page >= pagination.totalPages;
}

// Handle pagination button clicks
document.getElementById('prev-button').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadCurrentPage();
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  currentPage++;
  loadCurrentPage();
});
\`\`\`

## Caching Strategies

By caching API requests, you can improve application performance and reduce server load:

### Local Storage Caching

\`\`\`JavaScript
async function getQuoteWithCache(params = {}) {
  // Create a unique cache key based on request parameters
  const cacheKey = \`echoes_quotes_\${JSON.stringify(params)}\`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const cacheAge = Date.now() - timestamp;
    
    // Return from cache if it's less than 1 hour old
    if (cacheAge < 3600000) {
      console.log('Quote retrieved from cache');
      return data;
    }
  }
  
  // If not in cache or expired, fetch from API
  console.log('Fetching quote from API');
  
  try {
    // Build the URL with parameters
    const url = new URL('https://echoes.soferity.com/api/quotes/random');
    
    // Add parameters to URL
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Cache the data with timestamp
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Usage examples
getQuoteWithCache({ lang: 'en' })
  .then(quote => console.log('English quote:', quote))
  .catch(error => console.error('Error:', error));

getQuoteWithCache({ author: 'Einstein' })
  .then(quote => console.log('Einstein quote:', quote))
  .catch(error => console.error('Error:', error));
\`\`\`

### Service Worker Caching

For more advanced caching that works offline, you can implement a Service Worker:

\`\`\`JavaScript
// In service-worker.js
self.addEventListener('fetch', (event) => {
  // Only cache Echoes API requests
  if (event.request.url.includes('echoes.soferity.com/api')) {
    event.respondWith(
      caches.open('echoes-api-cache').then((cache) => {
        return cache.match(event.request).then((response) => {
          // If in cache and less than 1 hour old, return from cache
          if (response) {
            const fetchDate = response.headers.get('fetch-date');
            const age = Date.now() - new Date(fetchDate).getTime();
            
            if (age < 3600000) { // 1 hour (milliseconds)
              return response;
            }
          }
          
          // If not in cache or expired, fetch from network
          return fetch(event.request).then((networkResponse) => {
            // Create a copy of the response (since the original is a stream)
            const responseToCache = networkResponse.clone();
            
            // Add a custom header with timestamp
            const headers = new Headers(responseToCache.headers);
            headers.append('fetch-date', new Date().toISOString());
            
            // Create response with new headers
            const responseWithTime = new Response(
              responseToCache.body, 
              {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              }
            );
            
            // Cache it
            cache.put(event.request, responseWithTime);
            return networkResponse;
          });
        });
      })
    );
  }
});
\`\`\`

## Rate Limiting and Queue Management

To ensure your application remains responsive even when making multiple API calls:

\`\`\`JavaScript
class EchoesClient {
  constructor() {
    this.baseUrl = 'https://echoes.soferity.com/api';
    this.requestQueue = [];
    this.isProcessing = false;
    this.requestsPerMinute = 60; // Maximum of 60 requests per minute
    this.requestTimes = [];
  }
  
  async request(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      // Add request to queue
      this.requestQueue.push({
        endpoint,
        params,
        resolve,
        reject
      });
      
      // Start queue processor (if not already running)
      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }
  
  async processQueue() {
    if (this.requestQueue.length === 0) {
      this.isProcessing = false;
      return;
    }
    
    this.isProcessing = true;
    
    // Check rate limit compliance
    if (this.requestTimes.length >= this.requestsPerMinute) {
      // Find the oldest request within the last minute
      const oldestRequest = this.requestTimes[0];
      const timeSinceOldest = Date.now() - oldestRequest;
      
      // If less than a minute has passed, wait
      if (timeSinceOldest < 60000) {
        const waitTime = 60000 - timeSinceOldest;
        console.log(\`Rate limit protection: waiting \${waitTime}ms\`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Remove oldest time as time has passed
        this.requestTimes.shift();
      } else {
        // If more than a minute has passed, clean up old times
        this.requestTimes = this.requestTimes.filter(time => (Date.now() - time) < 60000);
      }
    }
    
    // Get next request from queue
    const { endpoint, params, resolve, reject } = this.requestQueue.shift();
    
    // Record time of this request
    this.requestTimes.push(Date.now());
    
    try {
      // Build URL parameters
      const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
      Object.keys(params).forEach(key => 
        url.searchParams.append(key, params[key])
      );
      
      const response = await fetch(url);
      
      // Check HTTP status codes
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(\`HTTP error: \${response.status}\`);
      }
    } catch (error) {
      reject(error);
    }
    
    // Process more requests if there are any in the queue
    setTimeout(() => this.processQueue(), 0);
  }
  
  // Helper methods for specific endpoints
  async getRandomQuote(params = {}) {
    return this.request('/quotes/random', params);
  }
  
  async getAllQuotes(page = 1, perPage = 10) {
    return this.request('/quotes', { page, perPage });
  }
  
  async getQuoteById(id) {
    return this.request(\`/quotes/\${id}\`);
  }
}

// Usage example
const echoesClient = new EchoesClient();

// Get a random quote
echoesClient.getRandomQuote({ lang: 'tr' })
  .then(quote => console.log('Random quote:', quote))
  .catch(err => console.error('Error:', err));

// Get quotes with pagination
echoesClient.getAllQuotes(2, 15)
  .then(data => console.log('Page 2 quotes:', data))
  .catch(err => console.error('Error:', err));
\`\`\`

## Advanced Error Handling

Comprehensive error handling and retry mechanisms for robust applications:

\`\`\`JavaScript
async function fetchWithAdvancedErrorHandling(url, options = {}, maxRetries = 3) {
  let lastError;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      // Check HTTP status codes
      if (response.ok) {
        return await response.json();
      }
      
      // Handle different error scenarios
      switch (response.status) {
        case 400: // Bad Request
          throw new Error('Invalid request parameters. Please check your request.');
          
        case 404: // Not Found
          throw new Error('The requested quote or resource was not found.');
          
        case 429: // Too Many Requests (if API implements rate limiting)
          const retryAfter = response.headers.get('Retry-After') || 2 ** retryCount;
          console.log(\`Rate limit exceeded. Waiting \${retryAfter} seconds...\`);
          await new Promise(r => setTimeout(r, retryAfter * 1000));
          retryCount++;
          continue;
          
        case 500: // Server Error
        case 502: // Bad Gateway
        case 503: // Service Unavailable
        case 504: // Gateway Timeout
          // Retry server errors with exponential backoff
          const backoffTime = Math.min(1000 * (2 ** retryCount), 30000);
          console.log(\`Server error. Retrying in \${backoffTime/1000} seconds...\`);
          await new Promise(r => setTimeout(r, backoffTime));
          retryCount++;
          continue;
          
        default:
          throw new Error(\`HTTP error: \${response.status}\`);
      }
    } catch (error) {
      lastError = error;
      
      // Retry network errors (internet connectivity issues)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const backoffTime = Math.min(1000 * (2 ** retryCount), 30000);
        console.log(\`Network error. Retrying in \${backoffTime/1000} seconds...\`);
        await new Promise(r => setTimeout(r, backoffTime));
        retryCount++;
      } else {
        // Don't retry for other errors
        throw error;
      }
    }
  }
  
  // When all retries fail
  throw new Error(\`Maximum retries reached. Last error: \${lastError.message}\`);
}

// Usage example
fetchWithAdvancedErrorHandling('https://echoes.soferity.com/api/quotes/random?lang=tr')
  .then(data => console.log('Quote:', data))
  .catch(error => {
    console.error('Error:', error.message);
    // Show a user-friendly error message
    showUserFriendlyError(error);
  });

function showUserFriendlyError(error) {
  // Different feedback for the user based on the error message
  if (error.message.includes('Invalid request')) {
    alert('There is an issue with your request parameters. Please check your request.');
  } else if (error.message.includes('rate limit')) {
    alert('You have sent too many requests. Please wait and try again.');
  } else if (error.message.includes('not found')) {
    alert('The quote you are looking for was not found. Please try a different request.');
  } else if (error.message.includes('Server error')) {
    alert('The server is not responding. Please try again later.');
  } else {
    alert('An issue occurred. Please try again later.');
  }
}
\`\`\`

## Performance Optimizations

### Batch Processing Multiple Quotes

If you need to display multiple quotes at once, you can make parallel requests:

\`\`\`JavaScript
// Fetch multiple random quotes in parallel
async function fetchMultipleRandomQuotes(count, params = {}) {
  try {
    // Create an array of promises for each request
    const promises = Array(count).fill().map(() => {
      // Build the URL with parameters
      const url = new URL('https://echoes.soferity.com/api/quotes/random');
      
      // Add parameters to URL
      Object.keys(params).forEach(key => 
        url.searchParams.append(key, params[key])
      );
      
      // Return the fetch promise
      return fetch(url.toString())
        .then(response => {
          if (!response.ok) {
            throw new Error(\`HTTP error: \${response.status}\`);
          }
          return response.json();
        });
    });
    
    // Wait for all promises to resolve
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple quotes:', error);
    throw error;
  }
}

// Usage example: get 3 quotes by Einstein
fetchMultipleRandomQuotes(3, { author: 'Einstein' })
  .then(quotes => {
    console.log('Multiple Einstein quotes:');
    quotes.forEach((quote, index) => {
      console.log(\`Quote \${index + 1}:\`, quote);
    });
  })
  .catch(error => console.error('Error:', error));
\`\`\`

### Language-Based Data Processing

When working with quotes in different languages, you might want to organize them:

\`\`\`JavaScript
// Process quotes by language
function organizeQuotesByLanguage(quotes) {
  const quotesByLanguage = {};
  
  quotes.forEach(quote => {
    const lang = quote.lang || 'unknown';
    
    // Initialize the language array if it doesn't exist
    if (!quotesByLanguage[lang]) {
      quotesByLanguage[lang] = [];
    }
    
    // Add the quote to its language category
    quotesByLanguage[lang].push({
      id: quote.id,
      text: quote.quote,
      author: quote.author,
      // Add a formatted display version
      displayText: \`"\${quote.quote}" — \${quote.author}\`
    });
  });
  
  return quotesByLanguage;
}

// Usage example
fetchMultipleRandomQuotes(10)
  .then(quotes => {
    const organizedQuotes = organizeQuotesByLanguage(quotes);
    console.log('Quotes by language:', organizedQuotes);
    
    // Now you can easily display quotes by language
    Object.keys(organizedQuotes).forEach(lang => {
      console.log(\`\${getLanguageName(lang)} quotes: \${organizedQuotes[lang].length}\`);
    });
  })
  .catch(error => console.error('Error:', error));

// Helper function to get language name
function getLanguageName(langCode) {
  const languages = {
    'en': 'English',
    'tr': 'Turkish',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German'
    // Add other languages as needed
  };
  
  return languages[langCode] || langCode;
}
\`\`\`

## Building a Complete Quote Application

Here's a comprehensive example combining many of the techniques we've covered to create a complete quote application:

\`\`\`JavaScript
class QuoteManager {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'https://echoes.soferity.com/api';
    this.defaultLang = options.defaultLang || 'en';
    this.cacheEnabled = options.cacheEnabled !== false;
    this.cacheTime = options.cacheTime || 3600; // seconds
    
    // Initialize cache
    this.cache = new Map();
    
    // Set up cache cleanup interval
    if (this.cacheEnabled) {
      this.cacheCleanupInterval = setInterval(() => {
        this.cleanCache();
      }, 60000); // Clean every minute
    }
    
    // Keep track of favorite quotes
    this.favorites = this.loadFavorites();
  }
  
  // Core API request method with caching
  async fetchQuote(endpoint, params = {}) {
    // Create cache key
    const cacheKey = \`\${endpoint}:\${JSON.stringify(params)}\`;
    
    // Check cache first
    if (this.cacheEnabled) {
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }
    
    try {
      // Build URL with parameters
      const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
      
      // Make the request
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }
      
      const data = await response.json();
      
      // Cache the result
      if (this.cacheEnabled) {
        this.saveToCache(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      console.error('Quote fetch error:', error);
      throw error;
    }
  }
  
  // Get a random quote
  async getRandomQuote(params = {}) {
    // Add default language if not specified
    if (!params.lang) {
      params.lang = this.defaultLang;
    }
    
    return this.fetchQuote('/quotes/random', params);
  }
  
  // Get a specific quote by ID
  async getQuoteById(id) {
    return this.fetchQuote(\`/quotes/\${id}\`);
  }
  
  // Get quotes with pagination
  async getQuotes(page = 1, perPage = 10, params = {}) {
    return this.fetchQuote('/quotes', {
      page,
      perPage,
      ...params
    });
  }
  
  // Favorites management
  addToFavorites(quote) {
    if (!this.favorites.find(fav => fav.id === quote.id)) {
      this.favorites.push(quote);
      this.saveFavorites();
      return true;
    }
    return false;
  }
  
  removeFromFavorites(quoteId) {
    const initialLength = this.favorites.length;
    this.favorites = this.favorites.filter(quote => quote.id !== quoteId);
    
    if (initialLength !== this.favorites.length) {
      this.saveFavorites();
      return true;
    }
    return false;
  }
  
  getFavorites() {
    return [...this.favorites];
  }
  
  loadFavorites() {
    try {
      const saved = localStorage.getItem('quote_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }
  
  saveFavorites() {
    try {
      localStorage.setItem('quote_favorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }
  
  // Cache management
  getFromCache(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    
    const cacheEntry = this.cache.get(key);
    const now = Date.now();
    
    // Return null if cache has expired
    if (now - cacheEntry.timestamp > this.cacheTime * 1000) {
      this.cache.delete(key);
      return null;
    }
    
    return cacheEntry.data;
  }
  
  saveToCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  cleanCache() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.cacheTime * 1000) {
        this.cache.delete(key);
      }
    }
  }
  
  // Clean up resources
  destroy() {
    if (this.cacheCleanupInterval) {
      clearInterval(this.cacheCleanupInterval);
    }
  }
}

// Usage example
const quoteManager = new QuoteManager({
  defaultLang: 'en',
  cacheEnabled: true,
  cacheTime: 1800 // 30 minutes
});

// UI Integration Example
async function initializeQuoteApp() {
  const quoteContainer = document.getElementById('quote-container');
  const nextButton = document.getElementById('next-quote');
  const favButton = document.getElementById('favorite-quote');
  const langSelector = document.getElementById('language-selector');
  const authorInput = document.getElementById('author-input');
  const searchButton = document.getElementById('search-button');
  const favoritesList = document.getElementById('favorites-list');
  
  let currentQuote = null;
  
  // Display a quote in the container
  function displayQuote(quote) {
    currentQuote = quote;
    
    quoteContainer.innerHTML = \`
      <blockquote class="quote-text">\${quote.quote}</blockquote>
      <cite class="quote-author">— \${quote.author}</cite>
      <div class="quote-meta">
        <span class="quote-language">\${getLanguageName(quote.lang)}</span>
        <span class="quote-id">ID: \${quote.id}</span>
      </div>
    \`;
    
    // Update favorite button state
    const isFavorite = quoteManager.getFavorites().some(fav => fav.id === quote.id);
    favButton.textContent = isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites';
    favButton.className = isFavorite ? 'btn-favorite active' : 'btn-favorite';
  }
  
  // Load and display a random quote
  async function loadRandomQuote() {
    try {
      quoteContainer.innerHTML = '<div class="loading">Loading...</div>';
      
      const params = {
        lang: langSelector.value || undefined,
        author: authorInput.value || undefined
      };
      
      const quote = await quoteManager.getRandomQuote(params);
      displayQuote(quote);
    } catch (error) {
      quoteContainer.innerHTML = \`
        <div class="error">
          Failed to load quote. Please try again.
          <p>\${error.message}</p>
        </div>
      \`;
    }
  }
  
  // Toggle favorite status of current quote
  function toggleFavorite() {
    if (!currentQuote) return;
    
    const isFavorite = quoteManager.getFavorites().some(fav => fav.id === currentQuote.id);
    
    if (isFavorite) {
      quoteManager.removeFromFavorites(currentQuote.id);
      favButton.textContent = '☆ Add to Favorites';
      favButton.className = 'btn-favorite';
    } else {
      quoteManager.addToFavorites(currentQuote);
      favButton.textContent = '★ Remove from Favorites';
      favButton.className = 'btn-favorite active';
    }
    
    // Update favorites list
    updateFavoritesList();
  }
  
  // Update the favorites list in the UI
  function updateFavoritesList() {
    const favorites = quoteManager.getFavorites();
    
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p class="empty-list">No favorite quotes yet.</p>';
      return;
    }
    
    favoritesList.innerHTML = favorites.map(quote => \`
      <div class="favorite-item" data-id="\${quote.id}">
        <blockquote>\${quote.quote}</blockquote>
        <cite>— \${quote.author}</cite>
        <button class="remove-favorite" data-id="\${quote.id}">Remove</button>
      </div>
    \`).join('');
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        quoteManager.removeFromFavorites(id);
        updateFavoritesList();
        
        // Update current quote display if it's the same one
        if (currentQuote && currentQuote.id === id) {
          favButton.textContent = '☆ Add to Favorites';
          favButton.className = 'btn-favorite';
        }
      });
    });
  }
  
  // Set up event listeners
  nextButton.addEventListener('click', loadRandomQuote);
  favButton.addEventListener('click', toggleFavorite);
  searchButton.addEventListener('click', loadRandomQuote);
  
  // Initial setup
  updateFavoritesList();
  await loadRandomQuote();
}

// Helper function to get language name from code
function getLanguageName(langCode) {
  const languages = {
    'en': 'English',
    'tr': 'Turkish',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German'
    // Add other languages as needed
  };
  
  return languages[langCode] || langCode;
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeQuoteApp);
\`\`\`

This comprehensive example demonstrates how to build a complete quote application with the Echoes API, featuring:

- Efficient API requests with caching
- Favorites management with local storage
- Language filtering
- Author filtering
- Error handling
- A responsive user interface

By implementing these advanced techniques, you can create robust, efficient applications that make the most of the Echoes API's capabilities.
      `,
      relatedGuides: ['getting-started', 'javascript-integration', 'react-integration']
    }
  },
  'community-contributions': {
    'en': {
      title: 'Community Contributions',
      description: 'Learn how to contribute to the Echoes project.',
      icon: FiUsers,
      level: 'Advanced',
      tags: ['Community', 'Contribution'],
      content: `
# Community Contributions

Echoes is a community-driven project, and we welcome contributions from developers, translators, and quote enthusiasts around the world. This guide explains how you can become part of the Echoes community and contribute to its growth.

## Ways to Contribute

There are many ways to contribute to the Echoes project:

- <strong>Adding new quotes</strong>: Expand our collection with inspiring quotes in any language
- <strong>Translating existing quotes</strong>: Help make our quotes available in more languages
- <strong>Improving the API</strong>: Enhance functionality or fix bugs in the API codebase
- <strong>Enhancing documentation</strong>: Improve guides, examples, and API documentation
- <strong>Building tools and integrations</strong>: Create tools that leverage the Echoes API

## Contributing Quotes

Our quote database is the heart of Echoes. Here's how you can contribute new quotes:

### Contributing Through GitHub

All quote contributions are managed through our GitHub repository:

1. Fork the [Echoes repository](https://github.com/Taiizor/Echoes)
2. Navigate to the quotes data directory
3. Add your new quotes or translations
4. Submit a pull request

## Translation Contributions

Help make Echoes available in more languages by contributing translations through the main repository:

1. Fork the [Echoes repository](https://github.com/Taiizor/Echoes)
2. Navigate to the localization files
3. Choose a language you're fluent in
4. Translate untranslated quotes or review existing translations

\`\`\`Bash
# Clone the repository
git clone https://github.com/Taiizor/Echoes
cd Echoes

# Create a new branch for your work
git checkout -b add-turkish-quotes

# Make your changes and commit
git add .
git commit -m "Add 20 new Turkish quotes"
git push origin add-turkish-quotes

# Then open a pull request on GitHub
\`\`\`

## Code Contributions

If you're a developer, you can contribute to the Echoes codebase:

### Setting Up the Development Environment

\`\`\`Bash
# Clone the repository
git clone https://github.com/Taiizor/Echoes
cd Echoes

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Submit a pull request

We follow standard GitHub pull request workflows. Please ensure your code follows our style guide and passes all tests.

## Documentation Contributions

Help improve the Echoes documentation:

1. Fix typos or clarify existing guides
2. Add new examples or use cases
3. Translate documentation to other languages

Documentation is written in Markdown and can be found in the repository.

## Community Guidelines

When contributing to Echoes, please follow these guidelines:

- Be respectful and inclusive in all communications
- Follow our code of conduct
- Test your contributions thoroughly
- Document your changes clearly
- Be patient during the review process

## Getting Help

If you need help with your contribution, you can:

- Ask questions in the GitHub issues
- Contact the project maintainers via GitHub
- Join our [Discord Community](https://discord.gg/soferity)

We look forward to your contributions and to welcoming you to the Echoes community!
      `,
      relatedGuides: ['getting-started', 'advanced-api-usage']
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(guides).map((slug) => ({
      params: { slug },
      locale: 'en'
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  
  // If guide is not found, redirect to 404 page
  if (!guides[slug]) {
    return {
      notFound: true
    };
  }
  
  // By default, we only offer guides in English
  if (!guides[slug]['en']) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      slug
    },
    // Page is regenerated every 1 hour (optional)
    revalidate: 3600
  };
};

export default GuideDetail; 