<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <header class="sticky top-0 z-20 w-full backdrop-blur supports-backdrop-blur:bg-white/60 dark:bg-gray-900/75 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <span class="i-mdi-comment-quote text-3xl"></span>
          Echoes
        </NuxtLink>
        
        <nav class="flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/api" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ $t('nav.api') }}
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ $t('nav.about') }}
          </NuxtLink>
          
          <!-- Dil Seçimi -->
          <UDropdown :items="languageOptions" :popper="{ placement: 'bottom-end' }" class="ml-2">
            <UButton color="primary" variant="ghost" trailing-icon="i-mdi-chevron-down" class="flex items-center">
              <span class="i-mdi-translate mr-1"></span>
              {{ languageOptions.find(lang => lang.value === $i18n.locale)?.label }}
            </UButton>
            
            <template #item="{ item }">
              <div class="flex items-center gap-2" @click="switchLocale(item.value)">
                <span class="i-mdi-check" v-if="item.value === $i18n.locale"></span>
                <span class="ml-4" v-else></span>
                {{ item.label }}
              </div>
            </template>
          </UDropdown>
          
          <!-- Tema Değiştirici -->
          <ClientOnly>
            <UButton 
              color="primary" 
              variant="ghost" 
              :icon="colorMode.value === 'dark' ? 'i-mdi-weather-sunny' : 'i-mdi-weather-night'" 
              @click="toggleColorMode"
              aria-label="Toggle color mode"
            />
          </ClientOnly>
        </nav>
      </div>
    </header>
    
    <!-- Ana İçerik -->
    <div class="flex-grow">
      <slot />
    </div>
    
    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t('footer.madeWith') }} <span class="text-red-500">❤</span> {{ $t('footer.by') }} <a href="https://github.com/Taiizor" target="_blank" class="text-indigo-600 dark:text-indigo-400 hover:underline">Taiizor</a>
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <a href="https://github.com/Taiizor/Echoes" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              <span class="i-mdi-github text-2xl"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

// Tema değiştirme 
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Dil seçenekleri
const languageOptions = [
  { label: t('language.en'), value: 'en' },
  { label: t('language.tr'), value: 'tr' }
]

// Dil değiştirme
const switchLocale = (locale: string) => {
  // locale türü düzeltmesi
  const validLocale = locale as 'en' | 'tr'
  navigateTo(useLocalePath()(useRoute().fullPath, validLocale))
}
</script> 