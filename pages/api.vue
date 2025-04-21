<template>
  <div>
    <section class="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {{ $t('api.title') }}
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
            {{ $t('api.description') }}
          </p>
          
          <!-- API Endpoints -->
          <div class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
              {{ $t('api.endpoints') }}
            </h2>
            
            <div class="space-y-6">
              <!-- Endpoint: Tüm alıntıları getir -->
              <div class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div class="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <UBadge color="primary" variant="solid" class="mr-3">GET</UBadge>
                    <code class="text-sm md:text-base font-mono">/api/quotes</code>
                  </div>
                  <UButton color="primary" variant="ghost" size="xs" icon="i-mdi-content-copy" @click="copyToClipboard('/api/quotes')" />
                </div>
                <div class="p-4 bg-white dark:bg-gray-900">
                  <p class="mb-3 text-gray-700 dark:text-gray-300">{{ $t('api.getAllQuotes') }}</p>
                  <div class="mt-3">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Response:</p>
                    <pre class="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto mt-2">
[
  {
    "id": 1,
    "lang": "en",
    "author": "Albert Einstein",
    "quote": "Imagination is more important than knowledge..."
  },
  ...
]</pre>
                  </div>
                </div>
              </div>
              
              <!-- Endpoint: ID ile alıntı getir -->
              <div class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div class="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <UBadge color="primary" variant="solid" class="mr-3">GET</UBadge>
                    <code class="text-sm md:text-base font-mono">/api/quotes/:id</code>
                  </div>
                  <UButton color="primary" variant="ghost" size="xs" icon="i-mdi-content-copy" @click="copyToClipboard('/api/quotes/1')" />
                </div>
                <div class="p-4 bg-white dark:bg-gray-900">
                  <p class="mb-3 text-gray-700 dark:text-gray-300">{{ $t('api.getQuoteById') }}</p>
                  <div class="mt-2">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Parameters:</p>
                    <UTable :columns="paramColumns" :rows="idParamRows" class="mt-2" />
                  </div>
                  <div class="mt-3">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Response:</p>
                    <pre class="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto mt-2">
{
  "id": 1,
  "lang": "en",
  "author": "Albert Einstein",
  "quote": "Imagination is more important than knowledge..."
}</pre>
                  </div>
                </div>
              </div>
              
              <!-- Endpoint: Rastgele alıntı -->
              <div class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div class="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <UBadge color="primary" variant="solid" class="mr-3">GET</UBadge>
                    <code class="text-sm md:text-base font-mono">/api/quotes/random</code>
                  </div>
                  <UButton color="primary" variant="ghost" size="xs" icon="i-mdi-content-copy" @click="copyToClipboard('/api/quotes/random')" />
                </div>
                <div class="p-4 bg-white dark:bg-gray-900">
                  <p class="mb-3 text-gray-700 dark:text-gray-300">{{ $t('api.getRandomQuote') }}</p>
                  <div class="mt-2">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Query Parameters (optional):</p>
                    <UTable :columns="paramColumns" :rows="queryParamRows" class="mt-2" />
                  </div>
                  <div class="mt-3">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Examples:</p>
                    <ul class="list-disc list-inside mt-1 space-y-1 text-sm">
                      <li class="text-gray-700 dark:text-gray-300">
                        <code>/api/quotes/random</code> - {{ $t('api.getRandomQuote') }}
                      </li>
                      <li class="text-gray-700 dark:text-gray-300">
                        <code>/api/quotes/random?author=Einstein</code> - {{ $t('api.getRandomQuoteByAuthor') }}
                      </li>
                      <li class="text-gray-700 dark:text-gray-300">
                        <code>/api/quotes/random?lang=tr</code> - {{ $t('api.getRandomQuoteByLang') }}
                      </li>
                      <li class="text-gray-700 dark:text-gray-300">
                        <code>/api/quotes/random?author=Yunus&lang=tr</code> - {{ $t('api.getRandomQuoteByAuthorAndLang') }}
                      </li>
                    </ul>
                  </div>
                  <div class="mt-3">
                    <p class="font-semibold text-sm text-gray-700 dark:text-gray-300">Response:</p>
                    <pre class="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs overflow-x-auto mt-2">
{
  "id": 7,
  "lang": "tr",
  "author": "Nazım Hikmet",
  "quote": "Yaşamak bir ağaç gibi tek ve hür ve bir orman gibi kardeşçesine."
}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Test API -->
          <div class="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {{ $t('api.testTheApi') }}
            </h3>
            <div class="flex gap-3 mb-4">
              <USelect v-model="selectedEndpoint" :options="endpointOptions" />
              <UInput v-if="showIdInput" v-model="quoteId" type="number" placeholder="ID" min="1" />
              <UInput v-if="showAuthorInput" v-model="authorQuery" placeholder="Author" />
              <USelect v-if="showLangInput" v-model="langQuery" :options="langOptions" />
              <UButton color="primary" @click="fetchApiResult" :loading="isLoading">{{ $t('api.sendRequest') }}</UButton>
            </div>
            
            <div v-if="apiResult" class="mt-4">
              <p class="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">Response:</p>
              <pre class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-md text-xs overflow-x-auto">{{ JSON.stringify(apiResult, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Quote } from '@/composables/useQuotes'

// Sayfa başlığı
useHead({
  title: useI18n().t('api.title')
})

// Parametre tabloları için sütunlar
const paramColumns = [
  {
    key: 'name',
    label: 'Parameter'
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'description',
    label: 'Description'
  }
]

// ID parametresi için satırlar
const idParamRows = [
  {
    name: 'id',
    type: 'number',
    description: 'ID of the quote to retrieve'
  }
]

// Sorgu parametreleri için satırlar
const queryParamRows = [
  {
    name: 'author',
    type: 'string',
    description: 'Filter quotes by author name (case insensitive)'
  },
  {
    name: 'lang',
    type: 'string',
    description: 'Filter quotes by language code (en, tr, fr, etc.)'
  }
]

// Endpoints için seçenekler
const endpointOptions = [
  { label: 'GET /api/quotes', value: 'all' },
  { label: 'GET /api/quotes/:id', value: 'byId' },
  { label: 'GET /api/quotes/random', value: 'random' },
  { label: 'GET /api/quotes/random?author=...', value: 'randomByAuthor' },
  { label: 'GET /api/quotes/random?lang=...', value: 'randomByLang' },
  { label: 'GET /api/quotes/random?author=...&lang=...', value: 'randomByAuthorAndLang' }
]

// Dil seçenekleri için options
const langOptions = [
  { label: 'English (en)', value: 'en' },
  { label: 'Turkish (tr)', value: 'tr' },
  { label: 'French (fr)', value: 'fr' },
  { label: 'Spanish (es)', value: 'es' },
  { label: 'German (de)', value: 'de' },
  { label: 'Arabic (ar)', value: 'ar' }
]

// API Test için state
const selectedEndpoint = ref('all')
const quoteId = ref(1)
const authorQuery = ref('Einstein')
const langQuery = ref('en')
const apiResult = ref<Quote | Quote[] | null>(null)
const isLoading = ref(false)

// Görünürlük kontrolü
const showIdInput = computed(() => selectedEndpoint.value === 'byId')
const showAuthorInput = computed(() => ['randomByAuthor', 'randomByAuthorAndLang'].includes(selectedEndpoint.value))
const showLangInput = computed(() => ['randomByLang', 'randomByAuthorAndLang'].includes(selectedEndpoint.value))

// API isteği gönder
const fetchApiResult = async () => {
  isLoading.value = true
  let url = ''
  
  switch (selectedEndpoint.value) {
    case 'all':
      url = '/api/quotes'
      break
    case 'byId':
      url = `/api/quotes/${quoteId.value}`
      break
    case 'random':
      url = '/api/quotes/random'
      break
    case 'randomByAuthor':
      url = `/api/quotes/random?author=${encodeURIComponent(authorQuery.value)}`
      break
    case 'randomByLang':
      url = `/api/quotes/random?lang=${langQuery.value}`
      break
    case 'randomByAuthorAndLang':
      url = `/api/quotes/random?author=${encodeURIComponent(authorQuery.value)}&lang=${langQuery.value}`
      break
  }
  
  try {
    apiResult.value = await $fetch(url)
  } catch (error) {
    console.error('API Error:', error)
    apiResult.value = { error: 'Failed to fetch data' }
  } finally {
    isLoading.value = false
  }
}

// Panoya kopyalama
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(`${window.location.origin}${text}`)
  // Toast gösterilebilir
}

// i18n için ek çeviriler
const { t } = useI18n()
t('api.testTheApi', 'Test the API')
t('api.sendRequest', 'Send Request')
</script> 