<template>
  <div>
    <section class="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            {{ $t('about.title') }}
          </h1>
          
          <div class="prose dark:prose-invert mx-auto">
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
              {{ $t('about.description') }}
            </p>
            
            <div class="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 mb-10">
              <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {{ $t('about.features') }}
              </h2>
              
              <ul class="space-y-3">
                <li class="flex items-start">
                  <UIcon name="i-mdi-check-circle" class="mr-2 text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <span>{{ $t('about.feature1') }}</span>
                </li>
                <li class="flex items-start">
                  <UIcon name="i-mdi-check-circle" class="mr-2 text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <span>{{ $t('about.feature2') }}</span>
                </li>
                <li class="flex items-start">
                  <UIcon name="i-mdi-check-circle" class="mr-2 text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <span>{{ $t('about.feature3') }}</span>
                </li>
                <li class="flex items-start">
                  <UIcon name="i-mdi-check-circle" class="mr-2 text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <span>{{ $t('about.feature4') }}</span>
                </li>
              </ul>
            </div>
            
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {{ $t('about.technologies') }}
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <UIcon name="i-logos-nuxt-icon" class="text-4xl mb-2" />
                <span class="text-sm font-medium">Nuxt 3</span>
              </div>
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <UIcon name="i-logos-vue" class="text-4xl mb-2" />
                <span class="text-sm font-medium">Vue 3</span>
              </div>
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <UIcon name="i-logos-typescript-icon" class="text-4xl mb-2" />
                <span class="text-sm font-medium">TypeScript</span>
              </div>
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <UIcon name="i-logos-tailwindcss-icon" class="text-4xl mb-2" />
                <span class="text-sm font-medium">Tailwind CSS</span>
              </div>
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <span class="i-mdi-translate text-4xl mb-2"></span>
                <span class="text-sm font-medium">i18n</span>
              </div>
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center">
                <UIcon name="i-logos-nodejs-icon" class="text-4xl mb-2" />
                <span class="text-sm font-medium">Node.js</span>
              </div>
            </div>
            
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {{ $t('about.contribute') }}
            </h2>
            
            <p class="mb-6">
              {{ $t('about.contributeText') }}
            </p>
            
            <div class="flex justify-center mb-8">
              <a href="https://github.com/Taiizor/Echoes" target="_blank">
                <UButton size="lg" color="primary" class="flex items-center">
                  <UIcon name="i-mdi-github" class="mr-2" />
                  {{ $t('about.github') }}
                </UButton>
              </a>
            </div>
            
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {{ $t('about.license') }}
            </h2>
            
            <p>
              {{ $t('about.licenseText') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Sayfa başlığı
useHead({
  title: useI18n().t('about.title')
})
</script> 