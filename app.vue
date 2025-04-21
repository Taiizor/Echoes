<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Uygulama geneli SEO meta verileri
useHead({
  titleTemplate: (title) => title ? `${title} | Echoes` : 'Echoes - Quotes From Around The World',
  meta: [
    { name: 'description', content: 'Echoes - Discover inspiring quotes from around the world' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'og:title', content: 'Echoes - Quotes From Around The World' },
    { name: 'og:description', content: 'Discover inspiring quotes from around the world' },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://github.com/Taiizor/Echoes' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Echoes - Quotes From Around The World' },
    { name: 'twitter:description', content: 'Discover inspiring quotes from around the world' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
