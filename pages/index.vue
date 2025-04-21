<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 md:py-28 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          {{ $t('app.title') }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-12">
          {{ $t('app.description') }}
        </p>
        
        <!-- Rastgele Alıntı Kartı -->
        <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 mb-12 border border-gray-100 dark:border-gray-700 transform transition duration-500 hover:scale-[1.02]">
          <blockquote v-if="randomQuote" class="text-center">
            <div v-if="isLoading" class="flex justify-center my-8">
              <UIcon name="i-mdi-loading" class="animate-spin text-4xl text-indigo-500" />
            </div>
            <div v-else>
              <p class="text-2xl md:text-3xl font-light italic text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                "{{ randomQuote.quote }}"
              </p>
              <footer class="text-gray-500 dark:text-gray-400">
                <span class="font-medium text-gray-800 dark:text-gray-200">{{ randomQuote.author }}</span>
              </footer>
            </div>
          </blockquote>
          
          <div class="mt-8 flex justify-center">
            <UButton 
              color="primary" 
              @click="refreshRandomQuote" 
              icon="i-mdi-refresh" 
              :loading="isLoading"
            >
              {{ $t('home.newQuote') }}
            </UButton>
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
          <NuxtLink to="/api">
            <UButton color="primary" variant="outline" size="lg" class="w-full md:w-auto">
              API {{ $t('nav.api') }}
            </UButton>
          </NuxtLink>
          <a href="https://github.com/Taiizor/Echoes" target="_blank">
            <UButton color="primary" variant="outline" size="lg" class="w-full md:w-auto">
              <span class="i-mdi-github mr-2"></span>
              GitHub
            </UButton>
          </a>
        </div>
      </div>
    </section>
    
    <!-- API Kullanım Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ $t('api.title') }}
        </h2>
        
        <div class="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner font-mono text-sm overflow-x-auto">
          <pre class="text-gray-800 dark:text-gray-200">
GET /api/quotes          # {{ $t('api.getAllQuotes') }}
GET /api/quotes/:id      # {{ $t('api.getQuoteById') }}
GET /api/quotes/random   # {{ $t('api.getRandomQuote') }}

# {{ $t('api.getRandomQuoteByAuthor') }}
GET /api/quotes/random?author=Einstein

# {{ $t('api.getRandomQuoteByLang') }}
GET /api/quotes/random?lang=tr

# {{ $t('api.getRandomQuoteByAuthorAndLang') }}
GET /api/quotes/random?author=Yunus&lang=tr</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Quote tipini ve useQuotes composable'ını içe aktarıyoruz
import type { Quote } from '@/composables/useQuotes'
import useQuotes from '@/composables/useQuotes'

// Sayfa başlığı
useHead({
  title: useI18n().t('app.title')
})

// Random quote için state
const randomQuote = ref<Quote | null>(null)
const isLoading = ref(false)

// Alıntıları yönetecek composable
const { getRandomQuote } = useQuotes()

// Rastgele alıntı getir
const refreshRandomQuote = async () => {
  isLoading.value = true
  
  // Küçük bir gecikmeli efekti
  await new Promise(resolve => setTimeout(resolve, 300))
  
  randomQuote.value = getRandomQuote()
  isLoading.value = false
}

// Sayfa yüklendiğinde rastgele alıntı göster
onMounted(() => {
  refreshRandomQuote()
})
</script> 